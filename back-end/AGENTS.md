# Guia Codex do Back-End Petrvs

## Verdades do Projeto

- Este diretório é uma aplicação Laravel 10 em PHP 8.2.
- A aplicação usa MariaDB/MySQL, `stancl/tenancy`, Sanctum, Horizon, Telescope, integrações SIAPE, repositories, DTOs, Pest e PHPStan/Larastan.
- Rode todos os comandos via `petrvs_php`:
  `docker exec petrvs_php sh -lc "cd /var/www && <command>"`
- Antes de rodar comandos de back-end, se `petrvs_php` ou `petrvs_db` já existirem mas estiverem parados, inicie-os com `docker start petrvs_php` e `docker start petrvs_db`.
- Se esses containers não existirem, crie/inicie a stack de desenvolvimento a partir da raiz do repo com:
  `docker compose -f resources/docker/dev/docker-compose.yml up -d petrvs_db petrvs_php`
- Não rode comandos de back-end diretamente no host.

## Referências Obrigatórias

- Testes: `docs/pest.md` e `docs/pest-bd.md`.
- Repositories: `docs/repository-pattern.md`.
- PHPStan: `docs/phpstan.md` e `phpstan.neon.dist`.
- SIAPE e fluxos de integração: `docs/integracao_gestor_logica.md`, `docs/refactor-integracao-service.md` e `docs/siape-unidade-relatorio-routes.md`.

## Regras de Arquitetura

- Controllers devem permanecer finos: apenas validação/manuseio da request, pontos de entrada de autorização, delegação e formatação de resposta.
- Regra de negócio pertence a Services, colaboradores específicos de domínio, validators, repositories, DTOs, policies, resources, jobs ou commands.
- Prefira injeção por construtor e contracts quando repositories ou integrações externas estiverem envolvidos.
- Mantenha métodos pequenos, prefira retornos antecipados em vez de condicionais aninhadas, evite números mágicos e remova imports não utilizados.
- Preserve explicitamente os limites de tenancy. Tenha cuidado com conexões central vs tenant, inicialização de tenant e isolamento de dados.
- Preserve comportamento de auditoria/log, especialmente `SiapeLog`, logs Laravel, auditing e logs de processamento de integração.

## Regras de Repository

- Siga `docs/repository-pattern.md`.
- Use `php artisan make:repository <Model>Repository` pelo container PHP para novos repositories.
- Coloque contracts de leitura/escrita em `App\Repository\<Modulo>\Contracts`.
- Coloque implementações Eloquent em `App\Repository\<Modulo>\Eloquent`.
- Prefira `AbstractEloquentReadRepository` e `AbstractEloquentWriteRepository` para operações genéricas.
- Retorne DTOs para dados compostos. Evite arrays associativos soltos para retornos de domínio com múltiplos campos.
- Registre bindings de interfaces em `App\Providers\RepositoryServiceProvider`.
- Services devem consumir contracts ou facades de repository de domínio, não detalhes crus de query.

## Regras de Teste

- Testes unitários ficam em `tests/Unit` e usam Pest + Mockery.
- Testes unitários não devem usar `Schema::create`, `DB::table(...)->insert`, `RefreshDatabase`, setup de tenant ou persistência real de models.
- Testes de integração do banco central ficam em `tests/Integration` e usam `Tests\DatabaseTestCase`.
- Testes de integração tenant ficam em `tests/IntegrationTenant` e usam `Tests\DatabaseTenantTestCase`; o contexto tenant é inicializado automaticamente.
- Use `IntegrationTenant` para regras de negócio tenant, repositories sobre dados tenant, fluxos SIAPE tenant e comportamento de model que precise do schema tenant.
- Se uma migração tenant alterar schema, avalie se `database/schema/tenant-schema.sql` precisa ser regenerado.

## Comandos de Qualidade

- Pest completo:
  `docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest --ci"`
- Pest focado:
  `docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest tests/Unit/Services/ExampleTest.php"`
- Suite de integração tenant:
  `docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest --testsuite=IntegrationTenant"`
- PHPStan em caminho focado:
  `docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse app/Services/ExampleService.php --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"`
- PHPStan completo em `app`:
  `docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse app --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"`

## Segurança e Performance

- Valide entradas, aplique autorização e proteja o escopo tenant antes do acesso a dados.
- Evite expor CPF, tokens, logs ou payloads de integração salvo quando o endpoint exigir.
- Evite consultas N+1; use eager loading, métodos de query específicos em repositories e índices quando apropriado.
- Prefira transactions para operações de negócio com múltiplas escritas.
- Trate strings SQL, filtros dinâmicos, downloads de arquivo e respostas externas do SIAPE como superfícies sensíveis de segurança.
