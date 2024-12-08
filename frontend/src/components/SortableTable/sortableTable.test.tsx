import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SortableTable from ".";

global.fetch = vi.fn();

const mockDevices = [
  { id: 1, location: "Room A", type: "Sensor", device_health: "Good", last_used: "2023-12-01", price: "100", color: "#FFFFFF" },
  { id: 2, location: "Room B", type: "Actuator", device_health: "Poor", last_used: "2023-11-15", price: "200", color: "#000000" },
];

describe("SortableTable Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockDevices,
    });

    render(<SortableTable />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it("displays an error message if fetching devices fails", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<SortableTable />);
    await waitFor(() =>
      expect(screen.getByText("Unable to fetch devices. Please try again later.")).toBeInTheDocument()
    );
  });
});
