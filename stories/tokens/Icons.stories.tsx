import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundations/Icons",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <p style={{ fontSize: 13, color: "var(--color-muted-text)", marginBottom: 16 }}>
        hubble-ds uses <strong>Phosphor Icons</strong> (<code>@phosphor-icons/react</code>,
        declared as the DS&apos;s <code>iconLibrary</code> in <code>components.json</code>) — over
        1,500 icons, each available in multiple weights (regular, bold, fill, duotone, thin,
        light).
      </p>

      <a
        href="https://phosphoricons.com"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          borderRadius: 8,
          background: "var(--primary)",
          color: "var(--button-text-primary)",
          fontSize: 14,
          fontWeight: 500,
          textDecoration: "none",
        }}
      >
        Browse Phosphor Icons →
      </a>
      <p style={{ fontSize: 12, color: "var(--color-muted-text)", marginTop: 24 }}>
        Usage: <code>import {"{"} XIcon {"}"} from &quot;@phosphor-icons/react&quot;</code> —
        components in this DS import the named icon directly (e.g. <code>CheckIcon</code>,{" "}
        <code>CaretDownIcon</code>), as seen throughout Dialog, DropdownMenu, ContextMenu, and
        others.
      </p>
    </div>
  ),
};
