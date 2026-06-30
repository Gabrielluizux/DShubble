# Tickets — hubble-ds (gerados a partir da documentação no Storybook)

Cada bloco abaixo é um ticket pronto para lançamento e triagem. Todos os problemas foram encontrados durante a documentação do hubble-ds e **verificados contra o código-fonte atual em 2026-06-30** (as referências de linha conferem; nenhum foi corrigido ainda).

Repositório: `hubble-ds` · Ordem sugerida de execução: TKT-01 → TKT-02 → TKT-03, depois TKT-04 a TKT-06 (atrás de confirmação de design), por fim TKT-07 e TKT-08.

---

## TKT-01 — IconButton: cor do ícone não é aplicada em outline/secondary/ghost
**Severidade:** Alta · **Esforço:** Trivial · **Arquivo:** `registry/default/ui/icon-button/icon-button.tsx` (linhas 18–20)

**Problema**
As variantes `outline`, `secondary` e `ghost` usam o seletor `[&>_svg]:fill-button-text-secondary`. O `[&>_svg]` mistura o combinador de filho direto (`>`) com a sintaxe de descendente (`_`) na mesma variante arbitrária — isso não é Tailwind válido e não compila nenhuma regra utilizável. Apenas `primary` (linha 17) e `destructive` (linha 21) usam o padrão correto `[&_svg]:…`, igual ao do `Button` (`button.tsx` linha 14).

**Como replicar**
1. Renderize `<IconButton variant="outline"><AlgumIcone /></IconButton>`.
2. Inspecione o `<svg>` no DevTools — o token `button-text-secondary` não está aplicado.
3. Passe o mouse: aparece um traço azul (stroke padrão) no ícone.
4. Compare com `<IconButton variant="primary">` — neste, a cor aplica corretamente.

**Por que é um problema**
Afeta **3 das 5 variantes** do componente. O ícone fica com a cor de fallback em vez do token do design system, gerando inconsistência visual visível (principalmente o traço azul no hover) em qualquer tela que use icon buttons não-primários.

**Correção sugerida:** trocar `[&>_svg]` por `[&_svg]` nas três variantes.

---

## TKT-02 — Toggle / ToggleGroup: classe `whitespace-nowrap` quebrada permite quebra de linha
**Severidade:** Alta · **Esforço:** Trivial · **Arquivo:** `registry/default/ui/toggle/toggle.tsx` (linha 8)

**Problema**
A string de classes base contém `"font-medium white space-nowrap"` — são duas classes quebradas (`white` e `space-nowrap`, nenhuma é utilitário Tailwind real) no lugar do `whitespace-nowrap` pretendido.

**Como replicar**
1. Monte um `ToggleGroup` com um item de rótulo composto, ex.: "Melhor Preço".
2. Coloque em um container de largura restrita.
3. Observe o rótulo quebrando em duas linhas e sobrepondo os pills vizinhos.
4. (Alternativa) Inspecione as classes compiladas — `white` e `space-nowrap` não existem.

**Por que é um problema**
O defeito **se propaga para o `ToggleGroupItem`**, que reusa `toggleVariants` diretamente (`registry/default/ui/toggle-group/toggle-group.tsx`). Qualquer consumidor de `toggleVariants` com rótulo de mais de uma palavra quebra o layout. Foi necessário workaround inline (`whiteSpace: "nowrap"` + `width/height: "auto"`) no guia Header Tabs — que poderá ser removido quando o fix subir.

**Correção sugerida:** trocar `white space-nowrap` por `whitespace-nowrap` na linha 8.

**Observação relacionada (menor prioridade, mesmo arquivo):** o `Toggle` não tem feedback de clique `active:` (press-down), enquanto `Button`/`IconButton` têm `active:not-aria-[haspopup]:not-disabled:translate-y-px` (button.tsx linha 11). Deixa o Toggle visualmente estático ao lado do resto da família de botões. (O `aria-pressed:bg-muted` na linha 10 foi checado e é inócuo — a regra da variante `data-[state=on]` vence na cascata.)

---

## TKT-03 — Carousel: orientação vertical não rola
**Severidade:** Alta · **Esforço:** Pequeno–Médio · **Arquivo:** `registry/default/ui/carousel/carousel.tsx` (linha 151)

**Problema**
O `CarouselContent` fixa `className="overflow-hidden"` na div do viewport de scroll (`data-slot="carousel-content"`) sem prop para encaminhar uma altura. O Embla precisa que esse viewport seja menor que o conteúdo para ter o que recortar/rolar; sem um hook de altura, o carousel vertical renderiza todos os itens empilhados sem scroll real.

**Como replicar**
1. Renderize um `Carousel` com `orientation="vertical"`.
2. Adicione vários `CarouselItem`.
3. Observe: todos os itens aparecem empilhados, sem área de rolagem funcional.

**Por que é um problema**
A orientação vertical fica não-funcional. Foi necessário workaround na doc via CSS escopado no atributo `data-slot="carousel-content"` (ver `DESIGNSYSTEM/stories/Carousel.stories.tsx`).

**Correção sugerida:** aceitar `className`/`style` encaminhado para essa div, ou aplicar `h-full` por padrão.

---

## TKT-04 — Table / DataTable: fonte do cabeçalho diverge do Figma
**Severidade:** Média · **Esforço:** Pequeno · **Requer decisão de design** · **Arquivo:** `registry/default/ui/table/table.tsx` (linhas 27 e 79)

**Problema**
`TableHeader` (linha 27) e `TableHead` (linha 79) usam `text-base` (16px), e não os 12px especificados no Figma (token de caption C1). O `DataTable` herda o mesmo comportamento, pois renderiza os cabeçalhos através de `<TableHead>` sem override.

**Como replicar**
1. Renderize uma `Table` ou `DataTable` com cabeçalhos.
2. Inspecione um `<th>` no DevTools.
3. Observe `font-size: 16px` em vez dos 12px do design.

**Por que é um problema**
Toda tabela do produto fica com o cabeçalho fora da especificação visual do design system, afetando densidade e hierarquia tipográfica de forma consistente em todas as telas com tabela.

**Impacto:** Visual. Diferença de 4px é perceptível e está em produção agora, em toda tela com tabela.

**Correção sugerida:** aplicar `typo-caption` (12px) nas células de cabeçalho — confirmar o token pretendido com design.

---

## TKT-05 — Drawer: overlay ignora o token semântico `backdrop`
**Severidade:** Média · **Esforço:** Trivial · **Requer decisão de design (opacidade)** · **Arquivo:** `registry/default/ui/drawer/drawer.tsx` (linha 37)

**Problema**
O `DrawerOverlay` usa o valor cru `bg-black-alpha-10`, enquanto os overlays de `Dialog` e `AlertDialog` usam o token semântico `bg-backdrop` (`black-alpha-30`). Além de pular o token nomeado, a opacidade é diferente (10 vs 30).

**Como replicar**
1. Abra um `Drawer` e, em outra tela, um `Dialog`.
2. Compare o escurecimento do fundo (backdrop).
3. Observe que o backdrop do Drawer é nitidamente mais claro.

**Por que é um problema**
Inconsistência visual entre componentes modais que deveriam compartilhar o mesmo backdrop, e quebra a rastreabilidade do token semântico (mudanças futuras no `backdrop` não alcançam o Drawer).

**Impacto:** Visual **e** padronização. O backdrop mais claro (10 vs 30) é visível ao abrir um Drawer; além disso, ignorar o token semântico é dívida de código.

**Correção sugerida:** usar `bg-backdrop` — confirmar a opacidade pretendida com design.

---

## TKT-06 — Tipografia: caption C2 (10px) não existe no código
**Severidade:** Média · **Esforço:** Pequeno · **Requer decisão de design** · **Fonte:** `assets/app.css` + `base.registry.ts`

**Problema**
O Figma define dois estilos de caption: C1 (12px) e C2 (10px). Apenas o C1 existe no código, como `typo-caption`. Não há nenhum utilitário de texto 10px no repositório — verificado em `app.css`, `base.registry.ts` e em todos os `.tsx` sob `registry/default/ui/` (nenhum `text-[10px]`/`text-2xs`).

**Como replicar**
1. Tente aplicar um token de texto de 10px (ex.: badge denso, sub-rótulo de tabela).
2. Busque por um utilitário correspondente no repositório.
3. Constate que não existe — só há `typo-caption` (12px).

**Por que é um problema**
Qualquer caso que precise de texto 10px (badges densas, legendas) não tem token para usar, forçando valores hardcoded fora do design system.

**Impacto:** Padronização/cobertura. Não há defeito visual hoje — é uma lacuna de token. O impacto visual só aparece de forma indireta (devs hardcodam 10px fora do sistema).

**Correção sugerida:** adicionar um utilitário C2 (ex.: `typo-caption-sm`) — alinhar nome e spec com design.

---

## TKT-07 — Radius: `radius-3xl`/`radius-4xl` são menores que `radius-2xl`
**Severidade:** Baixa (dormente) · **Esforço:** Trivial · **Requer decisão de design (valores)** · **Arquivo:** `assets/app.css` (linhas 232–233)

**Problema**
A escala principal (linhas 36–44, múltiplos de `--radius: 4px`) é: `xs`=2px, `sm`=4px, `md`=8px, `lg`=12px, `xl`=16px, `2xl`=24px, `full`=pill. Porém `radius-3xl` (linha 232) = `calc(var(--radius) * 2.2)` = **8.8px** e `radius-4xl` (linha 233) = `calc(var(--radius) * 2.6)` = **10.4px** — ambos menores que `radius-md` (8px) e muito menores que `radius-2xl` (24px). Pela própria nomenclatura, `3xl`/`4xl` deveriam ser os maiores valores.

**Como replicar**
1. Aplique `rounded-3xl` e `rounded-2xl` em dois elementos.
2. Observe que o `3xl` tem cantos menos arredondados que o `2xl`.

**Por que é um problema**
Está dormente (`rounded-3xl`/`rounded-4xl` não são usados em lugar nenhum hoje), mas vai se comportar de forma contraintuitiva no primeiro uso de quem esperar "maior que 2xl".

**Impacto:** Nenhum hoje (dormente) — padronização/consistência da escala. Só viraria visual se alguém usar os tokens.

**Correção sugerida:** remover os dois tokens dormentes (`radius-3xl` e `radius-4xl`).

---

## TKT-08 — Dialog: overlay tem `blur-light` redundante e inerte
**Severidade:** Baixa · **Esforço:** Trivial · **Arquivo:** `registry/default/ui/dialog/dialog.tsx` (linha 52)

**Problema**
O `DialogOverlay` aplica tanto um `blur-light` simples (CSS `filter: blur()` no próprio elemento do overlay) quanto `supports-backdrop-filter:backdrop-blur-light`. O `blur-light` simples é visualmente inerte (borrar uma cor chapada semitransparente não tem efeito perceptível) e não existe no `AlertDialogOverlay`, que só tem a variante backdrop-filter. Provável resíduo de copy-paste.

**Como replicar**
1. Inspecione o `DialogOverlay` no DevTools.
2. Note as duas classes (`blur-light` + `supports-backdrop-filter:backdrop-blur-light`).
3. Compare com `AlertDialogOverlay`, que tem só a variante backdrop-filter.

**Por que é um problema**
Código morto que sugere uma intenção visual que não acontece, e diverge do `AlertDialog` sem motivo — atrito de manutenção e leitura.

**Correção sugerida:** remover a classe `blur-light` simples.
