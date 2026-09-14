# Testes Unitários — SipecService Fase 0

Arquivo: `tests/Unit/Services/Sipec/SipecServiceFase0Test.php`

## Visão Geral

Testes unitários que validam a execução resiliente da Fase 0 de sincronização SIPEC. Cobrem o fluxo de checkpoint, lock Redis, retry adaptativo e persistência via repositories.

**Zero interação com banco de dados** — todos os repositories e models são mockados via Mockery.

## Execução

```bash
# Todos os testes (~9s)
docker exec petrvs_php bash -lc "cd /var/www && ./vendor/bin/pest tests/Unit/Services/Sipec/SipecServiceFase0Test.php --ci"

# Incluindo teste lento (sleep real):
docker exec petrvs_php bash -lc "cd /var/www && SKIP_SLOW_TESTS=false ./vendor/bin/pest tests/Unit/Services/Sipec/SipecServiceFase0Test.php --ci"
```

## Cenários

### `describe('SipecService - executarFase0')`

| Teste | O que valida | Mocks principais |
|---|---|---|
| execução completa coleta unidades e servidores atualizando checkpoint | Fluxo end-to-end: coleta unidades → transição etapa → coleta servidores → marca completo | `executarGetComRetry`, `Cache::lock`, checkpoint repo |
| retorna status locked quando lock já está adquirido | Redis lock falha → retorna `['status' => 'locked']` sem processar nada | `Cache::lock` retorna `get() = false` |
| retoma da etapa servidores quando unidades já foram concluídas | Checkpoint com `etapa = 'servidores'` e `ultima_pagina = 3` → pula unidades, retoma da página 3 | checkpoint repo retorna estado intermediário |
| ignora servidor sem CPF e não persiste no repository | Servidor com `cpf = null` → `updateOrCreateByCpfAndMatricula` nunca chamado | `servidorRepo->never()` |
| checkpoint etapa completo não executa nenhuma coleta | Checkpoint já `completo` → nenhum repository de unidade/servidor chamado | repos com `->never()` |

### `describe('SipecService - resetarCheckpoint')`

| Teste | O que valida |
|---|---|
| deleta checkpoint pelo tenant_id via repository | Chama `deleteByTenantId` no repository com o tenant correto |

### `describe('SipecService - retrySleep')`

| Teste | O que valida | Observação |
|---|---|---|
| executa sleep com o valor informado | `sleep(1)` pausa entre 1.0s e 1.5s | **Skipped por padrão** (`SKIP_SLOW_TESTS=true`) |
| sleep com 0 segundos retorna imediatamente | `sleep(0)` leva < 0.1s | Sempre executa |

### `describe('SipecService - executarGetComRetry')`

| Teste | O que valida | Comportamento esperado |
|---|---|---|
| erro 4XX faz fail fast sem retry | `RequestConectaGovException(403)` → lança imediatamente, `executarGet` chamado 1 vez | Não retenta erros de cliente |
| erro 5XX retenta até esgotar e lança SipecApiRetryableException | `RequestConectaGovException(500)` × 3 → `SipecApiRetryableException` | 3 tentativas, `retrySleep` mockado |
| erro de rede code 0 retenta e sucede na terceira tentativa | Falha 2×, sucesso na 3ª → retorna response | Resiliência a erros transientes |

## Padrão de Mocking

### Helper `buildSipecServiceMock()`

Cria um partial mock do `SipecService` com:
- Propriedades privadas injetadas via Reflection (url, codUorg, codOrgao, repositories)
- `shouldAllowMockingProtectedMethods()` — permite mockar `executarGetComRetry`, `executarGet`, `retrySleep`

### Helper `fakeCheckpoint()`

Cria um mock de `SipecSyncCheckpoint` (Model) com:
- `makePartial()` para permitir `setAttribute`
- `getAttribute` mockado para retornar etapa/ultima_pagina

### Estratégia de mock por camada

```
executarFase0()
    ├─ Cache::lock        → Facade mock (Cache::shouldReceive)
    ├─ checkpointRepo     → Mockery::mock(SipecSyncCheckpointRepository)
    ├─ executarGetComRetry → shouldReceive (protected, mockado nos testes de fluxo)
    ├─ sipecUnidadeRepo   → Mockery::mock(SipecUnidadeRepository)
    └─ sipecServidorRepo  → Mockery::mock(SipecServidorRepository)

executarGetComRetry()
    ├─ getToken           → shouldReceive (retorna 'fake-token')
    ├─ executarGet        → shouldReceive (protected, mockado nos testes de retry)
    └─ retrySleep         → shouldReceive (retorna null, elimina delay real)
```

## Variável de ambiente

| Variável | Default | Efeito |
|---|---|---|
| `SKIP_SLOW_TESTS` | `true` | Quando `true`, pula o teste de `retrySleep` com sleep real (1s) |

Para rodar todos incluindo lentos:

```bash
SKIP_SLOW_TESTS=false ./vendor/bin/pest tests/Unit/Services/Sipec/
```
