import { CheckIcon, ColumnsIcon, FunnelIcon } from "@phosphor-icons/react";
import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/registry/default/ui/button/button";
import { IconButton } from "@/registry/default/ui/icon-button/icon-button";
import { Input } from "@/registry/default/ui/input/input";
import { Badge } from "@/registry/default/ui/badge/badge";
import { Checkbox } from "@/registry/default/ui/checkbox/checkbox";
import { Label } from "@/registry/default/ui/label/label";
import { Separator } from "@/registry/default/ui/separator/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/default/ui/select/select";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/registry/default/ui/command/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/registry/default/ui/popover/popover";

const meta = {
  title: "Guides/Header Filters",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const availableColumns = [
  "ID produto",
  "Código",
  "Nome derivação",
  "EAN",
  "Modelo",
  "ID pai",
  "NCM",
  "CEST",
  "Data lançamento",
];

const categories = ["Eletrônicos", "Vestuário", "Casa e decoração", "Esporte", "Beleza"];

function ColumnsPopover() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton variant="outline" aria-label="Colunas visíveis">
          <ColumnsIcon />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent style={{ width: 240, padding: 0 }} align="end">
        <div style={{ padding: "12px 16px 4px", fontSize: 13, color: "var(--muted-foreground)" }}>
          Adicionar colunas
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "4px 16px", maxHeight: 220, overflowY: "auto" }}>
          {availableColumns.map((column) => (
            <div key={column} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Checkbox
                id={`col-${column}`}
                checked={selected.includes(column)}
                onCheckedChange={(checked) =>
                  setSelected((prev) =>
                    checked ? [...prev, column] : prev.filter((c) => c !== column),
                  )
                }
              />
              <Label htmlFor={`col-${column}`}>{column}</Label>
            </div>
          ))}
        </div>
        <div style={{ padding: 12 }}>
          <Button variant="primary" style={{ width: "100%" }}>
            Aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function CategoryCombobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="small" style={{ width: 180, justifyContent: "space-between" }}>
          {value ?? "Categoria"}
        </Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: 180, padding: 0 }} align="start">
        <Command>
          <CommandInput placeholder="Buscar categoria..." />
          <CommandList>
            <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category}
                  onSelect={() => {
                    setValue(category);
                    setOpen(false);
                  }}
                >
                  {value === category && <CheckIcon />}
                  {category}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function FilterIconButtons() {
  return (
    <>
      <ColumnsPopover />
      <div style={{ position: "relative" }}>
        <IconButton variant="outline" aria-label="Filtros">
          <FunnelIcon />
        </IconButton>
        <Badge
          variant="primary"
          roundness="full"
          className="bg-primary-background text-primary-foreground"
          style={{
            position: "absolute",
            top: -6,
            right: -6,
            minWidth: 18,
            height: 18,
            padding: 0,
            fontSize: 10,
          }}
        >
          3
        </Badge>
      </div>
    </>
  );
}

function FiltersRow({ children }: { children: ReactNode }) {
  return (
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
      {children}
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <FiltersRow>
      <Input size="regular" placeholder="Campo de busca" style={{ width: 320 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <FilterIconButtons />
      </div>
    </FiltersRow>
  ),
};

export const WithSearchTypeSelect: Story = {
  render: () => (
    <FiltersRow>
      <div style={{ display: "inline-flex" }}>
        <Select defaultValue="produto">
          <SelectTrigger
            style={{
              width: 140,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderRight: "none",
            }}
          >
            <SelectValue placeholder="Buscar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="produto">Produto</SelectItem>
            <SelectItem value="codigo">Código</SelectItem>
            <SelectItem value="ean">EAN</SelectItem>
          </SelectContent>
        </Select>
        <Input
          size="regular"
          placeholder="Campo de busca"
          style={{
            width: 240,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <FilterIconButtons />
      </div>
    </FiltersRow>
  ),
};

export const WithFilterControls: Story = {
  render: () => (
    <FiltersRow>
      <Input size="regular" placeholder="Campo de busca" style={{ width: 280 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Select defaultValue="todos">
          <SelectTrigger style={{ width: 140 }}>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
        <CategoryCombobox />

        <Separator orientation="vertical" style={{ height: 20 }} />

        <FilterIconButtons />
      </div>
    </FiltersRow>
  ),
};
