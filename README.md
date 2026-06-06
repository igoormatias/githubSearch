# GitHub User Explorer

Aplicação client-side para buscar usuários do GitHub, exibir detalhes do perfil, listar repositórios com ordenação e mostrar detalhes de cada repositório.

**Demo em produção:** [https://desafio-github-search.vercel.app/](https://desafio-github-search.vercel.app/)

## Como usar

1. Acesse a [demo](https://desafio-github-search.vercel.app/) ou rode localmente com `npm install && npm run dev`.
2. Na home, digite um username (ex.: `vercel`) ou clique em uma sugestão e pressione **Buscar**.
3. Na página do usuário, confira o perfil à esquerda (desktop) ou no topo (mobile) e a lista de repositórios.
4. Use **Ordenar por** para alternar entre estrelas, forks, nome ou data de atualização.
5. Clique em um repositório para ver os detalhes; use **Abrir no GitHub** para abrir a página oficial.
6. Teste um username inexistente (ex.: `usuario-que-nao-existe-123`) para ver o estado de erro 404.

## Screenshots

| Busca | Perfil (desktop) | Perfil (mobile) |
|-------|------------------|-----------------|
| ![Página de busca](./docs/screenshots/search-page.png) | ![Perfil desktop](./docs/screenshots/user-page-desktop.png) | ![Perfil mobile](./docs/screenshots/user-page-mobile.png) |

## Funcionalidades

- **Busca de usuários** — campo com sugestões rápidas (`gaearon`, `torvalds`, `vercel`, `kentcdodds`)
- **Perfil do usuário** — avatar, bio, site, link externo para o GitHub, contadores de repositórios, seguidores e seguindo
- **Listagem de repositórios** — cards com linguagem, estrelas, forks e data de atualização
- **Ordenação** — por estrelas (padrão), forks, nome ou data de atualização
- **Detalhes do repositório** — metadados completos e botão "Abrir no GitHub"
- **Estados de UI** — skeletons com shimmer, mensagens de erro e usuário não encontrado (404)
- **Layout responsivo** — mobile-first; inputs com `font-size` ≥ 16px para evitar zoom automático no iOS Safari

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router DOM
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

29 testes cobrem hooks (`useGithubUser`, `useRepositories`), utilitários (`sort-repositories`, `format`), e componentes (`SearchForm`, `RepositoryCard`, `RepositorySortSelect`).

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Página de busca |
| `/user/:username` | Perfil do usuário e repositórios |
| `/repository/:owner/:repo` | Detalhes do repositório |

## API

Utiliza a API REST pública do GitHub (sem autenticação):

| Endpoint | Uso |
|----------|-----|
| `GET /users/{username}` | Dados do perfil |
| `GET /users/{username}/repos` | Lista de repositórios |
| `GET /repos/{owner}/{repo}` | Detalhes do repositório |

## Arquitetura

Projeto organizado por features em `src/features/`:

```
src/
├── app/              # router, layouts, loaders, error boundary
├── features/
│   ├── search/       # busca de usuários
│   ├── github-user/  # perfil e hook useGithubUser
│   └── repositories/ # listagem, ordenação, detalhes e hook useRepositories
└── shared/           # api, ui, lib, styles
```

- **Hooks** (`useGithubUser`, `useRepositories`) — fetch via services Axios, com loading/erro/cancelamento na página do usuário
- **Loader** (`repositoryLoader`) — pré-carrega dados na rota de detalhes do repositório
- **Barrel exports** (`index.ts`) em cada feature — evitar deep imports
- **Design tokens** — cores e tipografia centralizados em `src/shared/styles/`

## Checklist de requisitos

| Requisito do desafio | Status |
|----------------------|--------|
| Buscar usuários do GitHub | Concluído |
| Detalhes do usuário (avatar, bio, seguidores, etc.) | Concluído |
| Listagem de repositórios com ordenação | Concluído |
| Ordenação padrão: estrelas decrescentes | Concluído |
| Página de detalhes do repositório com link externo para o GitHub | Concluído |
| Rotas com React Router | Concluído |
| API do GitHub via Axios | Concluído |
| Layout responsivo | Concluído |
| Arquitetura feature-based | Concluído |
| Testes automatizados (hooks, utils, componentes) | Concluído |

---

Desenvolvido por **Igor Matias** para o desafio técnico **Desbravador Software**.

Repositório: [github.com/igoormatias/githubSearch](https://github.com/igoormatias/githubSearch)
