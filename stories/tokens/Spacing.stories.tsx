import type { Meta, StoryObj } from "@storybook/react-vite";

const spacingTokens = [
  { name: "3xs", cls: "w-3xs" },
  { name: "2xs", cls: "w-2xs" },
  { name: "xs", cls: "w-xs" },
  { name: "sm", cls: "w-sm" },
  { name: "md", cls: "w-md" },
  { name: "lg", cls: "w-lg" },
  { name: "xl", cls: "w-xl" },
  { name: "2xl", cls: "w-2xl" },
  { name: "3xl", cls: "w-3xl" },
  { name: "4xl", cls: "w-4xl" },
  { name: "5xl", cls: "w-5xl" },
  { name: "6xl", cls: "w-6xl" },
  { name: "7xl", cls: "w-7xl" },
  { name: "8xl", cls: "w-8xl" },
  { name: "9xl", cls: "w-9xl" },
  { name: "10xl", cls: "w-10xl" },
];

function SpacingRow({ name, cls }: { name: string; cls: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "6px 0",
        borderBottom: "1px solid var(--color-border-100)",
      }}
    >
      <code style={{ fontSize: 13, width: 64 }}>{name}</code>
      <div
        className={`h-4 ${cls}`}
        style={{ background: "var(--color-primary-foreground)", borderRadius: 2 }}
      />
    </div>
  );
}

const meta = {
  title: "Foundations/Spacing",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      {spacingTokens.map((t) => (
        <SpacingRow key={t.name} {...t} />
      ))}
    </div>
  ),
};
