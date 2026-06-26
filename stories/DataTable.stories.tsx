import { createColumnHelper } from "@tanstack/react-table";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DataTableProvider,
  DataTable,
  DataTableHeader,
  DataTableFooter,
  DataTablePagination,
  DataTableColumnVisibilityToggle,
  DataTableColumn,
} from "@/registry/default/ui/data-table/data-table";

type Invoice = {
  id: string;
  customer: string;
  status: "paid" | "pending" | "unpaid";
  amount: number;
};

const invoices: Invoice[] = [
  { id: "INV001", customer: "Liam Carter", status: "paid", amount: 250 },
  { id: "INV002", customer: "Olivia Chen", status: "pending", amount: 150 },
  { id: "INV003", customer: "Noah Patel", status: "unpaid", amount: 350 },
  { id: "INV004", customer: "Ava Martinez", status: "paid", amount: 450 },
];

const columnHelper = createColumnHelper<Invoice>();

const columns = [
  columnHelper.accessor("id", {
    header: ({ column }) => <DataTableColumn column={column}>Invoice</DataTableColumn>,
  }),
  columnHelper.accessor("customer", {
    header: ({ column }) => <DataTableColumn column={column}>Customer</DataTableColumn>,
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => <DataTableColumn column={column}>Status</DataTableColumn>,
  }),
  columnHelper.accessor("amount", {
    header: ({ column }) => <DataTableColumn column={column}>Amount</DataTableColumn>,
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  }),
];

const meta = {
  title: "Components/Data Table",
  component: DataTable,
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DataTableProvider columns={columns} data={invoices} className="w-[480px]">
      <DataTableHeader className="flex justify-end">
        <DataTableColumnVisibilityToggle />
      </DataTableHeader>
      <DataTable />
      <DataTableFooter>
        <DataTablePagination />
      </DataTableFooter>
    </DataTableProvider>
  ),
};
