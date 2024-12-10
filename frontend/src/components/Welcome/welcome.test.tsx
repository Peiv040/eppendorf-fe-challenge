import { describe, expect, it, Mock, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router";
import Welcome from ".";
import lang from "../../locales/en.json";
import { act } from "react";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
      ...actual,
      useNavigate: vi.fn(),
  };
});

describe("Welcome Component", () => {
  it("navigates to the registration page when the Registration button is clicked", () => {
    const navigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );

    const registrationButton = screen.getByText(lang.registration.title);
    act(() => fireEvent.click(registrationButton));

    expect(navigate).toHaveBeenCalledWith("/registration");
  });

  it("navigates to the sortable table page when the Sortable Table button is clicked", () => {
    const navigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );

    const sortableTableButton = screen.getByText(lang.sortableTable.title);
    act(() => fireEvent.click(sortableTableButton));

    expect(navigate).toHaveBeenCalledWith("/sortableTable");
  });
});
