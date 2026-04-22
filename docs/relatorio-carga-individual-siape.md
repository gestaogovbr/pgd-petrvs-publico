# Relatorio de Carga Individual SIAPE

## Objetivo

Implementar um relatorio de carga individual SIAPE para os fluxos de Servidor e Unidade, com back-end primeiro e front-end depois. O relatorio deve ser gerado a partir dos dados ja capturados durante a execucao da carga individual, sem novas consultas ao SIAPE, e deve apresentar informacoes processadas em linguagem simples para usuarios leigos.

## Decisoes Arquiteturais

- A alimentacao do relatorio sera feita por Observer de aplicacao, no sucesso ou na falha do processamento individual.
- Jobs nao alimentarao o relatorio. Jobs serao usados apenas para retencao e limpeza de registros expirados.
- O Observer sera sincrono para permitir retornar `relatorio_carga_id` na propria resposta de `processar-siape`.
- Os services de SIAPE individual continuam responsaveis apenas pelo processamento da carga, montagem do contexto e notificacao do Subject.
- O Observer nao fara requisicoes ao SIAPE. Ele recebera o snapshot SIAPE em memoria e, quando houver sucesso, lera o estado final registrado no Petrvs apos a sincronizacao.
- A persistencia usara tabela tenant propria, sem prefixo `siape_`, para nao ser afetada por truncamentos e repopulacoes das tabelas volateis `siape_*`.
- A retencao sera configurada por `.env` com `SIAPE_RELATORIO_CARGA_INDIVIDUAL_RETENCAO_DIAS=30`, default `30`.
- Operacoes de banco em codigo de producao devem passar por Repository.

## Estrutura Back-End

- `CargaIndividualSiapeProcessamentoDTO`: contexto imutavel do processamento individual.
- `CargaIndividualSiapeObserverInterface`: contrato para observers.
- `CargaIndividualSiapeSubject`: notifica observers no sucesso ou na falha.
- `RelatorioCargaIndividualSiapeObserver`: gera e persiste o relatorio.
- Builders/comparators separados para Servidor e Unidade.
- Repository especifico para `cargas_individuais_siape_relatorios`.
- Endpoint de leitura por ID para a tela de relatorios.
- Command de limpeza de registros expirados.

## Conteudo Do Relatorio

### Unidade

Campos exibidos:

- `codUorg`
- `codUorgPai`
- `nomeExtendido`
- `siglaUorg`
- `dataUltimaTransacao`
- `cpfTitularAutoridadeUorg`

Campos removidos/ocultos:

- Municipio.
- Chefia substituta.

Regras:

- Unidade raiz deve ser identificada quando o valor SIAPE de pai for igual a `IntegracaoService::CODIGO_SIAPE_UNIDADE_RAIZ_PELO_PAI` (`999999`).
- A situacao de unidade raiz deve ser exibida como normal, com texto "Unidade raiz".

### Servidor

Campos exibidos:

- Nome.
- E-mail institucional.
- Data da ultima transacao.
- Jornada.
- Codigo da jornada.
- Matricula SIAPE.
- Unidade de exercicio.
- Situacao funcional.
- Modalidade PGD.
- Participacao no PGD.

Campos removidos/ocultos:

- `dataOcorrExclusao`.

Regras:

- SOAP Faults e variacoes de erro do SIAPE devem virar mensagem amigavel.
- A interface nao deve exibir XML, payload bruto, `response`, `faultcode`, tabelas `siape_*` ou termos tecnicos.

## Modelo De Exibicao

Cada campo deve ser apresentado com:

- `Recebido do SIAPE`
- `Registrado no Petrvs`
- `Situacao`

Status por campo:

- `confirmado`
- `ajustado`
- `divergente`
- `nao_aplicavel`
- `nao_encontrado`

Orientacoes finais:

- Se o valor recebido do SIAPE estiver incorreto, o usuario deve procurar o RH do orgao.
- Se o valor recebido do SIAPE estiver correto e o Petrvs estiver divergente, verificar se o sistema esta atualizado; persistindo, abrir chamado no portal de atendimento.

## Tarefas Cronologicas

### 1. Documentacao

- [x] Criar `docs/relatorio-carga-individual-siape.md`.
- [x] Registrar que a alimentacao sera via Observer, nao job.
- [x] Registrar que o Observer nao faz requisicao ao SIAPE.
- [x] Registrar campos removidos: municipio, chefia substituta e `dataOcorrExclusao`.

### 2. Back-End TDD: Migration E Config

Red:

- [ ] Criar teste IntegrationTenant para existencia da tabela, colunas e indices.
- [ ] Criar teste para default de retencao `30`.

Green:

- [ ] Criar migration tenant.
- [ ] Criar config lendo `SIAPE_RELATORIO_CARGA_INDIVIDUAL_RETENCAO_DIAS`.

Blue:

- [ ] Revisar nomes, indices e casts JSON.
- [ ] Atualizar `database/schema/tenant-schema.sql`.

### 3. Back-End TDD: Observer

Red:

- [ ] Testar que sucesso de servidor notifica observer.
- [ ] Testar que falha de servidor notifica observer.
- [ ] Testar que sucesso de unidade notifica observer.
- [ ] Testar que falha de unidade notifica observer.

Green:

- [ ] Implementar DTO, contrato, Subject e Observer.
- [ ] Registrar dependencias via container/service provider.

Blue:

- [ ] Garantir SOLID: processamento, comparacao e persistencia em classes separadas.
- [ ] Garantir que services SIAPE nao conhecem detalhes de tabela do relatorio.

### 4. Back-End TDD: Relatorio De Unidade

Red:

- [ ] Testar unidade comum com pai.
- [ ] Testar unidade raiz por `pai_servo = 999999`.
- [ ] Testar ausencia de municipio e chefia substituta.

Green:

- [ ] Implementar builder/comparator de unidade.
- [ ] Ler valor final do Petrvs apos processamento.

Blue:

- [ ] Padronizar rotulos e status humanos.
- [ ] Remover acoplamentos indevidos com Eloquent fora de repositories.

### 5. Back-End TDD: Relatorio De Servidor

Red:

- [ ] Testar matricula unica.
- [ ] Testar multiplas matriculas/vinculos.
- [ ] Testar SOAP Fault "Nao existem dados para consulta".
- [ ] Testar que `dataOcorrExclusao` nao aparece.

Green:

- [ ] Implementar builder/comparator de servidor.
- [ ] Comparar modalidade PGD via mapeamento final do Petrvs.

Blue:

- [ ] Proteger CPF/dados pessoais em logs.
- [ ] Garantir mensagens sem termos tecnicos.

### 6. Back-End TDD: API E Retencao

Red:

- [ ] Testar retorno de `relatorio_carga_id` em `processar-siape`.
- [ ] Testar endpoint de leitura por ID.
- [ ] Testar relatorio disponivel apos limpar/truncar `siape_*`.
- [ ] Testar limpeza de relatorios expirados.

Green:

- [ ] Expor relatorio nas respostas de processamento.
- [ ] Criar `POST /api/siape/relatorio-carga-individual`.
- [ ] Criar command de retencao.

Blue:

- [ ] Validar autorizacao e isolamento tenant.
- [ ] Rodar Pest focado e PHPStan no escopo alterado.

### 7. Front-End

- [ ] Criar menu `Relatorios`.
- [ ] Criar tela `Carga Individual SIAPE`.
- [ ] Criar componente de visualizacao do relatorio.
- [ ] Integrar botao "Ver relatorio da carga" apos processamento.
- [ ] Restringir tela ao perfil/permissao de desenvolvedor.
- [ ] Rodar lint/build/testes front-end aplicaveis.

### 8. Revisao Final

- [ ] Rodar testes focados de back-end.
- [ ] Rodar PHPStan nos paths alterados.
- [ ] Rodar validacoes front-end.
- [ ] Verificar que nao ha nova requisicao ao SIAPE para alimentar relatorio.
- [ ] Verificar que operacoes de banco em producao passam por Repository.
- [ ] Acionar `petrvs-code-review` ao finalizar todo o desenvolvimento.
- [ ] Corrigir qualquer `BLOCKER` apontado pela revisao antes de considerar a entrega pronta.
