import {
  BookOpenIcon,
  CaretDownIcon,
  CaretRightIcon,
  ChartPieSliceIcon,
  DotsThreeIcon,
  GearIcon,
  MapTrifoldIcon,
  RobotIcon,
  SlidersHorizontalIcon,
  TableIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar/avatar";
import { Button } from "@/registry/default/ui/button/button";
import { IconButton } from "@/registry/default/ui/icon-button/icon-button";
import { Input } from "@/registry/default/ui/input/input";
import { Separator } from "@/registry/default/ui/separator/separator";

const meta = {
  title: "Guides/Sidebar",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Dados de exemplo ─────────────────────────────────────────────────────────
const platformNav = [
  { label: "Playground", icon: TerminalWindowIcon, children: ["History", "Starred", "Settings"] },
  { label: "Models", icon: RobotIcon, children: [] },
  { label: "Documentation", icon: BookOpenIcon, children: [] },
  { label: "Settings", icon: SlidersHorizontalIcon, children: [] },
];

const projectsNav = [
  { label: "Design Engineering", icon: TableIcon },
  { label: "Sales & Marketing", icon: ChartPieSliceIcon },
  { label: "Travel", icon: MapTrifoldIcon },
];

type NavState = "default" | "hover" | "selected";

// ─── Peças compartilhadas ─────────────────────────────────────────────────────
function SidebarShell({ children, width = 256 }: { children: ReactNode; width?: number }) {
  return (
    <aside
      className="bg-sidebar text-sidebar-foreground border-r border-sidebar-border"
      style={{
        display: "flex",
        flexDirection: "column",
        width,
        height: 720,
        padding: "calc(var(--spacing) * 3)",
        gap: "calc(var(--spacing) * 1)",
      }}
    >
      {children}
    </aside>
  );
}

function SidebarHeader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "calc(var(--spacing) * 2)",
        padding: "calc(var(--spacing) * 2)",
      }}
    >
      <Avatar size="small">
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <div style={{ flex: 1, lineHeight: 1.2 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>Acme Inc</div>
        <div style={{ fontSize: 11, color: "var(--color-sidebar-muted)" }}>V1.0.0</div>
      </div>
      <IconButton variant="ghost" size="small" aria-label="Configurações da conta">
        <GearIcon />
      </IconButton>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: "var(--color-sidebar-muted)",
        padding: "calc(var(--spacing) * 2) calc(var(--spacing) * 2) var(--spacing)",
      }}
    >
      {children}
    </div>
  );
}

// Estilo por estado de um item de nível superior.
function navItemStyle(state: NavState): React.CSSProperties {
  const base: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "calc(var(--spacing) * 2)",
    height: "calc(var(--spacing) * 9)",
    padding: "0 calc(var(--spacing) * 2)",
    borderRadius: "var(--radius-md)",
    fontSize: 14,
    color: "var(--color-sidebar-foreground)",
  };
  if (state === "hover") return { ...base, background: "var(--color-sidebar-accent)" };
  if (state === "selected")
    return {
      ...base,
      background: "var(--primary-accent)",
      color: "var(--primary)",
      boxShadow: "inset 0 0 0 1px var(--primaria-200)",
    };
  return base;
}

function NavItem({
  icon: Icon,
  label,
  state = "default",
  chevron,
}: {
  icon: React.ElementType;
  label: string;
  state?: NavState;
  chevron?: "down" | "right";
}) {
  const iconColor = state === "selected" ? "var(--primaria-600)" : "var(--color-sidebar-foreground)";
  return (
    <div style={navItemStyle(state)}>
      <Icon size={18} color={iconColor} />
      <span style={{ flex: 1 }}>{label}</span>
      {chevron === "down" && <CaretDownIcon size={14} />}
      {chevron === "right" && <CaretRightIcon size={14} />}
    </div>
  );
}

function SubItem({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "calc(var(--spacing) * 8)",
        marginLeft: "calc(var(--spacing) * 4)",
        padding: "0 calc(var(--spacing) * 3)",
        borderRadius: "var(--radius-md)",
        borderLeft: "1px solid var(--color-sidebar-border)",
        fontSize: 14,
        color: active ? "var(--primary)" : "var(--color-sidebar-foreground)",
        background: active ? "var(--primary-accent)" : "transparent",
      }}
    >
      {label}
    </div>
  );
}

function NewsletterCard() {
  return (
    <div
      style={{
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--spacing) * 2)",
        padding: "calc(var(--spacing) * 4)",
        border: "1px solid var(--color-sidebar-border)",
        borderRadius: "var(--radius-lg)",
        background: "var(--background)",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 600 }}>Subscribe to our newsletter</div>
      <div style={{ fontSize: 12, color: "var(--color-sidebar-muted)", lineHeight: 1.4 }}>
        Opt-in to receive updates and news about the sidebar.
      </div>
      <Input size="small" placeholder="Email" />
      <Button variant="primary" size="small" style={{ width: "100%" }}>
        Subscribe
      </Button>
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

function Rule({ label, color, children }: { label: string; color: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "calc(var(--spacing) * 2)", alignItems: "flex-start", marginBottom: "calc(var(--spacing) * 2)" }}>
      <span style={{ flexShrink: 0, marginTop: 2, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color }}>
        {label}
      </span>
      <span style={{ color: "var(--text)" }}>{children}</span>
    </div>
  );
}

function Verdict({ type, reason, children }: { type: "do" | "dont"; reason: string; children: ReactNode }) {
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
        }}
      >
        {children}
      </div>
      <p style={{ marginTop: "calc(var(--spacing) * 2)", fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>
        {reason}
      </p>
    </div>
  );
}

// Sidebar compacta para os exemplos de Faça/Evite.
function MiniSidebar({ children }: { children: ReactNode }) {
  return (
    <div
      className="bg-sidebar text-sidebar-foreground"
      style={{ display: "flex", flexDirection: "column", gap: 2, padding: "calc(var(--spacing) * 3)", width: "100%" }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. ANATOMIA — sidebar em estado de repouso
// ═══════════════════════════════════════════════════════════════════════════
export const Anatomy: Story = {
  name: "Anatomia",
  render: () => (
    <div>
      <DocBlock>
        <p style={{ marginBottom: "calc(var(--spacing) * 3)", fontWeight: 600, fontSize: 14 }}>Sidebar de navegação</p>
        <p style={{ marginBottom: 10 }}>
          Navegação primária persistente à esquerda da aplicação. Organiza os destinos em{" "}
          <strong>grupos rotulados</strong> e admite no máximo <strong>um nível</strong> de sub-itens
          dentro de itens recolhíveis. O exemplo abaixo está em <strong>estado de repouso</strong> —
          nenhum item destacado por interação.
        </p>
        <p>
          O hubble-ds não possui um componente <code>Sidebar</code> dedicado: ela é composta a partir
          de primitivos (<code>Avatar</code>, <code>Button</code>, <code>IconButton</code>,{" "}
          <code>Input</code>, <code>Separator</code>) sobre os tokens <code>sidebar-*</code>.
        </p>
      </DocBlock>

      <div style={{ display: "flex", gap: "calc(var(--spacing) * 8)", padding: "calc(var(--spacing) * 6)", background: "var(--background)" }}>
        <SidebarShell>
          <SidebarHeader />
          <Separator className="bg-sidebar-border" />
          <SectionLabel>Platform</SectionLabel>
          {platformNav.map(({ label, icon, children }) => (
            <NavItem key={label} icon={icon} label={label} chevron={children.length ? "right" : undefined} />
          ))}
          <SectionLabel>Projects</SectionLabel>
          {projectsNav.map(({ label, icon }) => (
            <NavItem key={label} icon={icon} label={label} />
          ))}
          <NavItem icon={DotsThreeIcon} label="More" />
          <NewsletterCard />
        </SidebarShell>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "calc(var(--spacing) * 4)", maxWidth: 360 }}>
          {[
            { t: "Cabeçalho", d: "Identidade da conta/workspace (avatar, nome, versão) e um acesso de configuração. Topo fixo da sidebar." },
            { t: "Rótulos de seção", d: "Agrupam destinos relacionados (Platform, Projects). Texto pequeno, muted, não interativo." },
            { t: "Itens de navegação", d: "Cada destino com ícone + rótulo. Itens com sub-níveis exibem um chevron à direita." },
            { t: "Sub-itens", d: "Um único nível de profundidade, recuado sob o item pai e revelado quando o grupo está expandido." },
            { t: "Slot de rodapé", d: "Área opcional ao final (card de newsletter, conta do usuário, upgrade). Ancorada na base via margin-top auto." },
          ].map(({ t, d }) => (
            <div key={t}>
              <p style={{ fontSize: 12, fontWeight: 600, marginBottom: "var(--spacing)" }}>{t}</p>
              <p style={{ fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════
// 2. ESTADOS — repouso, hover, selecionado, sub-item ativo
// ═══════════════════════════════════════════════════════════════════════════
export const Estados: Story = {
  name: "Estados",
  render: () => (
    <div>
      <DocBlock>
        <Rule label="SELECIONADO" color="var(--primary)">
          Marca o destino atual (onde o usuário está). Fundo <code>primary-accent</code>, texto e ícone
          em <code>primary</code> e um anel de 1px <code>primaria-200</code>. <strong>Apenas um</strong>{" "}
          item de nível superior fica selecionado por vez.
        </Rule>
        <Rule label="HOVER" color="var(--alerta-600)">
          Feedback transitório de ponteiro. Fundo neutro <code>sidebar-accent</code> (cinza), sem cor de
          marca — para não competir com o item selecionado.
        </Rule>
        <Rule label="SUB-ITEM ATIVO" color="var(--primary)">
          Quando o destino atual é um sub-item, ele recebe o mesmo realce de marca (fundo{" "}
          <code>primary-accent</code> + texto <code>primary</code>), enquanto o item pai permanece
          expandido.
        </Rule>
      </DocBlock>

      <div style={{ display: "flex", gap: "calc(var(--spacing) * 8)", padding: "calc(var(--spacing) * 6)", background: "var(--background)" }}>
        <SidebarShell>
          <SidebarHeader />
          <Separator className="bg-sidebar-border" />
          <SectionLabel>Platform</SectionLabel>

          {/* Item selecionado + expandido */}
          <NavItem icon={TerminalWindowIcon} label="Playground" state="selected" chevron="down" />
          <SubItem label="History" />
          <SubItem label="Starred" active />
          <SubItem label="Settings" />

          {/* Demais itens */}
          <NavItem icon={RobotIcon} label="Models" chevron="right" />
          <NavItem icon={BookOpenIcon} label="Documentation" state="hover" chevron="right" />
          <NavItem icon={SlidersHorizontalIcon} label="Settings" chevron="right" />

          <SectionLabel>Projects</SectionLabel>
          {projectsNav.map(({ label, icon }) => (
            <NavItem key={label} icon={icon} label={label} />
          ))}
          <NavItem icon={DotsThreeIcon} label="More" />
        </SidebarShell>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "calc(var(--spacing) * 4)", maxWidth: 360 }}>
          {[
            { c: "var(--primary)", t: "Playground — selecionado + expandido", d: "Item atual, com realce de marca e chevron para baixo. Revela os sub-itens." },
            { c: "var(--primary)", t: "Starred — sub-item ativo", d: "O destino real está um nível abaixo; recebe o mesmo realce de marca." },
            { c: "var(--alerta-600)", t: "Documentation — hover", d: "Realce cinza transitório do ponteiro. Note que é visualmente distinto do selecionado." },
            { c: "var(--muted-text)", t: "Demais itens — repouso", d: "Sem fundo, texto e ícone em foreground neutro." },
          ].map(({ c, t, d }) => (
            <div key={t} style={{ display: "flex", gap: "calc(var(--spacing) * 2)" }}>
              <span style={{ flexShrink: 0, marginTop: 5, width: 8, height: 8, borderRadius: "50%", background: c }} />
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, marginBottom: "var(--spacing)" }}>{t}</p>
                <p style={{ fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════
// 3. RECOLHIDA — rail de ícones
// ═══════════════════════════════════════════════════════════════════════════
export const Recolhida: Story = {
  name: "Recolhida (rail de ícones)",
  render: () => (
    <div>
      <DocBlock>
        <Rule label="QUANDO" color="var(--primary)">
          O usuário recolhe a sidebar para ganhar área de conteúdo. Ela colapsa para um rail estreito
          contendo apenas os ícones dos itens de nível superior.
        </Rule>
        <Rule label="ESTADO ATIVO" color="var(--primary)">
          O item selecionado <strong>mantém o realce de marca</strong> na versão recolhida — o usuário
          não pode perder a referência de onde está só porque recolheu o menu.
        </Rule>
        <Rule label="RÓTULOS" color="var(--alerta-600)">
          Ícone sozinho é ambíguo. Cada item recolhido deve revelar seu rótulo via <code>Tooltip</code>{" "}
          no hover/foco, e os sub-itens passam a abrir em um flyout (popover) ao acionar o ícone.
        </Rule>
      </DocBlock>

      <div style={{ display: "flex", gap: "calc(var(--spacing) * 8)", padding: "calc(var(--spacing) * 6)", background: "var(--background)" }}>
        <SidebarShell width={72}>
          <div style={{ display: "flex", justifyContent: "center", padding: "calc(var(--spacing) * 2) 0" }}>
            <Avatar size="small">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
          </div>
          <Separator className="bg-sidebar-border" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "calc(var(--spacing) * 2)", paddingTop: "calc(var(--spacing) * 2)" }}>
            {/* Item selecionado mantém o realce */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "calc(var(--spacing) * 9)",
                height: "calc(var(--spacing) * 9)",
                borderRadius: "var(--radius-md)",
                background: "var(--primary-accent)",
                boxShadow: "inset 0 0 0 1px var(--primaria-200)",
              }}
            >
              <TerminalWindowIcon size={18} color="var(--primaria-600)" />
            </div>
            {[RobotIcon, BookOpenIcon, SlidersHorizontalIcon].map((Icon, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "calc(var(--spacing) * 9)",
                  height: "calc(var(--spacing) * 9)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--color-sidebar-foreground)",
                }}
              >
                <Icon size={18} />
              </div>
            ))}
          </div>
        </SidebarShell>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "calc(var(--spacing) * 4)", maxWidth: 360 }}>
          <p style={{ fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>
            O rail preserva a hierarquia visual: o cabeçalho vira só o avatar, os rótulos de seção
            desaparecem e cada destino fica reduzido ao seu ícone. O único realce que sobrevive é o do
            item selecionado — tudo o mais entra em repouso.
          </p>
        </div>
      </div>
    </div>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════
// 4. FAÇA E EVITE
// ═══════════════════════════════════════════════════════════════════════════
export const DoAndDonts: Story = {
  name: "Faça e Evite",
  render: () => (
    <div style={{ padding: "calc(var(--spacing) * 6)", background: "var(--background)", display: "flex", flexDirection: "column", gap: "calc(var(--spacing) * 8)" }}>

      {/* Regra 1 — um selecionado por vez */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: "var(--spacing)", color: "var(--text)" }}>
          1. Exatamente um item selecionado por vez
        </p>
        <p style={{ fontSize: 12, color: "var(--muted-text)", marginBottom: "calc(var(--spacing) * 4)", lineHeight: 1.5 }}>
          O realce de marca comunica "você está aqui". Mais de um item selecionado destrói essa
          referência — o usuário não sabe mais qual é o destino atual.
        </p>
        <div style={{ display: "flex", gap: "calc(var(--spacing) * 6)", flexWrap: "wrap" }}>
          <Verdict type="do" reason="Só Playground está selecionado. A localização atual é inequívoca.">
            <MiniSidebar>
              <NavItem icon={TerminalWindowIcon} label="Playground" state="selected" />
              <NavItem icon={RobotIcon} label="Models" />
              <NavItem icon={BookOpenIcon} label="Documentation" />
            </MiniSidebar>
          </Verdict>
          <Verdict type="dont" reason="Três itens com realce de selecionado. O usuário não tem como saber onde está.">
            <MiniSidebar>
              <NavItem icon={TerminalWindowIcon} label="Playground" state="selected" />
              <NavItem icon={RobotIcon} label="Models" state="selected" />
              <NavItem icon={BookOpenIcon} label="Documentation" state="selected" />
            </MiniSidebar>
          </Verdict>
        </div>
      </div>

      {/* Regra 2 — distinguir hover de selecionado */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: "var(--spacing)", color: "var(--text)" }}>
          2. Hover e selecionado precisam de linguagens visuais distintas
        </p>
        <p style={{ fontSize: 12, color: "var(--muted-text)", marginBottom: "calc(var(--spacing) * 4)", lineHeight: 1.5 }}>
          Selecionado é um estado persistente (localização); hover é transitório (ponteiro). Usar a
          mesma cor de marca para os dois faz o usuário confundir o que está apenas sob o cursor com o
          destino atual.
        </p>
        <div style={{ display: "flex", gap: "calc(var(--spacing) * 6)", flexWrap: "wrap" }}>
          <Verdict type="do" reason="Selecionado em azul (marca); hover em cinza neutro. Estados imediatamente diferenciáveis.">
            <MiniSidebar>
              <NavItem icon={TerminalWindowIcon} label="Playground" state="selected" />
              <NavItem icon={RobotIcon} label="Models" state="hover" />
              <NavItem icon={BookOpenIcon} label="Documentation" />
            </MiniSidebar>
          </Verdict>
          <Verdict type="dont" reason="Hover usando a mesma cor de marca do selecionado. Parecem dois itens atuais.">
            <MiniSidebar>
              <NavItem icon={TerminalWindowIcon} label="Playground" state="selected" />
              <NavItem icon={RobotIcon} label="Models" state="selected" />
              <NavItem icon={BookOpenIcon} label="Documentation" />
            </MiniSidebar>
          </Verdict>
        </div>
      </div>

      {/* Regra 3 — colapsada preserva ativo + rótulos */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: "var(--spacing)", color: "var(--text)" }}>
          3. Ao recolher, preserve o estado ativo e os rótulos
        </p>
        <p style={{ fontSize: 12, color: "var(--muted-text)", marginBottom: "calc(var(--spacing) * 4)", lineHeight: 1.5 }}>
          O rail de ícones não pode descartar a referência de localização nem deixar o significado dos
          ícones implícito. Mantenha o realce do item atual e exponha o rótulo via Tooltip.
        </p>
        <div style={{ display: "flex", gap: "calc(var(--spacing) * 6)", flexWrap: "wrap", alignItems: "flex-start" }}>
          <Verdict type="do" reason="O ícone do destino atual mantém o realce; o rótulo aparece em Tooltip no hover.">
            <div className="bg-sidebar" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "calc(var(--spacing) * 2)", padding: "calc(var(--spacing) * 3)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "calc(var(--spacing) * 9)", height: "calc(var(--spacing) * 9)", borderRadius: "var(--radius-md)", background: "var(--primary-accent)", boxShadow: "inset 0 0 0 1px var(--primaria-200)" }}>
                <TerminalWindowIcon size={18} color="var(--primaria-600)" />
              </div>
              {[RobotIcon, BookOpenIcon].map((Icon, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "calc(var(--spacing) * 9)", height: "calc(var(--spacing) * 9)", color: "var(--color-sidebar-foreground)" }}>
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </Verdict>
          <Verdict type="dont" reason="Sem realce ativo no rail. Recolher fez o usuário perder a referência de onde está.">
            <div className="bg-sidebar" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "calc(var(--spacing) * 2)", padding: "calc(var(--spacing) * 3)" }}>
              {[TerminalWindowIcon, RobotIcon, BookOpenIcon].map((Icon, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "calc(var(--spacing) * 9)", height: "calc(var(--spacing) * 9)", color: "var(--color-sidebar-foreground)" }}>
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </Verdict>
        </div>
      </div>

      {/* Regra 4 — no máximo um nível de aninhamento */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, marginBottom: "var(--spacing)", color: "var(--text)" }}>
          4. No máximo um nível de sub-itens
        </p>
        <p style={{ fontSize: 12, color: "var(--muted-text)", marginBottom: "calc(var(--spacing) * 4)", lineHeight: 1.5 }}>
          A sidebar é navegação primária, não uma árvore de arquivos. Um nível de sub-itens cobre os
          casos reais; aninhamentos mais profundos viram um labirinto de recuos — mova a hierarquia
          extra para dentro da própria página.
        </p>
        <div style={{ display: "flex", gap: "calc(var(--spacing) * 6)", flexWrap: "wrap" }}>
          <Verdict type="do" reason="Um nível de profundidade sob o grupo. Recuo legível, hierarquia clara.">
            <MiniSidebar>
              <NavItem icon={TerminalWindowIcon} label="Playground" state="selected" chevron="down" />
              <SubItem label="History" />
              <SubItem label="Starred" active />
              <SubItem label="Settings" />
            </MiniSidebar>
          </Verdict>
          <Verdict type="dont" reason="Três níveis de recuo. A navegação vira um labirinto e o recuo come a largura útil.">
            <MiniSidebar>
              <NavItem icon={TerminalWindowIcon} label="Playground" state="selected" chevron="down" />
              <SubItem label="History" />
              <div style={{ marginLeft: "calc(var(--spacing) * 4)" }}>
                <SubItem label="Sessions" active />
                <div style={{ marginLeft: "calc(var(--spacing) * 4)" }}>
                  <SubItem label="Last run" />
                </div>
              </div>
            </MiniSidebar>
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
        <p>① Há exatamente um item selecionado refletindo a rota atual? → Localização clara</p>
        <p>② Hover usa cor neutra, diferente do selecionado (marca)? → Estados diferenciáveis</p>
        <p>③ A versão recolhida mantém o realce ativo + Tooltip nos ícones? → Sem perda de referência</p>
        <p>④ A navegação tem no máximo um nível de sub-itens? → Hierarquia sob controle</p>
        <p>⑤ Os destinos estão agrupados sob rótulos de seção significativos? → Escaneabilidade</p>
      </div>
    </div>
  ),
};
