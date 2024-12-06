import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import lang from '../../locales/en.json';

import './sortableTable.css';

type hexcode = string;

interface IDevice {
  id: number;
  location: string;
  type: string;
  device_health: string;
  last_used: string;
  price: string;
  color: hexcode;
}

const SortableTable: React.FC = () => {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [ascending, setAscending] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleSort = (key: string) => {
    const sortedData = [...devices].sort((a, b) => {
      if (a[key] < b[key]) return ascending ? -1 : 1;
      if (a[key] > b[key]) return ascending ? 1 : -1;
      return 0;
    });

    setDevices(sortedData);
    setSortKey(key);
    setAscending(!ascending);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/data");
      const jsonData = await response.json();
      setDevices(jsonData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>{lang.loading}</p>;

  return (
    <main id="sortableTable">
      <h1>{lang.sortableTable.title}</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {Object.keys(devices[0]).map((key: string) => (
                <TableCell key={key} onClick={() => handleSort(key)}>
                  {key} {sortKey === key && (ascending ? '↑' : '↓')}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((entry, index) => (
              <TableRow key={index}>
                {Object.values(entry).map((value: any, i: number) => (
                  <TableCell key={i}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};

export default SortableTable;
