import { StarIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/registry/default/ui/card/card";
import { Badge } from "@/registry/default/ui/badge/badge";
import { Button } from "@/registry/default/ui/button/button";

const meta = {
  title: "Guides/Product Card",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ width: 280 }}>
      <div style={{ position: "relative" }}>
        <div
          style={{
            height: 160,
            background:
              "linear-gradient(135deg, var(--primary-foreground), var(--secundaria-300))",
            borderRadius: "12px 12px 0 0",
          }}
        />
        <Badge
          variant="destructive"
          style={{ position: "absolute", top: 12, left: 12 }}
        >
          -20%
        </Badge>
      </div>

      <CardContent>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
          <StarIcon weight="fill" style={{ color: "var(--alerta-500)" }} />
          <span style={{ fontSize: 12, color: "var(--color-muted-text)" }}>4.8 (120)</span>
        </div>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>Wireless Headphones</div>
        <div style={{ fontSize: 13, color: "var(--color-muted-text)", marginBottom: 12 }}>
          Noise-cancelling, 30h battery life
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 18 }}>$79.99</span>
          <span
            style={{
              fontSize: 13,
              color: "var(--color-muted-text)",
              textDecoration: "line-through",
            }}
          >
            $99.99
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="primary" style={{ width: "100%" }}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  ),
};
