# CLAUDE.md — Tripfy: Design System & UI Guidelines

> Este documento orienta a IA (Claude) na geração de interfaces, componentes e protótipos visuais para o **Tripfy**, um app de planejamento de viagens colaborativas. Use-o como fonte primária de contexto antes de propor qualquer design ou tela.

---

## 1. Visão Geral do Produto

**Tripfy** é um aplicativo de planejamento de viagens que permite ao usuário:

- Buscar ou montar roteiros personalizados com base na localização atual ou no destino desejado.
- Organizar atividades por dia, horário, categoria (restaurante, museu, praia etc.), faixa de preço e avaliações.
- Compartilhar roteiros com outros usuários — visualizando, clonando ou editando colaborativamente.
- Criar grupos de viagem com controle de permissões (Administrador, Editor, Membro, Convidado).
- Convidar participantes via código Base62, WhatsApp ou diretamente pelo app.
- Favoritar roteiros de outros usuários para acesso rápido posterior.

**Público-alvo:** viajantes brasileiros, de jovens adultos a famílias, habituados a apps mobile. A experiência deve ser leve, visual, e incentivar a descoberta.

---

## 2. Identidade Visual & Tom

### Personalidade
Tripfy é **explorador, acolhedor e organizado**. Não é um app corporativo nem um guia turístico frio — é como um amigo que planeja viagens com entusiasmo e cuidado.

### Paleta de Cores
| Token              | Hex       | Uso principal                                      |
|--------------------|-----------|----------------------------------------------------|
| `--color-primary`  | `#1E6B5E` | Ações primárias, botões CTA, links ativos          |
| `--color-secondary`| `#F4A623` | Destaques, badges, estrelas de avaliação           |
| `--color-surface`  | `#F7F5F0` | Fundo principal das telas                          |
| `--color-card`     | `#FFFFFF` | Cards, modais, inputs                              |
| `--color-text`     | `#1A1A2E` | Texto principal                                    |
| `--color-muted`    | `#6B7280` | Texto secundário, placeholders                     |
| `--color-error`    | `#D94F4F` | Mensagens de erro, validações negativas            |
| `--color-success`  | `#2E9E6B` | Confirmações, status "aceito", ações bem-sucedidas |
| `--color-border`   | `#E5E7EB` | Divisórias, bordas de card                         |

### Tipografia
- **Display / Títulos:** `Sora` — moderna, ligeiramente arredondada, evoca movimento e otimismo.
- **Corpo / Interface:** `Inter` — neutra, altamente legível em telas pequenas.
- **Dados / Labels:** `JetBrains Mono` — apenas para códigos de convite (Base62) e IDs técnicos.

### Escala tipográfica
| Role         | Tamanho | Peso  | Uso                                   |
|--------------|---------|-------|---------------------------------------|
| `display`    | 28px    | 700   | Títulos de tela (ex: "Meu Roteiro")   |
| `heading`    | 20px    | 600   | Seções, nomes de destino              |
| `body`       | 15px    | 400   | Conteúdo geral                        |
| `label`      | 13px    | 500   | Labels de campo, categorias           |
| `caption`    | 11px    | 400   | Metadados, datas, avaliações          |
| `code`       | 14px    | 500   | Código de convite Base62              |

### Tom da escrita na UI
- Voz ativa e direta: "Adicionar atividade", não "Clique para adicionar".
- Português do Brasil, informal mas claro.
- Erros explicam o que houve e como resolver. Nunca genéricos.
- Telas vazias convidam à ação: "Nenhum roteiro ainda — que tal criar o primeiro?"

---

## 3. Componentes & Padrões de UI

### Cartão de Roteiro (`RoteiroCard`)
Exibe resumo de um roteiro na listagem. Deve conter:
- Imagem de capa do destino principal (aspect ratio 16:9).
- Nome do roteiro (heading).
- Destinos listados como chips horizontais (`CAPITAL`, `PRAIA` etc.).
- Ícone de cadeado para roteiros privados; globo para públicos.
- Botão de favoritar (coração) — estado preenchido/vazio.
- Autoria: avatar pequeno + nome do criador.
- Badge de "Colaborativo" quando `tipoRoteiro === "COLABORATIVO"`.

### Linha do Tempo do Roteiro (`RoteiroTimeline`)
Visualização de atividades organizadas por dia e horário:
- Cada dia é uma seção colapsável com título "Dia 1 — Seg, 10 Mar".
- Atividades em cartões menores com ícone de categoria, nome, horário e faixa de preço ($, $$, $$$, $$$$).
- Conflito de horário exibe alerta inline em `--color-error` com ícone de aviso.
- Drag-and-drop implícito para reorganização (indicar com handle visual na lateral).

### Chips de Categoria
Usados em filtros e na visualização de roteiros:
- Formato: `[ícone] Label` em fundo `--color-surface` com borda `--color-border`.
- Selecionado: fundo `--color-primary`, texto branco.
- Categorias disponíveis: RESTAURANTE 🍽️, MUSEU 🏛️, PRAIA 🏖️, PARQUE 🌿, VIDA_NOTURNA 🌙, COMPRAS 🛍️, HISTORICO 🏰, ATIVIDADE_AR_LIVRE 🧗.

### Indicador de Faixa de Preço
- Renderizar como cifrões: `$` a `$$$$`, com os inativos em `--color-border`.
- GRATUITO exibe badge verde com "Grátis".

### Estrelas de Avaliação
- Escala 1.0–5.0, renderizada com meia estrela.
- Cor: `--color-secondary` para preenchidas, `--color-border` para vazias.
- Exibir nota numérica + quantidade de avaliações: `4.3 (128)`.

### Permissões de Grupo (`RoleBadge`)
Badges visuais para papéis no grupo:
| Papel          | Cor de fundo | Texto       |
|----------------|--------------|-------------|
| ADMINISTRADOR  | `#1E6B5E`    | `#FFFFFF`   |
| EDITOR         | `#3B82F6`    | `#FFFFFF`   |
| MEMBRO         | `#6B7280`    | `#FFFFFF`   |
| CONVIDADO      | `#E5E7EB`    | `#1A1A2E`   |

### Código de Convite
- Exibido em fonte `JetBrains Mono`, tamanho 22px, com espaçamento entre letras.
- Fundo `--color-surface`, borda arredondada, botão de cópia ao lado.
- Indicador de validade: "Válido por X dias" em `--color-muted`.

### Estados de Feedback
| Estado       | Cor                | Ícone sugerido |
|--------------|--------------------|----------------|
| Sucesso      | `--color-success`  | ✓ check        |
| Erro         | `--color-error`    | ✕ x ou ⚠️     |
| Carregando   | `--color-primary`  | spinner        |
| Vazio        | `--color-muted`    | ilustração     |
| Sem internet | `--color-muted`    | nuvem riscada  |

---

## 4. Fluxos de Tela Principais

### 4.1 Montagem de Roteiro (BR001)
1. **Tela inicial de busca** — campo de busca por destino + botão "Usar minha localização". Raio padrão: 50km.
2. **Seleção de categorias** — grade de chips; ao menos 1 obrigatório.
3. **Filtros** — bottom sheet com: faixa de preço, avaliação mínima, período do dia.
4. **Lista de atividades** — cards com scroll infinito, ordenáveis por avaliação ou proximidade.
5. **Canvas do roteiro** — timeline dia a dia; atividades arrastáveis. Conflito de horário exibe erro inline imediato.
6. **Resumo e publicação** — escolha de privacidade (PÚBLICO / PRIVADO / COLABORATIVO) e confirmação.

### 4.2 Visualização de Roteiro de Outro Usuário (BR003)
- **Roteiro público:** acesso direto, sem autenticação necessária.
- **Roteiro privado (allow list / link):** validar sessão → exibir roteiro.
- **Roteiro privado sem permissão:** tela de bloqueio com mensagem: "Este roteiro é privado. Peça ao criador para compartilhá-lo com você." (403).
- **Roteiro inexistente ou deletado:** tela com ilustração e botão "Explorar roteiros públicos" (404).
- **Token expirado:** banner com "Sua sessão expirou. Faça login novamente." (401).
- **Falha no servidor:** tela com ícone de nuvem riscada e botão "Tentar novamente" (500).

### 4.3 Clonagem de Roteiro (BR002)
- Botão "Clonar roteiro" visível apenas para usuários autenticados em roteiros públicos ou compartilhados.
- Confirmar clonagem via bottom sheet: "Uma cópia deste roteiro será adicionada aos seus roteiros. Deseja continuar?"
- Após clonar: toast de sucesso + atalho "Ver meu roteiro".
- Erro de permissão: toast de erro discreto (403).

### 4.4 Favoritos (BR006)
- Ícone de coração no canto do `RoteiroCard`; toggle instantâneo com feedback visual.
- Tela "Meus Favoritos" com lista de roteiros favoritados.
- Se roteiro foi tornado privado após favoritado: exibir card com overlay "Indisponível" (não remover da lista, mas impedir acesso).
- Se roteiro foi deletado: remover da lista silenciosamente com toast "Um roteiro favoritado foi removido pelo criador."

### 4.5 Grupos de Viagem (BR004)
- **Criar grupo:** nome (3–50 chars), descrição opcional, imagem de capa opcional. Criador vira ADMINISTRADOR automaticamente.
- **Tela do grupo:** lista de membros (com `RoleBadge`), lista de roteiros vinculados, histórico de alterações (últimos 90 dias).
- **Gerenciar membros:** apenas ADMINISTRADOR acessa. Lista com opção de alterar papel ou remover.
- **Conflito de edição:** modal com as duas versões lado a lado e opção de escolha ou mesclagem.
- **Sair do grupo (como único admin):** bloquear ação e exibir: "Transfira a administração antes de sair."

### 4.6 Sistema de Convites (BR005)
- **Gerar código:** botão no painel do grupo → exibe código Base62 (7 dígitos) com validade.
- **Compartilhar via WhatsApp:** botão com ícone do WhatsApp → abre app com mensagem pré-formatada.
- **Convidar por username:** campo de busca de usuário → notificação push enviada ao destinatário.
- **Receber convite:** notificação com card: nome do grupo, avatar do admin, botões "ACEITAR" e "RECUSAR".
- **Aceitar:** redirecionar para a tela do grupo com toast "Você entrou em {nome_do_grupo}!".
- **Recusar:** arquivar convite; notificar admin discretamente.
- **Código expirado:** tela informativa com botão "Solicitar novo convite".

### 4.7 Busca de Roteiros de Outros Usuários (BR008)
- Campo de busca com filtros: nome, localização, datas, categoria, faixa de preço, avaliação.
- Resultados em grid de `RoteiroCard`.
- Sem resultados com filtros combinados: tela vazia com sugestão "Tente expandir os filtros ou mudar a localização."
- API fora do ar: banner de erro no topo da tela + botão "Tentar novamente".

---

## 5. Regras de Privacidade Visual

O sistema tem três estados de privacidade de roteiro. Comunique-os visualmente de forma clara:

| Tipo          | Ícone    | Label        | Comportamento visual                              |
|---------------|----------|--------------|--------------------------------------------------|
| PÚBLICO       | 🌐       | "Público"    | Visível para todos, sem restrições               |
| PRIVADO       | 🔒       | "Privado"    | Visível apenas para o dono e allow list          |
| COLABORATIVO  | 👥       | "Colaborativo"| Permite edição pelos membros da allow list       |

Esses ícones e labels devem aparecer consistentemente em: cards de roteiro, tela de edição, tela de compartilhamento e cabeçalho do roteiro.

---

## 6. Padrões de Erro e Tratamento de Exceções

Cada erro mapeado nas BRs deve ter representação visual correspondente. Use este mapeamento:

| Código de Erro                 | Mensagem ao usuário (UI)                                           | HTTP | Tipo de exibição         |
|--------------------------------|--------------------------------------------------------------------|------|--------------------------|
| `CONFLITO_HORARIO`             | "Duas atividades se sobrepõem. Ajuste os horários."               | 400  | Erro inline na timeline  |
| `DURACAO_MINIMA_NAO_ATENDIDA`  | "Este tipo de destino exige pelo menos {X} dias."                 | 400  | Toast + campo destacado  |
| `LOCALIZACAO_NAO_ENCONTRADA`   | "Não encontramos esse lugar. Tente outro endereço."               | 400  | Erro inline no campo     |
| `PERMISSAO_NEGADA`             | "Você não tem permissão para isso."                               | 403  | Tela de bloqueio         |
| `ROTEIRO_NAO_ENCONTRADO`       | "Este roteiro não existe ou foi removido."                        | 404  | Tela vazia com CTA       |
| `CONVITE_EXPIRADO`             | "Este convite expirou. Peça um novo ao administrador."            | 410  | Tela informativa         |
| `CONVITE_INVALIDO`             | "Código inválido. Verifique e tente novamente."                   | 400  | Erro inline no campo     |
| `ADMIN_OBRIGATORIO`            | "Transfira a administração antes de sair do grupo."               | 400  | Modal bloqueante         |
| `CONFLITO_EDICAO`              | "Outro membro editou este roteiro. Veja as diferenças."           | 409  | Modal comparativo        |
| `LIMITE_MEMBROS_EXCEDIDO`      | "O grupo atingiu o limite de 50 membros."                         | 400  | Toast                    |
| `MEMBRO_JA_EXISTE`             | "Esse usuário já faz parte do grupo."                             | 409  | Toast                    |
| `LIMITE_CONVITES_PENDENTES`    | "Limite de 20 convites pendentes atingido. Cancele alguns antigos."| 400 | Modal com lista          |
| `USUARIO_BLOQUEADO`            | "Não é possível entrar neste grupo."                              | 403  | Tela de bloqueio neutra  |
| Erro 401 (token expirado)      | "Sua sessão expirou. Faça login novamente."                       | 401  | Banner fixo no topo      |
| Erro 500 (servidor)            | "Algo deu errado. Tente novamente em instantes."                  | 500  | Tela de erro com retry   |
| Sem internet                   | "Sem conexão. Verifique sua internet e tente novamente."          | —    | Banner persistente       |

**Princípio:** erros nunca são vagos. Sempre diga o que aconteceu e o que o usuário pode fazer.

---

## 7. Navegação & Estrutura de Telas

### Bottom Navigation (mobile)
| Tab          | Ícone sugerido | Destino                        |
|--------------|----------------|-------------------------------|
| Explorar     | 🔍             | Busca e listagem de roteiros  |
| Meus Roteiros| 📋             | Roteiros do usuário           |
| Grupos       | 👥             | Lista de grupos de viagem     |
| Favoritos    | ♡              | Roteiros favoritados          |
| Perfil       | 👤             | Configurações e conta         |

### Hierarquia de telas (simplificada)
```
App
├── Explorar
│   ├── Busca por destino / localização
│   ├── Filtros (categoria, preço, avaliação, datas)
│   └── Detalhe do Roteiro
│       ├── Visualização (pública/privada/colaborativa)
│       ├── Clonar
│       └── Favoritar
├── Meus Roteiros
│   ├── Lista de roteiros próprios
│   ├── Criar Roteiro
│   │   ├── Selecionar destino
│   │   ├── Definir dias
│   │   ├── Adicionar atividades (com filtros)
│   │   └── Publicar (escolher privacidade)
│   └── Editar Roteiro
├── Grupos
│   ├── Lista de grupos
│   ├── Criar Grupo
│   ├── Tela do Grupo
│   │   ├── Roteiros do grupo
│   │   ├── Membros e papéis
│   │   ├── Histórico de alterações
│   │   └── Convites (gerar, enviar, gerenciar)
│   └── Entrar por código de convite
├── Favoritos
│   └── Lista de roteiros favoritados
└── Perfil
    ├── Dados do usuário
    └── Configurações
```

---

## 8. Acessibilidade & Responsividade

- Contraste mínimo AA (WCAG 2.1) em todos os pares texto/fundo.
- Foco de teclado visível em todos os elementos interativos.
- Labels descritivos em ícones sem texto: `aria-label="Favoritar roteiro"`.
- Touch targets mínimos: 44×44px.
- Respeitar `prefers-reduced-motion`: desativar animações de entrada/saída quando ativado.
- Layout responsivo: mobile-first, com breakpoints em 375px, 768px e 1024px.
- Textos escaláveis: usar `rem`; não usar `px` para tamanhos de fonte.

---

## 9. Limites de Negócio Relevantes para UI

Estes limites devem ser comunicados proativamente na interface (contadores, avisos):

| Regra                                 | Limite         | Quando exibir aviso                    |
|---------------------------------------|----------------|----------------------------------------|
| Membros por grupo                     | máx. 50        | Ao atingir 45 (aviso) e 50 (bloqueio) |
| Roteiros por grupo                    | máx. 20        | Ao atingir 18 (aviso) e 20 (bloqueio) |
| Grupos como administrador             | máx. 10        | Ao atingir 9 (aviso) e 10 (bloqueio)  |
| Convites pendentes por grupo          | máx. 20        | Ao atingir 18 e 20                     |
| Reenvio de convite                    | máx. 3 vezes   | Exibir contador "Reenvios: 2/3"        |
| Atividades por dia no roteiro         | máx. 10        | Contador visível; bloquear ao atingir  |
| Duração mínima de atividade           | 30 min         | Validar no campo de horário            |
| Duração máxima de atividade           | 8 horas        | Validar no campo de horário            |
| Intervalo mínimo entre atividades     | 15 min         | Alertar antes de confirmar             |
| Nome do grupo                         | 3–50 chars     | Contador no campo                      |
| Descrição do grupo                    | máx. 500 chars | Contador no campo                      |
| Validade do código de convite         | 7 dias (padrão)| Exibir data de expiração no código     |
| Retenção de histórico do grupo        | 90 dias        | Nota de rodapé na tela de histórico    |
| Cooldown para novo convite (recusado) | 30 dias        | Mensagem ao tentar convidar novamente  |

---

## 10. Variáveis CSS Globais Sugeridas

```css
:root {
  /* Cores */
  --color-primary:   #1E6B5E;
  --color-secondary: #F4A623;
  --color-surface:   #F7F5F0;
  --color-card:      #FFFFFF;
  --color-text:      #1A1A2E;
  --color-muted:     #6B7280;
  --color-error:     #D94F4F;
  --color-success:   #2E9E6B;
  --color-border:    #E5E7EB;

  /* Tipografia */
  --font-display: 'Sora', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* Escala de tamanho */
  --text-display: 1.75rem;  /* 28px */
  --text-heading: 1.25rem;  /* 20px */
  --text-body:    0.9375rem;/* 15px */
  --text-label:   0.8125rem;/* 13px */
  --text-caption: 0.6875rem;/* 11px */
  --text-code:    0.875rem; /* 14px */

  /* Espaçamento */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;

  /* Bordas */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-pill: 999px;

  /* Sombras */
  --shadow-card: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-modal: 0 8px 32px rgba(0,0,0,0.16);

  /* Transições */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}
```

---

## 11. O que NÃO fazer

- Não usar terminologia técnica na UI (ex: "token expirado" → "sua sessão expirou").
- Não revelar se um roteiro privado existe ao usuário sem permissão — retornar 404 mesmo que seja 403 (segurança, conforme BR008 Cenário 9).
- Não remover roteiros privados/inacessíveis da lista de favoritos sem comunicar o motivo.
- Não bloquear interação antes de validar — dê feedback imediato e inline.
- Não usar cores de erro para avisos informativos — use tons de amarelo/âmbar para avisos.
- Não criar telas de carregamento genéricas — usar skeletons no formato exato do conteúdo que será carregado.
- Não usar modais para erros simples — prefira toasts e erros inline.
- Não colocar mais de uma ação primária por tela.
