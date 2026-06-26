import type { Meta, StoryObj } from "@storybook/react-vite";

const steps = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

const families: { name: string; hint: string }[] = [
  { name: "hubble", hint: "Brand" },
  { name: "primaria", hint: "Primary" },
  { name: "secundaria", hint: "Secondary / Neutral" },
  { name: "sucesso", hint: "Success" },
  { name: "alerta", hint: "Warning" },
  { name: "perigo", hint: "Danger" },
];

function PaletteRow({ name, hint }: { name: string; hint: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
        {name}{" "}
        <span style={{ color: "var(--color-muted-text)", fontWeight: 400 }}>
          ({hint})
        </span>
      </div>
      <div style={{ display: "flex" }}>
        {steps.map((step) => (
          <div key={step} style={{ textAlign: "center" }}>
            <div
              style={{
                width: 56,
                height: 56,
                background: `var(--${name}-${step})`,
                border: "1px solid var(--color-border-100)",
              }}
            />
            <div style={{ fontSize: 10, marginTop: 4 }}>{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundations/Tailwind Colors",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PaletteScales: Story = {
  render: () => (
    <div>
      {families.map((f) => (
        <PaletteRow key={f.name} {...f} />
      ))}
    </div>
  ),
};
