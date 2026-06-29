import { BellIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/registry/default/ui/button/button";
import { IconButton } from "@/registry/default/ui/icon-button/icon-button";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar/avatar";
import { Separator } from "@/registry/default/ui/separator/separator";
import { Badge } from "@/registry/default/ui/badge/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/registry/default/ui/dropdown-menu/dropdown-menu";

const meta = {
  title: "Guides/Header Navigation",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        padding: "0 24px",
        borderBottom: "1px solid var(--color-border-200)",
        background: "var(--background)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <span style={{ fontWeight: 700, fontSize: 16 }}>Acme</span>
        <nav style={{ display: "flex", gap: 4 }}>
          <Button variant="ghost" size="small">
            Products
          </Button>
          <Button variant="ghost" size="small">
            Pricing
          </Button>
          <Button variant="ghost" size="small">
            Docs
          </Button>
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <IconButton variant="ghost" aria-label="Search">
          <MagnifyingGlassIcon />
        </IconButton>
        <div style={{ position: "relative" }}>
          <IconButton variant="ghost" aria-label="Notifications">
            <BellIcon />
          </IconButton>
          <Badge
            variant="destructive"
            roundness="full"
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              minWidth: 8,
              height: 8,
              padding: 0,
            }}
          />
        </div>

        <Separator orientation="vertical" style={{ height: 24, margin: "0 8px" }} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button style={{ border: "none", background: "none", cursor: "pointer" }}>
              <Avatar size="small">
                <AvatarFallback>GS</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Gabriel Silva</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  ),
};
