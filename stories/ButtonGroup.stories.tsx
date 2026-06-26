import { TextBIcon, TextItalicIcon, TextUnderlineIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/registry/default/ui/button-group/button-group";
import { Button } from "@/registry/default/ui/button/button";
import { IconButton } from "@/registry/default/ui/icon-button/icon-button";

const meta = {
  title: "Components/Button Group",
  component: ButtonGroup,
  tags: ["autodocs"],
  args: { orientation: "horizontal" },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args} style={args.orientation === "vertical" ? { width: 140 } : undefined}>
      <Button variant="outline">Copy</Button>
      <Button variant="outline">Edit</Button>
      <Button variant="outline">Delete</Button>
    </ButtonGroup>
  ),
};

export const WithSeparator: Story = {
  render: (args) => (
    <ButtonGroup {...args} style={args.orientation === "vertical" ? { width: 140 } : undefined}>
      <Button variant="outline">Bold</Button>
      <Button variant="outline">Italic</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Underline</Button>
    </ButtonGroup>
  ),
};

export const IconOnly: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <IconButton variant="outline" aria-label="Bold">
        <TextBIcon />
      </IconButton>
      <IconButton variant="outline" aria-label="Italic">
        <TextItalicIcon />
      </IconButton>
      <IconButton variant="outline" aria-label="Underline">
        <TextUnderlineIcon />
      </IconButton>
    </ButtonGroup>
  ),
};

export const MixedIconsAndText: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <IconButton variant="outline" aria-label="Bold">
        <TextBIcon />
      </IconButton>
      <Button variant="outline">Copy</Button>
      <Button variant="outline">Delete</Button>
    </ButtonGroup>
  ),
};
