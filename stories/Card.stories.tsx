import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/registry/default/ui/card/card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: 320 }}>
      <CardHeader>
        <CardTitle>Plan renewal</CardTitle>
        <CardDescription>Your subscription renews on July 1st.</CardDescription>
        <CardAction>•••</CardAction>
      </CardHeader>
      <CardContent>
        <p>Manage billing details and payment methods for this workspace.</p>
      </CardContent>
      <CardFooter>
        <span>Manage</span>
      </CardFooter>
    </Card>
  ),
};
