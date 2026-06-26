import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "@/registry/default/ui/scroll-area/scroll-area";

const meta = {
  title: "Components/Scroll Area",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea style={{ height: 160, width: 240, border: "1px solid var(--color-border-200)", borderRadius: 8 }}>
      <div style={{ padding: 12 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} style={{ margin: "4px 0" }}>
            Item {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};
