# Discovery #2145

## Ticket

```
## Descrição 

 * Eu, como usuário do sistema Petrvs, 
* Quero que meu PT seja dispensado de registro de execução e avaliação quando o período for totalmente coberto por afastamentos; 
* para que se possa manter a lógica de registro e avaliação do que foi efetivamente realizado

## Objetivos   

* Reduzir registro de execução e avaliação meramente burocráticos

## Regras: 

- [ ] Sempre que o período avaliativo for totalmente coberto por ocorrências, o sistema deve dispensá-lo de registro de execução e avaliação. 
- [ ] A regra deve ser aplica nos casos de uma ocorrência cobrir todo o período ou a soma dos ocorrências cobrir todo o período.
- [ ] Quando o usuário incluir uma ou mais ocorrências cujo total de horas cubra todo o período avaliativo, o período deve entrar automaticamente no status "Dispensado"
- [ ] Quando uma ou mais ocorrências for do tipo "compensação" a regra não deve ser aplicada, ainda que o total de horas cubra todo o período avaliativo:

- Outras hipóteses (compensação)- Cód. 18
- Greve (compensação)- Cód. 15
- Política de consequência do PGD (compensação)- Cód. 16
- Recesso (compensação)- Cód. 17

EXEMPLO  1:
Ocorrência: 15/04 a 15/06 
Período avaliativo: 01 a 31/05 (100% coberto pela ocorrência) > dispensa de registro de execução e avaliação > status: Dispensando

EXEMPLO  2:
Ocorrência 1: 15/04 a 20/04
Ocorrência 2: 21/04 a 31/05
Período avaliativo: 01 a 31/05 (100% coberto pela ocorrência) > dispensa de registro de execução e avaliação > status: Dispensando

EXEMPLO  3:
Ocorrência 1: 15/04 a 20/04
Ocorrência 2: 21/04 a 31/05 (compensação)
Período avaliativo: 01 a 31/05 (100% coberto pela ocorrência, porém uma das ocorrências é de compensação) > NÃO dispensa de registro de execução e avaliação

## Definição de prioridade

**Qual a origem da demanda?**
- [x] Roadmap da CGPGD - 1 PONTO
- [ ] Assuntos técnicos da COGES - 1 PONTO
- [ ] Pedido de Autoridade - 2 PONTOS
- [ ] Outros- 1 PONTO

**Tem impacto no ciclo do PGD ou está relacionado à sobrevivência do programa  (inclui assunto sensível e de grande atenção dos órgãos e autoridades)?**

- [x] Sim - 2 PONTOS
- [ ] Não - 1 PONTO

**Tem impacto em todas os usuários do sistema ou grande parte deles?**

- [ ] Sim- - 2 PONTOS
- [x] Não- 1 PONTO

**Prioridade**
- [ ] 6 PONTOS >>  **URGENTE** (deve ser executada imediatamente, mediante renegociação)
- [x] 5 PONTOS >>  **PRIORIDADE ALTA** (deve respeitar a ordem de abertura estabelecida na fila)
- [ ]  4 PONTOS >> **PRIORIDADE MÉDIA** (deve respeitar a ordem de abertura estabelecida na fila)
- [ ]  3 PONTOS >>  **PRIORIDADE BAIXA** (deve respeitar a ordem de abertura estabelecida na fila)
```

## Pontos de atenção

- no BD, a tabela `afastamentos` é que na verdade são as ocorrências
- os tipos de ocorrência são armazenados em `tipos_motivos_afastamentos`, o código é guardado na coluna `codigo`
- Implementar os exemplos como testes antes de implementar qualquer coisa
- adicione a classe `back-end/app/V2/PlanoTrabalho/Consolidacao/Dispensa`
- novo end-point `api/v2/plano-trabalho/{planoTrabalhoId}/consolidacao/dispensas`

## Funcionamento

- No front-end:
  - a consolidação ficará com a tag "Dispensado" se estiver inteiramente dentro do intervalo de ocorrências dos (excetuados os códigos especificados no ticket)
  - a consolidação também não deve ficar com o menu de avaliação disponível para a chefia, tal como se tivesse sido encerrada antecipadamente
- No back-end:
  - adiciona-se ao observer de ocorrência (CUD): busca os PTs não-arquivados/deletados interceptados pela ocorrêcia (pt.usuario_id = oc.usuario_id AND (pt.data_fim >= oc.data_inicio OR pt.data_inicio <= oc.data_fim)). Aplica-se as regras do observer de consolidações `back-end/app/Models/PlanoTrabalhoConsolidacao.php` para conclusão/reabertura do PT, adicionando a regra de dispensa. Ou seja, ignorando consolidações compreendidas integralmente em 1+ ocorrência (excetuados os códigos especificados no ticket) para contabilizar se todos as consolidações foram avaliadas e assim CONCLUIR o PT.

## Filtrando ocorrências

`ocorrencias WHERE ocorrencias.data_fim >= pt.data_inicio AND ocorrencias.data_inicio <= pt.data_fim AND ocorrencia.tipo NOT IN (:tipos_compensacao) AND ocorrencia.deleted_at IS NULL`

- data_inicio: 2026-05-01; data_fim: 2026-05-15;
- data_inicio: 2026-05-14; data_fim: 2026-05-25;
- data_inicio: 2026-06-01; data_fim: 2026-06-15;
- data_inicio: 2026-07-01; data_fim: 2026-07-05;

## Merge

1. Começa por $interval = MIN(oc.data_inicio)
2. $new_fim = MAX(oc.data_fim) WHERE oc.data_inicio <= $interval.data_fim && oc.data_fim > $interval.data_fim
3. $interval.data_fim = $new_fim.data_fim
4. $merged_itervals[] = $interval
5. Define o novo $interval = OC_SEGUINTE($new_fim)

Ex.:
```jsonc
// merged_intervals
[
	[2026-05-01, 2026-05-25],
	[2026-06-01, 2026-06-15],
	[2026-07-01, 2026-07-05],
]
```

## Cache:

avaliacao-dispensa:{usuario-dono-pt-uuid}:{pt-uuid} -> merged_intervals

### Estratégia de forget:

- CUD ocorrências do usuário dono do PT -> anular todos os `avaliacao-dispensa:{usuario-uuid}:*`
- Alteração da data_inicio/data_fim do PT -> anular `avaliacao-dispensa:{usuario-uuid}:{pt-uuid}` (acho que só é alterado em `PlanoTrabalhoService::encerrar()`)

## Implementação (WIP)

### Arquivos criados/modificados

```
app/V2/PlanoTrabalho/Consolidacao/DispensaAvaliacaoPolicy.php  ← Policy com mergeIntervalos, isCoberta, consolidacoesDispensadas
app/V2/PlanoTrabalho/Consolidacao/PlanoTrabalhoConsolidacaoService.php  ← + dispensas()
app/V2/PlanoTrabalho/Consolidacao/PlanoTrabalhoConsolidacaoController.php  ← + dispensas()
app/V2/PlanoTrabalho/Consolidacao/Validators/PlanoTrabalhoConsolidacaoRequestValidator.php  ← + dispensas()
app/Repository/Afastamento/Contracts/AfastamentoReadRepositoryContract.php  ← + findAfastamentosParaDispensa(CarbonPeriod)
app/Repository/Afastamento/Eloquent/EloquentAfastamentoReadRepository.php  ← implementação
app/Repository/Afastamento/AfastamentoRepository.php  ← facade
routes/api_tenant.php  ← + rota GET dispensas
tests/Unit/V2/PlanoTrabalho/Consolidacao/DispensaTest.php  ← 9 testes unitários
tests/IntegrationTenant/V2/PlanoTrabalho/Consolidacao/DispensaEndpointTest.php  ← E2E
```

### Pendente

- [ ] Cache `avaliacao-dispensa:{usuario-uuid}:{pt-uuid}` com invalidação
- [ ] Observer de Afastamento (CUD) para invalidar cache
- [ ] Integrar dispensa no observer de PlanoTrabalhoConsolidacao (ignorar dispensadas ao verificar conclusão do PT)
