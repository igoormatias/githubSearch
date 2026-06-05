# GitHub User Explorer

Aplicação client-side para buscar usuários do GitHub, exibir detalhes do perfil, listar repositórios com ordenação e mostrar detalhes de cada repositório.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router DOM (loaders para busca de dados)
- Axios
- React Icons

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

## Lint

```bash
npm run lint
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
