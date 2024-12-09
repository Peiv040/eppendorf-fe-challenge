import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableFooter,
  TablePagination,
  Skeleton,
} from "@mui/material";
import { IDevice } from "../../models/Device";
import lang from "../../locales/en.json";

import "./sortableTable.css";

const SortableTable: React.FC = () => {
  const rowsPerPageOptions = [5, 10, 25, 50, 100];

  const [devices, setDevices] = useState<IDevice[]>([]);
  const [sortKey, setSortKey] = useState<keyof IDevice>('id');
  const [ascending, setAscending] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const titleRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState<number>(500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/devices");
        if (!response.ok) throw new Error("Failed to load devices");
        const jsonData: IDevice[] = await response.json();
        setDevices(jsonData);
      } catch {
        setError("Unable to fetch devices. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateTableHeight = () => {
    const navHeight = document.querySelector('nav')?.offsetHeight || 0;
    const titleHeight = titleRef.current?.offsetHeight || 0;
    const offset = 140;
    const availableHeight = window.innerHeight - navHeight - titleHeight - offset;
    setTableHeight(availableHeight);
  };


  useEffect(() => {
    updateTableHeight();
    window.addEventListener("resize", updateTableHeight);
    return () => window.removeEventListener("resize", updateTableHeight);
  }, []);

  const handleSort = (key: keyof IDevice) => {
    setSortKey(key);
    setAscending((prev) => (key === sortKey ? !prev : true));
  };

  // This should happen on backend
  const sortedDevices = useMemo(() => {
    if (!sortKey) return devices;
    return [...devices].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];
      if (typeof valueA === "string" && typeof valueB === "string") {
        return ascending
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      if (typeof valueA === "number" && typeof valueB === "number") {
        return ascending ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });
  }, [devices, sortKey, ascending]);

  // This should happen on backend
  const paginatedDevices = useMemo(() => {
    return sortedDevices.slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage
    )
  }, [currentPage, rowsPerPage, sortedDevices]);

  const handlePageChange = (_: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); // Reset to first page when rows-per-page changes
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <main id="sortableTable">
      <Typography variant="h4" gutterBottom ref={titleRef}>
        {lang.sortableTable.title}
      </Typography>

      {loading ?
        <Skeleton variant="rectangular" height={500} data-testid="skeleton" />
        :
        <TableContainer
          component={Paper}
          ref={tableContainerRef}
          style={{ maxHeight: `${tableHeight}px` }}
        >
          <Table stickyHeader aria-label="sortable table">
            <TableHead>
              <TableRow>
                {devices.length > 0
                  ? Object.keys(devices[0]).map((key) => (
                    <TableCell
                      key={key}
                      onClick={() => handleSort(key as keyof IDevice)}
                      aria-sort={
                        sortKey === key
                          ? ascending
                            ? "ascending"
                            : "descending"
                          : undefined
                      }
                      className="sortable-header"
                    >
                      {key.replace(/_/g, " ").toUpperCase()}{" "}
                      {sortKey === key && (ascending ? "↑" : "↓")}
                    </TableCell>
                  ))
                  : null}
              </TableRow>
            </TableHead>
            <TableBody
            >
              {paginatedDevices.map((device) => (
                <TableRow key={device.id}>
                  {Object.values(device).map((value: string | number, index) => (
                    <TableCell key={index}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={rowsPerPageOptions}
                  count={sortedDevices.length}
                  rowsPerPage={rowsPerPage}
                  page={currentPage}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>}
    </main>
  );
};

export default SortableTable;
