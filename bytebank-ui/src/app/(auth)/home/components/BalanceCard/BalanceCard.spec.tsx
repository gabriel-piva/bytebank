import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BalanceCard from "./BalanceCard";

// Mock SVG imports
jest.mock("@/assets/icons/icon-creditcard.svg", () => {
  function MockIconCreditCard(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} data-testid="icon-creditcard" />;
  }
  MockIconCreditCard.displayName = "MockIconCreditCard";
  return MockIconCreditCard;
});

jest.mock("@/assets/icons/icon-eye.svg", () => {
  const MockIconEye = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} data-testid="icon-eye" />
  );
  MockIconEye.displayName = "MockIconEye";
  return MockIconEye;
});

// Mock utility functions
jest.mock("@/utils/date/formatDisplayDate", () => ({
  formatDisplayDate: jest.fn(() => "12/34"),
}));
jest.mock("@/utils/string/maskCardNumber", () => ({
  maskCardNumber: jest.fn(() => "**** **** **** 1234"),
}));

describe("BalanceCard", () => {
  const defaultProps = {
    accountType: "Conta Corrente",
    cardNumber: "1234567812341234",
    expirationDate: "2034-12-01",
    balance: 12345.67,
    currency: "BRL",
  };

  it("renders masked card number and formatted expiration date", () => {
    render(<BalanceCard {...defaultProps} />);
    expect(screen.getByText("**** **** **** 1234")).toBeInTheDocument();
    expect(screen.getByText("12/34")).toBeInTheDocument();
  });

  it("renders account type", () => {
    render(<BalanceCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.accountType)).toBeInTheDocument();
  });

  it("hides balance by default", () => {
    render(<BalanceCard {...defaultProps} />);
    expect(screen.getByText("R$ ••••••")).toBeInTheDocument();
  });

  it("shows balance when eye icon is clicked", () => {
    render(<BalanceCard {...defaultProps} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("R$ 12.345,67")).toBeInTheDocument();
  });

  it("toggles balance visibility on eye icon click", () => {
    render(<BalanceCard {...defaultProps} />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(screen.getByText("R$ 12.345,67")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("R$ ••••••")).toBeInTheDocument();
  });

  it("renders with default currency if not provided", () => {
    render(<BalanceCard {...{ ...defaultProps, currency: undefined }} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("R$ 12.345,67")).toBeInTheDocument();
  });

  // it("renders credit card and eye icons", () => {
  //   render(<BalanceCard {...defaultProps} />);
  //   expect(screen.getByTestId("icon-creditcard")).toBeInTheDocument();
  //   expect(screen.getByTestId("icon-eye")).toBeInTheDocument();
  // });
});
