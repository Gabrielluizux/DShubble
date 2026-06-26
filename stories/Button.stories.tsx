import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/registry/default/ui/button/button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "secondary", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "mini", "small", "large"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
};

export const AllVariants: Story = {
  args: { children: "Button" },
  render: (args) => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {(["primary", "outline", "secondary", "ghost", "destructive", "link"] as const).map(
        (variant) => (
          <Button key={variant} {...args} variant={variant} />
        ),
      )}
    </div>
  ),
};
