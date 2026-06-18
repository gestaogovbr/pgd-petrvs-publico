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
- [~] Observer de Afastamento (CUD) para invalidar cache
- [x] Integrar dispensa no observer de PlanoTrabalhoConsolidacao (ignorar dispensadas ao verificar conclusão do PT)

## Observer

### Como lidar com a regra de escrita?

>@leon-dev585 Os ststus deve voltar ao anterior. Se a condição que justificou a dispensa deixa de existir, a consequência também deve deixar de existir. Logo, se a dispensa deixa de existir, o correto é restaurar o status anterior do período e do PT.
>
>Caso contrário, o sistema passa a ter um comportamento paradoxal:
>"Este período só foi dispensado porque havia uma ocorrência cobrindo 100% do período."
>"A ocorrência não cobre mais 100% do período."
>"Mas o período continua dispensado."
>
>Além disso, passa a ser possível existir um cenário de fraude ou uso indevido com objetivo de burlar a avaliação:
>
>    Cria ocorrência cobrindo todo o período.
>    Período é dispensado.
>    Plano é concluído.
>    Edita ou exclui a ocorrência.
>    Plano continua concluído.
>
>Nesse caso, o sistema perde a rastreabilidade da lógica de negócio.
>
>Em função disso, o melhor caminho é a gente criar mensagens de confirmação ou de bloqueio:
>
**Ao criar/editar uma ocorrência que gere dispensa cujo PT esteja em execução
>**
>Esta ocorrência resultará na dispensa de registro de execução e avaliação de um ou mais períodos avaliativos, em razão da cobertura integral do período. Deseja confirmar?
>
**Ao criar/editar uma ocorrência que gere dispensa cujo PT esteja concluído e o cancelamento da avaliação ainda seja permitido (ver itens 9 e 10 do Ajustes na **unificação das telas do PT #2211)
>
>A inclusão ou alteração desta ocorrência resultará na dispensa de registro de execução e avaliação de um ou mais períodos avaliativos. Os períodos afetados passarão para o status "Dispensado", e as avaliações e já realizadas serão canceladas. Em decorrência dessa alteração, o Plano de Trabalho poderá retornar ao status "Em execução". Deseja confirmar?
>
**Ao criar/editar uma ocorrência que gere dispensa cujo PT esteja concluído e o cancelamento da avaliação não seja mais permitido (ver itens 9 e 10 do Ajustes **na >unificação das telas do PT #2211)
>
>Não é possível incluir ou alterar esta ocorrência, pois ela resultaria na dispensa de registro de execução e avaliação de período avaliativo cuja avaliação não pode mais ser cancelada.
>
**Ao editar/excluir uma ocorrência que retire a dispensa cujo PT esteja em execução**
>
>A alteração desta ocorrência removerá a dispensa de registro de execução e avaliação de um ou mais períodos avaliativos. Os períodos afetados retornarão ao status anterior. Deseja confirmar?
>
**Ao editar/excluir uma ocorrência que retire a dispensa cujo PT esteja concluído dentro do prazo de recurso do último período avaliativo**
>
>A alteração desta ocorrência removerá a dispensa de registro de execução e avaliação de um ou mais períodos avaliativos. Os períodos afetados retornarão ao status anterior e o Plano de Trabalho retornará ao status "Em execução". Deseja confirmar?
>
**Ao editar/excluir uma ocorrência que retire a dispensa cujo PT esteja concluído fora do prazo de recurso do último período avaliativo**
>
>Esta ocorrência não pode ser alterada ou excluída, pois impacta período avaliativo dispensado pertencente a Plano de Trabalho concluído com prazo recursal encerrado.
>
>        Importante esclarecer que a mensagem de confirmação deverá ser exibida somente quando a inclusão, alteração ou exclusão da ocorrência resultar em mudança na elegibilidade de dispensa de um ou mais períodos avaliativos.
>
>        Outro ponto importante: quando uma edição remove a dispensa, o período deve voltar para:
>
>        Aguardando Avaliação; ou
>
>        Aguardando Registro de Execução
>        Dependendo o status que ele estava antes da aplicação da regra da dispensa.

#### As regras 9 e 10 citadas

>9. Não deve ser possível cancelar avaliação, se já houver passado o prazo legal para avaliação. Comportamento espertado. A partir da data que o participante finaliza o registro de execução (fim_RE), o sistema deve somar 20 dias (fim_RE + 20) e a partir dessa data, o botão de cancelar avaliação deve ficar indisponível.
>
>10. Não deve ser possível cancelar uma avaliação se, mesmo estando dentro do prazo, o participante tiver feito recurso. Comportamento esperado: se o participante entrou com recurso, o botão de cancelar avaliação deve ficar indisponível.

QUESTÃO IMPORTANTE: é muito complicado criar os avisos tal como temos atualmente na V2 com o modelo altamente acoplado de UI da V1

### Plano de transição gradual das ocorrências para o padrão V2

- Lembrar que agora ocorrência é algo standalone, a associação das consolidações é feita integralmente via back-end
- Pages: `ocorrecia-v2/ocorrencia.page.html`
- Um `form.component.html` parece me benéfico

- O select deveria buscar num end-point `api/v2/ocorrencia/tipos`, `api/v2/ocorrencia/agentes`
- Subordinar o `POST/PUT/DELETE api/v2/ocorrencia (observe que nenhum deles está feito)`, à resposta de um dialog cuja mensagem será definida por um `GET api/v2/ocorrencia/consolidacoes`, que, com o a `data_inicio` e `data_fim` da ocorrencia a ser escrita, retorna uma série de booleanos afirmando as consequências da operação ao checar a intersecção dela com consolidações de um PT daquele usuário à qual a ocorrência estará atrelada.

#### Especifidades das ocorrências

**Regras sobre consequências do registro de uma ocorrência**
- [ ] RN1- As ocorrências cadastradas deverão aparecer no(s) plano(s) de trabalho cujo período de vigência seja atingido pelas datas da ocorrência.

Exemplo: Vamos supor que um participante tenha 3 planos de trabalho para os seguintes meses:
- PT janeiro 01/01/26 a 31/01/26
- PT fevereiro 01/02/26 a 28/02/26
- PT março 01/03/26 a 31/03/26

Se ele cadastrar uma ocorrência para o período de 25/01/26 a 05/02/26, este registro deve cair automaticamente nos planos de trabalho de janeiro e fevereiro, pois foram atingidos por ele. // ou seja, cria um 

- [ ] RN2- As ocorrências cadastradas deverão aparecer no(s) plano(s) de trabalho independentemente do status deste.
- [ ] RN 3- Quando a ocorrência abranger todo o período avaliativo, devem ser observadas as regras de permissão e de mensagens descritas no card #2145 

**Regras para cadastrar/editar/excluir uma ocorrência**
- [ ] RN 4- O perfil Consulta não pode cadastrar/editar/excluir ocorrências.
- [ ] RN 5- O perfil Participante pode cadastrar/editar/excluir ocorrência somente para si mesmo.
- [ ] RN 6- Os demais perfis podem cadastrar/editar/excluir ocorrências para si e para terceiros da sua cadeia hierárquica (da unidade mais alta onde tenha atribuição para baixo)

**Regras para visualizar ocorrências cadastradas**
- [ ] RN 7- O perfil Consulta e o perfil Participante só podem visualizar suas próprias  ocorrências
- [ ] RN 8- Os demais perfis podem visualizar ocorrências de terceiros da sua cadeia hierárquica (da unidade mais alta onde tenha atribuição para baixo).

#### Digreções

- Vejo que a criação, deleição e recriação dos `PlanoTrabalhoConsolidacao` nos observers seria de muito proveito para facilitar em várias queries especificadas
- The final judgement will be in 3 possible situations
(-consolidacao intercepted;-on a pt CONCLUIDO;-with avaliações that cannot be cancelled anymore), for 2 possible
operations (PlanoTrabablhoConsolidacoesAfastamento created/excluded). That is, 6 total possible outcomes, being the
situations ordered on the most to the least impactful

### Próximos passos (a partir do WIP 0d83bf195)

#### Back-end

- [ ] **CRUD standalone de ocorrências** (`POST/PUT/DELETE /api/v2/ocorrencia`): desacoplar do PT; a associação com consolidações/PTs é feita integralmente pelo back-end via `usuario_id` e datas
  - POST: recebe `usuario_id`, `data_inicio`, `data_fim`, `tipo_motivo_afastamento_id`, `observacoes`, `horas`
  - PUT: recebe `ocorrencia_id` + campos editáveis
  - DELETE: recebe `ocorrencia_id`
  - Antes de executar o CUD, chamar internamente `OcorrenciaImpactoPolicy::calcularImpacto()`. Se `operacao_bloqueada`, rejeitar com 422. Se `tem_impacto`, exigir `confirmacao=true` no body (ou header)
- [ ] **Listagem de ocorrências** (`GET /api/v2/ocorrencia`): filtros `usuario_id`, paginação, include trashed; respeitar RN7/RN8
- [ ] **Endpoint de tipos** (`GET /api/v2/ocorrencia/tipos`): já existe em `GET /api/v2/tipos-motivos-afastamentos` — verificar se atende
- [ ] **Endpoint de agentes** (`GET /api/v2/ocorrencia/agentes`): retornar usuários da cadeia hierárquica para quem o perfil logado pode cadastrar ocorrências (RN5/RN6)
- [ ] **Vincular consolidações automaticamente** no CUD: ao criar/editar ocorrência, criar/atualizar/remover registros em `planos_trabalhos_consolidacoes_afastamentos` para todos os PTs afetados (RN1/RN2)
- [ ] **Cache** `avaliacao-dispensa:{usuario-uuid}:{pt-uuid}` com invalidação no CUD de ocorrências
- [ ] **Efeitos colaterais do CUD** (observer): ao confirmar operação com impacto, executar as transições de status descritas no discovery (dispensar consolidação → concluir PT; remover dispensa → reabrir consolidação/PT)

#### Front-end

- [ ] Página standalone `ocorrencia-v2/ocorrencia.page.html` com formulário
- [ ] Dialog de confirmação/bloqueio baseado no retorno de `GET /api/v2/ocorrencia/impacto-consolidacoes`
- [ ] Mensagens conforme os 6 cenários do discovery

---

### Branch #2270 — Eliminar tabela pivot `planos_trabalhos_consolidacoes_afastamentos`

**Ideia:** substituir a associação via tabela pivot por busca estritamente por intersecção de datas. Isso elimina:
- A tabela `planos_trabalhos_consolidacoes_afastamentos`
- A necessidade de sync no CUD de ocorrências (vincularConsolidacoes)
- A necessidade de vincular ocorrências na ativação do PT
- Os observers que mantêm a pivot sincronizada
- Bugs de dessincronização (ex: ocorrências pré-existentes não aparecem)

**Como ficaria:**
- Listagem de ocorrências de uma consolidação: `WHERE afastamento.data_fim >= consolidacao.data_inicio AND afastamento.data_inicio <= consolidacao.data_fim AND afastamento.usuario_id = pt.usuario_id`
- Snapshot para auditoria: gravar apenas no momento da **conclusão** da consolidação (se necessário)
- O `DispensaAvaliacaoPolicy` já funciona por datas — não depende da pivot

**Impacto:** desafoga banco e back-end; simplifica o `OcorrenciaService` (remove `vincularConsolidacoes`); remove `ConsolidacaoAfastamentoDTO`.
