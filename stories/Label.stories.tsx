import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@/registry/default/ui/label/label";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Email address",
    htmlFor: "email",
  },
};
