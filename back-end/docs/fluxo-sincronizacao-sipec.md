# Fluxo de Sincronização SIPEC

## Visão Geral

O fluxo SIPEC é uma alternativa ao fluxo SIAPE (SOAP/XML) para sincronização em massa de unidades e servidores. Consome a API REST do SIGEPE-Integra (OpenAPI) e segue a mesma estrutura de 3 fases do `SincronizarSiapeJob`, porém com uma **Fase 0** adicional de coleta via API.

```
SincronizarSipecJob
│
├─ FASE 0: Coleta de dados da API SIPEC (REST)
│    ├─ SipecService::buscarTodasUnidades()
│    │    └─ GET /api-sipec/v1/unidades?codOrgao=X (paginado)
│    │    └─ Grava JSON em sipec_unidades (processado=false)
│    │
│    └─ SipecService::buscarTodosServidores()
│         └─ GET /api-sipec/v1/servidores?codUorg=X (paginado)
│         └─ Grava JSON em sipec_servidores (processado=false)
│
├─ FASE 1: IntegracaoSipecService::retornarUorgs()
│    └─ Lê sipec_unidades (processado=false)
│    └─ Parseia JSON → formato compatível com integracao_unidades
│    └─ Popula/atualiza integracao_unidades
│    └─ processaUnidadeRaiz()
│    └─ deepReplaceUnidades() → INSERT/UPDATE unidades
│    └─ Ativa unidades reativadas
│
├─ FASE 2: IntegracaoSipecService::retornarServidores()
│    └─ Lê sipec_servidores (processado=false)
│    └─ Parseia JSON → formato Pessoas[] (pessoal + funcionais)
│    └─ Siape\Servidor\Integracao::processar() → popula integracao_servidores
│    └─ ProcessadorAtualizacaoDadosSiapeService::processar()
│         ├─ processarDadosPessoais() → UPDATE usuarios
│         ├─ processarLotacoes() → UPDATE unidades_integrantes
│         └─ cadastrarUsuariosAusentes() → INSERT usuarios + lotações
│
└─ FASE 3: IntegracaoGestorService::atualizarGestores()
     └─ montarArrayChefias() → JOIN integracao_unidades + unidades + usuarios
     └─ GestorIntegracao::processar() → UPDATE atribuições + perfis
```

## Arquitetura

### Tabelas Intermediárias

| Tabela | Descrição | Colunas principais |
|--------|-----------|-------------------|
| `sipec_unidades` | JSON bruto de cada unidade vinda da API | `id`, `codigo`, `response` (JSON), `processado`, `data_modificacao` |
| `sipec_servidores` | JSON bruto de cada servidor vindo da API | `id`, `cpf`, `matricula`, `response` (JSON), `processado`, `data_modificacao` |

### Classes

| Classe | Responsabilidade |
|--------|-----------------|
| `App\Jobs\SincronizarSipecJob` | Orquestra o fluxo completo (Fase 0 + dispatch de sincronização) |
| `App\Services\Sipec\SipecService` | Client HTTP autenticado (OAuth2 JWT) para API SIPEC |
| `App\Services\Sipec\IntegracaoSipecService` | Lê tabelas intermediárias e retorna no formato esperado pelo `IntegracaoService` |
| `App\Services\IntegracaoService` | Orquestrador de sincronização (fases 1-3), usa `integracaoServiceAdapter` |
| `App\Models\SipecUnidade` | Model Eloquent para `sipec_unidades` |
| `App\Models\SipecServidor` | Model Eloquent para `sipec_servidores` |

### Adapter Pattern

O `IntegracaoService` possui uma propriedade pública `integracaoServiceAdapter`. O método `getIntegracaoAdapter()` retorna:
- O adapter injetado (quando vindo do `SincronizarSipecJob`)
- Fallback para `$this->IntegracaoSiapeService` (fluxo SIAPE original)

Isso permite que as Fases 1-3 sejam **reutilizadas integralmente** sem duplicação.

## Configuração

Variáveis de ambiente (`.env`):

```env
INTEGRACAO_SIPEC_URL=https://gateway.conectagov.estaleiro.serpro.gov.br
INTEGRACAO_SIPEC_CONECTAGOV_CHAVE=<client_id>
INTEGRACAO_SIPEC_CONECTAGOV_SENHA=<client_secret>
INTEGRACAO_SIPEC_CPF=<cpf_usuario_servico>
INTEGRACAO_SIPEC_CODUORG=<codigo_uorg_raiz>
```

Config: `config/integracao.php` → chave `sipec`.

## Endpoints da API SIPEC consumidos

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/oauth2/jwt-token` | POST | Geração de token OAuth2 (client_credentials) |
| `/api-sipec/v1/unidades` | GET | Lista paginada de `UnidadeDetalhadaDTO` |
| `/api-sipec/v1/servidores` | GET | Lista paginada de `ServidorDetalhadoDTO` |

### Paginação

Ambos endpoints suportam `page` e `size` como query params. O `SipecService` pagina automaticamente até `totalPages`.

### Autenticação

- Header `Authorization: Bearer <jwt_token>`
- Header `x-cpf-usuario: <cpf_configurado>`

## Disparo

### Via Controller (manual)

```
POST /api/job-schedule/sincronizar-sipec
Body: { "tenant_id": "opcional" }
```

### Via Queue (agendado)

```php
SincronizarSipecJob::dispatch($tenantId);
```

Queue: `sipec_queue`

## Mapeamento de Dados

### Unidades (API → integracao_unidades)

| Campo API (UnidadeDetalhadaDTO) | Campo integracao_unidades |
|---------------------------------|---------------------------|
| `codUorg` | `id_servo`, `codigo_siape` |
| `codUorgPai` | `pai_servo`, `pai_siape` |
| `codUorgPagadora` | `codupag` |
| `nomeExtendido` / `nomeUorg` | `nomeuorg` |
| `siglaUorg` | `siglauorg` |
| `numTelefoneUorg` | `telefone` |
| `emailUorg` | `email` |
| `cnpjUpag` | `cnpjupag` |
| `endereco.codMunicipio` | `municipio_ibge` |
| `endereco.noMunicipioTemp` | `municipio_nome` |
| `endereco.ufUorg` | `municipio_uf` |
| `endereco.logradouroUorg` | `logradouro` |
| `endereco.bairroUorg` | `bairro` |
| `endereco.cepUorg` | `cep` |
| `dataUltimaTransacao` | `data_modificacao` |
| `dadoComplementar.indicadorUorgRegimenta` | `regimental` |

### Servidores (API → formato Pessoas[])

| Campo API (ServidorDetalhadoDTO) | Campo interno |
|----------------------------------|---------------|
| `cpf` | `pessoal.cpf` |
| `nome` | `pessoal.nome` |
| `matriculaSiape` | `funcionais[].matriculas.dados.matriculasiape` |
| `codUorgExercicio` | `funcionais[].matriculas.dados.coduorgexercicio` |
| `codUorgLotacao` | `funcionais[].matriculas.dados.coduorglotacao` |
| `codSitFuncional` | `funcionais[].matriculas.dados.codsitfuncional` |
| `codCargo` | `funcionais[].matriculas.dados.tipo` |
| `codUpag` | `funcionais[].matriculas.dados.codupag` |
| `codJornada` | `funcionais[].matriculas.dados.cod_jornada` |
| `jornadaTrabalho.nome` | `funcionais[].matriculas.dados.nome_jornada` |
| `modalidadePGD` | `funcionais[].matriculas.dados.modalidade_pgd` |
| `participaPGD` | `funcionais[].matriculas.dados.participa_pgd` |
| `identUnica` | `funcionais[].matriculas.dados.ident_unica` |
| `dataOcorrIngressoOrgao` | `funcionais[].matriculas.dados.dataexercicionoorgao` |
| `codAtivFun` | Mapeado para `funcoes` se preenchido |
| `dataOcorrExclusao` | Servidor ignorado se presente |

## Comparação SIAPE vs SIPEC

| Aspecto | SIAPE | SIPEC |
|---------|-------|-------|
| Protocolo | SOAP/XML (WSO2) | REST/JSON (SIGEPE-Integra) |
| Tabelas intermediárias | `siape_dadosUORG`, `siape_consultaDados*` | `sipec_unidades`, `sipec_servidores` |
| Processamento XML | `ProcessaDadosSiapeBD` | N/A (JSON direto) |
| Service de leitura | `IntegracaoSiapeService` | `IntegracaoSipecService` |
| Job | `SincronizarSiapeJob` | `SincronizarSipecJob` |
| Queue | `siape_queue` | `sipec_queue` |
| Fases 1-3 | `IntegracaoService::sincronizacao()` | Mesmo (via adapter) |

## Troubleshooting

- **Token expirado**: O `SipecService` cacheia o token por 59 min. Se houver erro 401, chamar `SipecService::invalidateToken()`.
- **Unidade sem endereço**: Campos de município ficarão vazios — unidade será criada/atualizada sem `cidade_id`.
- **Servidor com `dataOcorrExclusao`**: Será ignorado (não processado).
- **Tabelas intermediárias cheias**: Registros com `processado=true` podem ser purgados periodicamente.
