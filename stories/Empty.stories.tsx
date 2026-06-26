import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/registry/default/ui/empty/empty";

const meta = {
  title: "Components/Empty",
  component: Empty,
  tags: ["autodocs"],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Empty style={{ width: 320 }}>
      <EmptyHeader>
        <EmptyMedia variant="icon">∅</EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try adjusting your search or filter to find what you&apos;re looking for.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>Clear filters</EmptyContent>
    </Empty>
  ),
};
