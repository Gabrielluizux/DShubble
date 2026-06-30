import {
  BarcodeIcon,
  DotsThreeVerticalIcon,
  ImageIcon,
  MagnifyingGlassIcon,
  StorefrontIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/registry/default/ui/badge/badge";
import { Card, CardContent } from "@/registry/default/ui/card/card";
import {
  Counter,
  CounterInputControls,
  CounterInputDecrement,
  CounterInputField,
  CounterInputIncrement,
} from "@/registry/default/ui/counter/counter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu/dropdown-menu";
import { IconButton } from "@/registry/default/ui/icon-button/icon-button";
import { Input } from "@/registry/default/ui/input/input";
import { Separator } from "@/registry/default/ui/separator/separator";

const meta = {
  title: "Guides/Product Card",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Tokens de cor para badges do sistema ────────────────────────────────────
const systemBadgeColors: Record<string, { bg: string; text: string }> = {
  Brinde:        { bg: "var(--sucesso-100)",  text: "var(--sucesso-700)"  },
  Presente:      { bg: "var(--sucesso-100)",  text: "var(--sucesso-700)"  },
  Personalizado: { bg: "var(--primaria-100)", text: "var(--primaria-700)" },
  Desconto:      { bg: "var(--perigo-100)",   text: "var(--perigo-700)"   },
  Acréscimo:     { bg: "var(--alerta-100)",   text: "var(--alerta-700)"   },
};

// ─── Componentes internos compartilhados ─────────────────────────────────────
// Quadrado fixo (96px = spacing * 24). Tamanho definido reserva a largura de forma
// determinística — flexbox não consegue reservar espaço horizontal a partir de uma
// altura esticada, então o quadrado precisa de uma dimensão concreta para não colapsar.
function ProductImage({ empty = false }: { empty?: boolean }) {
  return (
    <div
      style={{
        width: "calc(var(--spacing) * 24)",
        height: "calc(var(--spacing) * 24)",
        flexShrink: 0,
        borderRadius: "var(--radius-md)",
        border: empty
          ? "1.5px dashed var(--color-border-200)"
          : "1px solid var(--color-border-200)",
        background: "var(--color-secondary-50)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--muted-text)",
      }}
    >
      <ImageIcon size={empty ? 24 : 28} />
    </div>
  );
}

function MetaBadges() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
      <Badge variant="secondary" style={{ gap: 4, overflow: "visible" }}>
        <span style={{ display: "inline-flex", alignItems: "center" }}><StorefrontIcon size={12} /></span>
        <span>Estoque padrão</span>
      </Badge>
      <Badge variant="secondary" style={{ gap: 4, overflow: "visible" }}>
        <span style={{ display: "inline-flex", alignItems: "center" }}><BarcodeIcon size={12} /></span>
        <span>REMT-9827</span>
      </Badge>
    </div>
  );
}

function SystemBadges({ tags }: { tags: string[] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
      {tags.map((tag) => {
        const c = systemBadgeColors[tag] ?? { bg: "var(--secundaria-100)", text: "var(--secundaria-700)" };
        return (
          <Badge key={tag} variant="secondary" style={{ background: c.bg, color: c.text, border: "none" }}>
            {tag}
          </Badge>
        );
      })}
    </div>
  );
}

function CardContextMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton variant="ghost" size="small" aria-label="Mais opções">
          <DotsThreeVerticalIcon />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Editar produto</DropdownMenuItem>
        <DropdownMenuItem>Duplicar linha</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Remover</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CounterControl({ defaultValue = 1 }: { defaultValue?: number }) {
  return (
    <Counter defaultValue={defaultValue} min={1} max={99}>
      <CounterInputControls>
        <CounterInputDecrement />
        <CounterInputField />
        <CounterInputIncrement />
      </CounterInputControls>
    </Counter>
  );
}

function DocBlock({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "20px 24px",
        background: "var(--color-secondary-50)",
        borderBottom: "1px solid var(--color-border-200)",
        fontSize: 13,
        color: "var(--text)",
        lineHeight: 1.6,
        marginBottom: 24,
        borderRadius: 8,
      }}
    >
      {children}
    </div>
  );
}

function Rule({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
      <span style={{ flexShrink: 0, marginTop: 2, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color }}>
        {label}
      </span>
      <span style={{ color: "var(--text)" }}>{children}</span>
    </div>
  );
}

// ─── Círculo numerado para o diagrama de anatomia ────────────────────────────
function ZoneCircle({ n }: { n: number }) {
  return (
    <span
      style={{
        flexShrink: 0,
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: "var(--primary)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {n}
    </span>
  );
}

function ZoneBlock({
  n,
  label,
  style,
}: {
  n: number;
  label: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "calc(var(--spacing) * 2)",
        padding: "calc(var(--spacing) * 2)",
        border: "1.5px dashed var(--color-border-200)",
        borderRadius: "var(--radius-md)",
        background: "var(--color-secondary-50)",
        fontSize: 11,
        fontWeight: 600,
        color: "var(--muted-text)",
        letterSpacing: "0.03em",
        ...style,
      }}
    >
      <ZoneCircle n={n} />
      {label}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. PADRÃO — card sem anotações ("em natura")
// ═══════════════════════════════════════════════════════════════════════════
export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <Card style={{ maxWidth: 860 }}>
      <CardContent style={{ display: "flex", gap: "calc(var(--spacing) * 4)", padding: "calc(var(--spacing) * 2)" }}>
        <ProductImage />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <MetaBadges />
              <Separator orientation="vertical" style={{ height: 20 }} />
              <SystemBadges tags={["Brinde", "Desconto"]} />
            </div>
            <CardContextMenu />
          </div>

          <span style={{ fontWeight: 600, fontSize: 14, color: "var(--text)" }}>
            Camiseta Básica Feminina Preta – Tamanho M{" "}
            <span style={{ color: "var(--perigo-600)", fontWeight: 400 }}>*</span>
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CounterControl defaultValue={2} />
            <Input size="small" defaultValue="R$89,90" style={{ width: 110 }} />
            <Separator orientation="vertical" style={{ height: 20 }} />
            <Badge variant="secondary">Frete grátis</Badge>
            <Badge variant="secondary">Parcelado</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════
// 2. ANATOMIA — diagrama de blocos
// ═══════════════════════════════════════════════════════════════════════════
export const Anatomy: Story = {
  name: "Anatomia",
  render: () => (
    <div>
      <DocBlock>
        <p style={{ marginBottom: 12, fontWeight: 600, fontSize: 14 }}>Product Card</p>
        <p style={{ marginBottom: 10 }}>
          Componente de linha utilizado em contextos de pedido e listagem de produtos. Organiza em
          layout horizontal as informações e ações relacionadas a um único item — desde a
          identificação visual até os controles operacionais.
        </p>
        <p>
          O card é dividido em <strong>5 zonas</strong>, cada uma com responsabilidade fixa.
          A zona 4 admite variação de composição conforme o estado do item (visualização vs.
          edição).
        </p>
      </DocBlock>

      {/* ── Diagrama de blocos ── */}
      <div
        style={{
          border: "1px solid var(--color-border-200)",
          borderRadius: 10,
          padding: 12,
          background: "var(--background)",
          display: "flex",
          gap: 8,
          marginBottom: 24,
        }}
      >
        {/* Zona 1: Imagem */}
        <ZoneBlock
          n={1}
          label="Imagem"
          style={{ width: 90, height: 80, flexDirection: "column", justifyContent: "center", flexShrink: 0 }}
        />

        {/* Zonas 2–5: conteúdo direito */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>

          {/* Linha superior: zona 2 + zona 3 + menu */}
          <div style={{ display: "flex", gap: 6, alignItems: "stretch" }}>
            <ZoneBlock n={2} label="Estoque / SKU" style={{ flex: "0 0 auto" }} />
            <ZoneBlock n={3} label="Badges do sistema" style={{ flex: 1 }} />
            <div
              style={{
                width: 32,
                border: "1.5px dashed var(--color-border-200)",
                borderRadius: 6,
                background: "var(--color-secondary-50)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--muted-text)",
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              ⋮
            </div>
          </div>

          {/* Zona 4: nome */}
          <ZoneBlock n={4} label="Nome do produto — label em visualização / Input em edição" style={{ width: "100%" }} />

          {/* Zona 5: área dinâmica */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              border: "1.5px dashed var(--color-border-200)",
              borderRadius: 6,
              background: "var(--color-secondary-50)",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--muted-text)",
            }}
          >
            <ZoneCircle n={5} />
            <span>Counter + Preço</span>
            <span style={{ color: "var(--color-border-200)", fontWeight: 400 }}>│</span>
            <span>Informações complementares (badges, progress, etc.)</span>
          </div>
        </div>
      </div>

      {/* ── Legenda ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {[
          {
            n: 1,
            title: "Imagem do produto",
            desc: "Espaço reservado para a imagem do item. Tamanho fixo (80×80). Nunca substituído por ícone genérico em produção.",
          },
          {
            n: 2,
            title: "Estoque e código",
            desc: "Sempre presente. Exibe o depósito de estoque vinculado e o código/SKU do produto.",
          },
          {
            n: 3,
            title: "Badges do sistema",
            desc: "Recebe apenas as badges aplicáveis ao item no contexto do pedido — Brinde, Desconto, Acréscimo, etc. A cor é definida pela regra de negócio de cada badge.",
          },
          {
            n: 4,
            title: "Nome do produto",
            desc: "Campo obrigatório (*). Em visualização exibe o nome como texto. Em rotinas de edição passa a ser um Input de busca para substituição do produto vinculado.",
          },
          {
            n: 5,
            title: "Área dinâmica",
            desc: "Conteúdo contextual: Counter de quantidade e valor unitário à esquerda do Separator; badges e informações complementares à direita. O Separator separa grupos não correlatos.",
          },
        ].map(({ n, title, desc }) => (
          <div key={n} style={{ display: "flex", gap: 8 }}>
            <ZoneCircle n={n} />
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{title}</p>
              <p style={{ fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════
// 3. PRODUTO SELECIONADO — modo visualização
// ═══════════════════════════════════════════════════════════════════════════
export const ProdutoSelecionado: Story = {
  name: "Produto Selecionado",
  render: () => (
    <div>
      <DocBlock>
        <Rule label="QUANDO" color="var(--primary)">
          O produto já está vinculado ao pedido. A zona 4 exibe o nome como label — o usuário lê
          mas não altera o vínculo por aqui neste estado.
        </Rule>
        <Rule label="ZONA DINÂMICA" color="var(--primary)">
          O Counter controla a quantidade e o valor unitário é exibido como campo editável.
          Um <code>Separator</code> vertical separa os controles operacionais (Counter + preço)
          das informações complementares do item (badges de condição, progresso, etc.).
        </Rule>
      </DocBlock>

      <Card style={{ maxWidth: 860 }}>
        <CardContent style={{ display: "flex", gap: "calc(var(--spacing) * 4)", padding: "calc(var(--spacing) * 2)" }}>
          <ProductImage />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <MetaBadges />
                <Separator orientation="vertical" style={{ height: 20 }} />
                <SystemBadges tags={["Brinde", "Desconto"]} />
              </div>
              <CardContextMenu />
            </div>

            <span style={{ fontWeight: 600, fontSize: 14, color: "var(--text)" }}>
              Camiseta Básica Feminina Preta – Tamanho M{" "}
              <span style={{ color: "var(--perigo-600)", fontWeight: 400 }}>*</span>
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CounterControl defaultValue={1} />
              <Input size="small" defaultValue="R$89,90" style={{ width: 110 }} />
              <Separator orientation="vertical" style={{ height: 20 }} />
              <Badge variant="secondary">Frete grátis</Badge>
              <Badge variant="secondary">Parcelado</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════
// 4. EM EDIÇÃO — zona 4 vira input de busca
// ═══════════════════════════════════════════════════════════════════════════
export const EmEdicao: Story = {
  name: "Em Edição",
  render: () => {
    const [query, setQuery] = useState("");

    return (
      <div>
        <DocBlock>
          <Rule label="QUANDO" color="var(--primary)">
            O usuário aciona a edição de uma linha do pedido para substituir o produto vinculado.
            A zona 4 alterna de label para um <code>Input</code> de busca — o usuário digita o
            nome do novo produto e o seleciona a partir dos resultados.
          </Rule>
          <Rule label="BUSCA" color="var(--primary)">
            O input de busca referencia sempre o <strong>nome do produto</strong>. Não há
            alternância de critério dentro do card — o campo é exclusivo para busca por nome.
          </Rule>
          <Rule label="ZONA DINÂMICA" color="var(--primary)">
            Os controles da zona dinâmica permanecem desabilitados enquanto nenhum produto estiver
            selecionado pelo input. Só reativam após a seleção ser confirmada.
          </Rule>
        </DocBlock>

        <Card style={{ maxWidth: 860 }}>
          <CardContent style={{ display: "flex", gap: "calc(var(--spacing) * 4)", padding: "calc(var(--spacing) * 2)" }}>
            {/* Imagem vazia enquanto produto não está confirmado */}
            <ProductImage empty />

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {/* Metadados desabilitados até produto ser selecionado */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.35 }}>
                <MetaBadges />
              </div>

              {/* Zona 4: input de busca */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
                  <MagnifyingGlassIcon
                    size={14}
                    style={{
                      position: "absolute",
                      left: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--muted-text)",
                    }}
                  />
                  <Input
                    size="regular"
                    placeholder="Buscar produto por nome..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ paddingLeft: 30 }}
                  />
                </div>
                <span style={{ fontSize: 12, color: "var(--perigo-600)" }}>*</span>
              </div>

              {/* Zona 5: área dinâmica desabilitada */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.35 }}>
                <Counter defaultValue={1} min={1} max={99} disabled>
                  <CounterInputControls>
                    <CounterInputDecrement />
                    <CounterInputField />
                    <CounterInputIncrement />
                  </CounterInputControls>
                </Counter>
                <Input size="small" disabled placeholder="R$0,00" style={{ width: 110 }} />
                <Separator orientation="vertical" style={{ height: 20 }} />
                <Badge variant="secondary">—</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// 5. FAÇA E EVITE
// ═══════════════════════════════════════════════════════════════════════════
export const DoAndDonts: Story = {
  name: "Faça e Evite",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

      <div>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: "var(--text)" }}>
          Desabilite a área dinâmica enquanto nenhum produto estiver selecionado no modo de edição
        </p>
        <p style={{ fontSize: 12, color: "var(--muted-text)", marginBottom: 16, lineHeight: 1.5 }}>
          Durante a edição de uma linha, enquanto o usuário ainda não confirmou o novo produto pelo
          input de busca, os controles de quantidade e valor não têm contexto válido. Mantê-los
          ativos gera risco de entrada de dados em estado inconsistente.
        </p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>

          {/* FAÇA */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, fontSize: 12, fontWeight: 700, color: "var(--sucesso-600)" }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--sucesso-600)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>✓</span>
              FAÇA
            </div>
            <div style={{ border: "2px solid var(--sucesso-600)", borderRadius: 8, overflow: "hidden" }}>
              <Card style={{ border: "none", borderRadius: 0 }}>
                <CardContent style={{ display: "flex", gap: "calc(var(--spacing) * 4)", padding: "calc(var(--spacing) * 2)" }}>
                  <ProductImage empty />
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: 8, opacity: 0.35 }}><MetaBadges /></div>
                    <div style={{ position: "relative", maxWidth: 320, marginBottom: 8 }}>
                      <MagnifyingGlassIcon size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--muted-text)" }} />
                      <Input size="regular" placeholder="Buscar produto por nome..." style={{ paddingLeft: 30 }} />
                    </div>
                    <div style={{ display: "flex", gap: 8, opacity: 0.35 }}>
                      <Counter defaultValue={1} min={1} disabled><CounterInputControls><CounterInputDecrement /><CounterInputField /><CounterInputIncrement /></CounterInputControls></Counter>
                      <Input size="small" disabled placeholder="R$0,00" style={{ width: 100 }} />
                      <Separator orientation="vertical" style={{ height: 20 }} />
                      <Badge variant="secondary">—</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <p style={{ marginTop: 8, fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>
              Área dinâmica desabilitada (opacidade reduzida). O usuário entende que precisa
              confirmar um produto antes de editar quantidade e valor.
            </p>
          </div>

          {/* EVITE */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, fontSize: 12, fontWeight: 700, color: "var(--perigo-600)" }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--perigo-600)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>✕</span>
              EVITE
            </div>
            <div style={{ border: "2px solid var(--perigo-600)", borderRadius: 8, overflow: "hidden", opacity: 0.85 }}>
              <Card style={{ border: "none", borderRadius: 0 }}>
                <CardContent style={{ display: "flex", gap: "calc(var(--spacing) * 4)", padding: "calc(var(--spacing) * 2)" }}>
                  <ProductImage empty />
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: 8 }}><MetaBadges /></div>
                    <div style={{ position: "relative", maxWidth: 320, marginBottom: 8 }}>
                      <MagnifyingGlassIcon size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--muted-text)" }} />
                      <Input size="regular" placeholder="Buscar produto por nome..." style={{ paddingLeft: 30 }} />
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Counter defaultValue={1} min={1}><CounterInputControls><CounterInputDecrement /><CounterInputField /><CounterInputIncrement /></CounterInputControls></Counter>
                      <Input size="small" placeholder="R$0,00" style={{ width: 100 }} />
                      <Separator orientation="vertical" style={{ height: 20 }} />
                      <Badge variant="secondary">Frete grátis</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <p style={{ marginTop: 8, fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>
              Counter e campos de valor ativos sem produto confirmado. O usuário pode preencher
              dados em estado inválido, gerando inconsistência no pedido.
            </p>
          </div>

        </div>
      </div>

    </div>
  ),
};
