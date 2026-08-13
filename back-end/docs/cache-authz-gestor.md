# Cache de Autorização: isUsuarioGestorRecursivo

## Problema

O método `isUsuarioGestorRecursivo` executa uma CTE recursiva (WITH RECURSIVE) no banco a cada chamada de autorização. Numa única request pode ser invocado múltiplas vezes (listagem de PTs, por exemplo), gerando N queries recursivas para o mesmo usuário.

## Estratégia (baseado em `unidades-cache-strategy.md`)

Duas chaves de cache:

| Cache Key | Valor | TTL |
|-----------|-------|-----|
| `unidade-hierarquia:{unidade_id}` | `string[]` — IDs de todas as subordinadas recursivas | 1h |
| `unidades-geridas:{usuario_id}` | `string[]` — IDs das unidades onde o usuário é GESTOR/SUBSTITUTO/DELEGADO | 1h |

### Algoritmo

```
isUsuarioGestorRecursivo(unidadeId, usuarioId):
  1. unidadesGeridas = cache("unidades-geridas:{usuarioId}") ?? buscarNoBD e cachear
  2. se unidadeId ∈ unidadesGeridas → true (é gestor direto)
  3. para cada unidadeGeridaId em unidadesGeridas:
       subordinadas = cache("unidade-hierarquia:{unidadeGeridaId}") ?? buscarNoBD e cachear
       se unidadeId ∈ subordinadas → true
  4. → false
```

Zero queries recursivas quando cache está quente. No pior caso (cache frio), executa as mesmas queries que hoje, mas cacheia para as próximas chamadas.

## Arquitetura Atual (AS-IS)

```
┌──────────────────────────────┐
│  V2 Validators / Traits      │  (ValidaAutorizacaoTrait, AuthorizationValidators)
│  chamam UnidadeRepository    │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│  UnidadeRepository (Facade)  │  App\Repository\UnidadeRepository
│  delega para readRepository  │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│  UnidadeReadRepositoryContract│  Interface
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│  EloquentUnidadeReadRepository│  Query CTE recursiva direta
└──────────────────────────────┘
```

### Callers de `isUsuarioGestorRecursivo`

- `ValidaAutorizacaoTrait::isDonoOuChefia()` — usado por múltiplos AuthorizationValidators
- `PlanoTrabalhoAuthorization::podeEditar()`
- `PlanoTrabalhoDocumentoAssinarValidator`
- `AvaliacaoAuthorizationValidator`
- `UnidadeService::isGestorHierarquia()`
- `UsuarioService::isUsuarioGestorRecursivo()`

Todos acessam via `UnidadeRepository` (facade) → `UnidadeReadRepositoryContract`.

## Arquitetura Implementada

Abordagem: **Cache interno ao `EloquentUnidadeReadRepository`** — nenhuma classe nova exposta, nenhuma mudança nos callers. A lógica de cache é um detalhe de implementação do repository.

```
┌──────────────────────────────┐
│  V2 Validators / Traits      │  (sem mudança)
│  chamam UnidadeRepository    │
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│  UnidadeRepository (Facade)  │  (sem mudança — delega para readRepository)
└──────────────┬───────────────┘
               │
┌──────────────▼───────────────┐
│ EloquentUnidadeReadRepository │
│ isUsuarioGestorRecursivo()    │  ← usa Cache::remember internamente
│   ├─ getUnidadesGeridasCached()   → Cache + getUnidadesGerenciadas()
│   └─ getSubordinadasCached()      → Cache + getSubordinadasRecursivas()
│   └─ invalidarCacheHierarquia()   → Redis SCAN + DEL (ambos prefixos)
└───────────────────────────────┘
```

### Estrutura de Arquivos

```
app/Repository/Unidade/Contracts/
└── UnidadeReadRepositoryContract.php   ← MODIFICADO (+ invalidarCacheHierarquia)
app/Repository/Unidade/Eloquent/
└── EloquentUnidadeReadRepository.php   ← MODIFICADO (cache + invalidação)
app/Repository/
└── UnidadeRepository.php               ← MODIFICADO (delega invalidarCacheHierarquia)
app/Observers/
└── UnidadeIntegranteAtribuicaoObserver.php  ← NOVO (invalida cache por usuário)
app/Jobs/
└── SincronizarSiapeJob.php             ← MODIFICADO (delega invalidação ao repository)
app/Providers/
└── AppServiceProvider.php              ← MODIFICADO (registra observer)
tests/Unit/V2/Unidade/
└── CachedGestorAuthorizationServiceTest.php          ← NOVO (testes unitários)
tests/IntegrationTenant/Repository/
└── UnidadeReadRepositoryCacheTest.php                ← NOVO (testes E2E)
```

### Responsabilidades

| Classe | Responsabilidade |
|--------|-----------------|
| `EloquentUnidadeReadRepository` | Acesso a dados + cache + invalidação total (SIAPE) |
| `UnidadeIntegranteAtribuicaoObserver` | Invalidação pontual (mudança de gestor) |
| `SincronizarSiapeJob` | Delega invalidação ao repository via DI |
| `UnidadeRepository` (facade) | Delega para contract |

### Invalidação de Cache

| Evento | Mecanismo | Ação |
|--------|-----------|------|
| SIAPE: importação de unidades | `SincronizarSiapeJob` → `repository->invalidarCacheHierarquia()` | Redis SCAN + DEL em ambos prefixos |
| Mudança de gestor (atribuição/remoção) | `UnidadeIntegranteAtribuicaoObserver` | `Cache::forget("unidades-geridas:{usuarioId}")` |

### Dependências Existentes Reutilizadas

- `EloquentUnidadeReadRepository::getUnidadesGerenciadas(string $usuarioId)` — já existe
- `EloquentUnidadeReadRepository::getSubordinadasRecursivas(array $ids)` — já existe

Não é necessário criar novos métodos no repository.

## Binding no Container

Nenhuma alteração necessária. O `EloquentUnidadeReadRepository` já é resolvido pelo `RepositoryServiceProvider` como implementação de `UnidadeReadRepositoryContract`. O cache usa a facade `Cache` diretamente (Redis em produção).

## Decisões

- **Cache é detalhe de implementação do repository** — não expõe classe extra, não altera callers
- **`invalidarCacheHierarquia()` exposto no contract** — necessário para o Job invocar via DI
- **Cache store: default** (Redis em produção) — já é o padrão do projeto
- **TTL: 1h** — razoável para hierarquia que muda raramente (apenas importação SIAPE)
- **Árvore completa por chave** — máximo ~435 descendentes (15KB), 1 GET vs N roundtrips
