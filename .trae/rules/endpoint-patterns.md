---
alwaysApply: false
description: Sempre que um endpoint V2 for criado ou modificado
---
## Padrões de Endpoints V2 (Back-end)

### Estrutura de diretórios
- Subtipos de uma entidade ficam em subdiretórios do módulo pai (ex: TCR é tipo de Documento → `Documento/TCR/`)
- DTOs ficam próximos do contexto: `V2/<Feature>/DTOs/` ou `V2/<Feature>/<Subtipo>/` para DTOs específicos

### DTOs
- Substituir arrays soltos por DTOs tipados com `fromArray()` e `toArray()`
- DTOs são objetos de transferência puros: recebem dados já resolvidos, NÃO orquestram dependências
- DTOs que recebem dados do request devem ter `fromRequest()` delegando ao `fromArray()`
- DTOs podem ter métodos de consulta derivados dos seus campos para melhorar legibilidade
- Sufixo em inglês: `DTO` para objetos de transferência

### Controller
- Controller valida input via `RequestValidator` e trata dados com DTO antes de chamar o service
- Controller NÃO contém lógica de negócio — apenas: validar request → montar DTO → chamar service → retornar JSON
- Rotas RESTful: `POST /recurso` para criar, `DELETE /recurso` para remover (ex: `POST /assinatura-tcr`)
- Nomenclatura: controller deve incluir o contexto do módulo pai para evitar ambiguidade (ex: `PlanoTrabalhoConsolidacaoController`, não `ConsolidacaoController`)
- Catch order: `ValidationException` (400) → `IBaseException` ($e->getCode()) → `Throwable` (500)
- `ValidationException` (input malformado) retorna **400 Bad Request** — o request nem foi processado
- `IBaseException` (regras de negócio) retorna o código da exceção (404, 422, 403) — o request foi processado mas violou uma regra

### Service
- Service é orquestrador: Validação → DTO → Repository. Não contém regras de negócio nem queries
- Service recebe dados já validados pelo controller (primitivos ou DTOs)
- NÃO delegar para V1/ServiceBase, NÃO usar `Model::find()` — sempre repository
- Evitar queries redundantes: se a validação já carregou uma entidade, reutilizar o objeto

### Validators
- Validações de request e de negócio ficam na mesma pasta `Validators/`
- Sufixos: `RequestValidator`, `StoreValidator`, `AuthorizationValidator`
- **RequestValidator**: validação de input (campos obrigatórios, tipos, tamanhos). Usa `$request->validate()` do Laravel. Recebe `Request`, retorna `array` validado. Método estático por action (ex: `reabrir(Request $request)`)
- **StoreValidator / AuthorizationValidator**: validação de negócio. Recebe repositories via construtor, NÃO chama `Model::find()`
- Validators de autorização devem retornar a entidade já carregada para reuso no service
- Validators de regra de negócio podem receber o model já carregado
- Validator valida pré-condições e lança exceções. NÃO deve conter lógica que não resulta em exceção

### Policy
- Regras de domínio que não são validação (não lançam exceção) nem acesso a dados ficam em classes Policy
- Policy recebe repositories via construtor e retorna decisões (bool, enum, etc)
- Exemplo: `TCRAssinaturaPolicy` decide se todas as assinaturas foram satisfeitas

### Exceções e HTTP Status Codes
- Usar exceções tipadas: `NotFoundException` (404), `ValidateException` (422), `ForbiddenException` (403)
- O controller usa `$e->getCode()` para o HTTP status, sem hardcode
- **400 Bad Request**: `ValidationException` — input malformado, campos ausentes/inválidos. O request NÃO foi processado
- **422 Unprocessable Entity**: `ValidateException` — input válido mas viola regra de negócio. O request FOI processado
- **404 Not Found**: `NotFoundException` — recurso não existe
- **403 Forbidden**: `ForbiddenException` — usuário sem permissão
- **500 Internal Server Error**: `Throwable` genérico — erro inesperado, logar e retornar mensagem genérica

### Repository
- Repository é estritamente acesso a dados — NÃO colocar lógica de negócio, navegação de hierarquia ou decisões condicionais
- Facades podem ter métodos tipados por contexto (ex: `createFromTCR(TCRDocumentoDTO)`)
- Relações de eager loading para contextos específicos ficam no repository (ex: `loadRelacoesTCR`)
- Ao navegar hierarquia de entidades, SEMPRE usar repository — nunca `Model::find()` direto
- Não confiar em relações cacheadas do model (`$model->relation ??`) — buscar fresh via repository

### Autorização
- SEMPRE implementar autorização nos endpoints — não deixar abertos por omissão
- Se o planejamento não especificar restrição de acesso, perguntar ao usuário

### Desacoplamento V1
- Ao desacoplar de ServiceBase/V1, extrair apenas o necessário em classes especializadas (Provider, Builder, Renderer)
- Para artefatos complexos (ex: documento com template), separar em: Provider → Builder → Renderer → DTO
