---
name: petrvs-angular-ui
description: Use ao implementar, refatorar, depurar ou revisar frontend Angular 21 do Petrvs-PGD, incluindo modules, components, services, routes, forms, fluxos RxJS, templates, testes, lint e build.
---

# UI Angular Petrvs

## Comece Por Aqui

1. Leia `AGENTS.md`.
2. Inspecione o module afetado em `front-end/src/app/modules` e os itens compartilhados em `components`, `services` e `models`.
3. Carregue `../petrvs-backend-laravel/references/commands.md` antes de rodar comandos frontend.

## Fluxo

- Trate a aplicação como Angular 21.
- Preserve limites de modules e a nomeação existente de components/services.
- Prefira TypeScript estrito, models tipados e fluxos RxJS tipados.
- Evite `any`, salvo quando o limite for realmente dinâmico e o motivo estiver claro.
- Mantenha templates seguros para dados vindos do servidor.
- Use components e padrões de UI já estabelecidos na feature.
- Rode comandos focados de lint/test/build via `petrvs_node` quando aplicável.

## Comandos

```bash
docker exec petrvs_node sh -lc "cd /usr/src/app && npm run lint"
docker exec petrvs_node sh -lc "cd /usr/src/app && npm test"
docker exec petrvs_node sh -lc "cd /usr/src/app && npm run build"
```
