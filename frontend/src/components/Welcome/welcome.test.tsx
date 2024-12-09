import { describe, expect, it, Mock, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router";
import Welcome from ".";
import lang from "../../locales/en.json";

describe("Welcome Component", () => {
  it("renders the welcome title and buttons", () => {
    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );

    expect(screen.getByText(lang.welcome.title)).toBeInTheDocument();

    expect(screen.getByText(lang.registration.title)).toBeInTheDocument();
    expect(screen.getByText(lang.sortableTable.title)).toBeInTheDocument();
  });

  it("navigates to the registration page when the Registration button is clicked", () => {
    const navigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );

    const registrationButton = screen.getByText(lang.registration.title);
    fireEvent.click(registrationButton);

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
    fireEvent.click(sortableTableButton);

    expect(navigate).toHaveBeenCalledWith("/sortableTable");
  });
});
