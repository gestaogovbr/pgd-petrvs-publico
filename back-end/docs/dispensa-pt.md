## Contextualização

A IN Conjunta SEGES-SGPRT/MGI nº 24/2023 prevê a possibilidade de dispensa da pactuação de Plano de Trabalho para agentes públicos ocupantes de cargos de chefia, dispensados de controle de frequência nos termos do art. 6º, § 7º, do Decreto nº 1.590/1995, desde que sejam chefias de unidade de execução. Para que essa situação seja formalmente registrada no Petrvs e possa ser considerada na análise de cobertura dos Planos de Trabalho, é necessário disponibilizar funcionalidade específica para identificação da dispensa, com definição de seu período de validade. A informação também deverá ser disponibilizada na tela e no Relatório de Agentes Públicos e considerada no Relatório de Lacunas de Planos de Trabalho.

## Objetivo

Permitir que usuários autorizados formalizem, no cadastro do agente público, a Dispensa de Plano de Trabalho, informando seu período de validade, com validação da condição de elegibilidade prevista na IN nº 24/2023, e disponibilizar essa informação nas consultas e relatórios relacionados à conformidade da cobertura de Planos de Trabalho.

## Regras de Negócio

### Formalização da dispensa

- [ ] RN01. A tela de Agentes Públicos deverá disponibilizar funcionalidade para formalização da Dispensa de Plano de Trabalho.

- [ ] RN02. A funcionalidade deverá permitir informar:

- **Data de início da dispensa:** obrigatória;
- **Data de fim da dispensa:** opcional.

- [ ] RN03. A data de início da dispensa poderá ser informada de forma retroativa.

- [ ] RN04. Quando a data de fim não for informada, a dispensa deverá permanecer vigente até que seja formalizado o seu encerramento.

- [ ] RN04-A. Quando a data de fim não for informada, o sistema deve apresentar a opção de encerrar a dispensa.

### Elegibilidade

- [ ] RN05. A funcionalidade de formalização da dispensa deverá estar disponível somente para agentes públicos que possuam atribuição de:

- Chefia **Titular** de unidade **Executora**; ou
- Chefia **Substituta** de unidade sinalizada no sistema como **Executora**.

- [ ] RN06. O sistema deverá verificar, no momento da concessão da dispensa, se o agente público atende ao critério de elegibilidade estabelecido na RN05.

- [ ] RN07. Caso o agente público não seja elegível, não deverá ser permitido a formalização da dispensa e deverá ser apresentada a seguinte mensagem de erro:  _Não é possível formalizar a dispensa de Plano de Trabalho. O agente público não atende aos critérios estabelecidos no §3º do art. 19 da IN Conjunta SEGES-SGPRT/MGI nº 24/2023._

### Permissões

- [ ] RN08. A formalização da dispensa deverá ser permitida exclusivamente aos usuários com os seguintes perfis:

- Desenvolvedor;
- Administrador Master;
- Administrador Negocial.

- [ ] RN09. Usuários com perfil Administrador Master ou Administrador Negocial somente poderão formalizar ou alterar a dispensa de Plano de Trabalho de agentes públicos vinculados às unidades nas quais possuam atribuição ou suas subordinadas.

> Exemplo: um Administrador Negocial com atribuição na SEGES poderá formalizar ou alterar dispensas no âmbito dada Seges e suas subordinadas, mas não poderá conceder dispensa para uma chefia vinculada a outra Secretaria que esteja fora de seu âmbito de atribuição.

### Formalização e alteração da dispensa

- [ ] RN10. Ao acionar a funcionalidade "Dispensar de Plano de Trabalho", o sistema deverá apresentar uma modal para formalização da dispensa.

- [ ] RN11. A modal deverá disponibilizar os seguintes campos:

- Data de início da dispensa: obrigatória;
- Data de fim da dispensa: opcional;
- Ciência: obrigatória.

- [ ] RN12. O campo Ciência deverá apresentar a seguinte declaração:

> _Declaro que estou ciente dos critérios para dispensa de Plano de Trabalho, nos termos do § 3º do art. 19 da IN Conjunta SEGES-SGPRT/MGI nº 24/2023._

- [ ] RN13. O usuário deverá fornecer nova ciência sempre que a dispensa for formalizada ou alterada, independentemente do tipo de alteração realizada.

- [ ] RN14. O sistema somente deverá permitir a confirmação da formalização ou alteração da dispensa após o usuário fornecer a ciência.

- [ ] RN15. Deverá ser possível alterar, a qualquer momento, as datas de início e fim da dispensa, observadas as permissões definidas para a funcionalidade.

- [ ] RN16. As alterações realizadas nas datas da dispensa deverão ser imediatamente consideradas na identificação das lacunas de Planos de Trabalho, de modo que os relatórios sejam atualizados de acordo com a nova informação.

### Identificação do responsável

- [ ] RN17. A modal deverá apresentar, em seu rodapé, a identificação do usuário responsável pela aplicação ou alteração da dispensa, acompanhada da respectiva data e hora.

- [ ] RN18. O sistema deverá manter e disponibilizar o histórico das aplicações e alterações da dispensa, contendo, para cada operação, a identificação do usuário responsável, a data e hora da operação e as respectivas informações da dispensa então formalizadas.

## Ajustes na tela de Agentes Públicos

- [ ] RN19. A tela de Agentes Públicos deverá apresentar a informação de dispensa na coluna Situação.

- [ ] RN20. Quando o agente público possuir uma dispensa vigente na data da consulta, a coluna Situação deverá apresentar sinalização específica indicando "Dispensa de PT".

- [ ] RN21. A tela de Agentes Públicos deverá disponibilizar filtro por Situação.

- [ ] RN22. O filtro deverá permitir consultar os agentes públicos com Dispensa de PT, além das demais situações já disponíveis na tela.

## Ajustes no Relatório de Agentes Públicos

- [ ] RN23. O Relatório de Agentes Públicos deverá apresentar as informações relativas à dispensa de Plano de Trabalho.

- [ ] RN24. Deverão ser incluídas as seguintes colunas:

- Dispensa de Plano de Trabalho;
- Início da Dispensa de Plano de Trabalho;
- Fim da Dispensa de Plano de Trabalho.

- [ ] RN25. A coluna Dispensa de Plano de Trabalho deverá apresentar os valores Sim ou Não, conforme a existência de dispensa formalizada para o agente público.

- [ ] RN26. A coluna Início da Dispensa de Plano de Trabalho deverá apresentar a data de início da dispensa formalizada.

- [ ] RN27. A coluna Fim da Dispensa de Plano de Trabalho deverá apresentar a data de fim da dispensa, quando informada. Quando a dispensa não possuir data de fim, o campo deverá permanecer sem preenchimento.

- [ ] RN28. As novas colunas deverão seguir o padrão de filtragem adotado nas demais colunas do Relatório de Agentes Públicos.
