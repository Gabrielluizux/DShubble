import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToastProvider, toast } from "@/registry/default/ui/toast/toast";
import { Button } from "@/registry/default/ui/button/button";

const meta = {
  title: "Components/Toast",
  component: ToastProvider,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <>
        <Story />
        <ToastProvider />
      </>
    ),
  ],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Event has been created", {
            description: "Sunday, June 28th at 4:00pm",
          })
        }
      >
        Show toast
      </Button>
    </div>
  ),
};
