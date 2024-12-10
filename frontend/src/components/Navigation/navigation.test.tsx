import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router";
import Navigation from ".";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
      ...actual,
      useNavigate: vi.fn(),
      useLocation: vi.fn(),
  };
});

describe("Navigation Component", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  it("does not render the back button on the base URL", () => {
    (useLocation as Mock).mockReturnValue({ pathname: "/" });

    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const backButton = screen.queryByRole("button", { name: /back/i });
    expect(backButton).not.toBeInTheDocument();
  });

  it("renders the back button when not on the base URL", () => {
    (useLocation as Mock).mockReturnValue({ pathname: "/other" });

    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const backButton = screen.getByRole("button", { name: /back/i });
    expect(backButton).toBeInTheDocument();
  });

  it("navigates to the base URL when the back button is clicked", () => {
    (useLocation as Mock).mockReturnValue({ pathname: "/other" });

    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
