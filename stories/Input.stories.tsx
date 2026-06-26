import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@/registry/default/ui/input/input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "Email address" },
  argTypes: {
    size: {
      control: "select",
      options: ["regular", "large", "small", "mini"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: "regular" },
};

export const Disabled: Story = {
  args: { size: "regular", disabled: true, value: "disabled value" },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 240 }}>
      {(["large", "regular", "small", "mini"] as const).map((size) => (
        <Input key={size} {...args} size={size} placeholder={size} />
      ))}
    </div>
  ),
};
