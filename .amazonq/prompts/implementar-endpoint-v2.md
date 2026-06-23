# Implementar endpoint V2 (TDD, sem ServiceBase)

## Passo 0: Ler o planejamento ANTES de qualquer código

1. Ler `back-end/docs/plano-trabalho/planejamento-<numero>.md` (rotas, body, guards, quem)
2. Ler `back-end/docs/plano-trabalho/ticket-<numero>.md` se precisar de critérios de aceite
3. Identificar: qual endpoint, quais campos, quais guards, quem pode acessar, quais RNs
4. Verificar a seção **"Quem"** — perfis autorizados, restrições por perfil
5. Só depois de entender o contexto, começar a olhar o código

Se não encontrar o planejamento, perguntar ao usuário.

## Referências obrigatórias
- `back-end/docs/plano-trabalho/planejamento-<numero>.md`
- `back-end/docs/pest.md` e `back-end/docs/pest-bd.md`
- `back-end/database/schema/tenant-schema.sql`

## Fluxo por endpoint

### 1. RequestValidator
- Criar `PlanoTrabalho<Entidade>RequestValidator` com métodos estáticos por action
- Usa `$request->validate()` do Laravel — recebe `Request`, retorna `array`
- Mensagens de erro customizadas em português
- Implementar em `V2/<Feature>/Validators/`

### 2. DTO (TDD)
- Criar teste primeiro → RED → Implementar → GREEN
- Implementar em `V2/<Feature>/DTOs/` ou `V2/<Feature>/<Subtipo>/`
- Um DTO por operação quando os campos diferem (ex: `StoreDTO`, `UpdateDTO`)

### 2. Autorização e Validação de negócio (TDD)
- Mockar repositories via construtor (NÃO usar `overload:`)
- Mockar models com `makePartial()`
- SEMPRE implementar autorização conforme seção "Quem"
- Se não especificado, perguntar ao usuário

### 3. Repository
- `php artisan make:repository <Model>` para novos repositories
- Seguir `.amazonq/rules/repository-rules.md`

### 4. Service (TDD)
- Orquestrador: Validação → DTO → Repository
- Recebe dados já validados pelo controller (primitivos ou DTOs)
- Reutilizar entidades já carregadas pela validação

### 5. Controller
- Sem testes unitários
- Nomenclatura: controller inclui contexto do módulo pai (ex: `PlanoTrabalhoConsolidacaoController`, não `ConsolidacaoController`)
- Fluxo: RequestValidator → DTO (se aplicável) → Service → JSON
- Catch order: `ValidationException` ($e->status) → `IBaseException` ($e->getCode()) → `Throwable` (500)

### 6. E2E (IntegrationTenant)
- Registrar rotas de teste sem middleware auth
- `actingAs` + factories reais
- POST: `assertDatabaseHas`; GET: verificar retorno
- DELETE com SoftDeletes: usar `assertSoftDeleted`, NÃO `assertDatabaseMissing`
- Testar input inválido (400) separado de regra de negócio violada (422)

## Regras operacionais
- `test()` ao invés de `it()` nos describes do Pest
- Rodar todos os testes unitários ao final
- NUNCA usar append para adicionar métodos em PHP — sempre ler e usar replace
- Após cada modificação em PHP, rodar `php -l <arquivo>` dentro do container
- Ao mockar Models com `makePartial()`, `/** @var ConcreteModel */` APENAS se usar `setRelation`/`setAttribute`
