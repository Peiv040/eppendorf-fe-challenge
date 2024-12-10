import { useMemo } from "react";
import { IDevice } from "../models/Device";

export const useSortedData = (
  data: IDevice[],
  sortKey: keyof IDevice,
  ascending: boolean
) => {
  return useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
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
  }, [data, sortKey, ascending]);
};
