import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "@/registry/default/ui/skeleton/skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Skeleton style={{ height: 16, width: 200 }} />,
};

export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 240 }}>
      <Skeleton style={{ height: 120, width: "100%" }} />
      <Skeleton style={{ height: 14, width: "80%" }} />
      <Skeleton style={{ height: 14, width: "50%" }} />
    </div>
  ),
};
