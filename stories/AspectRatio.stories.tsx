import type { Meta, StoryObj } from "@storybook/react-vite";
import { AspectRatio } from "@/registry/default/ui/aspect-ratio/aspect-ratio";

const meta = {
  title: "Components/Aspect Ratio",
  component: AspectRatio,
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: { type: "number", step: 0.1 },
    },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { ratio: 16 / 9 },
  render: (args) => (
    <div style={{ width: 320 }}>
      <AspectRatio {...args}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            background: "var(--color-accent-2)",
            borderRadius: 8,
          }}
        >
          16:9
        </div>
      </AspectRatio>
    </div>
  ),
};
