import { ChartBarIcon, GearIcon, HouseIcon, SignOutIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/registry/default/ui/button/button";
import { IconButton } from "@/registry/default/ui/icon-button/icon-button";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar/avatar";
import { Separator } from "@/registry/default/ui/separator/separator";

const meta = {
  title: "Guides/Sidebar",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { label: "Dashboard", icon: HouseIcon, active: true },
  { label: "Analytics", icon: ChartBarIcon, active: false },
  { label: "Settings", icon: GearIcon, active: false },
];

export const Default: Story = {
  render: () => (
    <aside
      className="bg-sidebar text-sidebar-foreground border-r border-sidebar-border"
      style={{
        display: "flex",
        flexDirection: "column",
        width: 240,
        height: "100vh",
        padding: 16,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 16, padding: "8px 12px", marginBottom: 16 }}>
        Acme
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, padding: "0 12px", marginBottom: 8 }}>
        General
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map(({ label, icon: Icon, active }) => (
          <Button
            key={label}
            variant="ghost"
            className={
              active
                ? "bg-sidebar-accent justify-start"
                : "justify-start"
            }
            style={{ width: "100%" }}
          >
            <Icon />
            {label}
          </Button>
        ))}
      </nav>

      <Separator className="bg-sidebar-border" style={{ margin: "16px 0" }} />

      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 8, padding: "0 4px" }}>
        <Avatar size="small">
          <AvatarFallback>GS</AvatarFallback>
        </Avatar>
        <span style={{ fontSize: 13, flex: 1 }}>Gabriel Silva</span>
        <IconButton variant="ghost" size="small" aria-label="Log out">
          <SignOutIcon />
        </IconButton>
      </div>
    </aside>
  ),
};
