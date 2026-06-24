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

### Servidores — Mapeamento completo (API SIPEC → DTO → integracao_servidores → usuarios)

| Campo API SIPEC (path no JSON) | Propriedade `ServidorSipecDTO` | Campo `integracao_servidores` | Campo final `usuarios` |
|-------------------------------|-------------------------------|------------------------------|------------------------|
| `cpf` | `cpf` | `cpf` | `cpf` |
| `nome` | `nome` | `nome` | `nome` |
| `matriculaSiape` | `matriculaSiape` | `matriculasiape` | `matricula` |
| `codOrgao` | `codOrgao` | — (usado em validação) | — |
| `codUorgExercicio` | `codUorgExercicio` | `coduorgexercicio`, `codigo_servo_exercicio` | lotação via `unidades_integrantes` |
| `codUorgLotacao` | `codUorgLotacao` | `coduorglotacao` | — (usado em processamento) |
| `codSitFuncional` | `codSitFuncional` | `codigo_situacao_funcional` | — |
| `situacaoServidor.nomeSitFuncional` | `nomeSitFuncional` | `situacao_funcional` (via enum + fallback) | `situacao_funcional` |
| `codCargo` | `codCargo` | `codigo_cargo` | — |
| `codAtivFun` | `codAtivFun` | `funcoes` (JSON) | — |
| `codUpag` | `codUpag` | `codupag` | — |
| `codJornada` | `codJornada` | `cod_jornada` | `cod_jornada` |
| `jornadaTrabalho.nomeJornada` | `nomeJornada` | `nome_jornada` | `nome_jornada` |
| `modalidadePGD` | `modalidadePGD` | `modalidade_pgd` | `modalidade_pgd` |
| `participaPGD` | `participaPGD` | `participa_pgd` | `participa_pgd` |
| `identUnica` | `identUnica` | `ident_unica` | `ident_unica` |
| `dataOcorrIngressoOrgao` | `dataOcorrIngressoOrgao` | `dataexercicionoorgao` | — |
| `dataOcorrExclusao` | `dataOcorrExclusao` | — (servidor ignorado se presente) | — |
| `dataUltimaTransacao` | `dataUltimaTransacao` | `data_modificacao` | `data_modificacao` |
| `servidorDisponivel.emailInstitucional` | `emailInstitucional` | `emailfuncional` | `email` |

**Observações:**
- `emailInstitucional`: o DTO filtra placeholder `naoinformado@`; o processador valida formato de email antes de gravar.
- `situacao_funcional`: o processador `PreparaServidor::getSituacaoFuncional()` resolve via `SituacaoFuncionalEnum::fromCodigo($codSitFuncional)`. Se o enum retornar `'DESCONHECIDO'` (código não mapeado), usa `$dto->nomeSitFuncional` (ex: `"CEDIDO/REQUISITADO"`) como fallback. Isso garante que códigos novos ainda não cadastrados no enum sejam preenchidos com o texto descritivo vindo da API SIPEC.
- `dataOcorrExclusao`: quando preenchido, o servidor é descartado (não entra em `integracao_servidores`).

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

## Campos de `integracao_servidores` — Status de preenchimento via SIPEC

### Campos preenchidos via `ServidorSipecDTO`

| Campo `integracao_servidores` | Origem no DTO | Status |
|-------------------------------|---------------|--------|
| `cpf` | `$dto->cpf` | ✅ |
| `nome` | `$dto->nome` | ✅ |
| `emailfuncional` | `$dto->emailInstitucional` | ✅ (filtra `naoinformado@`) |
| `matriculasiape` | `$dto->matriculaSiape` | ✅ |
| `codigo_cargo` | `$dto->codCargo` | ✅ |
| `coduorgexercicio` | `$dto->codUorgExercicio` | ✅ |
| `coduorglotacao` | `$dto->codUorgLotacao` | ✅ |
| `codigo_servo_exercicio` | `$dto->codUorgExercicio` | ✅ |
| `codigo_situacao_funcional` | `$dto->codSitFuncional` | ✅ |
| `situacao_funcional` | Derivado via `SituacaoFuncionalEnum` + fallback `$dto->nomeSitFuncional` | ✅ (auto) |
| `codupag` | `$dto->codUpag` | ✅ |
| `dataexercicionoorgao` | `$dto->dataOcorrIngressoOrgao` | ✅ |
| `funcoes` | `$dto->codAtivFun` (se preenchido) | ✅ |
| `ident_unica` | `$dto->identUnica` | ✅ |
| `modalidade_pgd` | `$dto->modalidadePGD` | ✅ |
| `participa_pgd` | `$dto->participaPGD` | ✅ |
| `cod_jornada` | `$dto->codJornada` | ✅ |
| `nome_jornada` | `$dto->nomeJornada` | ✅ |
| `data_modificacao` | `$dto->dataUltimaTransacao` | ✅ |
| `cpf_ativo` | hardcoded `true` | ✅ |
| `vinculo_ativo` | hardcoded `true` | ✅ |

### Campos do model SEM correspondência no JSON SIPEC

Estes campos **não possuem** equivalente no payload de servidores da API SIPEC:

| Campo `integracao_servidores` | Situação |
|-------------------------------|----------|
| `sexo` | Não retornado pela API SIPEC |
| `municipio` | Não retornado pela API SIPEC (dado pessoal do servidor) |
| `uf` | Não retornado pela API SIPEC (dado pessoal do servidor) |
| `data_nascimento` | Não retornado pela API SIPEC |
| `telefone` | Não retornado pela API SIPEC |
| `nomeguerra` | Não retornado pela API SIPEC (hardcoded `''`) |
| `cpf_chefia_imediata` | Não retornado pela API SIPEC (vem apenas no fluxo SIAPE) |
| `email_chefia_imediata` | Não retornado pela API SIPEC (vem apenas no fluxo SIAPE) |

### Campos SIPEC disponíveis mas não mapeados para nenhum campo do model

Campos presentes no JSON que poderiam ser úteis futuramente mas não têm coluna em `integracao_servidores`:

| Campo SIPEC | Descrição | Uso potencial |
|-------------|-----------|---------------|
| `vinculos[n].siglaRegimeJuridico` | Ex: `"EST"` (Estatutário) | Filtro/relatório por regime jurídico |
| `vinculos[n].regimeJuridico.nomeRegimeJuridico` | Ex: `"ESTATUTARIO"` | Exibição do regime completo |
| `vinculos[n].codOrgaoRequisitante` | Ex: `17500` | Identificar órgão requisitante em cessões |
| `vinculos[n].doOrgaoOrigem` | Ex: `17400` | Órgão de origem (servidor cedido) |
| `vinculos[n].codUorgLocalizacao` | Ex: `3439` | Localização física do servidor |
| `vinculos[n].codClasse` | Ex: `"C"` | Classe na carreira |
| `vinculos[n].classe.nomeClasse` | Ex: `"CLASSE C"` | Descrição da classe |
| `vinculos[n].codPadrao` | Ex: `"I"` | Padrão/nível na classe |
| `vinculos[n].cargo.nomeCargo` | Ex: `"OFICIAL SERVICOS DE APOIO"` | Nome do cargo efetivo |
| `vinculos[n].servidorDisponivel.emailServidor` | Email pessoal do servidor | Contato alternativo |
| `vinculos[n].dataOcorrIngressoServPublico` | Data ingresso no serviço público | Tempo de serviço |
| `vinculos[n].dataOcupacaoCargo` | Data de ocupação do cargo | Histórico funcional |
| `vinculos[n].codOcorrIngressoOrgao` | Código da ocorrência de ingresso | Tipo de ingresso (ex: 50 = redistribuição) |
| `vinculos[n].dataObito` | Data de óbito | Controle de exclusão por falecimento |

## Troubleshooting

- **Token expirado**: O `SipecService` cacheia o token por 59 min. Se houver erro 401, chamar `SipecService::invalidateToken()`.
- **Unidade sem endereço**: Campos de município ficarão vazios — unidade será criada/atualizada sem `cidade_id`.
- **Servidor com `dataOcorrExclusao`**: Será ignorado (não processado).
- **Tabelas intermediárias cheias**: Registros com `processado=true` podem ser purgados periodicamente.
