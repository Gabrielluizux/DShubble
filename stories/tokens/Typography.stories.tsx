import type { Meta, StoryObj } from "@storybook/react-vite";

const SAMPLE = "The quick brown fox jumps over the lazy dog";

const fontFamilies = [
  { cls: "font-sans", label: "font-sans — Roboto Variable" },
  { cls: "font-mono", label: "font-mono — Roboto Mono Variable" },
];

const fontWeights = [
  { cls: "font-normal", label: "font-normal — 400" },
  { cls: "font-medium", label: "font-medium — 500" },
  { cls: "font-semibold", label: "font-semibold — 600" },
  { cls: "font-bold", label: "font-bold — 700" },
];

const typoStyles = [
  { name: "typo-heading-1", label: "Heading 1 — 56px / tracking -1.5px" },
  { name: "typo-heading-2", label: "Heading 2 — 40px / tracking -0.8px" },
  { name: "typo-heading-3", label: "Heading 3 — 32px / tracking -0.4px" },
  { name: "typo-heading-4", label: "Heading 4 — 24px" },
  { name: "typo-heading-5", label: "Heading 5 — 20px" },
  { name: "typo-body-bold", label: "Body Bold — 16px" },
  { name: "typo-paragraph", label: "Paragraph — 16px" },
  { name: "typo-caption", label: "Caption — 12px" },
];

function Row({ cls, label, fontSize }: { cls: string; label: string; fontSize?: number }) {
  return (
    <div
      style={{
        padding: "16px 0",
        borderBottom: "1px solid var(--color-border-100)",
      }}
    >
      <div style={{ fontSize: 11, color: "var(--color-muted-text)", marginBottom: 4 }}>
        {label}
      </div>
      <div className={cls} style={fontSize ? { fontSize } : undefined}>
        {SAMPLE}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      {children}
    </div>
  );
}

const meta = {
  title: "Foundations/Typography",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div>
      <Section title="Font Family">
        {fontFamilies.map((f) => (
          <Row key={f.cls} cls={f.cls} label={f.label} fontSize={20} />
        ))}
      </Section>
      <Section title="Font Weight">
        {fontWeights.map((f) => (
          <Row key={f.cls} cls={f.cls} label={f.label} fontSize={20} />
        ))}
      </Section>
      <Section title="Type Scale">
        {typoStyles.map((t) => (
          <Row key={t.name} cls={t.name} label={t.label} />
        ))}
      </Section>
    </div>
  ),
};
