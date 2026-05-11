# Manual do envio à API PGD

Documento de referência sobre **como o Petrvs envia dados à API do PGD** (participantes, planos de trabalho e planos de entrega), **quais status e condições o sistema exige**, **o que significam as datas e o log de envio** e **como funcionam tentativas e novas tentativas**. Voltado a gestores, suporte e equipe técnica que precise alinhar regras de negócio ao comportamento do sistema.

---

## 1. O que é o “envio”

O Petrvs precisa **enviar informações para a API do PGD** (programa federal), de forma semelhante a enviar uma declaração a um sistema oficial.

O sistema **não conclui o envio no mesmo instante** em que o usuário salva a tela em muitos casos: ele **enfileira trabalhos** em uma fila de processamento. Cada trabalho, quando executado, tenta o envio, atualiza **datas** e **log de envio** no cadastro do registro (usuário, plano de trabalho ou plano de entrega) e, em caso de sucesso na API, marca que a informação foi **aceita pelo PGD**.

---

## 2. Quem é enviado e em que ordem

### 2.1 Usuário (participante na API PGD)

**Significado:** envio dos **dados da pessoa como participante do PGD** (identificação, situação, vínculos necessários, assinatura do TCR quando aplicável, etc.), no formato exigido pela API.

**Quando o sistema enfileira o envio**

- Em geral, **sempre que o cadastro do usuário é atualizado** no ambiente da instituição (tenant), salvo exceções internas (por exemplo, certas alterações ligadas a exclusão lógica que o sistema ignora para esse fim).
- Também por **rotinas em lote** que listam participantes que ainda precisam ser enviados.

**Ordem em relação a outros envios**

- **Isolado:** o envio do usuário é **independente**.
- **Dentro do fluxo do plano de trabalho:** o participante é **sempre o primeiro** da cadeia (ver secção 2.3).

---

### 2.2 Plano de entrega

**Significado:** envio do **plano de entrega** à API PGD, com os dados e vínculos exigidos pelo programa.

**Quando o sistema enfileira o envio**

- Quando o **plano de entrega é atualizado** e atende às condições descritas na secção 3.
- Quando integra a **cadeia disparada pelo plano de trabalho** (antes do envio do próprio plano de trabalho).
- Por **rotinas em lote** dedicadas a planos de entrega.

---

### 2.3 Plano de trabalho

**Significado:** envio do **plano de trabalho** à API PGD.

**Quando o sistema enfileira o envio**

- Quando o **plano de trabalho é atualizado** e está em status válido para envio (secção 3).
- Por **rotinas em lote** que percorrem planos de trabalho elegíveis ou com envio pendente.

**Cadeia em três fases**

Quando o disparo vem **pelo plano de trabalho**, o sistema monta uma **sequência fixa**:

1. **Participante** (usuário dono daquele plano de trabalho).  
2. **Planos de entrega** ligados às entregas daquele plano de trabalho, **quando** cada entrega estiver associada a um plano de entrega.  
3. **O próprio plano de trabalho.**

Em uma frase: **pessoa → planos de entrega relacionados → plano de trabalho**.

Cada etapa é um **envio separado** na API: cada registro mantém **suas próprias** datas e seu próprio log de envio.

---

## 3. Status válidos e condições para envio

Há **duas camadas** de regras: (A) **o que permite agendar** o trabalho na fila ou aceitar o agendamento automático; (B) **o que ainda é verificado na hora** de montar o pacote e chamar a API. Se algo falhar na montagem ou na API, o sistema registra mensagem no **log de envio** e pode marcar **conclusão** sem sucesso na API.

### 3.1 Plano de trabalho e plano de entrega — status válidos para envio

Para **plano de trabalho** e **plano de entrega**, o sistema só trata como **elegível para envio** quando o status do registro é um dos seguintes:

| Valor interno | Nome usual na interface |
|---------------|-------------------------|
| ATIVO         | Ativo                   |
| CONCLUIDO     | Concluído               |
| AVALIADO      | Avaliado                |

**Status que não permitem** esse envio (o agendamento do trabalho é recusado ou o fluxo interrompido no ponto adequado): **Incluído**, **Homologando**, **Aguardando assinatura**, **Suspenso** e **Cancelado**.

Ou seja: o PGD, neste fluxo, espera planos já em ciclo de execução, concluídos ou avaliados — não em rascunho, homologação inicial, aguardando assinatura, suspenso ou cancelado.

---

### 3.2 Plano de entrega — condições para aceitar o agendamento

Além do status válido acima, **antes de enfileirar** o envio do plano de entrega o sistema exige que existam, de forma consistente:

- **Programa** vinculado ao plano de entrega.  
- **Unidade executora** do plano de entrega.  
- **Unidade instituidora** acessível pelo programa (programa com unidade definida).

Se faltar algum desses vínculos ou o status não for válido, o envio **não é agendado** e pode ser registrada uma mensagem no log do plano de entrega informando que não está em condições de envio ao PGD.

---

### 3.3 Plano de trabalho — condições na hora de enviar

Mesmo com status válido e o trabalho na fila, na **execução** do envio do plano de trabalho o sistema ainda exige que:

- O **servidor (usuário) do plano de trabalho** tenha **lotação** cadastrada.  
- O plano de trabalho tenha **pelo menos uma entrega (contribuição)** vinculada; não é permitido enviar plano de trabalho “sem contribuições”.

Se o plano de trabalho **deixar** de estar em status válido entre o agendamento e a execução, a mensagem de erro pode indicar que o plano **não está em status para envio**.

---

### 3.4 Participante (usuário) — condições na hora de montar o envio

O enfileiramento pode ocorrer na **atualização do usuário** mesmo que ainda faltem dados; na **hora de montar o pacote** para a API, o sistema exige que:

- Exista **matrícula SIAPE** preenchida.  
- Exista **pelo menos um plano de trabalho** associado ao usuário (usa-se o **último** plano de trabalho para modalidade, programa e unidade instituidora no payload).  
- Exista **unidade de lotação** utilizável: há integração com **unidades integrantes** com atribuição de **lotado** e **código de unidade** válido.  
- Exista **data de assinatura** na última assinatura (TCR) registrada para o usuário.  
- No **último plano de trabalho**, esteja definida a **modalidade PGD** (não pode estar vazia).  
- Para os dados enviados à API, a **lotação** do servidor precisa permitir obter o **código da unidade de lotação**.

A opção **participa do PGD** (sim/não) define se a situação enviada à API é de participante **ativo** ou **inativo** no PGD, conforme as regras do programa.

**Mensagens comuns** quando falta algum requisito incluem: usuário sem matrícula; usuário sem planos de trabalho; usuário sem unidade de lotação; usuário sem data de assinatura; usuário sem modalidade definida; usuário inválido ou sem lotação (quando o cadastro não é encontrado no contexto esperado para envio).

---

### 3.5 Participante — critérios da rotina em lote

A rotina que varre **participantes** para reenvio considera, entre outros critérios: usuário não excluído; existência de **plano de trabalho** não excluído; existência de **documento de assinatura** não excluído vinculado ao usuário. Assim, o lote não tenta enviar pessoas completamente fora desse contexto mínimo.

---

## 4. Campos de data e log de envio

Nos cadastros de **usuário**, **plano de trabalho** e **plano de entrega** o sistema mantém, entre outros, estes campos relacionados ao PGD:

- **Data de agendamento do envio** — quando o pedido entrou na fila.  
- **Data de tentativa de envio** — quando uma execução **começou** a processar o envio.  
- **Data de envio à API PGD** — quando a API **aceitou** o envio com sucesso.  
- **Data de conclusão do envio** — quando o **ciclo** daquela execução terminou (com sucesso na API ou com erro final de validação/regra, conforme o caso).  
- **Log de envio** — texto com a **última mensagem** relevante (sucesso, erro, validação, reagendamento, etc.).

### 4.1 Data de agendamento

**O que é:** instante em que o sistema **colocou o registro na fila** de envio (criação do trabalho na fila).

**Quando é gravada:** ao criar esse trabalho, **antes** da fila executar o processamento.

**Uso prático:** saber **quando foi pedido** o envio; comparar com tentativas e conclusões; suportar a regra de **envio defasado** (trabalho antigo ignorado se houver agendamento mais novo no cadastro).

---

### 4.2 Data de tentativa de envio

**O que é:** instante em que uma **execução** do envio **começou de fato** para aquele registro;

**Uso prático:** ver **quando** a última tentativa de processamento ocorreu, independentemente de sucesso ou falha.

---

### 4.3 Data de envio à API PGD

**O que é:** instante em que o sistema registra **sucesso na integração com a API PGD** (envio aceito).

**Quando é gravada:** em **sucesso do envio**, em conjunto com a data de conclusão.

**Uso prático:** indicador de **“já foi para o PGD com retorno positivo”**. Se estiver vazio, não houve aceitação pela API após a tentativa (ou ainda não houve sucesso).

---

### 4.4 Data de conclusão do envio

**O que é:** instante em que o sistema considera **encerrado o ciclo de envio** daquela execução — seja por **sucesso na API**, seja por **falha final de validação ou de montagem do envio** em que o sistema **não** reagenda automaticamente da mesma forma que faz para indisponibilidade da API ou timeout.

**Quando é gravada**

- **Sucesso na API:** junto com a data de envio à API.  
- **Erro de validação ou de exportação** (mensagens claras de impedimento ao montar ou enviar o pacote): grava-se **data de conclusão** e **log** com a mensagem; a data de envio à API permanece vazia se a API nunca aceitou.

**Uso prático:** saber **em que momento esse fluxo terminou** — com sucesso ou com motivo documentado no log.

---

### 4.5 Log de envio

**O que é:** texto com a **última mensagem relevante** gravada pelo sistema para aquele registro.

**Uso prático:** o **“por quê?”** legível ao lado das datas.

---

## 5. Tentativas e novas tentativas

### 5.1 Duas noções de “tentativa”

1. **Tentativa no cadastro** (data de tentativa de envio): carimbo de que **neste horário** o sistema **começou** a executar um envio para aquele registro.

2. **Nova tentativa automática (reagendamento):** cada trabalho na fila está configurado para **uma única execução** por disparo. Quando o sistema quer **tentar de novo**, ele **coloca outro trabalho na fila** com atraso de **cerca de cinco minutos**, em fila de atraso, e incrementa um contador de execução visível nos logs da aplicação.

Ou seja: **nova tentativa automática = novo trabalho na fila**, e não várias repetições silenciosas dentro do mesmo disparo.

---

### 5.2 Quando há reagendamento automático (cerca de cinco minutos)

| Situação | Comportamento resumido |
|----------|-------------------------|
| **Indicador global de API indisponível** ativo | Antes de processar, registra insucesso com mensagem de reagendamento por API indisponível e **programa novo envio** para alguns minutos depois. |
| **Falha ao obter token** ou erro tratado como indisponibilidade da API na autenticação | Aciona o bloqueio temporário (**cerca de cinco minutos**) para não martelar a API, registra insucesso e **reagenda** novo trabalho. |
| **Tempo máximo da execução estourado** (timeout) | Ao falhar, **reagenda** novo trabalho; pode também registrar insucesso com a mensagem da falha. |

O intervalo entre uma tentativa reagendada e a próxima é da ordem de **300 segundos (cinco minutos)**.

---

### 5.3 Quando não há esse reagendamento automático

| Situação | Comportamento resumido |
|----------|-------------------------|
| **Erro de validação ou de exportação** (dados obrigatórios ausentes, mensagens de regra de negócio na montagem do envio, etc.) | Grava-se **data de conclusão** e **log** com a mensagem. **Não** há nova tentativa automática por esse mecanismo — é preciso **ajustar o cadastro** ou gerar novo envio ao **salvar de novo** ou pela **rotina em lote**. |
| **Outras falhas** no encerramento do trabalho | Em geral registra-se **insucesso** (tentativa e log) **sem** esse reagendamento de cinco minutos. Nova tentativa costuma vir de **nova alteração** no registro ou de **rotina agendada**. |

---

### 5.4 Novas tentativas pelo fluxo de negócio

- **Salvar de novo** usuário, plano de trabalho ou plano de entrega pode **gerar novo trabalho** na fila.  
- **Rotinas agendadas** (participantes, planos de trabalho, planos de entrega, pendências) podem **reenfileirar** registros que ainda precisam de envio.

Cada novo trabalho atualiza a **data de agendamento** ao ser criado.

---

### 5.5 Envio defasado

Cada trabalho guarda o **horário do agendamento no momento em que foi criado**. Na execução, se o cadastro tiver uma **data de agendamento mais recente** (porque houve um pedido de envio mais novo), o trabalho antigo **ignora** o processamento e encerra, para não sobrescrever um pedido mais novo.

---

## 6. Resumo rápido

| Pergunta | Resposta curta |
|----------|----------------|
| Quais status permitem enviar **plano de trabalho** ou **plano de entrega**? | **Ativo**, **Concluído** ou **Avaliado**. |
| O que dispara o envio do **usuário**? | Atualização do cadastro e rotinas em lote de participantes. |
| O que dispara o envio do **plano de entrega**? | Atualização do PE (se válido), cadeia do PT, rotinas em lote. |
| O que dispara o envio do **plano de trabalho**? | Atualização do PT (se válido), com cadeia participante → PEs → PT; rotinas em lote e pendências. |
| O que é **agendamento**? | Momento em que entrou na fila. |
| O que é **tentativa**? | Momento em que uma execução começou a processar o envio. |
| O que é **envio à API**? | Sucesso registrado na API PGD. |
| O que é **conclusão**? | Fim do ciclo (sucesso na API ou encerramento com erro documentado no log). |
| Quando tenta de novo sozinho em ~5 min? | API/token indisponível, bloqueio temporário global, ou timeout. |
| Quando não tenta assim? | Erros de validação ou dados; corrigir e salvar ou aguardar rotina. |

---

## 7. Relatórios de envios (telas de log)

No sistema, o acompanhamento do que foi pedido, tentado, concluído ou aceito pela API PGD aparece em **três telas de consulta**, agrupadas no menu sob **Envio API** (nomes usuais: **Logs de Participantes**, **Logs de Planos de Entrega** e **Logs de Planos de Trabalho**). Não confundir com o módulo **Relatórios** (planos de trabalho/entrega/agentes em formato de relatório institucional): aqui o foco é **histórico técnico de integração** — datas, mensagem de log e filtros para auditoria e suporte.

Cada tela lista registros com colunas equivalentes à ideia de: **quando o cadastro foi atualizado**, **agendamento**, **tentativa de envio**, **conclusão do fluxo**, **envio bem-sucedido na API** e **texto do log de envio**. Há filtros por identificação (CPF, nome, número, unidade, conforme a tela) e por **intervalos de data** (agendamento, conclusão, data do envio bem-sucedido).

### 7.1 Quem aparece na listagem de participantes

Para **participantes**, a lista respeita a **área de trabalho** do usuário que está consultando: em geral só entram servidores cuja **lotação** está ligada às **unidades** às quais o consultor tem vínculo. Quem possui **permissão ampla** de visualização de usuários de toda a instituição vê **todos** os participantes do tenant. Os **planos de entrega** e **planos de trabalho** nas respectivas telas de log **não** aplicam esse mesmo recorte por lotação do consultor (listagem ampla no tenant).

### 7.2 Filtro “Status” — o que cada opção significa

O combo **Status** usa os **mesmos rótulos** nas três telas. Abaixo está o critério **exato** usado para filtrar (cada opção restringe a lista ao combinar com as demais condições que você informar, por exemplo CPF ou datas).

| Rótulo no filtro | Significado |
|------------------|-------------|
| **Todos** | Não aplica filtro por status (apenas os outros filtros da tela valem). |
| **Não agendados** | Registros **sem** data de agendamento de envio (nunca entrou na fila por esse mecanismo, ou o campo foi limpo). |
| **Agendados** | Registros **com** data de agendamento preenchida (já houve pelo menos um pedido de envio enfileirado). |
| **Pendentes** | Subconjunto dos agendados: há agendamento **e** ainda não há “conclusão” alinhada a esse pedido — ou seja, **sem** data de conclusão **ou** a data de conclusão é **anterior** à data de agendamento (indica que houve um **novo agendamento** depois da última conclusão e o ciclo desse novo pedido ainda não foi concluído). |
| **Não enviados** | **Sem** data de envio bem-sucedido na API (a API PGD ainda não registrou aceite para aquele registro). Inclui quem nunca tentou, quem falhou, quem está pendente ou quem concluiu com erro sem sucesso na API. |
| **Enviados** | **Com** data de envio bem-sucedido na API (integração aceita pelo PGD). |
| **Concluídos** | **Com** data de conclusão do envio preenchida (o fluxo daquela execução foi encerrado no sistema, com sucesso na API **ou** com mensagem final de erro/validação). **Na prática, o filtro “Concluídos” está ligado à consulta apenas na tela de participantes**; nas telas de plano de entrega e plano de trabalho o mesmo rótulo pode aparecer no combo, mas **não há condição equivalente aplicada** — use nesses casos os filtros por **intervalo de data de conclusão** para obter o mesmo efeito. |
| **Com falha** | Há **agendamento**, há **texto no log** e o log **não é** exatamente a mensagem padrão de sucesso **“Envio realizado com sucesso.”** Abrange falhas de validação, erros de API tratados como mensagem no log, reagendamentos por indisponibilidade, etc. **Não** exige que a data de envio à API esteja vazia: o critério é **só** agendamento + log diferente do texto de sucesso. |

**Como interpretar combinações**

- **Enviados** implica em geral sucesso na API; o log costuma ser o de sucesso, então **não** costuma aparecer em **Com falha** ao mesmo tempo (salvo alteração manual de dados ou mudanças futuras de regra).  
- **Pendentes** ajuda a achar “fila pedida mas ciclo ainda não fechado” ou “novo pedido após uma conclusão antiga”.  
- **Não enviados** é mais amplo: qualquer um **sem** carimbo de sucesso na API.

### 7.3 Indicador visual (datas riscadas)

Nas três telas, quando a **data de agendamento** é **mais recente** do que a data de **tentativa**, de **conclusão** ou do **envio bem-sucedido**, essa data mais antiga pode aparecer **riscada** na interface. Isso sinaliza que aquele carimbo pertence a um **ciclo anterior** e que já houve um **novo agendamento** por cima — o operador deve olhar o **agendamento** e as datas **posteriores** ao mesmo para entender o estado atual.

### 7.4 Relação com os “status” do plano de negócio (Ativo, Concluído, etc.)

Os filtros desta secção (**Não agendados**, **Agendados**, **Pendentes**, etc.) referem-se ao **estado do processo de envio à API** (campos de data e log), **não** ao status do plano de trabalho ou do plano de entrega na gestão (Ativo, Homologando, Avaliado, etc.). A secção 3 deste manual trata desses **status de negócio** para **elegibilidade** ao envio; as telas de log tratam do **trâmite da integração** depois que o registro entra na fila.
