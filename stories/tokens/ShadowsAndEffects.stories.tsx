import type { Meta, StoryObj } from "@storybook/react-vite";

const shadows = [
  { cls: "shadow-2xs", label: "shadow-2xs" },
  { cls: "shadow-xs", label: "shadow-xs" },
  { cls: "shadow-sm", label: "shadow-sm" },
  { cls: "shadow-md", label: "shadow-md" },
  { cls: "shadow-lg", label: "shadow-lg" },
  { cls: "shadow-xl", label: "shadow-xl" },
  { cls: "shadow-2xl", label: "shadow-2xl" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      {children}
    </div>
  );
}

const meta = {
  title: "Foundations/Shadows & Effects",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <Section title="Shadows">
        <p style={{ fontSize: 13, color: "var(--color-muted-text)", marginBottom: 16, maxWidth: 640 }}>
          7-step scale (<code>shadow-2xs</code> → <code>shadow-2xl</code>), all built from{" "}
          <code>black-alpha-*</code> tokens. Actively used across Popover, Select, Dropdown
          Menu, Context Menu, Toast, and 13 other components.
        </p>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {shadows.map((s) => (
            <div key={s.cls} style={{ textAlign: "center" }}>
              <div
                className={s.cls}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 8,
                  background: "var(--card)",
                }}
              />
              <div style={{ fontSize: 11, marginTop: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Blur">
        <p style={{ fontSize: 13, color: "var(--color-muted-text)", marginBottom: 16, maxWidth: 640 }}>
          hubble-ds resets Tailwind&apos;s entire default blur scale and replaces it with only
          two levels — <code>blur-light</code> (4px) and <code>blur-full</code> (12px). There is
          no <code>blur-sm</code>/<code>blur-xl</code>/etc.
        </p>
        <div style={{ display: "flex", gap: 32, marginBottom: 24 }}>
          {["blur-light", "blur-full"].map((cls) => (
            <div key={cls} style={{ textAlign: "center" }}>
              <div
                className={cls}
                style={{
                  width: 96,
                  height: 72,
                  borderRadius: 8,
                  background:
                    "linear-gradient(135deg, var(--primary-foreground), var(--perigo-500), var(--sucesso-500))",
                }}
              />
              <div style={{ fontSize: 11, marginTop: 8 }}>{cls}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "var(--color-muted-text)", marginBottom: 8 }}>
          The same two levels also generate <code>backdrop-blur-light</code> /{" "}
          <code>backdrop-blur-full</code> (blurring what&apos;s behind an element, not the
          element itself) — this is what Dialog/AlertDialog use for their modal scrim:
        </p>
        <div
          style={{
            position: "relative",
            width: 240,
            height: 120,
            borderRadius: 8,
            overflow: "hidden",
            background:
              "linear-gradient(135deg, var(--primary-foreground), var(--perigo-500), var(--sucesso-500))",
          }}
        >
          <div
            className="backdrop-blur-light"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--backdrop)",
              fontSize: 11,
              color: "white",
            }}
          >
            backdrop-blur-light + bg-backdrop
          </div>
        </div>
      </Section>

      <Section title="Overlay / Backdrop">
        <p style={{ fontSize: 13, color: "var(--color-muted-text)", marginBottom: 16, maxWidth: 640 }}>
          A single semantic color token, <code>backdrop</code> (<code>black-alpha-30</code>),
          identical in light and dark mode. Used as the modal scrim in Dialog and AlertDialog.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 8,
              border: "1px solid var(--color-border-100)",
              background: "var(--backdrop)",
            }}
          />
          <code style={{ fontSize: 13 }}>bg-backdrop</code>
        </div>
      </Section>
    </div>
  ),
};
