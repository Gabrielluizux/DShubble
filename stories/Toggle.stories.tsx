import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "@/registry/default/ui/toggle/toggle";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: { children: "Bold" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "mini", "small", "large"],
    },
    roundness: {
      control: "select",
      options: ["default", "round"],
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: "default" },
};

export const Pressed: Story = {
  args: { variant: "outline", pressed: true },
};
