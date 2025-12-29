# Guia de Refatoração: IntegracaoService

## 1. Análise da Classe Atual

- Responsabilidades Principais
  - Orquestração da sincronização SIAPE: `back-end/app/Services/IntegracaoService.php:239`, `back-end/app/Services/IntegracaoService.php:264`, `back-end/app/Services/IntegracaoService.php:311`
  - Token e configuração de autenticação: `back-end/app/Services/IntegracaoService.php:215`
  - Processamento de Unidades (criação/atualização/hierarquia): `back-end/app/Services/IntegracaoService.php:104`, `back-end/app/Services/IntegracaoService.php:117`
  - Processamento de Servidores e validações: `back-end/app/Services/IntegracaoService.php:681`, `back-end/app/Services/IntegracaoService.php:700`, `back-end/app/Services/IntegracaoService.php:812`, `back-end/app/Services/IntegracaoService.php:1151`, `back-end/app/Services/IntegracaoService.php:1178`, `back-end/app/Services/IntegracaoService.php:1216`
  - Persistência de lotação do usuário: `back-end/app/Services/IntegracaoService.php:1068`
  - Logging e auditoria: `back-end/app/Services/IntegracaoService.php:1086`
  - Exposição de endpoints de consulta/pendências: `back-end/app/Services/IntegracaoService.php:1108`, `back-end/app/Services/IntegracaoService.php:1118`
  - Configuração multi-tenant: `back-end/app/Services/IntegracaoService.php:74`

- Dependências e Acoplamentos
  - Facades e serviços de framework: `DB`, `Auth`, `Http`, `Log`
  - Modelos acoplados: `Usuario`, `Unidade`, `IntegracaoUnidade`, `IntegracaoServidor`
  - Serviços internos: `NivelAcessoService`, `TenantConfigurationsService` (via `loadingTenantConfigurationMiddleware`), `UtilService` (herdado de `ServiceBase`), `SiapeLog`, `IntegracaoSiapeService` (implícito)
  - Configuração acoplada via `config('integracao')` e variáveis locais (`useLocalFiles`, `storeLocalFiles`)
  - SQL manual misturado com Eloquent, aumentando acoplamento a schema

- Complexidade Ciclomática
  - Alta em métodos de orquestração e processamento:
    - `sincronizacao` possui múltiplos ramos, loops e tratamento condicional (estimativa > 20)
    - `deepReplaceUnidades` com bifurcações por estado (nova/alteração de pai/atualização) (estimativa > 15)
    - Blocos de validação e conversão em sincronização de servidores/unidades (estimativa > 10)
  - Recomendação: medir objetivamente com `phpmd/pdepend` e `phploc` e acompanhar redução durante refatoração

## 2. Princípios SOLID a Aplicar

- Single Responsibility
  - Separar orquestração, processamento de unidades, processamento de servidores, persistência de lotação, validações e logging em classes especializadas
  - Introduzir provedores de token e origem de dados (LOCAL/API) desacoplados

- Open/Closed
  - Design por interfaces e aplicação de Strategy para origens e persistências (e.g., diferentes “salvaUsuarioLotacao”)
  - Permitir adicionar novas fontes/validações sem modificar a orquestração central

- Liskov Substitution
  - Garantir que implementações de interfaces (e.g., `SiapeUorgClientInterface`) possam substituir-se livremente sem quebrar contratos
  - Evitar suposições sobre tipo concreto nas dependências

- Interface Segregation
  - Criar interfaces focadas:
    - `TokenProviderInterface`
    - `SiapeUorgClientInterface` e `SiapeServidorClientInterface`
    - `UnidadeRepositoryInterface`, `UsuarioRepositoryInterface`
    - `LotacaoUpdaterInterface`
    - `LoggerInterface` (ou portar para uma abstração de logging)
  - Evitar “interfaces gordas” consumidas parcialmente

- Dependency Inversion
  - Injetar dependências por construtor (interfaces), evitando uso direto de Facades em núcleo de domínio
  - Repositórios para persistência em vez de `DB`/SQL direto
  - `IntegracaoService` torna-se coordenador que fala com portas (interfaces), não com detalhes de infraestrutura

## 3. Estratégia de Refatoração

- Módulos Lógicos (cada um em arquivo separado)
  - `IntegracaoCoordinator` (orquestra `sincronizar`, `sincronizarPetrvs`, valida inputs, chama casos de uso)
  - `TokenProvider` e implementações (`ConfigTokenProvider`, `HttpTokenProvider`)
  - `SiapeUorgClient` e `SiapeServidorClient` (origem LOCAL/API abstraída por Strategy)
  - `UnidadeSyncService` (cria/atualiza/hierarquia; extrai lógica de `buscaOuInserePai` e `deepReplaceUnidades`)
  - `ServidorSyncService` (validações, normalização e atualizações de servidores)
  - `LotacaoUpdater` (unifica `salvarUsuarioLotacao` e substitui variantes específicas)
  - `Validator` módulos: `ModalidadeValidator`, `EmailValidator/Sanitizer`, `MatriculaUpdater`
  - `LoggingPort` (abstração para `SiapeLog`/`Log`/auditoria)
  - `TenantConfigurationMiddleware` (isolado, sem side-effects no construtor)

- Ordem Prioritária
  1. Introdução de interfaces e inversão de dependência (sem alterar comportamento)
  2. Extração de `TokenProvider` e `Siape*Client` com Strategy para LOCAL/API
  3. Extração de `UnidadeSyncService` (foco em criação/atualização e hierarquia)
  4. Extração de `ServidorSyncService` (foco em validações e normalização)
  5. Extração de `LotacaoUpdater` e remoção/absorção das variantes não utilizadas
  6. Abstração de logging/auditoria (`LoggingPort` + `atualizaLogs`)
  7. Substituição de SQL manual por Repositórios

- Garantia de Funcionamento
  - Após cada passo, rodar testes automatizados (Pest/PHPUnit) e testes manuais nas rotas:
    - `IntegracaoController` (sincronização, responsáveis, processamentos pendentes)
    - Jobs/Commands (`SincronizarSiapeJob`, `ExecutaSiape`)
  - Manter wrappers na `IntegracaoService` delegando para novos módulos durante transição (compatibilidade retroativa)

- Compatibilidade com Código Existente
  - Assinar os mesmos métodos públicos em `IntegracaoService` e redirecionar para novas classes
  - Gradualmente mover consumidores para dependências explícitas (DI de módulos), mantendo `IntegracaoService` como façade temporária

## 4. Preparação para Testes Unitários

- Isolamento de Dependências
  - Introduzir abstrações de HTTP/token/origem de dados, DB (repositórios), logging e multi-tenant
  - Evitar facades nos casos de uso; usar mocks/stubs das interfaces

- Interfaces para Serviços Externos
  - `TokenProviderInterface` (gera/fornece token)
  - `SiapeUorgClientInterface` e `SiapeServidorClientInterface` (fetch de dados)
  - `UnidadeRepositoryInterface` e `UsuarioRepositoryInterface` (persistência)
  - `LotacaoUpdaterInterface` (operações de vínculo/lotação)
  - `LoggerInterface` (eventos e auditoria)

- Casos de Teste por Módulo
  - `IntegracaoCoordinator`: valida inputs, roteia chamadas, trata flags `useLocalFiles`, compõe resultado
  - `UnidadeSyncService`: insere, atualiza, altera pai, atualiza paths de filhos, idempotência
  - `ServidorSyncService`: normaliza email/sigla/telefone, valida `modalidade_pgd`, atualiza matrículas, detecta troca de matrícula
  - `LotacaoUpdater`: aplica regras de vinculação e limpeza associada, sem efeitos colaterais indevidos
  - `TokenProvider`/`SiapeClient`: fallback/local/HTTP com tratamento de falhas

- Ambiente de Teste
  - Framework: Pest (já instalado no projeto)
  - Banco: SQLite in-memory / migrações mínimas por teste
  - Cobertura: habilitar `XDEBUG_MODE=coverage` ou `pcov`
  - Comando: `./vendor/bin/pest --coverage --min=0`

## 5. Plano de Ação

- Cronograma (Sugerido em 4 sprints)
  - Sprint 1: Interfaces + TokenProvider + SiapeClients (LOCAL/API)
  - Sprint 2: UnidadeSyncService + Repositórios de Unidade + LoggingPort
  - Sprint 3: ServidorSyncService + Validações + Repositórios de Usuário
  - Sprint 4: LotacaoUpdater + Remoção/absorção das variantes legadas + limpeza final

- Critérios de Aceitação por Etapa
  - Testes unitários/verdes por módulo com cobertura ≥ 85%
  - Integração de `IntegracaoController`, Jobs e Commands funcionando
  - Redução de complexidade ciclomática em métodos críticos (meta: -30% em `sincronizacao` e `deepReplaceUnidades`)
  - Sem regressões em logs/auditoria e fluxo multi-tenant

- Métricas de Qualidade
  - Complexidade ciclomática (phpmd/pdepend)
  - Cobertura unitária (linhas ≥ 85% geral, métodos críticos ≥ 90%)
  - Acurácia funcional validada por testes de integração (rotas principais)
  - Alertas de linter/estáticos (phpstan nível médio)

- Checklist de Verificação
  - Interfaces criadas e injetadas por DI
  - Estratégias LOCAL/API para clientes SIAPE operacionais
  - Repositórios substituem SQL manual em casos de uso
  - Logs e auditoria centralizados em `LoggingPort`
  - Remoção/absorção de código não utilizado (e.g., variantes `salvaUsuarioLotacao*`)
  - Testes passam com cobertura definida; CI atualizado

## 6. Controle de Versões

- Estratégia de Branches
  - Criar branches por módulo: `feature/refactor-integracao/<modulo>`
  - Branch principal de coordenação: `feature/refactor-integracao/coordinator`

- Critérios para Merge
  - Testes verdes (unitários + integração) com cobertura mínima
  - Revisão dupla obrigatória
  - Verificação de impacto em Jobs/Commands/Controllers
  - Changelog atualizado e comunicação ao time

- Revisão de Código
  - Checklist SOLID + métricas
  - Avaliar contratos de interfaces, coesão e acoplamento
  - Garantir compatibilidade retroativa nas APIs públicas

---

## Anotações Adicionais

- Métodos candidatos à remoção/substituição
  - Variantes específicas de salvamento de lotação não referenciadas externamente:
    - `back-end/app/Services/IntegracaoService.php:1046`
    - `back-end/app/Services/IntegracaoService.php:1052`
    - `back-end/app/Services/IntegracaoService.php:1058`
  - Substituir por Strategy `LotacaoUpdaterInterface` com implementações específicas (Google/API/DPRF) se necessário

- Ferramentas Auxiliares
  - Medir complexidade com `phpmd/pdepend`: integrar ao CI
  - Análise estática com `phpstan`: nível 3–5
  - Logs: consolidar eventos e auditoria via portas, evitar `Log::` direto em domínio

