# GitHub User Explorer

Aplicação client-side para buscar usuários do GitHub, exibir detalhes do perfil, listar repositórios com ordenação e paginação, e mostrar detalhes de cada repositório.

**Demo em produção:** [https://desafio-github-search.vercel.app/](https://desafio-github-search.vercel.app/)

## Como usar

1. Acesse a [demo](https://desafio-github-search.vercel.app/) ou rode localmente com `npm install && npm run dev`.
2. Na home, digite um username (ex.: `torvalds`) ou clique em uma sugestão e pressione **Buscar**.
3. Na página do usuário, confira o perfil à esquerda (desktop) ou no topo (mobile) e a lista de repositórios.
4. Use **Ordenar por** para alternar entre **Mais estrelas** (`sort=stars-desc`, padrão) e **Menos estrelas** (`sort=stars-asc`).
5. Navegue entre páginas com os controles de paginação (10 repositórios por página).
6. Clique em um repositório para ver os detalhes; use **Abrir no GitHub** para abrir a página oficial.
7. Teste um username inexistente (ex.: `usuario-que-nao-existe-123`) para ver o estado de erro 404.

## Screenshots

| Busca | Perfil (desktop) | Perfil (mobile) |
|-------|------------------|-----------------|
| ![Página de busca](./docs/screenshots/search-page.png) | ![Perfil desktop](./docs/screenshots/user-page-desktop.png) | ![Perfil mobile](./docs/screenshots/user-page-mobile.png) |

## Funcionalidades

- **Busca de usuários** — campo com sugestões rápidas (`lucasmontano`, `torvalds`, `diego3g`, `maykbrito`)
- **Perfil do usuário** — avatar, bio, site, link externo para o GitHub, contadores de repositórios, seguidores e seguindo
- **Listagem de repositórios** — cards com linguagem, estrelas, forks e data de atualização; paginação de 10 por página
- **Ordenação por estrelas** — mais estrelas (padrão) ou menos estrelas via GitHub Search API
- **Detalhes do repositório** — metadados completos e botão "Abrir no GitHub"
- **Estados de UI** — skeletons com Placeholder glow, mensagens de erro e usuário não encontrado (404)
- **Layout responsivo** — mobile-first; inputs com `font-size` ≥ 16px para evitar zoom automático no iOS Safari
- **Cache de dados** — TanStack Query evita re-fetch desnecessário ao navegar entre páginas

## Stack

- React 19 + TypeScript
- Vite
- Bootstrap 5 + React-Bootstrap
- React Router DOM
- TanStack Query v5
- Axios
- React Icons
- Vitest + Testing Library

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Preview (build local)

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Testes

```bash
npm run test
npm run test:coverage
```

O projeto possui **12 arquivos de teste** (45 testes no total), cobrindo:

- **Hooks:** `useGithubUser`, `useRepositories`
- **Services:** `searchUserRepositories`
- **Utils:** `mapSortToSearchOrder`, `format`, `parsePageParam`, `parseSortParam`
- **Páginas:** `UserPage`
- **Componentes:** `SearchForm`, `RepositoryCard`, `RepositoryList`, `RepositoryPagination`, `RepositorySortSelect`

**Cobertura (`npm run test:coverage`):** o relatório mede os módulos-fonte cobertos pelos testes acima — hooks, services, utils, componentes testados, `UserPage` e `shared/lib` (conforme `vite.config.ts`).

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Página de busca |
| `/user/:username` | Perfil do usuário e repositórios |
| `/repository/:owner/:repo` | Detalhes do repositório |

### Query params (`/user/:username`)

| Param | Valores | Padrão | Descrição |
|-------|---------|--------|-----------|
| `page` | inteiro ≥ 1 | `1` | Página atual da listagem |
| `sort` | `stars-desc`, `stars-asc` | `stars-desc` | Ordenação por estrelas (mais/menos) |

Exemplo: `/user/torvalds?page=2&sort=stars-asc`

## API

Utiliza a API REST pública do GitHub (sem autenticação):

| Endpoint | Uso |
|----------|-----|
| `GET /users/{username}` | Dados do perfil |
| `GET /search/repositories?q=user:{username}&sort=stars&order={desc\|asc}&per_page=10&page={n}` | Lista paginada de repositórios ordenados por estrelas |
| `GET /repos/{owner}/{repo}` | Detalhes do repositório |

## Arquitetura

Projeto organizado por features em `src/features/`:

```
src/
├── app/              # router, layouts, loaders, providers, error boundary
├── features/
│   ├── search/       # busca de usuários
│   ├── github-user/  # perfil, useGithubUser, useUserPageParams e parsers de URL
│   └── repositories/ # listagem, paginação, detalhes e hook useRepositories
└── shared/           # api, ui, lib, styles
```

- **TanStack Query** — cache de 5 min; `queryKey` `["user", username]` para perfil e `["repositories", username, page, sort]` para repositórios
- **Hooks** (`useGithubUser`, `useRepositories`) — consomem services Axios via `useQuery`
- **Estado na URL** — `useUserPageParams` sincroniza `page` e `sort` na rota do usuário; query params são resetados ao trocar de username
- **Loader** (`repositoryLoader`) — pré-carrega dados na rota de detalhes do repositório
- **Barrel exports** (`index.ts`) em cada feature — evitar deep imports
- **Design tokens** — tema escuro via `data-bs-theme="dark"` e variáveis CSS em `src/shared/styles/index.css`
- **Componentes UI** — wrappers finos em `shared/ui` sobre React-Bootstrap mantendo API estável

## Decisões técnicas

### Bootstrap + tema escuro

O edital cita Bootstrap como referência de **layout responsivo**. A UI usa React-Bootstrap com:

- Grid responsivo (`Row`/`Col`), `Navbar`, `Form`, `Card`, `Placeholder`
- Tema escuro via `data-bs-theme="dark"` e override de variáveis (`--bs-body-bg`, `--bs-primary`, etc.)
- Wrappers em `shared/ui` para não acoplar features ao Bootstrap diretamente

### Search API + paginação

A listagem usa `GET /search/repositories?q=user:{username}&sort=stars` para garantir repositórios ordenados por popularidade globalmente, inclusive para usuários com 100+ repos. Paginação de 10 itens por página com `total_count` da API.

Limitações: Search API retorna no máximo 1000 resultados; rate limit de 10 req/min sem autenticação (erro 403 exibido via `getErrorMessage`). TanStack Query mitiga re-fetch com cache de 5 minutos.

### TanStack Query

- Cache por `["user", username]` e `["repositories", username, page, sort]`
- Revisitas à mesma página ou usuário não disparam nova requisição dentro do `staleTime`
- `placeholderData: keepPreviousData` mantém a listagem visível durante troca de página, evitando flicker
- `isFetching` desabilita controles de paginação durante troca de página

---
