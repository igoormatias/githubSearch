# GitHub User Explorer

Aplicação client-side para buscar usuários do GitHub, exibir detalhes do perfil, listar repositórios com ordenação e mostrar detalhes de cada repositório.

**Demo em produção:** [https://desafio-github-search.vercel.app/](https://desafio-github-search.vercel.app/)

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

## Rotas

- `/` — Página de busca
- `/user/:username` — Perfil do usuário e repositórios
- `/repository/:owner/:repo` — Detalhes do repositório

## API

Utiliza a API REST pública do GitHub:

- `GET /users/{username}`
- `GET /users/{username}/repos`
- `GET /repos/{owner}/{repo}`

## Arquitetura

Projeto organizado por features em `src/features/`:

```
src/
├── app/              # router, layouts, providers
├── features/
│   ├── search/       # busca de usuários
│   ├── github-user/  # perfil e hooks de usuário
│   └── repositories/ # listagem, ordenação e detalhes
└── shared/           # api, ui, lib, styles
```

- **Hooks** (`useGithubUser`, `useRepositories`) consomem services e gerenciam loading/erro na página do usuário
- **Loader** do React Router na rota de detalhes do repositório
- **Barrel exports** (`index.ts`) em cada feature — evitar deep imports

## Checklist de requisitos

| Requisito | Status |
|-----------|--------|
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
