import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/registry/default/ui/badge/badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "destructive", "outline", "ghost"],
    },
    roundness: {
      control: "select",
      options: ["default", "full"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", children: "Badge" },
};

export const AllVariants: Story = {
  args: { children: "Badge" },
  render: (args) => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {(["primary", "secondary", "destructive", "outline", "ghost"] as const).map(
        (variant) => (
          <Badge key={variant} {...args} variant={variant} />
        ),
      )}
    </div>
  ),
};
