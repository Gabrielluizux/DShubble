import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/default/ui/input-group/input-group";

const meta = {
  title: "Components/Input Group",
  component: InputGroup,
  tags: ["autodocs"],
  args: { align: "inline-start" },
  argTypes: {
    align: {
      control: "select",
      options: ["inline-start", "inline-end", "block-start", "block-end"],
    },
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ align }) => (
    <InputGroup style={{ width: 240 }}>
      <InputGroupAddon align={align}>
        <InputGroupText>
          <MagnifyingGlassIcon />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
};
