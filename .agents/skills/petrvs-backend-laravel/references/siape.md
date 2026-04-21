# Petrvs SIAPE Reference

Primary docs:

- `back-end/docs/integracao_gestor_logica.md`
- `back-end/docs/refactor-integracao-service.md`
- `back-end/docs/siape-unidade-relatorio-routes.md`

## Core Areas

- Unidade synchronization and hierarchy.
- Servidor synchronization, normalization, validation, and matricula handling.
- Gestor/chefia attribution.
- Lotacao association and correction.
- SIAPE local/API data sources.
- `SiapeLog`, audit, download logs, and process summaries.
- Tenant-aware integration behavior.

## Gestor Logic

- `montarArrayChefias` should return entries shaped like `['id_unidade' => ..., 'id_chefe' => ...]`.
- Empty `cpf_titular_autoridade_uorg` means the unit has no chefe and should produce `id_chefe => null`.
- When CPF exists, resolve the servidor precisely through `integracao_servidores` using CPF plus the unit SIAPE exercise code.
- Then resolve the corresponding `usuarios` row.
- If the user is not found, log through `SiapeLog` and continue.
- Ensure the chefe is lotado in the unit where they exercise chefia.
- Avoid reprocessing when the user is already gestor for the same unit.

## Refactoring Direction

- Keep `IntegracaoService` public compatibility while extracting focused collaborators.
- Candidate collaborators: token provider, SIAPE clients, unidade sync service, servidor sync service, lotacao updater, validators, and logging port.
- Prefer interfaces and constructor injection for external services, repositories, and logging.
- Replace raw SQL gradually with repositories when behavior is covered.

## Routes And API Shape

- Existing unit SIAPE routes include consult, process, export, and download.
- `POST /api/unidade/relatorio-processamento-siape` returns aggregate processing data:
  `success`, `chefeCpf`, and `quantidadeServidoresLotados`.
- `POST /api/unidade/processar-siape` may return `log` and `resumo`.
- Summary item status values follow the CPF flow: `sucesso`, `parcial`, `erro`.

## Test Guidance

- Pure formatting/normalization: Unit with mocks.
- Tenant database behavior: `tests/IntegrationTenant`.
- Preserve process logs and audit behavior in tests when user-visible.
- SIAPE payloads may contain personal data; keep fixtures minimal and masked where possible.
