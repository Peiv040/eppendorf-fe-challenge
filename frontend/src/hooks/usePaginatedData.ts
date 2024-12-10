import { useMemo } from "react";

export const usePaginatedData = <T>(
  data: T[],
  currentPage: number,
  rowsPerPage: number
) => {
  return useMemo(() => {
    const start = currentPage * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [data, currentPage, rowsPerPage]);
};
