import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/registry/default/ui/tabs/tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["regular", "large", "small"],
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: "regular" },
  render: (args) => (
    <Tabs {...args} defaultValue="account" style={{ width: 320 }}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings go here.</TabsContent>
      <TabsContent value="password">Password settings go here.</TabsContent>
    </Tabs>
  ),
};
