import React from "react";
import { Typography, Skeleton } from "@mui/material";
import SortableTable from "../../components/SortableTable";
import { useFetchData } from "../../hooks/useFetchData";
import { IDevice } from "../../models/Device";
import lang from "../../locales/en.json";

import './devices.css';

const Devices: React.FC = () => {
  const { data, loading, error } = useFetchData<IDevice[]>(
    `${import.meta.env.VITE_BACKEND_URL}/devices`
  );

  const columns: { key: keyof IDevice; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "location", label: "Location" },
    { key: "type", label: "Type" },
    { key: "device_health", label: "Device health" },
    { key: "last_used", label: "Last used" },
    { key: "price", label: "Price" },
    { key: "color", label: "Color" },
  ];

  if (error) {
    return (
      <main id="devices">
        <Typography variant="h4" gutterBottom>
          {lang.sortableTable.title}
        </Typography>

        <Typography color="error">{error}</Typography>
      </main>
    );
  }

  return (
    <main id="devices">
      <Typography variant="h4" gutterBottom>
        {lang.sortableTable.title}
      </Typography>
      
      {loading ?
        <Skeleton variant="rectangular" height={500} data-testid="skeleton" />
        :
        <SortableTable data={data || []} columns={columns} initialSortKey="id" />
      }
    </main>
  );
};

export default Devices;
