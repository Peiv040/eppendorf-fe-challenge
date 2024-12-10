import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Devices from ".";
import * as useFetchDataModule from "../../hooks/useFetchData";

const mockDevices = [
  { id: 1, location: "Room A", type: "pipette", device_health: "good", last_used: "2024-12-01", price: "10.00", color: "#FFFFFF" },
  { id: 2, location: "Room B", type: "freezer", device_health: "mediocre", last_used: "2024-11-15", price: "200.00", color: "#000000" },
  { id: 3, location: "Room C", type: "pipette", device_health: "mediocre", last_used: "2024-11-15", price: "100.00", color: "#000000" },
  { id: 4, location: "Room D", type: "freezer", device_health: "mediocre", last_used: "2024-11-15", price: "200.00", color: "#000000" },
  { id: 5, location: "Room E", type: "shaker", device_health: "good", last_used: "2024-11-15", price: "50.00", color: "#FFFFFF" },
  { id: 6, location: "Room F", type: "shaker", device_health: "good", last_used: "2024-11-15", price: "500.00", color: "#FFFFFF" },
];

vi.mock("../../hooks/useFetchData");

describe("Devices component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders skeleton while data is loading", async () => {
    (useFetchDataModule.useFetchData as Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<Devices />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("renders devices correctly after data is loaded", async () => {
    (useFetchDataModule.useFetchData as Mock).mockReturnValue({
      data: mockDevices,
      loading: false,
      error: null,
    });

    render(<Devices />);
    await waitFor(() => expect(screen.getByText("Room A")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText("Room B")).toBeInTheDocument());
  });

  it("displays an error message if fetching devices fails", async () => {
    const errorMsg = "Unable to fetch devices. Please try again later.";

    (useFetchDataModule.useFetchData as Mock).mockReturnValue({
      data: null,
      loading: false,
      error: errorMsg,
    });

    render(<Devices />);
    await waitFor(() =>
      expect(screen.getByText("Unable to fetch devices. Please try again later.")).toBeInTheDocument()
    );
  });
});
