import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerClose,
} from "@/registry/default/ui/drawer/drawer";
import { Button } from "@/registry/default/ui/button/button";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  args: { direction: "right" },
  argTypes: {
    direction: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Drawer {...args} defaultOpen>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move goal</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="primary">Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
