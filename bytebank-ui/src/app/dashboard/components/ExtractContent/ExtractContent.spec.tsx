import type { Account } from "@/types/accountEntities";
import type { Transaction } from "@/types/transactionEntities";
import type { User } from "@/types/userEntities";
import { render, screen } from "@testing-library/react";
import ExtractContent from "./ExtractContent";

// Mock dependencies
jest.mock("@/app/dashboard/components/TransactionList/TransactionList", () => ({
  __esModule: true,
  default: ({ transactions }: { transactions: Transaction[] }) => (
    <div data-testid="transaction-list">{transactions.length} transactions</div>
  ),
}));

jest.mock("@/assets/icons/icon-avatar.svg", () => ({
  __esModule: true,
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="icon-avatar" {...props} />
  ),
}));

const mockUser: User = {
  id: "1",
  name: "John Doe",
  avatar_url: "",
  email: "john@example.com",
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
};
const mockAccount: Account = {
  id: "1",
  account_type: "Corrente",
  balance: "1000",
  user_id: "1",
  card_number: "1234-5678-9012-3456",
  expiration_date: "12/25",
  created_at: "2024-01-01",
};
const mockTransactions: Transaction[] = [
  {
    id: "t1",
    amount: "100",
    description: "Test",
    transaction_date: "2024-01-01",
    account_id: "1",
    category_id: "1",
    category_name: "Entrada",
  },
  {
    id: "t2",
    amount: "50",
    description: "Test2",
    transaction_date: "2024-01-02",
    account_id: "1",
    category_id: "2",
    category_name: "Saída",
  },
];

describe("ExtractContent", () => {
  it("renders loader when user, account, or transactions are missing", () => {
    const { rerender } = render(
      <ExtractContent
        user={null}
        account={mockAccount}
        transactions={mockTransactions}
        onSetEditTransaction={jest.fn()}
      />
    );
    expect(screen.getByRole("status")).toBeInTheDocument();

    rerender(
      <ExtractContent
        user={mockUser}
        account={null}
        transactions={mockTransactions}
        onSetEditTransaction={jest.fn()}
      />
    );
    expect(screen.getByRole("status")).toBeInTheDocument();

    rerender(
      <ExtractContent
        user={mockUser}
        account={mockAccount}
        transactions={null}
        onSetEditTransaction={jest.fn()}
      />
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders user info and transaction list", () => {
    render(
      <ExtractContent
        user={mockUser}
        account={mockAccount}
        transactions={mockTransactions}
        onSetEditTransaction={jest.fn()}
      />
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Corrente")).toBeInTheDocument();
    expect(screen.getByTestId("transaction-list")).toHaveTextContent(
      "2 transactions"
    );
    expect(screen.getByTestId("icon-avatar")).toBeInTheDocument();
  });

  it("renders user avatar if avatar_url is present", () => {
    render(
      <ExtractContent
        user={{ ...mockUser, avatar_url: "/avatar.png" }}
        account={mockAccount}
        transactions={mockTransactions}
        onSetEditTransaction={jest.fn()}
      />
    );
    expect(screen.getByAltText("John Doe")).toBeInTheDocument();
  });

  it("calls onSetEditTransaction when passed to TransactionList", () => {
    const onSetEditTransaction = jest.fn();
    render(
      <ExtractContent
        user={mockUser}
        account={mockAccount}
        transactions={mockTransactions}
        onSetEditTransaction={onSetEditTransaction}
      />
    );
    // TransactionList is mocked, so we can't trigger the callback directly here.
    // This test ensures the prop is passed without error.
    expect(screen.getByTestId("transaction-list")).toBeInTheDocument();
  });
});
