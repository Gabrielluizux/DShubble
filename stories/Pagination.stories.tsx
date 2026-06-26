import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationIndicator,
  PaginationPreviousButton,
  PaginationNextButton,
  PaginationEllipsis,
} from "@/registry/default/ui/pagination/pagination";

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function PaginationDemo() {
      const [page, setPage] = useState(1);
      const pages = [1, 2, 3];

      return (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPreviousButton
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              />
            </PaginationItem>
            {pages.map((p) => (
              <PaginationItem key={p}>
                <PaginationIndicator isActive={p === page} onClick={() => setPage(p)}>
                  {p}
                </PaginationIndicator>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNextButton onClick={() => setPage((p) => Math.min(3, p + 1))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
    }

    return <PaginationDemo />;
  },
};
