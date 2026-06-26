import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "@/registry/default/ui/textarea/textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { placeholder: "Type your message here." },
  argTypes: {
    roundness: {
      control: "select",
      options: ["default", "round"],
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { roundness: "default", className: "w-full" },
};

export const Round: Story = {
  args: { roundness: "round", className: "w-full" },
};
