# Issue #2555 - Inativação automática de servidores ausentes no SIAPE

Fonte: https://github.com/gestaogovbr/petrvs-pgd/issues/2555

## Metadados

- Repositório: `gestaogovbr/petrvs-pgd`
- Issue: `#2555`
- Título: `Correção na tela de Consulta CPF SIAPE`
- Estado: aberta
- Autor: `Gabrieldnb7`
- Criada em: 2026-09-01
- Atualizada em: 2026-09-04
- Labels: `Bug`, `Prioridade Média`, `SIAPE`
- Tenant informado: todos
- Funcionalidade efetivamente relatada: inclusão automática em CPFs indisponíveis e inativação de servidores
- Evidências: duas consultas SIAPE anexadas à issue, analisadas sem reproduzir nomes, CPFs, matrículas, e-mails ou demais dados pessoais
- Issue relacionada pelo comportamento: `#2018`

## Problema Relatado

A rotina periódica de integração não estaria adicionando automaticamente à lista de CPFs indisponíveis os usuários que deixaram de ser retornados pelo SIAPE. Com isso, a contagem de 30 dias não começa e os usuários permanecem ativos no Petrvs até que alguém consulte cada CPF manualmente.

A issue também apresenta dois casos de pessoas que, segundo o relato, já não pertencem ao MGI, mas permanecem ativas no Petrvs. Os anexos desses casos contêm respostas funcionais do SIAPE e foram tratados nesta documentação como caso A e caso B.

Embora o título mencione a tela de Consulta CPF SIAPE, o corpo descreve principalmente uma lacuna na carga automática e no ciclo de inativação.

## Entendimento Atual

O ciclo atual possui três comportamentos separados:

1. `BuscarDadosSiapeServidores` consulta `listaServidores` para cada unidade e persiste somente as respostas recebidas.
2. `BuscarDadosSiapeServidor` extrai os servidores presentes nessas respostas e solicita dados pessoais e funcionais somente para esses CPFs.
3. `IntegracaoServidorService::processaServidoresRemovidosNoSiape()` inativa apenas usuários que já possuem registro ativo em `siape_blacklist_servidores` criado há mais de 30 dias.

Não existe, no fluxo automático inspecionado, uma reconciliação entre usuários locais ativos e o conjunto de servidores retornado por `listaServidores`. Portanto, o CPF que deixa de aparecer na lista não é selecionado para consulta detalhada, não produz fault e não entra automaticamente na blacklist.

A consulta manual segue outro caminho. `UsuarioService::consultaCPFSiape()` chama `buscaServidor()`, e `SiapeServidorFaultProcessor` cria uma entrada por CPF quando a consulta detalhada retorna o fault `0002` com uma mensagem catalogada de ausência de dados. Isso explica por que consultar manualmente um CPF ausente inicia o processo de inativação.

Os dois anexos não comprovam ausência no SIAPE:

- caso A: o SIAPE devolve vínculo no MGI com situação funcional `08 - ATIVO EM OUTRO ÓRGÃO` e `participaPGD = não`;
- caso B: o SIAPE devolve vínculo no MGI com situação funcional `01 - ATIVO PERMANENTE`, `participaPGD = sim` e modalidade integral.

O caso A revela uma regra adjacente: `IntegracaoSiapeService::processaDadosFuncionais()` descarta a situação funcional `08`, porém `ProcessaDadosSiapeBD::reativarServidoresEncontradosNoSiape()` considera ativa toda matrícula devolvida nos dados funcionais antes desse descarte. O mesmo retorno pode, assim, impedir a sincronização funcional posterior e simultaneamente remover blacklist ou marcar o usuário local como ativo.

No caso B, manter o usuário ativo é compatível com a resposta SIAPE anexada. A alegação de que a pessoa não pertence mais ao órgão conflita com a fonte externa disponível e requer validação cadastral na origem ou definição de outra regra de pertencimento.

## Hipóteses Confirmadas

### A carga automática não cria blacklist para quem desaparece de `listaServidores`

O fluxo monta as consultas detalhadas exclusivamente a partir dos servidores presentes nas respostas de `listaServidores`. Não há comparação com `usuarios`, `integracao_servidores` ou uma fotografia anterior para identificar CPFs/matrículas locais ausentes da carga atual.

Consequentemente, a ausência completa de um CPF na listagem não alcança `SiapeServidorFaultProcessor` nem `ProcessaDadosSiapeBD::prepareResponseServidorXml()`, que são os pontos capazes de criar blacklist a partir de um fault da consulta detalhada.

### A consulta manual pode iniciar a contagem de inativação

Quando a consulta individual recebe fault `0002` com mensagem catalogada de ausência de dados, `SiapeServidorFaultProcessor` cria `siape_blacklist_servidores` por CPF. Há testes automatizados para a criação nesse fault e para a inativação posterior de um registro de blacklist com mais de 30 dias.

Esses testes cobrem as duas extremidades do ciclo, mas não cobrem a descoberta automática do usuário ausente na carga periódica.

### A inativação após 30 dias depende de blacklist prévia

`IntegracaoServidorService` seleciona usuários pelo vínculo com `siape_blacklist_servidores`, exige `inativado = 0` e `created_at` anterior a 30 dias, altera `situacao_siape` para `INATIVO`, atribui o perfil de consulta e marca a blacklist como processada.

Sem a entrada inicial na blacklist, a rotina diária de inativação não possui candidato para processar.

### Os anexos dos casos A e B retornam vínculos funcionais no MGI

Os XMLs anexados apresentam conteúdo funcional válido, sem fault de ausência. O caso A retorna situação `ATIVO EM OUTRO ÓRGÃO`; o caso B retorna `ATIVO PERMANENTE`. Logo, não há evidência, nesses anexos, para classificar ambos como CPFs indisponíveis.

### A situação `ATIVO EM OUTRO ÓRGÃO` recebe tratamento conflitante no pipeline

O código atual rejeita o vínculo de código `08` ao converter os dados para sincronização, mas a etapa anterior de processamento considera sua matrícula retornada como ativa e pode remover a blacklist e reativar o usuário. As duas decisões não expressam uma única regra de negócio.

## Hipóteses Secundárias

- A lista de servidores pode omitir pessoas por desligamento real, mas também por resposta parcial, falha em uma UORG, alteração de hierarquia ou indisponibilidade externa. Criar blacklist diretamente pela diferença de conjuntos, sem confirmação individual, pode gerar inativações indevidas.
- Registros já presentes na blacklist são filtrados antes das consultas detalhadas da carga automática. Isso pode impedir que o próprio fluxo periódico confirme o retorno do servidor e remova a pendência; a carga individual/manual possui caminhos distintos de reativação.
- A correspondência apenas por CPF pode ser insuficiente quando a pessoa possui mais de uma matrícula. A ausência e a reativação devem ser avaliadas por CPF + matrícula sempre que o SIAPE fornecer o vínculo.
- O caso A pode representar saída do quadro do MGI sob uma regra de negócio que considera `ATIVO EM OUTRO ÓRGÃO` incompatível com permanência no Petrvs, apesar de o vínculo ainda ser retornado para o órgão consultado.
- O caso B pode refletir dado funcional ainda não atualizado no SIAPE, órgão/parâmetro de consulta diferente do esperado ou uma regra organizacional não representada pelos campos funcionais anexados.
- A programação de `BuscarDadosSiapeJob`, `SincronizarSiapeJob` e da inativação diária pode influenciar quando a fotografia da carga está completa, embora não explique a ausência da reconciliação no código.

## Cenários Não Resolvidos ou Conflitantes

- Não há logs da carga automática para os CPFs mascarados, respostas de `listaServidores` das respectivas UORGs nem fotografia das tabelas de estágio no mesmo processamento.
- Não está comprovado se todos os CPFs do primeiro grupo desapareceram de uma carga completa ou se alguma unidade falhou/ficou fora do escopo consultado.
- Não foi informado se os CPFs do primeiro grupo possuem uma ou mais matrículas locais, nem qual vínculo deveria iniciar a contagem.
- Não está definida a confirmação necessária antes da blacklist: ausência em uma carga completa, ausência em cargas consecutivas ou consulta funcional individual com fault catalogado.
- Não está definido como distinguir falha técnica do SIAPE de ausência funcional real. Faults não catalogados, timeout, resposta vazia e XML inválido não devem ser tratados automaticamente como desligamento.
- O relato sobre o caso A conflita parcialmente com o anexo: o vínculo é retornado no MGI, mas com situação `ATIVO EM OUTRO ÓRGÃO`. Falta definir se esse código deve iniciar inativação, apenas retirar participação no PGD ou manter cadastro ativo.
- O relato sobre o caso B conflita diretamente com o anexo funcional, que informa `ATIVO PERMANENTE` no MGI. Falta confirmar se o SIAPE foi corrigido depois da coleta ou se existe outra fonte autorizada para determinar a saída.
- Não há evidência de banco para confirmar `usuario_id`, matrícula, `situacao_siape`, perfil, participação no PGD, vínculos de unidade e blacklist dos casos A e B no momento da consulta.
- O título da issue sugere ajuste de tela, mas os critérios relatados exigem alteração de rotina backend. O escopo final precisa preservar essa distinção.

## Critérios de Aceite Sugeridos

- Após uma carga automática completa e válida, cada usuário local elegível que não estiver no conjunto retornado deve passar por confirmação individual no SIAPE antes de entrar na blacklist.
- Somente uma resposta inequívoca e catalogada de ausência deve criar ou manter a pendência; falha de rede, autenticação, timeout, XML inválido, resposta vazia ou falha parcial de UORG não deve iniciar nem reiniciar a contagem.
- A blacklist deve identificar CPF e matrícula quando houver matrícula local, sem afetar outro vínculo válido da mesma pessoa.
- Reprocessamentos da mesma ausência devem preservar a data inicial da pendência, evitando reiniciar indevidamente o prazo de 30 dias.
- O retorno confirmado de CPF/matrícula deve remover ou encerrar a blacklist correspondente e reativar somente o vínculo correto, de acordo com regra explícita de situação funcional.
- Após mais de 30 dias de ausência confirmada, a rotina deve alterar o usuário correspondente para `INATIVO`, aplicar o perfil de consulta e marcar a blacklist como processada.
- A rotina deve produzir resumo e auditoria tenant-aware com quantidades de candidatos, ausências confirmadas, confirmações inconclusivas, blacklists criadas/mantidas e erros, sem expor CPF integral ou payload pessoal em logs de aplicação.
- A regra para `08 - ATIVO EM OUTRO ÓRGÃO` deve ser definida e aplicada de forma consistente antes e depois da conversão dos dados: manter ativo, inativar ou adotar outro estado, sem reativação contraditória.
- Um retorno `01 - ATIVO PERMANENTE` para o órgão consultado deve manter o vínculo ativo, salvo existência de outra regra de negócio formal e auditável.
- A solução deve ser isolada por tenant e não comparar usuários ou respostas entre bases de organizações diferentes.

## Próximos Testes Propostos

### Testes E2E backend tenant da descoberta automática

- Criar usuários locais sintéticos A, B e C; simular uma carga completa em que A e B são retornados e C está ausente; confirmar C individualmente com fault catalogado e verificar a criação de blacklist apenas para C.
- Repetir a carga com ausência de C e confirmar que `created_at` da pendência é preservado.
- Simular falha de uma UORG, timeout, erro de autenticação, resposta vazia, XML inválido e fault não catalogado; verificar que nenhum usuário potencialmente abrangido é incluído na blacklist.
- Simular usuário com duas matrículas, retornando apenas uma delas, e verificar que somente a matrícula cuja ausência for confirmada entra na blacklist.
- Simular usuário local que não deve participar da reconciliação conforme os filtros de escopo que forem definidos, como cadastro já inativo, excluído ou externo.

### Testes E2E backend tenant do ciclo de vida

- Confirmar que blacklist com menos de 30 dias não inativa o usuário.
- Confirmar que blacklist com mais de 30 dias inativa somente CPF/matrícula correspondente, altera o perfil e marca `inativado = 1`.
- Confirmar que retorno posterior da mesma matrícula remove a pendência e aplica a regra de reativação sem alterar outras matrículas do CPF.
- Confirmar que uma pendência por CPF sem matrícula não reativa ou inativa indiscriminadamente múltiplos vínculos sem decisão explícita.

### Testes das situações apresentadas nos anexos

- Simular retorno funcional `08 - ATIVO EM OUTRO ÓRGÃO` e provar o comportamento definido para blacklist, situação local, perfil, participação no PGD e sincronização.
- Garantir que o mesmo retorno `08` não seja descartado em uma etapa e interpretado como reativação em outra.
- Simular retorno `01 - ATIVO PERMANENTE`, `participaPGD = sim` e modalidade integral; confirmar que o usuário permanece ativo quando não há outra evidência autorizada de saída.
- Validar que divergência entre relato administrativo e resposta SIAPE seja registrada como inconclusiva, sem inativação silenciosa.

## Próxima Etapa

A triagem foi seguida por testes de regressão e pela implementação descrita abaixo. A regra para `08 - ATIVO EM OUTRO ÓRGÃO` permanece inalterada por decisão de escopo e deve ser validada pela PO antes de uma alteração futura.

## Validação controlada no DSV — tenant MGI

Em 2026-09-08 foi consultado o tenant `MGI` no DSV, com saída mascarada e sem persistir novos dados. O banco tenant identificado foi `petrvs_mgi`.

### Resumo do tenant no momento da consulta

- 16.739 usuários não excluídos;
- 16.283 usuários com `situacao_siape = ATIVO`;
- 456 usuários com `situacao_siape = INATIVO`;
- 472 registros em `siape_blacklist_servidores`, dos quais 17 ainda estavam com `inativado = 0`.

### Cruzamento dos dois casos anexados

- Caso A: usuário local ativo, `situacao_funcional = ATIVO_EM_OUTRO_ORGAO`, `participa_pgd = sim`, modalidade parcial e nenhuma blacklist. O registro correspondente em `integracao_servidores`, entretanto, está como `ATIVO_PERMANENTE`, código `01`, órgão `17500` e `participa_pgd = sim`, com data de modificação de 2025-09-25. A diferença confirma que o estado persistido do usuário e o estado persistido da integração não são equivalentes nesse caso.
- Caso B: usuário local ativo, `situacao_funcional = ATIVO_PERMANENTE`, `participa_pgd = sim`, modalidade integral e nenhuma blacklist. O registro em `integracao_servidores` também está como `ATIVO_PERMANENTE`, código `01`, órgão `17500` e modalidade integral, com data de modificação de 2026-04-23.

Uma consulta individual ao SIAPE real foi tentada para cada caso. Ambas terminaram com erro genérico de comunicação; portanto, não foram usadas como evidência de ausência funcional. O erro operacional deve ser separado de um fault SIAPE `0002` e não pode iniciar blacklist.

### Resultado da validação

O DSV confirma que os dois casos permanecem ativos e sem blacklist no MGI, mas não confirma que estejam ausentes do SIAPE. O caso B é consistente com o estado persistido. O caso A possui divergência entre `usuarios` e `integracao_servidores`, além do conflito já observado entre o anexo e o estado atual.

Não foi criado teste de regressão com expectativa de inativar os casos A ou B: a evidência real não define essa regra e um teste assim cristalizaria uma interpretação ainda conflitante. Permanecem apropriados os testes sintéticos de reconciliação de ausências, isolamento por matrícula e distinção entre ausência confirmada e falha de comunicação.

### Simulação temporal com rollback

Em 2026-09-08, o caso A foi usado em uma simulação controlada no banco `petrvs_mgi`. A operação inteira ocorreu dentro de transação e foi revertida ao final:

1. estado inicial: usuário `ATIVO`, sem registro de blacklist;
2. foi criada temporariamente uma blacklist para a matrícula correspondente, com `created_at` de 31 dias antes;
3. `IntegracaoServidorService::processaServidoresRemovidosNoSiape()` selecionou o usuário;
4. dentro da transação, o usuário passou para `INATIVO`, teve o perfil alterado e a blacklist recebeu `inativado = 1`;
5. após rollback, o usuário voltou a `ATIVO`, o perfil original foi preservado e a blacklist deixou de existir.

A simulação confirma que o processamento por tempo funciona quando a blacklist já existe. Ela não resolve a falha anterior de descoberta automática dos CPFs ausentes.

### Resultado dos testes de regressão backend

O arquivo `SiapeServidorIssue2555RegressionTest.php` reproduziu inicialmente duas falhas:

- a carga automática com servidor local ausente de `listaServidores` não criava a blacklist esperada;
- um servidor em blacklist que voltou a aparecer em `listaServidores` não era reavaliado nem reativado pela carga automática.

Após a implementação, 13 cenários passam com 32 asserções. Além dos quatro casos iniciais, a suíte cobre blacklist já inativada, falha pessoal com retorno funcional válido, limite antitempestade, duas matrículas, preservação de `created_at`, grid sem duplicidade, candidato único por CPF, substituição completa de snapshot e remoção manual com múltiplas matrículas.

### Implementação backend

- A lista válida é deduplicada por CPF, mantendo a transação mais recente, e comparada aos usuários ativos previamente gerenciados pelo SIAPE.
- Um CPF ausente e ainda sem blacklist entra apenas como candidato à consulta individual; somente o fault catalogado confirma a ausência.
- O fault cria blacklist por CPF e matrícula para os usuários locais elegíveis, preservando `created_at` em reprocessamentos.
- CPFs que já estão na blacklist e reaparecem na lista deixam de ser descartados antes da consulta detalhada; o retorno da matrícula remove a pendência e reativa o vínculo correspondente.
- Uma blacklist com `inativado = 1` é definitiva para o fluxo automático atual: o retorno funcional não a remove nem reativa o vínculo.
- O ciclo da blacklist é decidido pelo retorno funcional; falha nos dados pessoais não volta a criar a pendência quando CPF e matrícula foram confirmados funcionalmente.
- Resposta inválida ou fault na listagem impede a reconciliação de ausentes.
- Uma coleta com menos respostas que UORGs consultadas preserva o snapshot anterior em vez de truncá-lo.
- O processamento deixou de carregar modelos completos e de executar buscas lineares dentro de cada item. As comparações usam consultas estreitas e mapas indexados em memória, com custo linear em relação ao volume de CPFs; as consultas externas continuam divididas pelo limite configurado do ConectaGov.
- A reconciliação de ausentes possui limite configurável por `INTEGRACAO_SIAPE_RECONCILIACAO_MAX_CANDIDATOS`, com padrão 200. Acima do limite, o ciclo não dispara consultas individuais em massa e registra somente as quantidades.
- Foram adicionados índices tenant para os acessos por CPF, matrícula, situação da blacklist e data de modificação.
- As operações de leitura e escrita alteradas foram encapsuladas em repositories; o ciclo de vida ficou centralizado em serviço transacional.

### Demonstração de prazo na tela de CPFs indisponíveis

Foi implementado no frontend um cálculo local e determinístico baseado em `created_at` e no prazo nomeado de 30 dias:

- exibição de dias restantes enquanto a blacklist aguarda processamento;
- alerta visual nos cinco dias finais;
- estado `Prazo vencido` após o limite;
- estado `Inativado` quando o processamento já foi concluído;
- estado seguro `Prazo indisponível` para data ausente ou inválida;
- orientação para recarregar a lista e, se o atraso persistir após a rotina diária, verificar scheduler e fila SIAPE;
- ação de baixo impacto `Recarregar lista`, sem criar comando manual de inativação.

Foram adicionados sete testes unitários frontend para o cálculo e a ação de recarga, todos aprovados. O lint e o build de produção do Angular também foram aprovados.
