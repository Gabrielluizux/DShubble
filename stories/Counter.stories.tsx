import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Counter,
  CounterInputControls,
  CounterInputDecrement,
  CounterInputField,
  CounterInputIncrement,
} from "@/registry/default/ui/counter/counter";

const meta = {
  title: "Components/Counter",
  component: Counter,
  tags: ["autodocs"],
  args: { defaultValue: 1, min: 0, max: 10, step: 1, disabled: false },
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Counter {...args}>
      <CounterInputControls>
        <CounterInputDecrement />
        <CounterInputField />
        <CounterInputIncrement />
      </CounterInputControls>
    </Counter>
  ),
};
