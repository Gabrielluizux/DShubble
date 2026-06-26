import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "@/registry/default/ui/slider/slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: [40], max: 100, step: 1 },
  render: (args) => <Slider {...args} style={{ width: 240 }} />,
};

export const Range: Story = {
  args: { defaultValue: [25, 75], max: 100, step: 1 },
  render: (args) => <Slider {...args} style={{ width: 240 }} />,
};
