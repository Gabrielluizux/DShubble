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

// ─── Dados de exemplo ─────────────────────────────────────────────────────────
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

// ─── Componentes funcionais ───────────────────────────────────────────────────
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
        <div style={{ padding: "calc(var(--spacing) * 3) calc(var(--spacing) * 4) var(--spacing)", fontSize: 13, color: "var(--muted-foreground)" }}>
          Adicionar colunas
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "calc(var(--spacing) * 2)",
            padding: "var(--spacing) calc(var(--spacing) * 4)",
            maxHeight: 220,
            overflowY: "auto",
          }}
        >
          {availableColumns.map((column) => (
            <div key={column} style={{ display: "flex", alignItems: "center", gap: "calc(var(--spacing) * 2)" }}>
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
        <div style={{ padding: "calc(var(--spacing) * 3)" }}>
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
        <Button
          variant="outline"
          size="small"
          style={{ width: 180, justifyContent: "space-between" }}
        >
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
        <IconButton variant="outline" aria-label="Filtros avançados">
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
        minHeight: "calc(var(--spacing) * 11)",
        padding: "0 calc(var(--spacing) * 6)",
        borderBottom: "1px solid var(--color-border-200)",
        background: "var(--background)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Bloco de documentação ────────────────────────────────────────────────────
function DocBlock({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        padding: "calc(var(--spacing) * 5) calc(var(--spacing) * 6)",
        background: "var(--color-secondary-50)",
        borderBottom: "1px solid var(--color-border-200)",
        fontSize: 13,
        color: "var(--text)",
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
}

function Rule({
  label,
  color,
  children,
}: {
  label: string;
  color: string;
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: "calc(var(--spacing) * 2)", alignItems: "flex-start", marginBottom: "calc(var(--spacing) * 2)" }}>
      <span
        style={{
          flexShrink: 0,
          marginTop: 2,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.04em",
          color,
        }}
      >
        {label}
      </span>
      <span style={{ color: "var(--text)" }}>{children}</span>
    </div>
  );
}

function Verdict({
  type,
  reason,
  children,
}: {
  type: "do" | "dont";
  reason: string;
  children: ReactNode;
}) {
  const isDo = type === "do";
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "calc(var(--spacing) * 2)",
          marginBottom: "calc(var(--spacing) * 2)",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.05em",
          color: isDo ? "var(--sucesso-600)" : "var(--perigo-600)",
        }}
      >
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: isDo ? "var(--sucesso-600)" : "var(--perigo-600)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            lineHeight: 1,
          }}
        >
          {isDo ? "✓" : "✕"}
        </span>
        {isDo ? "FAÇA" : "EVITE"}
      </div>
      <div
        style={{
          border: `2px solid ${isDo ? "var(--sucesso-600)" : "var(--perigo-600)"}`,
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          opacity: isDo ? 1 : 0.85,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "calc(var(--spacing) * 12)",
            padding: "0 calc(var(--spacing) * 4)",
            background: "var(--background)",
          }}
        >
          {children}
        </div>
      </div>
      <p style={{ marginTop: "calc(var(--spacing) * 2)", fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>
        {reason}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. ANATOMIA
// ═══════════════════════════════════════════════════════════════════════════
export const Anatomy: Story = {
  name: "Anatomia",
  render: () => (
    <div>
      <DocBlock>
        <p style={{ marginBottom: "calc(var(--spacing) * 3)", fontWeight: 600, fontSize: 14 }}>Header de Filtros</p>
        <p style={{ marginBottom: 10 }}>
          Funciona em um sistema de <strong>dois slots</strong>: à esquerda fica sempre um campo de
          entrada que o usuário preenche para retornar resultados (busca); à direita ficam os
          controles de filtragem complementar — selects para critérios mais complexos e, quando o
          contexto for uma tabela, dois icon buttons fixos e obrigatórios.
        </p>
        <p>
          O header de filtros é sempre posicionado abaixo do Header de Ações e acima do conteúdo
          principal (tabela, grid ou lista).
        </p>
      </DocBlock>

      <div style={{ padding: "calc(var(--spacing) * 6)", background: "var(--background)" }}>
        {/* Diagrama anotado */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "calc(var(--spacing) * 12)",
            padding: "0 calc(var(--spacing) * 6)",
            border: "1px dashed var(--color-border-200)",
            borderRadius: "var(--radius-md)",
            background: "var(--background)",
          }}
        >
          <div
            style={{
              width: 260,
              height: 34,
              borderRadius: "var(--radius-md)",
              border: "1.5px dashed var(--primary)",
              display: "flex",
              alignItems: "center",
              paddingLeft: "calc(var(--spacing) * 3)",
              fontSize: 12,
              color: "var(--primary)",
              fontWeight: 600,
            }}
          >
            Slot esquerdo — campo de entrada
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "calc(var(--spacing) * 2)" }}>
            <div
              style={{
                display: "flex",
                gap: "calc(var(--spacing) * 2)",
                alignItems: "center",
                padding: "var(--spacing) calc(var(--spacing) * 2)",
                borderRadius: "var(--radius-md)",
                border: "1.5px dashed var(--muted-text)",
                fontSize: 12,
                color: "var(--muted-text)",
                fontWeight: 600,
              }}
            >
              Selects (opcional)
            </div>
            <Separator orientation="vertical" style={{ height: 20 }} />
            <div
              style={{
                display: "flex",
                gap: "calc(var(--spacing) * 2)",
                alignItems: "center",
                padding: "var(--spacing) calc(var(--spacing) * 2)",
                borderRadius: "var(--radius-md)",
                border: "1.5px dashed var(--primary)",
                fontSize: 12,
                color: "var(--primary)",
                fontWeight: 600,
              }}
            >
              <ColumnsIcon size={14} /> <FunnelIcon size={14} /> Icon buttons (tabela — fixos)
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "calc(var(--spacing) * 2) calc(var(--spacing) * 6) 0",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: "var(--muted-text)",
          }}
        >
          <span>↑ SLOT ESQUERDO — entrada do usuário</span>
          <span>SLOT DIREITO — controles de filtro ↑</span>
        </div>

        {/* Descrição dos slots */}
        <div style={{ marginTop: "calc(var(--spacing) * 5)", display: "flex", gap: "calc(var(--spacing) * 6)", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontSize: 12, fontWeight: 600, marginBottom: "var(--spacing)" }}>Slot esquerdo</p>
            <p style={{ fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>
              Sempre um campo de entrada ativo: <code>Input</code> de busca simples ou{" "}
              <code>Select + Input</code> para busca com tipo alternável. O padrão deve exigir
              o menor esforço cognitivo possível — no catálogo de produtos, por exemplo, o
              padrão é busca por nome.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontSize: 12, fontWeight: 600, marginBottom: "var(--spacing)" }}>Slot direito</p>
            <p style={{ fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>
              Selects de filtros contextuais expostos na primeira camada (recomendado: até 3).
              Em contextos de tabela, dois icon buttons são obrigatórios: um para gerenciar
              colunas visíveis (<ColumnsIcon size={12} style={{ display: "inline" }} />) e
              outro para filtros booleanos ou menos relevantes (
              <FunnelIcon size={12} style={{ display: "inline" }} />
              ). O badge no funil indica quantos filtros avançados estão ativos.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════
// 2. BUSCA SIMPLES (contexto de tabela)
// ═══════════════════════════════════════════════════════════════════════════
export const BuscaSimples: Story = {
  name: "Busca Simples",
  render: () => (
    <div>
      <DocBlock>
        <Rule label="QUANDO" color="var(--primary)">
          Os filtros relevantes do módulo são poucos ou já estão resolvidos pelos icon buttons de
          colunas e funil. Nenhum select precisa aparecer na primeira camada.
        </Rule>
        <Rule label="TABELA" color="var(--alerta-600)">
          Sempre que o ambiente de uso for uma tabela, os dois icon buttons são{" "}
          <strong>fixos e obrigatórios</strong>: <ColumnsIcon size={12} style={{ display: "inline" }} />{" "}
          para gerenciar as colunas exibidas e <FunnelIcon size={12} style={{ display: "inline" }} />{" "}
          para filtros booleanos ou menos relevantes que não justificam um select exposto. O badge
          no funil deve refletir o número de filtros ativos naquele painel.
        </Rule>
        <Rule label="PADRÃO DE BUSCA" color="var(--primary)">
          O campo de busca sem select deve buscar pelo critério que exige o menor esforço cognitivo
          do usuário — geralmente o identificador mais natural do item (nome de produto, razão
          social, número do pedido).
        </Rule>
      </DocBlock>

      <FiltersRow>
        <Input size="regular" placeholder="Buscar produto..." style={{ width: 320 }} />
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing)" }}>
          <FilterIconButtons />
        </div>
      </FiltersRow>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════
// 3. BUSCA COM TIPO ALTERNÁVEL
// ═══════════════════════════════════════════════════════════════════════════
export const BuscaComTipo: Story = {
  name: "Busca com Tipo",
  render: () => (
    <div>
      <DocBlock>
        <Rule label="QUANDO" color="var(--primary)">
          O módulo admite múltiplos critérios de busca relevantes — como buscar por nome, código ou
          EAN no catálogo de produtos. O usuário pode precisar alternar o tipo sem sair da tela.
        </Rule>
        <Rule label="PADRÃO" color="var(--primary)">
          O select de tipo deve ter como valor padrão o critério mais intuitivo para o contexto.
          No catálogo de produtos, o padrão é <em>Produto</em> (busca por nome), não <em>EAN</em>{" "}
          ou <em>Código</em> — que exigem que o usuário consulte outra fonte antes de digitar.
          Reserve os tipos alternativos para usuários avançados que já sabem o identificador exato.
        </Rule>
        <Rule label="COMPOSIÇÃO" color="var(--primary)">
          Use o padrão de split input: o <code>Select</code> à esquerda sem borda direita e o{" "}
          <code>Input</code> à direita sem borda e raio esquerdo — formando visualmente um único
          campo de entrada composto.
        </Rule>
      </DocBlock>

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
            placeholder="Buscar..."
            style={{
              width: 240,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing)" }}>
          <FilterIconButtons />
        </div>
      </FiltersRow>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════
// 4. COM FILTROS NA PRIMEIRA CAMADA
// ═══════════════════════════════════════════════════════════════════════════
export const ComFiltros: Story = {
  name: "Com Filtros",
  render: () => (
    <div>
      <DocBlock>
        <Rule label="QUANDO" color="var(--primary)">
          O módulo possui filtros frequentemente utilizados que justificam visibilidade imediata
          — sem precisar abrir o painel de filtros avançados. Esses selects são os que reduzem
          mais tempo de busca para o perfil principal do usuário do módulo.
        </Rule>
        <Rule label="RECOMENDAÇÃO" color="var(--primary)">
          Exponha na primeira camada somente os <strong>filtros mais usados</strong> do módulo
          (recomendado: até 3 selects). Para descobrir quais são, analise os eventos de filtro
          no Amplitude ou consulte pesquisas de uso com o time. Filtros com baixa frequência de
          uso devem ir para o painel de filtros avançados (funil).
        </Rule>
        <Rule label="COMBOBOX" color="var(--primary)">
          Use <code>Command + Popover</code> (combobox) quando a lista do filtro tiver{" "}
          <strong>10 ou mais itens</strong> e o usuário precisar pesquisar dentro dela — como
          categorias, estados ou fornecedores. Para listas curtas e estáticas (3–8 itens), prefira
          o <code>Select</code> simples.
        </Rule>
        <Rule label="SEPARADOR" color="var(--primary)">
          Use um <code>Separator</code> vertical para separar visualmente os selects de filtro
          dos icon buttons obrigatórios ao final da zona direita.
        </Rule>
      </DocBlock>

      <FiltersRow>
        <Input size="regular" placeholder="Buscar produto..." style={{ width: 280 }} />
        <div style={{ display: "flex", alignItems: "center", gap: "calc(var(--spacing) * 2)" }}>
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
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════
// 5. FAÇA E EVITE
// ═══════════════════════════════════════════════════════════════════════════
export const DoAndDonts: Story = {
  name: "Faça e Evite",
  render: () => (
    <div style={{ padding: "calc(var(--spacing) * 6)", background: "var(--background)", display: "flex", flexDirection: "column", gap: "calc(var(--spacing) * 8)" }}>

      {/* Regra 1 */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: "var(--spacing)", color: "var(--text)" }}>
          1. Defina o padrão de busca pelo menor esforço cognitivo
        </p>
        <p style={{ fontSize: 12, color: "var(--muted-text)", marginBottom: "calc(var(--spacing) * 4)", lineHeight: 1.5 }}>
          O valor padrão do tipo de busca deve ser aquele que o usuário já sabe de cabeça, sem
          precisar consultar outra tela. Forçar o usuário a buscar por um código técnico como
          padrão aumenta o atrito desnecessariamente.
        </p>
        <div style={{ display: "flex", gap: "calc(var(--spacing) * 6)", flexWrap: "wrap" }}>
          <Verdict
            type="do"
            reason='Padrão "Produto" (nome) exige zero consulta prévia. O usuário já sabe o que quer digitar.'
          >
            <div style={{ display: "inline-flex" }}>
              <Select defaultValue="produto">
                <SelectTrigger style={{ width: 130, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: "none" }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="produto">Produto</SelectItem>
                  <SelectItem value="ean">EAN</SelectItem>
                  <SelectItem value="codigo">Código</SelectItem>
                </SelectContent>
              </Select>
              <Input size="regular" placeholder="Buscar..." style={{ width: 180, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} />
            </div>
          </Verdict>
          <Verdict
            type="dont"
            reason='Padrão "EAN" força o usuário a ter em mãos um código técnico. Eleva o atrito sem motivo para a maioria dos casos de uso.'
          >
            <div style={{ display: "inline-flex" }}>
              <Select defaultValue="ean">
                <SelectTrigger style={{ width: 130, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: "none" }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ean">EAN</SelectItem>
                  <SelectItem value="produto">Produto</SelectItem>
                  <SelectItem value="codigo">Código</SelectItem>
                </SelectContent>
              </Select>
              <Input size="regular" placeholder="Buscar..." style={{ width: 180, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} />
            </div>
          </Verdict>
        </div>
      </div>

      {/* Regra 2 */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: "var(--spacing)", color: "var(--text)" }}>
          2. Exponha apenas os filtros mais usados na primeira camada
        </p>
        <p style={{ fontSize: 12, color: "var(--muted-text)", marginBottom: "calc(var(--spacing) * 4)", lineHeight: 1.5 }}>
          Filtros que aparecem com baixa frequência de uso ocupam espaço e desviam atenção dos que
          realmente importam. Use dados do Amplitude para decidir o que fica exposto e o que vai
          para o painel de filtros avançados.
        </p>
        <div style={{ display: "flex", gap: "calc(var(--spacing) * 6)", flexWrap: "wrap" }}>
          <Verdict
            type="do"
            reason="Dois selects expostos — os mais usados do módulo. O restante fica acessível no painel de filtros avançados (funil)."
          >
            <Input size="regular" placeholder="Buscar produto..." style={{ width: 200 }} />
            <div style={{ display: "flex", alignItems: "center", gap: "calc(var(--spacing) * 2)" }}>
              <Select defaultValue="todos">
                <SelectTrigger style={{ width: 120 }}>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
              <Separator orientation="vertical" style={{ height: 20 }} />
              <FilterIconButtons />
            </div>
          </Verdict>
          <Verdict
            type="dont"
            reason="Cinco selects expostos simultaneamente. O usuário precisa ler todos antes de decidir qual usar — sobrecarga cognitiva."
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <Input size="regular" placeholder="Buscar..." style={{ width: 140 }} />
              {["Status", "Categoria", "Estoque", "Fornecedor", "Canal"].map((f) => (
                <Select key={f}>
                  <SelectTrigger style={{ width: 110 }}>
                    <SelectValue placeholder={f} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Opção 1</SelectItem>
                  </SelectContent>
                </Select>
              ))}
            </div>
          </Verdict>
        </div>
      </div>

      {/* Regra 3 */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: "var(--spacing)", color: "var(--text)" }}>
          3. Em tabelas, os dois icon buttons são sempre obrigatórios
        </p>
        <p style={{ fontSize: 12, color: "var(--muted-text)", marginBottom: "calc(var(--spacing) * 4)", lineHeight: 1.5 }}>
          O icon button de colunas dá ao usuário controle sobre o que está sendo exibido. O funil
          centraliza filtros booleanos e menos frequentes sem poluir a barra principal. Ambos
          sempre aparecem juntos, separados dos selects por um Separator.
        </p>
        <div style={{ display: "flex", gap: "calc(var(--spacing) * 6)", flexWrap: "wrap" }}>
          <Verdict
            type="do"
            reason="Icon buttons presentes e separados dos filtros. O badge indica 3 filtros ativos no painel avançado."
          >
            <Input size="regular" placeholder="Buscar produto..." style={{ width: 220 }} />
            <div style={{ display: "flex", alignItems: "center", gap: "calc(var(--spacing) * 2)" }}>
              <Select defaultValue="ativo">
                <SelectTrigger style={{ width: 120 }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
              <Separator orientation="vertical" style={{ height: 20 }} />
              <FilterIconButtons />
            </div>
          </Verdict>
          <Verdict
            type="dont"
            reason="Sem icon buttons, o usuário não tem como gerenciar colunas ou acessar filtros booleanos — funcionalidade crítica ausente."
          >
            <Input size="regular" placeholder="Buscar produto..." style={{ width: 220 }} />
            <div style={{ display: "flex", alignItems: "center", gap: "calc(var(--spacing) * 2)" }}>
              <Select defaultValue="ativo">
                <SelectTrigger style={{ width: 120 }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Verdict>
        </div>
      </div>

      {/* Checklist */}
      <div
        style={{
          padding: "calc(var(--spacing) * 4)",
          borderRadius: "var(--radius-md)",
          background: "var(--color-secondary-50)",
          border: "1px solid var(--color-border-200)",
          fontSize: 12,
          lineHeight: 1.8,
          color: "var(--text)",
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: "calc(var(--spacing) * 2)" }}>Checklist de decisão para PMs e Devs</p>
        <p>① O usuário busca pelo critério mais natural do módulo por padrão? → Slot esquerdo correto</p>
        <p>② Os selects expostos são os mais usados segundo dados de analytics? → Primeira camada justificada</p>
        <p>③ A lista do filtro tem 10+ itens e precisa de busca? → Use Combobox (Command + Popover)</p>
        <p>④ O contexto é uma tabela? → Os dois icon buttons (colunas + funil) são obrigatórios</p>
        <p>⑤ Há mais de 3 selects expostos? → Mova os menos usados para o painel de filtros avançados</p>
      </div>
    </div>
  ),
};
