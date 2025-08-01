import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardHeader from "./DashboardHeader";

describe("DashboardHeader", () => {
  it("renders the user's name", () => {
    render(<DashboardHeader name="Maria" />);
    expect(screen.getByText(/Olá, Maria! :]/i)).toBeInTheDocument();
  });

  it("renders the welcome message", () => {
    render(<DashboardHeader name="João" />);
    expect(screen.getByText(/Bem vinda de volta!/i)).toBeInTheDocument();
  });

  it("renders the formatted current date in pt-BR", () => {
    render(<DashboardHeader name="Ana" />);

    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(currentDate);

    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
