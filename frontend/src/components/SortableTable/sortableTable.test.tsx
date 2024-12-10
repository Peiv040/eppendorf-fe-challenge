import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import SortableTable from ".";

interface IMockDevice {
  id: number;
  location: string;
  type: string;
}

let mockDevices: IMockDevice[] = [];
const mockColumns: { key: keyof IMockDevice; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "location", label: "Location" },
  { key: "type", label: "Type" },
];

describe("SortableTable Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockDevices = [
      { id: 1, location: "Room A", type: "pipette" },
      { id: 2, location: "Room B", type: "freezer" },
      { id: 3, location: "Room C", type: "pipette" },
      { id: 4, location: "Room D", type: "freezer" },
      { id: 5, location: "Room E", type: "shaker" },
      { id: 6, location: "Room F", type: "shaker" },
    ]
  });

  it("renders the correct number of rows", async () => {
    render(<SortableTable<IMockDevice> data={mockDevices} columns={mockColumns} />);

    const rows = await screen.findAllByRole("row");
    const headerRowCount = 1;
    expect(rows.length).toBe(mockDevices.length + headerRowCount);
  });

  it("sorts devices by a column when a header is clicked", async () => {
    render(<SortableTable<IMockDevice> data={[...mockDevices.reverse()]} columns={mockColumns} rowsPerPageOptions={[10]} />);
    await waitFor(() => expect(screen.getByText("Room A")).toBeInTheDocument());

    act(() => fireEvent.click(screen.getByText("Location")));

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Room A");
    expect(rows[2]).toHaveTextContent("Room B");
  });

  it("paginates data correctly when changing pages", async () => {
    render(
      <SortableTable<IMockDevice>
        data={mockDevices}
        columns={mockColumns}
        rowsPerPageOptions={[2]}
      />
    );

    await waitFor(() => expect(screen.getByText("Room A")).toBeInTheDocument());

    const nextPageButton = screen.getByLabelText("Go to next page");
    act(() => fireEvent.click(nextPageButton));

    expect(screen.getByText("Room C")).toBeInTheDocument();
    expect(screen.queryByText("Room A")).not.toBeInTheDocument();
  });
});
