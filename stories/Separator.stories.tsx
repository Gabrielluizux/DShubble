import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@/registry/default/ui/separator/separator";

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div style={{ width: 240 }}>
      <p>Section one</p>
      <Separator {...args} style={{ margin: "12px 0" }} />
      <p>Section two</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div style={{ display: "flex", height: 40, alignItems: "center", gap: 12 }}>
      <span>Left</span>
      <Separator {...args} />
      <span>Right</span>
    </div>
  ),
};
