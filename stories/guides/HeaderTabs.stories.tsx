import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsList, TabsTrigger } from "@/registry/default/ui/tabs/tabs";

const meta = {
  title: "Guides/Header Tabs",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: 44,
        padding: "0 24px",
        borderBottom: "1px solid var(--color-border-200)",
        background: "var(--background)",
      }}
    >
      <Tabs defaultValue="page-1" size="small">
        <TabsList>
          <TabsTrigger value="page-1">Page 1</TabsTrigger>
          <TabsTrigger value="page-2">Page 2</TabsTrigger>
          <TabsTrigger value="page-3">Page 3</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  ),
};
