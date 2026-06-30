import { CaretDownIcon, DownloadSimpleIcon, FloppyDiskIcon, TrashIcon, CopyIcon, ArchiveIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/registry/default/ui/button/button";
import { IconButton } from "@/registry/default/ui/icon-button/icon-button";
import { Separator } from "@/registry/default/ui/separator/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/registry/default/ui/dropdown-menu/dropdown-menu";

const meta = {
  title: "Guides/Header Actions",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Shell compartilhado ──────────────────────────────────────────────────────
function HeaderShell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "calc(var(--spacing) * 14)",
        padding: "0 calc(var(--spacing) * 6)",
        borderBottom: "1px solid var(--color-border-200)",
        background: "var(--background)",
      }}
    >
      <span className="typo-heading-5 text-text">{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: "calc(var(--spacing) * 2)" }}>{children}</div>
    </div>
  );
}

// ─── Bloco de documentação ────────────────────────────────────────────────────
function DocBlock({ children }: { children: React.ReactNode }) {
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

function Rule({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
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

// ─── Card de Do / Don't ───────────────────────────────────────────────────────
function Verdict({
  type,
  label,
  reason,
  children,
}: {
  type: "do" | "dont";
  label: string;
  reason: string;
  children: React.ReactNode;
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
            minHeight: "calc(var(--spacing) * 13)",
            padding: "0 calc(var(--spacing) * 4)",
            borderBottom: "1px solid var(--color-border-200)",
            background: "var(--background)",
          }}
        >
          <span className="typo-heading-5 text-text">{label}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>{children}</div>
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
        <p style={{ marginBottom: "calc(var(--spacing) * 3)", fontWeight: 600, fontSize: 14 }}>Header de Ações</p>
        <p style={{ marginBottom: 10 }}>
          Um cabeçalho de página com <strong>rótulo à esquerda</strong> e <strong>ações à direita</strong>.
          Funciona como o centro de comando do contexto atual — oferece ao usuário uma leitura imediata
          de onde ele está e o que pode fazer.
        </p>
        <p>
          O layout é sempre a mesma estrutura de duas zonas, independentemente de quantas ações aparecem.
          Apenas a zona direita muda de composição conforme a estratégia de ações escolhida.
        </p>
      </DocBlock>

      <div style={{ padding: "calc(var(--spacing) * 6)", background: "var(--background)" }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: "calc(var(--spacing) * 14)",
              padding: "0 calc(var(--spacing) * 6)",
              border: "1px dashed var(--color-border-200)",
              borderRadius: "var(--radius-md)",
              background: "var(--background)",
            }}
          >
            <span className="typo-heading-5 text-text">Rótulo da página</span>
            <div style={{ display: "flex", alignItems: "center", gap: "calc(var(--spacing) * 2)" }}>
              <Button variant="outline" size="small">Secundária</Button>
              <Button variant="primary" size="small">Ação primária</Button>
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
            }}
          >
            <span style={{ color: "var(--muted-text)" }}>↑ ZONA ESQUERDA — identidade da página</span>
            <span style={{ color: "var(--muted-text)" }}>ZONA DIREITA — ações ↑</span>
          </div>
        </div>

        <div style={{ marginTop: "calc(var(--spacing) * 5)", display: "flex", gap: "calc(var(--spacing) * 6)", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontSize: 12, fontWeight: 600, marginBottom: "var(--spacing)" }}>Zona esquerda</p>
            <p style={{ fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>
              Sempre um único rótulo com <code>typo-heading-5</code> e cor <code>text-text</code>.
              Descreve a página ou seção atual. Nunca contém elementos interativos.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontSize: 12, fontWeight: 600, marginBottom: "var(--spacing)" }}>Zona direita</p>
            <p style={{ fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>
              Flex row, <code>gap-2</code>, alinhado ao fim. Contém no mínimo uma ação primária.
              Ações adicionais seguem a estratégia descrita nos outros exemplos.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════
// 2. SOMENTE PRIMÁRIA
// ═══════════════════════════════════════════════════════════════════════════
export const PrimaryOnly: Story = {
  name: "Somente Primária",
  render: () => (
    <div>
      <DocBlock>
        <Rule label="QUANDO" color="var(--primary)">
          A página tem uma intenção única e clara — ex.: fluxo de criação, relatório somente leitura
          com uma exportação, ou página de configurações com um único salvar. Não existe ação
          secundária relevante a expor.
        </Rule>
        <Rule label="REGRA" color="var(--primary)">
          Uma ação primária é <strong>sempre obrigatória</strong>. Esta é a composição mínima válida.
          Um cabeçalho sem ações não deve usar este componente — utilize um título simples.
        </Rule>
      </DocBlock>

      <HeaderShell label="Novo produto">
        <Button variant="primary" size="small">
          Publicar produto
        </Button>
      </HeaderShell>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════

// 4. AÇÕES AGRUPADAS (overflow + split button)
// ═══════════════════════════════════════════════════════════════════════════
export const GroupedActions: Story = {
  name: "Ações Agrupadas",
  render: () => (
    <div>
      <DocBlock>
        <p style={{ marginBottom: 10 }}>
          Quando uma página tem mais de 2 ações relevantes, o excesso deve ser agrupado para evitar
          sobrecarga cognitiva. O hubble-ds oferece três opções — escolha conforme o que o usuário
          está selecionando:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "calc(var(--spacing) * 3)", marginBottom: "calc(var(--spacing) * 3)" }}>
          <div
            style={{
              padding: "calc(var(--spacing) * 3)",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--primary)",
              background: "var(--color-secondary-50)",
            }}
          >
            <p style={{ fontWeight: 700, fontSize: 12, marginBottom: "var(--spacing)", color: "var(--primary)" }}>
              DropdownMenu ✓ Recomendado
            </p>
            <p style={{ fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>
              Ideal para <strong>disparar ações</strong> (duplicar, arquivar, excluir…). Suporta
              ícones, separadores, variante destrutiva e submenus para navegação de 3º nível.
              Use como botão "Mais ações" independente ou como a metade caret de um split button.
            </p>
          </div>
          <div
            style={{
              padding: "calc(var(--spacing) * 3)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border-200)",
              background: "var(--background)",
            }}
          >
            <p style={{ fontWeight: 700, fontSize: 12, marginBottom: "var(--spacing)" }}>Select</p>
            <p style={{ fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>
              Ideal para <strong>escolher um valor</strong> (status, período, idioma…). Não é
              apropriado para menus de ação — semanticamente define um campo, não dispara um verbo.
            </p>
          </div>
          <div
            style={{
              padding: "calc(var(--spacing) * 3)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border-200)",
              background: "var(--background)",
            }}
          >
            <p style={{ fontWeight: 700, fontSize: 12, marginBottom: "var(--spacing)" }}>Command (Combobox)</p>
            <p style={{ fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>
              Ideal quando a lista é <strong>grande (10+ itens)</strong> e o usuário precisa
              pesquisar. Construa como <code>Command</code> dentro de um <code>Popover</code>.
              Excessivo para grupos típicos de 3–6 ações em cabeçalhos.
            </p>
          </div>
        </div>

        <Rule label="SPLIT BUTTON" color="var(--primary)">
          Quando uma ação possui variantes de formato (ex.: "Exportar como PDF" vs "Exportar como CSV"),
          use um split button: a metade esquerda dispara a ação padrão, a metade direita (caret{" "}
          <code>IconButton</code>) abre um DropdownMenu com as alternativas.
        </Rule>
        <Rule label="MAIS AÇÕES" color="var(--primary)">
          Use um botão outline rotulado "Mais ações" para operações infrequentes, casos de borda ou
          ações destrutivas que não justificam eventos individuais no Amplitude.
        </Rule>
      </DocBlock>

      <HeaderShell label="Relatório de vendas">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="small">
              Mais ações <CaretDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Gerenciar</DropdownMenuLabel>
            <DropdownMenuItem>
              <CopyIcon /> Duplicar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ArchiveIcon /> Arquivar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <TrashIcon /> Excluir relatório
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" style={{ height: 20 }} />

        <div style={{ display: "inline-flex" }}>
          <Button
            variant="outline"
            size="small"
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            <DownloadSimpleIcon /> Exportar
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton
                variant="outline"
                size="small"
                aria-label="Formato de exportação"
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
              <DropdownMenuItem>Exportar como XLSX</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator orientation="vertical" style={{ height: 20 }} />

        <Button variant="primary" size="small">
          <FloppyDiskIcon /> Salvar filtros
        </Button>
      </HeaderShell>
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
          1. Limite ações visíveis a no máximo 2
        </p>
        <p style={{ fontSize: 12, color: "var(--muted-text)", marginBottom: "calc(var(--spacing) * 4)", lineHeight: 1.5 }}>
          Mais de 2 botões simultâneos exigem que o usuário leia cada rótulo antes de decidir — isso
          é sobrecarga cognitiva. Agrupe o excesso em um DropdownMenu.
        </p>
        <div style={{ display: "flex", gap: "calc(var(--spacing) * 6)", flexWrap: "wrap" }}>
          <Verdict
            type="do"
            label="Produtos"
            reason="Um CTA primário e uma saída de emergência. Hierarquia visual clara. O usuário sabe exatamente o que fazer."
          >
            <Button variant="outline" size="small">Cancelar</Button>
            <Button variant="primary" size="small">Salvar produto</Button>
          </Verdict>
          <Verdict
            type="dont"
            label="Produtos"
            reason="Cinco botões visíveis, sem primária clara. O usuário precisa ler tudo antes de agir."
          >
            <Button variant="outline" size="small">Cancelar</Button>
            <Button variant="outline" size="small">Duplicar</Button>
            <Button variant="outline" size="small">Arquivar</Button>
            <Button variant="outline" size="small">Exportar</Button>
            <Button variant="primary" size="small">Salvar</Button>
          </Verdict>
        </div>
      </div>

      {/* Regra 2 */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: "var(--spacing)", color: "var(--text)" }}>
          2. Deve sempre existir exatamente uma ação primária
        </p>
        <p style={{ fontSize: 12, color: "var(--muted-text)", marginBottom: "calc(var(--spacing) * 4)", lineHeight: 1.5 }}>
          A primária indica a intenção principal da tela. Dois botões com o mesmo peso visual criam
          uma falsa escolha — o usuário não consegue identificar qual ação importa mais.
        </p>
        <div style={{ display: "flex", gap: "calc(var(--spacing) * 6)", flexWrap: "wrap" }}>
          <Verdict
            type="do"
            label="Campanha"
            reason="Um único botão preenchido sinaliza a intenção principal. O secundário usa outline para ficar subordinado."
          >
            <Button variant="outline" size="small">Cancelar</Button>
            <Button variant="primary" size="small">Publicar campanha</Button>
          </Verdict>
          <Verdict
            type="dont"
            label="Campanha"
            reason="Dois botões com peso visual de primária criam uma falsa escolha. O usuário não sabe qual ação importa mais."
          >
            <Button variant="primary" size="small">Salvar rascunho</Button>
            <Button variant="primary" size="small">Publicar campanha</Button>
          </Verdict>
        </div>
      </div>

      {/* Regra 3 */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: "var(--spacing)", color: "var(--text)" }}>
          3. Agrupe ações de casos de borda — não as exponha individualmente
        </p>
        <p style={{ fontSize: 12, color: "var(--muted-text)", marginBottom: "calc(var(--spacing) * 4)", lineHeight: 1.5 }}>
          Ações infrequentes, destrutivas ou utilitárias não precisam de visibilidade imediata.
          Escondê-las em "Mais ações" reduz o ruído sem sacrificar o acesso.
        </p>
        <div style={{ display: "flex", gap: "calc(var(--spacing) * 6)", flexWrap: "wrap" }}>
          <Verdict
            type="do"
            label="Relatório"
            reason='"Mais ações" oculta operações pouco frequentes. O Amplitude ainda captura o clique rastreando a abertura do menu.'
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="small">
                  Mais ações <CaretDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem><CopyIcon /> Duplicar</DropdownMenuItem>
                <DropdownMenuItem variant="destructive"><TrashIcon /> Excluir</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="primary" size="small">Exportar</Button>
          </Verdict>
          <Verdict
            type="dont"
            label="Relatório"
            reason="Ações destrutivas e utilitárias no mesmo peso visual da primária. Expõe risco e gera ruído desnecessário."
          >
            <Button variant="outline" size="small"><CopyIcon /> Duplicar</Button>
            <Button variant="destructive" size="small"><TrashIcon /> Excluir</Button>
            <Button variant="primary" size="small">Exportar</Button>
          </Verdict>
        </div>
      </div>

      {/* Regra 4 */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: "var(--spacing)", color: "var(--text)" }}>
          4. Use split button para variantes de formato — não um botão por formato
        </p>
        <p style={{ fontSize: 12, color: "var(--muted-text)", marginBottom: "calc(var(--spacing) * 4)", lineHeight: 1.5 }}>
          Quando uma ação tem subopções de formato ou modo, o split button mantém a intenção
          principal visível enquanto o caret oferece a escolha secundária. Escala bem conforme
          o número de formatos cresce.
        </p>
        <div style={{ display: "flex", gap: "calc(var(--spacing) * 6)", flexWrap: "wrap" }}>
          <Verdict
            type="do"
            label="Relatório"
            reason="O split button mantém a intenção principal visível (Exportar) enquanto o caret oferece a escolha de formato. Um clique rastreado, uma affordance de UX."
          >
            <div style={{ display: "inline-flex" }}>
              <Button variant="outline" size="small" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                <DownloadSimpleIcon /> Exportar
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton
                    variant="outline"
                    size="small"
                    aria-label="Formato de exportação"
                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeft: "1px solid var(--button-border)" }}
                  >
                    <CaretDownIcon />
                  </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>PDF</DropdownMenuItem>
                  <DropdownMenuItem>CSV</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button variant="primary" size="small">Salvar filtros</Button>
          </Verdict>
          <Verdict
            type="dont"
            label="Relatório"
            reason="Três botões de formato individuais. Se os formatos crescerem para 5, o cabeçalho se torna inutilizável. Não escala."
          >
            <Button variant="outline" size="small">Exportar PDF</Button>
            <Button variant="outline" size="small">Exportar CSV</Button>
            <Button variant="outline" size="small">Exportar XLSX</Button>
            <Button variant="primary" size="small">Salvar filtros</Button>
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
        <p style={{ fontWeight: 700, marginBottom: "calc(var(--spacing) * 2)" }}>Checklist de decisão rápida para PMs e Devs</p>
        <p>① Esta ação é rastreada individualmente no Amplitude? → Exiba como botão visível</p>
        <p>② É uma operação rara, destrutiva ou utilitária? → Mova para o DropdownMenu "Mais ações"</p>
        <p>③ A ação tem variantes de formato ou modo? → Split button (ação principal + caret)</p>
        <p>④ Há 10+ opções agrupadas e o usuário precisa pesquisar? → Command dentro de um Popover (combobox)</p>
        <p>⑤ Há mais de 2 botões individuais? → Reavalie o escopo ou agrupe alguns</p>
      </div>
    </div>
  ),
};
