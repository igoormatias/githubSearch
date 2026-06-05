# Checklist de Implementação

| Requisito | Status |
|-----------|--------|
| Buscar usuários do GitHub | Concluído |
| Detalhes do usuário (avatar, bio, seguidores, localização, empresa) | Concluído |
| Listagem de repositórios com ordenação | Concluído |
| Ordenação padrão: estrelas decrescentes | Concluído |
| Página de detalhes com link externo para o GitHub | Concluído |
| Rotas com React Router | Concluído |
| API do GitHub via Axios | Concluído |
| Layout responsivo (mobile-first) | Concluído |
| Arquitetura feature-based | Concluído |

## Auditoria de regras

- [x] Sem `any`
- [x] Sem default exports (src)
- [x] Sem deep imports (barrel exports)
- [x] Sem `useEffect` para fetch (React Router loaders)
- [x] Sem `key={index}`
- [x] Somente design tokens
- [x] Estados de loading, error e empty
- [x] `npm run lint` passa
- [x] `npm run build` passa
