import type { Meta, StoryObj } from "@storybook/react-vite";

const scale = [
  { cls: "rounded-xs", label: "radius-xs", computed: "2px" },
  { cls: "rounded-sm", label: "radius-sm", computed: "4px" },
  { cls: "rounded-md", label: "radius-md", computed: "8px" },
  { cls: "rounded-lg", label: "radius-lg", computed: "12px" },
  { cls: "rounded-xl", label: "radius-xl", computed: "16px" },
  { cls: "rounded-2xl", label: "radius-2xl", computed: "24px" },
  { cls: "rounded-full", label: "radius-full", computed: "pill" },
];

function Swatch({ cls, label, computed }: { cls: string; label: string; computed: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        className={cls}
        style={{
          width: 72,
          height: 72,
          background: "var(--primary-foreground)",
        }}
      />
      <div style={{ fontSize: 12, fontWeight: 600, marginTop: 12 }}>{label}</div>
      <div style={{ fontSize: 11, color: "var(--color-muted-text)" }}>{computed}</div>
    </div>
  );
}

const meta = {
  title: "Foundations/Radius",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: 8 }}>Scale</h3>
      <p style={{ fontSize: 13, color: "var(--color-muted-text)", marginBottom: 16, maxWidth: 640 }}>
        Base unit <code>--radius: 4px</code>; every step is a multiple of it. Heavily used
        across 34 components.
      </p>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {scale.map((s) => (
          <Swatch key={s.cls} {...s} />
        ))}
      </div>
    </div>
  ),
};
