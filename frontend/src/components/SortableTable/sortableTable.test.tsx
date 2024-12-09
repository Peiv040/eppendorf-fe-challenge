import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import SortableTable from ".";

global.fetch = vi.fn();

const mockDevices = [
  { id: 1, location: "Room A", type: "pipette", device_health: "good", last_used: "2024-12-01", price: "10.00", color: "#FFFFFF" },
  { id: 2, location: "Room B", type: "freezer", device_health: "mediocre", last_used: "2024-11-15", price: "200.00", color: "#000000" },
  { id: 3, location: "Room C", type: "pipette", device_health: "mediocre", last_used: "2024-11-15", price: "100.00", color: "#000000" },
  { id: 4, location: "Room D", type: "freezer", device_health: "mediocre", last_used: "2024-11-15", price: "200.00", color: "#000000" },
  { id: 5, location: "Room E", type: "shaker", device_health: "good", last_used: "2024-11-15", price: "50.00", color: "#FFFFFF" },
  { id: 6, location: "Room F", type: "shaker", device_health: "good", last_used: "2024-11-15", price: "500.00", color: "#FFFFFF" },
];

describe("SortableTable Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders devices correctly after data is loaded", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockDevices,
    });

    render(<SortableTable />);
    await waitFor(() => expect(screen.getByText("Room A")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Room B")).toBeInTheDocument());
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

  it("sorts devices by a column when a header is clicked", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [...mockDevices].reverse(),
    });

    render(<SortableTable />);
    await waitFor(() => expect(screen.getByText("Room A")).toBeInTheDocument());

    act(() => fireEvent.click(screen.getByText("LOCATION")));

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Room A");
    expect(rows[2]).toHaveTextContent("Room B");
  });
});
