import React, { useState, useRef } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { useSortedData } from "../../hooks/useSortedData";
import { usePaginatedData } from "../../hooks/usePaginatedData";
import useCalculateRemainingHeight from "../../hooks/useCalculateFullsizeHeight";

import "./sortableTable.css";

interface SortableTableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  rowsPerPageOptions?: number[];
  initialSortKey?: keyof T;
}

const SortableTable = <T,>({
  data,
  columns,
  rowsPerPageOptions = [5, 10, 25, 50, 100],
  initialSortKey,
}: SortableTableProps<T>): React.ReactElement => {
  const [sortKey, setSortKey] = useState<keyof T | null>(initialSortKey || null);
  const [ascending, setAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const tableHeight = useCalculateRemainingHeight(tableContainerRef, [data], 500);

  // Should happen in the backend
  const sortedData = useSortedData<T>(data, sortKey, ascending);
  // Should happen in the backend
  const paginatedData = usePaginatedData<T>(
    sortedData,
    currentPage,
    rowsPerPage
  );

  const handleSort = (key: keyof T) => {
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

  return (
    <TableContainer
      className="sortableTable"
      component={Paper}
      style={{ maxHeight: `${tableHeight}px` }}
      ref={tableContainerRef}
    >
      <Table stickyHeader aria-label="sortable table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.key)}
                onClick={() => handleSort(column.key)}
                aria-sort={
                  sortKey === column.key
                    ? ascending
                      ? "ascending"
                      : "descending"
                    : undefined
                }
                className="sortable-header"
              >
                {column.label} {sortKey === column.key && (ascending ? "↑" : "↓")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedData.map((entry, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={String(column.key)}>
                  {entry[column.key] !== undefined && entry[column.key] !== null
                    ? String(entry[column.key])
                    : ""}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default SortableTable;
