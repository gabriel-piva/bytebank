import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DeleteModal } from "./DeleteModal";

describe("DeleteModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onConfirmDelete: jest.fn(),
    itemName: "Conta Corrente",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render modal when isOpen is true", () => {
    render(<DeleteModal {...defaultProps} />);
    expect(screen.getByText("Confirmar exclusão")).toBeInTheDocument();
    expect(
      screen.getByText(/Você tem certeza que deseja excluir/)
    ).toBeInTheDocument();
    expect(screen.getByText(/"Conta Corrente"/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Cancelar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Excluir/i })
    ).toBeInTheDocument();
  });

  it("should call onClose when Cancelar button is clicked", () => {
    render(<DeleteModal {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /Cancelar/i }));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("should call onConfirmDelete when Excluir button is clicked", () => {
    render(<DeleteModal {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /Excluir/i }));
    expect(defaultProps.onConfirmDelete).toHaveBeenCalled();
  });

  it("should render with empty itemName", () => {
    render(<DeleteModal {...defaultProps} itemName={undefined} />);
    expect(
      screen.getByText(/Você tem certeza que deseja excluir/)
    ).toBeInTheDocument();
  });
});
