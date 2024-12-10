import React, { useState, useRef } from "react";
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
import { useSortedData } from "../../hooks/useSortedData";
import { IDevice } from "../../models/Device";
import { useFetchData } from "../../hooks/useFetchData";
import { usePaginatedData } from "../../hooks/usePaginatedData";
import useCalculateRemainingHeight from "../../hooks/useCalculateFullsizeHeight";
import lang from "../../locales/en.json";

import "./sortableTable.css";

const SortableTable: React.FC = () => {
  const rowsPerPageOptions = [5, 10, 25, 50, 100];
  const { data: devices, loading, error } = useFetchData<IDevice[]>(
    `${import.meta.env.VITE_BACKEND_URL}/devices`
  );

  const [sortKey, setSortKey] = useState<keyof IDevice>("id");
  const [ascending, setAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const tableHeight = useCalculateRemainingHeight(tableContainerRef, [loading], 500);

  // Should happen in the backend
  const sortedDevices = useSortedData(devices || [], sortKey, ascending);
  // Should happen in the backend
  const paginatedDevices = usePaginatedData(
    sortedDevices,
    currentPage,
    rowsPerPage
  );

  const handleSort = (key: keyof IDevice) => {
    setSortKey(key);
    setAscending((prev) => (key === sortKey ? !prev : true));
  };

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
      <Typography variant="h4" gutterBottom>
        {lang.sortableTable.title}
      </Typography>

      {loading ? (
        <Skeleton variant="rectangular" height={tableHeight} data-testid="skeleton" />
      ) : (
        <TableContainer
          component={Paper}
          style={{ maxHeight: `${tableHeight}px` }}
          ref={tableContainerRef}
        >
          <Table stickyHeader aria-label="sortable table">
            <TableHead>
              <TableRow>
                {devices && devices?.length > 0 &&
                  Object.keys(devices[0]).map((key) => (
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
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedDevices.map((device) => (
                <TableRow key={device.id}>
                  {Object.values(device).map((value, index) => (
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
        </TableContainer>
      )}
    </main>
  );
};

export default SortableTable;
