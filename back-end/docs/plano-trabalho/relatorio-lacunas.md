## User Story 

- Como usuário do sistema, 
- quero consultar os períodos em que agentes públicos participantes do PGD permaneceram sem Plano de Trabalho, 
- para identificar lacunas de cobertura e verificar eventuais ocorrências ou dispensas que justifiquem esses períodos. 

## Objetivo 

Disponibilizar relatório que permita identificar os períodos em que agentes públicos que constam como participantes do PGD no SIAPE não possuem Plano de Trabalho. O relatório deverá apresentar as lacunas identificadas, as eventuais dispensas de Plano de Trabalho e as ocorrências que abrangem os períodos das lacunas. 

## Regras de Negócio 

Ao selecionar o item Planos de Trabalho no menu lateral, o sistema deverá abrir uma tela contendo dois botões no mesmo padrão apresentado na tela "Envios".
> - Planos de Trabalho Cadastrados;
> - Lacunas de Planos de Trabalho.

Ao selecionar um relatório disponível na tela intermediária, o sistema deverá direcionar o usuário para a respectiva tela do relatório.

As permissões de acesso atualmente existentes para os relatórios deverão ser mantidas.

A alteração da navegação não deverá modificar o funcionamento, os filtros ou os resultados dos relatórios já existentes.

### Identificação de lacunas

- [ ] RN01. O relatório deverá considerar os agentes públicos que constarem como participantes do PGD no SIAPE.

- [ ] RN02. Na identificação e na contabilização das lacunas, o sistema deverá considerar exclusivamente:

> - os dias de **segunda a sexta-feira**, sendo sábados e domingos desconsiderados da análise e não identificados ou contabilizados como lacunas;
> - os dias em que os agentes públicos constarem como **participantes do PGD no SIAPE**.

- [ ] RN03. Não será considerada lacuna cada dia de segunda a sexta-feira em que o agente público constar como participante do PGD no SIAPE e:

> - possuir Plano de Trabalho com status Em execução ou Concluído; ou
> - possuir dispensa de Plano de Trabalho vigente para o respectivo dia.

- [ ] RN04. A informação de dispensa deverá ser obtida do cadastro do agente público, conforme formalização realizada na funcionalidade específica de Dispensa de Plano de Trabalho. Card #2476.

- [ ] RN04-A. Não deverão ser contabilizados como tendo lacunas os agentes públicos que sejam **chefia titular** (`GESTOR`) ou **chefia substituta** (`GESTOR_SUBSTITUTO`) de qualquer unidade e que possuam dispensa de Plano de Trabalho formalizada. A exclusão vale independentemente do período de vigência da dispensa, inclusive quando ela já estiver encerrada.

- [ ] RN04-B. Não deverão ser contabilizados como tendo lacunas os agentes públicos com **Perfil Colaborador** ou **Perfil Consulta**, por não serem selecionáveis para o PGD.

- [ ] RN05. Será considerada lacuna cada dia de segunda a sexta-feira em que o agente público constar como participante do PGD no SIAPE e:
> - **não** possuir Plano de Trabalho; ou
> - possuir Plano de Trabalho com status **Rascunho**, **Aguardando assinatura** ou **Cancelado**.

- [ ] RN06. Quando um Plano de Trabalho for **encerrado antecipadamente**, a data de encerramento deverá ser considerada como seu último dia de vigência, não sendo os dias posteriores considerados cobertos pelo referido plano.

- [ ] RN07. Lacunas referentes a **dias consecutivos** deverão ser agrupadas em uma única linha no relatório, independentemente da quantidade de dias que compõem o período.

- [ ] RN08. O relatório deverá ser atualizado de acordo com a **situação atual dos Planos de Trabalho**. Caso um Plano de Trabalho seja cadastrado ou alterado retroativamente e passe a cobrir período anteriormente identificado como lacuna, o período correspondente deverá deixar de ser apresentado como lacuna.

### Tabela de resultados

- [ ] RN09. O resultado do relatório deverá ser apresentado em formato de tabela, contendo as seguintes colunas:
> - Agente Público
> - Matrícula Siape
> - Lotação
> - Lacuna
> - Quantidade de Dias
> - Ocorrências

- [ ] RN10. As colunas Agente Público, Matrícula Siape e Lotação deverão seguir o mesmo padrão de apresentação e ordenação adotado no relatório de Agentes Públicos do sistema.

- [ ] RN11. A coluna **Lacuna** deverá apresentar a data de início e a data de fim do período identificado.

- [ ] RN11-A.  A coluna **Lacuna** deverá apresentar um tooltip com a seguinte mensagem: _Período em que o agente público, esteve selecionado como Participante do PGD no Siape, mas não possui Plano de Trabalho em execução ou concluído._

- [ ] RN12. A coluna **Quantidade de Dias** deverá apresentar a quantidade de dias de segunda a sexta-feira que compõem a lacuna, não sendo contabilizados sábados e domingos.

- [ ] RN13. O sistema deverá apresentar, na coluna **Ocorrências**, as ocorrências registradas para o agente público que possuam interseção, total ou parcial, com o período da lacuna.

- [ ] RN14. Para cada ocorrência apresentada, o sistema deverá informar:
> - tipo da ocorrência;
> - data de início;
> - data de fim.

- [ ] RN15. Quando não houver ocorrência com interseção com o período da lacuna, deverá ser apresentada a informação _"Sem ocorrência"_.

- [ ] RN16. Quando houver mais de uma ocorrência com interseção com o período da lacuna, o sistema deverá apresentar todas as ocorrências correspondentes em uma mesma célula.

### Filtros da consulta

- [ ] RN17. O relatório deverá disponibilizar os seguintes filtros:
> - Período da consulta: data inicial e data final;
> - Unidade: unidade para a qual serão apresentadas as lacunas;
> - Subordinadas: toggle para inclusão das unidades subordinadas à unidade selecionada.

- [ ] RN18. O filtro Período da consulta deverá retornar as lacunas cujo período possua ao menos um dia em comum com o período informado para consulta.

- [ ] RN19. O período completo da lacuna deverá ser apresentado no resultado, mesmo quando apenas parte dela estiver dentro do período consultado.

- [ ] RN20. O filtro Unidade deverá apresentar somente as lacunas dos agentes públicos vinculados à unidade selecionada.

- [ ] RN21. Quando o toggle Subordinadas estiver habilitado, o sistema deverá apresentar as lacunas dos agentes públicos vinculados à unidade selecionada e às respectivas unidades subordinadas.

- [ ] RN22. Quando o toggle Subordinadas estiver desabilitado, deverão ser apresentadas somente as lacunas dos agentes públicos vinculados à unidade selecionada.

- [ ] RN23. Os filtros e o toggle Subordinadas deverão seguir o mesmo padrão de funcionamento adotado nas demais telas de relatórios do sistema.

### Filtros da tabela

- [ ] RN24. Cada coluna da tabela deverá disponibilizar mecanismo de filtragem próprio, seguindo o padrão visual e funcional adotado nas demais telas de relatórios.

### Navegação

- [ ] RN25. A tela deverá apresentar a trilha de navegação padrão do sistema.

### Exportação

- [ ] RN26. Deverá ser possível exportar o relatório no formato Excel, observando os filtros aplicados na pesquisa. 

### Permissão

- [ ] RN27. As permissões para o acesso ao relatório deve seguir o mesmo padrão da tela de relatório de Planos de Trabalho.
