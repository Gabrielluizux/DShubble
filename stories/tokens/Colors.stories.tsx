import type { Meta, StoryObj } from "@storybook/react-vite";

type ColorToken = { name: string; hasDark: boolean };

function Swatch({ name }: { name: string }) {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 8,
        border: "1px solid var(--color-border-200)",
        background: `var(--${name})`,
      }}
    />
  );
}

function TokenRow({ token }: { token: ColorToken }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "8px 0",
        borderBottom: "1px solid var(--color-border-100)",
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <Swatch name={token.name} />
        {token.hasDark && (
          <div className="dark" style={{ display: "inline-flex" }}>
            <Swatch name={token.name} />
          </div>
        )}
      </div>
      <div>
        <code style={{ fontSize: 13 }}>--color-{token.name}</code>
        {token.hasDark && (
          <div style={{ fontSize: 11, color: "var(--color-muted-text)" }}>
            light · dark
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, tokens }: { title: string; tokens: ColorToken[] }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      {tokens.map((t) => (
        <TokenRow key={t.name} token={t} />
      ))}
    </div>
  );
}

const groups: { title: string; tokens: ColorToken[] }[] = [
  {
    title: "Brand / Primary",
    tokens: [
      { name: "primary", hasDark: true },
      { name: "primary-foreground", hasDark: true },
      { name: "primary-hover", hasDark: true },
      { name: "primary-accent", hasDark: true },
      { name: "primary-accent-2", hasDark: true },
      { name: "ring", hasDark: true },
      { name: "text-active", hasDark: false },
    ],
  },
  {
    title: "Secondary / Neutral",
    tokens: [
      { name: "secondary", hasDark: true },
      { name: "secondary-hover", hasDark: true },
      { name: "accent", hasDark: true },
      { name: "accent-0", hasDark: true },
      { name: "accent-2", hasDark: true },
      { name: "accent-3", hasDark: true },
      { name: "muted", hasDark: true },
      { name: "muted-foreground", hasDark: true },
      { name: "muted-text", hasDark: false },
      { name: "outline", hasDark: true },
      { name: "outline-active", hasDark: true },
      { name: "outline-hover", hasDark: true },
      { name: "ghost-hover", hasDark: true },
      { name: "foreground", hasDark: true },
      { name: "background", hasDark: true },
      { name: "text", hasDark: false },
      { name: "text-negative", hasDark: false },
    ],
  },
  {
    title: "Destructive",
    tokens: [
      { name: "destructive", hasDark: true },
      { name: "destructive-background", hasDark: true },
      { name: "destructive-foreground", hasDark: true },
      { name: "destructive-hover", hasDark: true },
      { name: "destructive-text", hasDark: false },
      { name: "border-destructive", hasDark: true },
      { name: "ring-error", hasDark: true },
    ],
  },
  {
    title: "Borders",
    tokens: [
      { name: "border", hasDark: true },
      { name: "border-100", hasDark: true },
      { name: "border-200", hasDark: true },
      { name: "border-300", hasDark: true },
      { name: "card-border", hasDark: false },
      { name: "input-border", hasDark: false },
      { name: "button-border", hasDark: false },
    ],
  },
  {
    title: "Surfaces",
    tokens: [
      { name: "card", hasDark: false },
      { name: "popover", hasDark: false },
      { name: "popover-foreground", hasDark: false },
      { name: "input", hasDark: false },
      { name: "input-disabled", hasDark: false },
      { name: "backdrop", hasDark: false },
      { name: "black-alpha-10", hasDark: false },
    ],
  },
  {
    title: "Button-specific",
    tokens: [
      { name: "button-bg-destructive", hasDark: false },
      { name: "button-bg-ghost", hasDark: false },
      { name: "button-bg-outline", hasDark: false },
      { name: "button-bg-secondary", hasDark: false },
      { name: "button-text-primary", hasDark: false },
      { name: "button-text-secondary", hasDark: false },
    ],
  },
];

const meta = {
  title: "Foundations/Colors/Semantic Tokens",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SemanticTokens: Story = {
  render: () => (
    <div>
      {groups.map((g) => (
        <Section key={g.title} title={g.title} tokens={g.tokens} />
      ))}
    </div>
  ),
};
