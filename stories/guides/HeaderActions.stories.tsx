import { CaretDownIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/registry/default/ui/button/button";
import { IconButton } from "@/registry/default/ui/icon-button/icon-button";
import { Separator } from "@/registry/default/ui/separator/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/registry/default/ui/dropdown-menu/dropdown-menu";

const meta = {
  title: "Guides/Header Actions",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 44,
        padding: "0 24px",
        borderBottom: "1px solid var(--color-border-200)",
        background: "var(--background)",
      }}
    >
      <span className="typo-heading-4">Label</span>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="small">
              Mais ações <CaretDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Duplicar</DropdownMenuItem>
            <DropdownMenuItem>Arquivar</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" style={{ height: 20 }} />

        <div style={{ display: "inline-flex" }}>
          <Button
            variant="outline"
            size="small"
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            Exportar
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton
                variant="outline"
                size="small"
                aria-label="Mais opções de exportar"
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderLeft: "1px solid var(--button-border)",
                }}
              >
                <CaretDownIcon />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Exportar como PDF</DropdownMenuItem>
              <DropdownMenuItem>Exportar como CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator orientation="vertical" style={{ height: 20 }} />

        <Button variant="outline" size="small">
          Cancelar
        </Button>
        <Button variant="primary" size="small">
          Salvar
        </Button>
      </div>
    </div>
  ),
};
