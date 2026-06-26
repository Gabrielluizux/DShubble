import { PlusIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "@/registry/default/ui/icon-button/icon-button";

const meta = {
  title: "Components/Icon Button",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    children: <PlusIcon />,
    "aria-label": "Add",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "secondary", "ghost", "destructive"],
    },
    size: {
      control: "select",
      options: ["default", "mini", "small", "large"],
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary" },
};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {(["primary", "outline", "secondary", "ghost", "destructive"] as const).map(
        (variant) => (
          <IconButton key={variant} {...args} variant={variant} />
        ),
      )}
    </div>
  ),
};
