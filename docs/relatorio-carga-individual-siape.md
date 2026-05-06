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
- `CargaIndividualSiapeSubject`: implementa `SplSubject`, com `attach`, `detach` e `notify`, e notifica observers no sucesso ou na falha.
- `RelatorioCargaIndividualSiapeObserver`: implementa `SplObserver` via contrato de dominio, gera e persiste o relatorio.
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

- [x] Criar teste IntegrationTenant para existencia da tabela, colunas e indices.
- [x] Criar teste para default de retencao `30`.

Green:

- [x] Criar migration tenant.
- [x] Criar config lendo `SIAPE_RELATORIO_CARGA_INDIVIDUAL_RETENCAO_DIAS`.

Blue:

- [x] Revisar nomes, indices e casts JSON.
- [x] Atualizar `database/schema/tenant-schema.sql`.

### 3. Back-End TDD: Observer

Red:

- [x] Testar que sucesso de servidor notifica observer.
- [x] Testar que falha de servidor notifica observer.
- [x] Testar que sucesso de unidade notifica observer.
- [x] Testar que falha de unidade notifica observer.
- [x] Testar `attach`, `detach` e `notify` do padrao PHP/SPL.

Green:

- [x] Implementar DTO, contrato, Subject e Observer.
- [x] Registrar dependencias via container/service provider.

Blue:

- [x] Garantir SOLID: processamento, comparacao e persistencia em classes separadas.
- [x] Garantir que services SIAPE nao conhecem detalhes de tabela do relatorio.

### 4. Back-End TDD: Relatorio De Unidade

Red:

- [x] Testar unidade comum com pai.
- [x] Testar unidade raiz por `pai_servo = 999999`.
- [x] Testar ausencia de municipio e chefia substituta.

Green:

- [x] Implementar builder/comparator de unidade.
- [x] Ler valor final do Petrvs apos processamento.

Blue:

- [x] Padronizar rotulos e status humanos.
- [x] Remover acoplamentos indevidos com Eloquent fora de repositories.

### 5. Back-End TDD: Relatorio De Servidor

Red:

- [x] Testar matricula unica.
- [x] Testar multiplas matriculas/vinculos.
- [x] Testar SOAP Fault "Nao existem dados para consulta".
- [x] Testar que `dataOcorrExclusao` nao aparece.

Green:

- [x] Implementar builder/comparator de servidor.
- [x] Comparar modalidade PGD via mapeamento final do Petrvs.

Blue:

- [ ] Proteger CPF/dados pessoais em logs.
- [x] Garantir mensagens sem termos tecnicos.

### 6. Back-End TDD: API E Retencao

Red:

- [ ] Testar retorno de `relatorio_carga_id` em `processar-siape`.
- [x] Testar endpoint de leitura por ID.
- [x] Testar relatorio disponivel apos limpar/truncar `siape_*`.
- [x] Testar limpeza de relatorios expirados.
- [x] Testar autorizacao negativa do endpoint.

Green:

- [x] Expor relatorio nas respostas de processamento.
- [x] Criar `POST /api/siape/relatorio-carga-individual`.
- [x] Criar command de retencao.

Blue:

- [x] Validar autorizacao e isolamento tenant.
- [x] Rodar Pest focado e PHPStan no escopo alterado.

### 7. Front-End

- [x] Criar menu `Relatorios`.
- [x] Criar tela `Carga Individual SIAPE`.
- [x] Criar componente de visualizacao do relatorio.
- [x] Integrar botao "Ver relatorio da carga" apos processamento.
- [x] Restringir tela ao perfil/permissao de desenvolvedor.
- [x] Rodar build front-end aplicavel.
- [ ] Rodar lint front-end.
- [ ] Rodar testes front-end.

Observacao: `npm run build` foi executado com sucesso. `npm run lint` e `npm test -- --watch=false --browsers=ChromeHeadless` foram tentados, mas o container atual nao possui, respectivamente, `@angular-eslint/builder:lint` e `karma-jasmine`.

### 8. Revisao Final

- [x] Rodar testes focados de back-end.
- [x] Rodar PHPStan nos paths alterados.
- [x] Rodar validacoes front-end.
- [x] Verificar que nao ha nova requisicao ao SIAPE para alimentar relatorio.
- [x] Verificar que operacoes de banco em producao passam por Repository.
- [x] Acionar `petrvs-code-review` ao finalizar todo o desenvolvimento.
- [x] Corrigir qualquer `BLOCKER` apontado pela revisao antes de considerar a entrega pronta.

## Pendencias Validadas

- [ ] Cobrir por teste o retorno de `relatorio_carga_id` diretamente nos endpoints `processar-siape`.
- [ ] Revisar logs legados do fluxo de servidor para mascarar CPF/dados pessoais onde ainda houver exposicao.
