---
alwaysApply: false
description: 
---
## Regras do Projeto (Resumo)

- Back-end: comandos SEMPRE via `docker exec` no container `petrvs_php` (php artisan, `vendor/bin/pest`).
- Front-end: comandos SEMPRE via `docker exec` no container `petrvs_node` (ng, npm).
- Testes: usar Pest para unitários; seguir padrões em `back-end/docs/pest.md#L1-78`.
- Padrões: Laravel SOLID, Services, Eloquent Resources; Angular TS estrito, RxJS, evitar `any`.
- Proibido: rodar comandos na máquina host; usar APIs obsoletas; expor segredos.
- Versões: PHP 8+, Laravel 9+, Angular 14+.
- CI: testes devem passar antes de mesclar PRs.