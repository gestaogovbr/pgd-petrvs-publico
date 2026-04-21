# Guia Codex do Petrvs-PGD

## Verdades do Projeto

- Monorepo com `back-end/` em Laravel 10/PHP 8.2 e `front-end/` em Angular 21.
- O back-end usa MariaDB/MySQL, `stancl/tenancy`, Sanctum, Horizon, Telescope, repositories, DTOs, Pest, PHPStan/Larastan e integrações SIAPE.
- A orientação detalhada de back-end fica em `back-end/docs`. Leia o documento relevante antes de alterar repositories, testes, código sensível ao PHPStan, fluxos SIAPE ou comportamento tenant.
- As fontes de skills Codex deste repo ficam em `.agents/skills`. Mantenha-as versionadas ali e sincronize para `~/.codex/skills` quando precisarem ficar disponíveis globalmente.
- O caminho raiz `.codex` atualmente é um arquivo vazio. Não trate como diretório, salvo se uma mudança explicitamente o converter.

## Comandos

- Rode comandos de back-end somente dentro do container PHP:
  `docker exec petrvs_php sh -lc "cd /var/www && <command>"`
- Antes de comandos de back-end, se `petrvs_php` ou `petrvs_db` existirem mas estiverem parados, inicie-os com `docker start petrvs_php` e `docker start petrvs_db`.
- Se `petrvs_php` ou `petrvs_db` não existirem, crie/inicie a stack de desenvolvimento a partir de `resources/docker/dev/docker-compose.yml` com:
  `docker compose -f resources/docker/dev/docker-compose.yml up -d petrvs_db petrvs_php`
- Rode comandos de front-end somente dentro do container Node:
  `docker exec petrvs_node sh -lc "cd /usr/src/app && <command>"`
- Não rode `artisan`, Pest, PHPStan, Composer, `npm`, `ng`, builds ou comandos de teste diretamente no host.
- Instalação do back-end:
  `docker exec petrvs_php sh -lc "cd /var/www && composer install --no-interaction --prefer-dist"`
- Testes de back-end:
  `docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest --ci"`
- Teste focado de back-end:
  `docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest tests/path/ExampleTest.php"`
- PHPStan em escopo focado:
  `docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse <path> --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"`
- Instalação, start, build, lint e testes do front-end usam o mesmo wrapper do container Node com `npm install`, `npm start`, `npm run build`, `npm run lint` ou `npm test`.

## Regras de Back-End

- Controllers recebem requisições e delegam; regra de negócio pertence a Services, casos de uso, repositories, DTOs, validators, policies e resources.
- Prefira injeção explícita de dependências, contracts, métodos pequenos, retornos antecipados, constantes em vez de números mágicos e nomes de domínio claros.
- Repositories seguem `back-end/docs/repository-pattern.md`: contracts em `Contracts`, implementações Eloquent em `Eloquent`, DTOs para retornos compostos e bindings em `RepositoryServiceProvider`.
- Proteja autorização, validação, limites de tenancy, mass assignment, injeção SQL, exposição de dados sensíveis e consultas N+1.
- Para SIAPE e integrações, preserve comportamento de `SiapeLog`/auditoria e valide contexto tenant, lotação, gestor, unidade, servidor e fluxos de fallback.

## Regras de Front-End

- Trate o front-end como Angular 21 com expectativas estritas de TypeScript.
- Use os limites de módulos já estabelecidos em `front-end/src/app/modules`, componentes compartilhados em `front-end/src/app/components`, services em `front-end/src/app/services` e models em `front-end/src/app/models`.
- Prefira fluxos RxJS tipados e padrões Angular já presentes no módulo. Evite `any`, salvo quando houver um motivo documentado de fronteira dinâmica.

## Estilo e PRs

- Use espaços para indentação. O PHP do back-end segue nomenclatura PSR-4: classes em `StudlyCase`, métodos/propriedades em `camelCase`.
- Pastas de componentes Angular ficam em kebab-case e preservam a nomenclatura `*.component.ts|html|scss|spec.ts`.
- Prefira commits no formato `type(scope): resumo imperativo`, por exemplo `feat(relatorios): add export filter`.
- Notas de PR devem descrever o problema, resumir a solução, vincular issue ou ticket, incluir screenshots para mudanças de UI e destacar migrações ou impacto de deploy.

## Regras de Teste

- Testes unitários em `back-end/tests/Unit` usam Pest + Mockery e não tocam banco de dados.
- Testes de integração do banco central usam `back-end/tests/Integration` com `Tests\DatabaseTestCase`.
- Testes de integração tenant-aware usam `back-end/tests/IntegrationTenant` com `Tests\DatabaseTenantTestCase`.
- Mudanças de comportamento no back-end precisam de testes focados, exceto mudanças apenas em controller que só roteiam/delegam sem regra de negócio.
- Migrações tenant exigem verificar se `back-end/database/schema/tenant-schema.sql` deve ser regenerado.

## Portão de Qualidade

- Para mudanças de código, rode primeiro o teste relevante mais estreito; depois rode testes mais amplos quando o risco ou o alcance da mudança justificar.
- Rode PHPStan no caminho de back-end alterado, não apenas em `app/Models`.
- Não versione secrets, certificados gerados, valores de `.env`, dumps locais ou artefatos gerados sem relação com a tarefa.
- Preserve mudanças do usuário na working tree. Não reverta edições não relacionadas.

## Perfis Codex

- Use `petrvs-backend-laravel` para implementação normal em back-end Laravel.
- Use `petrvs-repository-pattern` ao criar ou refatorar repositories, contracts, DTOs ou bindings de providers.
- Use `petrvs-pest-testing` para testes Pest e decisões entre Unit e Integration.
- Use `petrvs-phpstan-quality` para tipos Larastan/PHPStan e limpeza de PHPDoc.
- Use `petrvs-siape-integracao` para SIAPE, gestores, servidores, unidades, lotação e logs de integração.
- Use `petrvs-code-review` para revisão de segurança/performance/padrões.
- Use `petrvs-tech-docs` para ADRs, documentação de API, runbooks e notas de arquitetura.
- Use `petrvs-angular-ui` para UI Angular 21 e trabalho em services.
