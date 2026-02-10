## 2.9.13 09/02/2026
### Corrigido
- Corrigido bug no relacionamento de unidades com usuários, quando há unidade inativa na lista;
- Filtragem de PEs para mostrar planos por todo e qualquer status.
## 2.9.12 29/01/2026
### Corrigido
- Corrigido bug na carga de gestores do SIAPE
## 2.9.11 28/01/2026
### Corrigido
- Corrigido bug na carga de gestores do SIAPE
## 2.9.10 26/01/2026
### Corrigido
- Correção de bugs em nova instalação de tenant
- Correção de problemas nas atribuições de chefia e substituições
- Tratamento de falhas no processamento de servidores do SIAPE
### Modificado
- Listagem de regramentos antigos e futuros no cadastro de Plano de trabalho
- Preencher os registros de execução deixa de ser obrigatório na conclusão de Planos de Trabalho dos subordinados
## 2.9.9 19/01/2026
### Adicionado
- Arquivamento automático de PTs e PEs avaliados após 90 dias de sua avaliação;
- Usuários excluídos no SIAPE agora são movidos para CPFs indisponíveis via busca manual.
### Modificado
- Status de PTs e PEs renomeados;
- Exibição de PTs e PEs segregada por status.
### Corrigido
- Retira atribuição de chefe substituto quando receber a atribuição de chefe
- Validação para Planos de entregas não ultrapassarem 365 dias
## 2.9.8 12/01/2026
### Modificado
- Seleção de regramentos na criação de PE limitada a unidade
- Ao cadastrar PE é necessário a inserção de ao menos uma entrega
- Ao cadastrar PE apenas unidades onde o usuário possui atribuição que permite a criação são selecionáveis
- Edição de PE não remove mais assinatura.
- Registro de execução só é liberado para PE após homologação, quando o plano entra em execução
- Todos os campos passam a ser obrigatórios no registro cadastro de registro de execução
### Corrigido
- Correção nas mensagens de erros de validação

## 2.9.7 02/01/2026
### Adicionado
- Adição de Aba de Situação na consulta de Agentes Públicos, com dados de matrículas, regramentos, modalidade e participação no PGD;
### Modificado
- Usuários passam a poder acessar indicadores de outros órgãos que não o da sua lotação;
- Adicionadas descrições para cada Indicador;
- Modificado a regra que bloqueia a criação de novos planos de trabalhos
### Corrigido
- Indicadores de entrega não contabilizam mais PEs cancelados.
- Registros via siape com erro de modalidade impedindo importação correta 
- Correção nos prazos da lista de pendências;
- Corrigido link de direcionamento para o Plano de Entrega na lista de pendências.
## 2.9.6 26/12/2025
### Corrigido
- Corrigido erro de "timeout" que ocorria ao tentar salvar atribuições de usuários, garantindo que as alterações sejam gravadas corretamente mesmo em operações mais demoradas.


## 2.9.5 19/12/2025
### Adicionado
- Visualização de resumo ao sincronizar dados do SIAPE, mostrando detalhes do que foi processado.

### Modificado
- `Consulta Unidade SIAPE` agora permite no máximo a inserção de 9 algarismos.
- Alterado nomenclatura do histórico de execução para registro de execução
- Habilitada edição de meta realizada na execução de plano de entrega

### Corrigido
- Solução para conflitos de e-mail que impediam a importação ou reativação de usuários do SIAPE.
- Ajuste na atualização automática da modalidade PGD dos usuários, garantindo a recuperação correta a partir do último plano de trabalho.
- Corrigido problema que dificultava o uso de datas e horários no navegador Firefox.
- Ajustes no tratamento de datas ao realizar a consolidação do Plano de Trabalho.
## 2.9.4 09/12/2025
### Modificado
- Regras de acesso mais consistentes entre perfis.
- Mensagens mais claras quando uma ação não é permitida.
- Comentários já cadastrados voltam a ser exibidos na listagem de plano de entrega
### Corrigido
- Ajustes nas permissões das telas de Configurações (Unidade e Usuário).
- Correções de visibilidade e bloqueio de ações conforme o perfil.
- Corrigida edição de entrega em Plano de Entrega que evitava o preenchimento automático da data em edição de entrega
- Corrigido erro que impedia chefe de unidade cancelar conclusão de plano de entrega
- Erro de notificação ao Microsoft Teams quando ocorre um erro interno no sistema
## 2.9.3 09/12/2025
### Adicionado
- Avisos de erro interno do sistema enviados ao Microsoft Teams, com informações básicas para acompanhamento rápido.
### Modificado
- Melhorias de desempenho em carregamento e operações frequentes, tornando o uso mais ágil e fluido.
### Corrigido
- Ajustes no fluxo de “forçar SIAPE”: mensagens mais claras, validações adicionais e resposta mais estável em casos de erro.

## 2.9.2 05/12/2025 (Hotfix)
### Adicionado
- Suporte ao Elastic APM na infraestrutura Docker, permitindo monitoramento de performance do PHP com variáveis configuráveis via `.env`.
### Modificado
- Ajustes na integração e configuração do APM para permitir habilitar/desabilitar por ambiente e manter desativado por padrão quando não definido.
## 2.9.1 05/12/2025 (Hotfix)
### Modificado
- Registro de consultas lentas diário: o arquivo de log de consultas lentas passa a ser gerado diariamente no formato `dd-mm-YYYY-mysql-slow.log`, facilitando auditoria e organização dos registros.
- Criação automática do log diário: adicionamos um agendamento para garantir a criação do arquivo de log do dia com as permissões necessárias antes do início das operações.
### Corrigido
- Estabilidade no monitoramento de desempenho: correções para evitar falhas na leitura e notificação das consultas lentas, garantindo avisos consistentes.
- Consistência ao notificar consultas lentas: ajustes na leitura do último registro válido do log para evitar mensagens incorretas.
### Segurança
- Melhoria no controle de limpeza de logs: adicionado processo diário para remoção de logs antigos (mais de 10 dias), reduzindo exposição e uso de armazenamento.

## 2.9.0 03/12/2025
### Modificado
- Melhorias significativas em desempenho das queries e adição de cache para otimização de performance
### Adicionado
- Monitoramento do desempenho das queries
- Notificação de performance das queries
## 2.8.3 01/12/2025
### Corrigido
- Corrigidos e simplificados os registros de pendências do chefe
- Corrigida a permissão para alteração de atribuições nos Perfis Master e Negocial
- Corrigido o acesso do usuário não participante do PGD à tela de Plano de Trabalho
- Problema em cidades com fuso horário UTC-2
- Corrigida listagem infinita em modal de vinculação de entregas em cadastro de entrega
### Modificado
- Regras para quem possui mais de uma matrícula: ao trocar de unidade, o sistema passa a escolher a matrícula correta automaticamente, reduzindo erros e evitando duplicidade.
- Exibição da matrícula ao trocar de unidade ficou mais clara e traz aviso quando a matrícula estiver em processo de inativação.
- Ajustes nas regras de edição de atribuições para usuários com múltiplas matrículas, deixando o uso mais previsível e consistente com os perfis de acesso.
- PEs e PTs cancelados não são mais enviados para a API do PGD.
## 2.8.2 24/11/2025
### Corrigido
- Corrigido o problema de exibição da modalidade presencial no plano de trabalho
- Corrigido o problema de exibição da tela de planos de trabalho quando usuário não é participante do PGD
## 2.8.1 18/11/2025
### Corrigido
- Corrigido o problema de exibição do regramento na lista de usuários
## 2.8.0 17/11/2025
### Adicionado
- Módulo de pendências do chefe
- Módulo de pendências do participante
- Informações na lista de usuários
- Indicadores de Equipes
- Indicadores de Entregas
- Indicadores de Gestão
- Configuração para exibir a opção de Problemas de Lotação
- Adicionado campo executora para indicar unidades que poder ter Plano de Entrega cadastrado
### Modificado
- O regramento agora é vinculado pela hierarquia de unidades.
- Melhorias no tratamento de unidades que não estão mais ativas (extintas): o sistema passa a marcá-las como inativas sem apagar seus dados, preservando histórico e vínculos.
### Corrigido
- Exportação de Status do PT no Relatório de PT
- Filtro de Situação da conclusão no Relatório de PE
- Exportação de Modalidade SIAPE no Relatório de Agentes Públicos
### Removido
- Removido limite máximo de 100% CHD por entrega em Plano de Trabalho
- Tela de seleção de participante no regramento
## 2.7.8 10/11/2025
### Corrigido
- Pesquisa por CPF no SIAPE: agora, quando existem vários usuários com o mesmo CPF e matrículas diferentes, todos aparecem na lista de resultados.
- Exportação por CPF no SIAPE: o arquivo gerado foi corrigido e passa a abrir normalmente, mesmo quando há múltiplos registros.
- Aviso sobre dados do SIAPE na tela de resultados: texto menor e melhor posicionado para facilitar a leitura.
### Modificado
- Integração com o SIAPE: aprimoramos a atualização das matrículas ausentes dos usuários, com mais validações e registros, tornando o processo mais confiável.
- Endereços de e‑mail temporários: quando a matrícula não estiver preenchida, o sistema cria automaticamente um e‑mail temporário único para evitar duplicidades.
- Tela de resultados da consulta de CPF no SIAPE: o carregamento foi aprimorado para exibir, de forma consistente, todos os usuários retornados pela consulta.
## 2.7.7 29/10/2025
### Corrigido
- Correção do bloqueio de planos de trabalho
- Não permitir a duplicidade de atribuições para o agente público
### Modificado
- Desbloqueio da clonagem do Plano de Trabalho e Plano de Entrega para outros status
- Regra de exclusão de agentes públicos: apenas os agentes com perfil colaborador (usuário externo) são passíveis de exclusão.
- Aba "mais informações" de agentes públicos: campos do formulário são apenas para leitura, impossibiliando a edição por essa tela.

## 2.7.6 24/10/2025
### Corrigido
- Colaboradores externos com vinculo no siape.
- Erro ao buscar Plano de Trabalho indicando Unidades Subordinadas sem selecionar unidade executora.
### Modificado
- ADM Negocial acessa todos os seus vínculos nos Relatórios
- Ao selecionar a opção "Unidades Subordinadas", campo "Unidade Executora" é obrigatório na busca de Plano de Trabalho.
### Adicionado
- Bloqueio para inclusão de novo Plano de Trabalho ou Plano de Entrega quando houver pendências em mais de 2 dos respectivos planos.

## 2.7.5 20/10/2025
### Adicionado
- Opção para Reiniciar Envios à API PGD, o que permite um reenvio completo da base completa à API.
### Corrigido
- Envio de participantes que não possuem regramento ativo

## 2.7.4 13/10/2025
### Modificado
- Atualizado o arquivo update.sh para incluir o parâmetro --deploy-seed
- Modificado a validação do CPF ao processar Usuário Siape
### Corrigido
- Status vazio na tela de servidores
- Correção na paginação dos Planos de Trabalho

## 2.7.3 06/10/2025
### Corrigido
- Corrigido envio de Contribuições da Própria unidade

## 2.7.2 02/10/2025
### Corrigido
- Corrigido matriculas duplicadas

## 2.7.1 01/10/2025
### Adicionado
- Campo de identificação única (ident_unica) nas tabelas de usuários e integração de servidores para melhor controle de dados
### Corrigido
- Correção de resultados duplicados na consulta de unidades vinculadas ao usuário
- Corrigido botão para adicionar atividades no registro de execução
### Modificado
- Alterado o nome do relatório de CPF's inexistentes, bloqueados e/ou exonerados do SIAPE de Blacklist Servidor para "CPFs indisponíveis"

## 2.7.0 30/09/2025
### Adicionado
- Registro de Horas nos Afastamentos
- Exclusão de Colaboradores externos
- Sistema de múltiplas matrículas para usuários
- Exibição do número de matrícula do usuário no módulo de gestão
- Filtros de unidades por matrícula do usuário
- Novos campos PGD e jornada de trabalho na integração SIAPE
- Validação de entregas na criação do plano de trabalho
- Somente deve ser possível editar um PT se o registro de execução não tiver sido concluído
- O registro de execução só deve ser feito após o plano de trabalho entrar no status "Aprovado"
- O participante deve preencher TODOS os campos de descrição dos trabalhos realizados, antes de concluir o registro de execução
- Ao cancelar avaliação do plano de trabalho, na tela de planejamento o mesmo deve retornar ao status "Aprovado"
### Corrigido
- Corrigido regra para clonar planos de entrega
- Corrigido criação dos registros de execução após edição do plano de trabalho
- Correção na Nota e Situação de Reavaliação no Relatório de Planos de Trabalho
- Correção no envio de Notas das Avaliações dos Planos de Trabalho para API 
- Validação de código de unidade vazio antes do processamento no SIAPE
- Remoção de log redundante de erro no serviço de integração
- Melhorias no processamento de dados e tratamento de erros na integração SIAPE
### Modificado
- Afastamentos passam a ser denominados de Ocorrências
- Métodos de integração de servidor modificados para usar CPF e matrícula
- Melhorias no processamento de dados da integração SIAPE
- Aprimoramento do tratamento de unidades extintas
- Agrupamento de Planos de Trabalho por unidade na listagem de planejamento

## 2.6.5 22/09/2025
### Corrigido
- Alerta do PT em unidade diferente aparecendo mesmo quando está sendo feito na própria unidade de lotação
- Corrigido colaborador externo com dados no SIAPE (agora deixará de ser externo e se tornará um colaborador do sistema).

## 2.6.4 10/09/2025
### Corrigido
- Correção de constraint de chave estrangeira na modalidade PGD
- Ajustes na tabela de usuários para modalidade PGD nullable
- Melhorias nas mensagens de erro e tratamento de exceções
- Correção de problemas na carga individual SIAPE
## 2.6.3 08/09/2025
### Corrigido
- Permissões nos Relatórios
### Removido
- Indexação de ambiente de homologação nos buscadores

## 2.6.2 25/08/2025
### Adicionado
- Envio de contribuições não vinculadas a Planos de Entrega
- Readicionada importação da jornada de trabalho do SIAPE
- Adição de campo situação do agente público no SIAPE
- Opção de ativar temporariamente o agente público
- Adição de novo perfil (Consulta), usado para agentes públicos inativos    
- JOB diário para inativar agentes públicos ausentes na integração SIAPE
### Modificado
- Adição da data e homologação e de conclusão no Relatório de Planos de Entrega
- Adição da situação de conclusão no Relatório de Planos de Entrega
- Adição da jornada de trabalho no Relatório de Agentes Públicos
- Adição de campo situação no Relatório de Agentes Públicos
### Corrigido
- Correção do campo de Situação de Avaliação no Relatório de Planos de Entrega
- Correção de buffer no Envio de Planos de Trabalho
- Correção de Texto com número de assinaturas solicitadas no Plano de Trabalho

## 2.6.1 10/08/2025
### Corrigido
- Corrigido erro no relacionamento de atribuições do usuário
- Correção do Relatório de Unidades
- Correção do Relatório Detalhado de Planos de Trabalho
- Modificações de collation dos Relatórios de Planos de Trabalho, Entrega e Unidades

## 2.6.0 08/08/2025
### Adicionado
- Relatório de Agentes Públicos
- Relatório de Unidades
- Alerta ao assinar plano de trabalho que exijam a assinatura de um ou três agentes públicos
- Contador de assinaturas
- JOB de inativação de agentes públicos excluídos na integração SIAPE
- Flag para identificar situação de agentes públicos (ativo, inativo, ativo temporário)
- Opção para ativar temporariamente o agente público
- Novo perfil (Consulta), usado para agentes públicos inativos
### Corrigido
- Corrigido erro de cardinalidade na integração com SIAPE
- Corrigido erro na exclusão de atribuições do usuário
- Corrigido assinaturas de planos de trabalhos de unidades sem chefias
- Collation no Relatorio de Planos de Trabalho
- Exibição incompleta do Relatório de Planos de Trabalho
- Exibição incompleta do Relatório de Planos de Entrega
- Situações dos planos cancelados no Relatórios de Planos de Trabalho
- Exibição dos Planos de Entrega de origem da Própria Unidade no cadastro de Planos de Trabalho

### Removido
- Permissão para Adm. master inativar unidades
- Botões de relatório (legado) em planos de trabalhos

## 2.5.3 29/07/2025
### Corrigido
- Corrigida permissão do Relatório de Planos de Trabalho
- Corrigida permissão do Relatório de Planos de Entrega
- Corrigido a rota de acesso ao SIAPE INDIVIDUAL de Unidades

## 2.5.2 28/07/2025
### Adicionado
 - Clonagem de Plano de Entrega
 - Inclusão de ícones e alertas para unidades sem chefia e/ou com chefias substitutas
 - Inclusão de job de inativação de servidores excluídos no SIAPE
 - Validações ao lotar um servidor (prevenindo ser chefe em outra unidade)
### Modificado
- Modificado ícone de "ativo" da situação das unidades executoras
- Removida chefia titular de unidades sem chefias no SIAPE
- Removida chefia titular de unidades onde o seu chefe está lotado em outra unidade (SIAPE)
- Servidores e chefias lotados em outras unidades continuarão vinculados à sua unidade anterior, caso haja qualquer tipo de plano de trabalho na unidade (independente do status do plano)
- No processamento individual do SIAPE por CPF, agora todos os vínculos do servidor são limpos, forçando um novo vínculo
- No processamento individual do SIAPE por unidade, agora a data de modificação é forçada (como já é feito no processamento por CPF)
- No processamento individual do SIAPE por unidade, agora são processados também os servidores e chefias, além da própria unidade
- Centralizadas a maioria das mensagens de log do fluxo do SIAPE no arquivo siape.log
- Chefia não altera mais a lotação de um servidor (o servidor deve estar previamente lotado na unidade) 
### Corrigido
- Alterado a forma de buscar chefias na base de dados, se baseando na lotação do servidor
- Corrigido vínculo de chefia em uma unidade quando o servidor está lotado em outra unidade
- remoção dos dados de servidores aposentados do tenant da FUNASA (centralizado)

## 2.5.1 24/07/2025
### Corrigido
- Correção dos relatórios para bancos de dados MySQL;
- Correção nas listagens que estavam passando dos limites da página;
- Correção na seleção do plano de entrega no cadastro de Planos de Trabalho.

## 2.5.0 21/07/2025
### Adicionado
- Relatório de Planos de Trabalho
- Relatório de Planos de Entrega
- Adição da Data de Recurso
- Tela e componente no front para exibir erro 500
### Corrigido
- Remoção e validação de duplicidade na relação de usuários com unidades
### Modificado
- Opção para ver logs em cada registro das listas

## 2.4.2 03/07/2025
### Corrigido
 - Correção na edição de planos de entrega
 - Mudança na forma de atualizar cidades e UFs das unidades vindas do SIAPE
 - correção na busca dos códigos dos orgãos das unidades no SIAPE

## 2.4.1 13/06/2025
### Corrigido
 - Bug na habilitação do pedágio
 - Bug na criação de plano de trabalho pelo perfil colaborador

## 2.4.0 11/06/2025
### Adicionado
 - Função para bloquear o teletrabalho para servidores em pedágio
 - Filtros no módulo de Agendamento de Jobs.
 - Edição de Agendamentos.
 - Adicionada opção de periodicidade dos Agendamentos.
 - Adicionado a opção de processar um cpf no fluxo de consulta do SIAPE
 - Adicionado a opção de processar uma unidade no fluxo de consulta do SIAPE
### Modificado
 - Redução do tamanho do banco de dados, pela modificão da utilização do Redis pelo Telescope. 
 - Redução do tamanho da imagem de Build, agilizando a atualização do sistema.
 - Redesenhado o layout de consultas do SIAPE (CPF e Unidade).
 - Alterado o formato de download do xml de unidade (agora virá zipado como no CPF)
### Corrigido
 - Corrigido erro 403 ao registrar execução do Plano de Trabalho (PT).
 - Corrigida a ordenação incorreta dos processos da Comissão de Validação (CV)
## 2.3.20 27/05/2025
### Corrigido
 - Correção no SQL de vinculos do SIAPE.
## 2.3.19 19/05/2025
### Modificado
 - Adicionado as regras de perfis do SIAPE o perfil Administrador Geral
 ### Removido
 - Removido os campos de jornada advindos do SIAPE e do sistema
## 2.3.18 12/05/2025
### Adicionado
 - Recurso para clonar plano de trabalho
 - Filtro default para listagem de planos de trabalho - UMenidades subordinadas
### Corrigido
 - Correção em filtros do plano de entrega
 - Mensagem de erro 503
## 2.3.17 25/04/2025
### Corrigido
 - Horário de vigência do Plano de trabalho, não é mais considerado.
 - Listagem de Registros de Execução
 - Ajustado erro que removia a matrícula SIAPE ao alterar o usuário
### Modificado
 - Adicionado permissão para listar todas unidades

## 2.3.16 16/04/2025
### Corrigido
 - Path do plugin Tinymce 
 - Corrigido regras da execução do job do SIAPE
 
## 2.3.15 11/04/2025
### Corrigido
 - Correção de erro no TCR ao editar o plano de trabalho
 - Correção na abertura do link de autorização nos Regramntos
### Modificado
 - Aperfeiçoamento da interface de login do Painel SaaS
 - Modificação dos menus no Painel SaaS

## 2.3.14 01/04/2025
### Corrigido
 - Ajustes em capacidades

## 2.3.13 28/03/2025
### Adicionado
 - Novo Filtro de Unidades Subordinadas - Plano Entrega.
 - Novo Filtro de Unidades Subordinadas - Plano Trabalho.
### Modificado
- Fixados os valores das variáveis de ambiente APP_ENV, CACHE_DRIVER e QUEUE_CONNECTION, para
evitar erros comuns de má configuração, nos envios de dados e sincronização;
### Corrigido
 - Ajustes nas capacidades dos perfis: Colaborador, Chefe de Unidade, Adm Negocial e Adm Master.
 - Correção para carregar o regramento atual em Planos de Trabalho.
 - Adicionada renovação do token de envio, para evitar erro na expiração do token durante o envio.
### Removido
 - Removido job de exportação de Todos os Tenants, para evitar dubiedade.

## 2.3.12-Hotfix 24/03/2025
### Corrigido
 - Correção nos filtros de Planos de Entrega

## 2.3.12 24/03/2025
### Corrigido
### Adicionado
 - Adição dos perfis: Adm Master e Colaborador
 - Permissão para incluir agentes públicos como Colaborador
### Modificado
 - Atualização de todos os perfis de desenvolvedores para Adm Master
 - Ajustes nas capacidades para os novos perfis
### Removido
 - Alteração de lotação pelo caminho da chefia


## 2.3.11 13/03/2025
### Corrigido
 - Correção dos vinculos com unidades pai e path inválidos
### Removido
 - Removido dados sensiveis do XML de dados pessoais do SIAPE 
 - Opção para clonar planos de entrega e trabalho
### Adicionado
 - Dispensa de homologação de PE para unidades imediatamente inferiores
## 2.3.10 27/02/2025
### Corrigido
 - Correção na sanitização do xml de servidores do SIAPE
### Adicionado
 - Adicionado lista de servidores excluídos do SIAPE no sistema
### Modificado
 - Melhoria na mensagem de erro quando da inclusão de participantes no programa por não participantes ou que não sejam de chefia.
 - Modificado texto de Unidade Executora para Executora no cadastro de Cadeia de Valor

## 2.3.9 24/02/2025
### Corrigido
 - Correção no SIAPE ao parar as lotações ao encontrar um usuário com unidade excluída.
 - Correção ao exibir atribuições onde o servidor tem vinculo com unidades inativas/excluídas

 ### Adicionado
 - Adição de Formulário de Relato de Erros de Lotação no SIAPE

## 2.3.8 15/02/2025
### Corrigido
 - Correção da palavra "eletrônica" na tela de assinatura eletrônica
 - Correção nas falhas ao salvar logs com parametro incorreto
 - Correção no erro ao alterar a unidade pai de uma unidade
 - Correção no clone de Plano de Trabalho
### Adicionado
 - Adicionado a busca de unidades no menu de consultas da tela do desenvolvedor
 - Adicionado a busca de dados dos dados pessoais de um CPF na tela de consulta de um CPF
 - Seeder para corrigir FUNARTE
 - Capacidade para restringir mudança de unidade instituidora
### Modificado
 - reestruturado a tela de configuração de Job's
 - Modificado tela de exibição de execução do SIAPE, exibindo Sistema quando job executar e exibindo corretamente o status de unidades e servidores.
### Removido
 - Seeder de correções passadas
## 2.3.7 07/02/2025
### Corrigido
 - Correção no seeder In24_2023Seeder
 - Correção na avaliação do plano de trabalho e permissão de recursos somente para notas "INADEQUADO" e "NÃO EXECUTADO"
 - Correção no envio de Planos de Entrega não avaliados
## 2.3.6 27/01/2025
### Removido
 - Menus não funcionais
## 2.3.5 24/01/2025
### Adicionado
 - Consulta de dados funcionais do SIAPE de um CPF na tela do Desenvolvedor
### Corrigido
 - Correção no envio ao PGD de planos de entrega Avaliados
 - Adição no envio ao PGD de planos de entrega re-avaliados
 - Remoção de unidades raizes duplicadas
 - Correção na falha ao inserir unidades sem vínculos acimas

## 2.3.4 03/01/2025
### Adicionado
 - Adicionada opção parta forçar Envio imediato
 - Adicionado número do Envio ao PGD
### Modificado
 - Otimizações no envio ao PGD
 - Melhoria na identificação dos Jobs de Envio
### Corrigido
 - Correção na atualização dos vínculos com unidade pai de uma unidade modificada via SIAPE
## 2.3.3 18/12/2024
### Adicionado
 - Adição da Unidade Autorizadora no Painel
 - Adição de Job para envio individual de Tenant
 - Consulta Audit no Painel
### Corrigido
- Envio da Matrícula SIAPE para a API PGD
- Comando para enviar manualmente para API PGD
### Modificado
 - Remoção da Unidade Autorizadora dos Regimentos
 - Modificada Unidade Autorizadora no Envio para API PGD
 - Melhorias de uso de memória no Envio para a API PGD
 - Busca do codigo UORG feito a partir da requisição do SIAPE
### Removido
 - Remoção das configurações do painel de integração:
    Auto-incluir
    Codigo unidade raiz
    Upag
    Codigo UORG
## 2.3.2 03/12/2024
### Adicionado
 - Fragmentado dados inseridos no banco pelo SIAPE
 - Adição de Logs de processamento da API PGD
 - URL da API PGD nos Tenants
 - Consulta aos logs do Envio da API PGD
 - Envio para a API PGD dividido em jobs menores
### Corrigido
 - Texto do participante no TCR
 - Servidores temporários não conseguiam assinar planos de trabalho
 - Alteração na busca da lotação de servidores temporários
 - Removido duplicação de jobs ao editar o tenant
 - Carga de Tipos de Motivo de Afastamento não carregavam corretamente no Seeder
 - Regramento padrão nos planos de trabalho, entrega e seleção de participantes carregava unidade errada
### Modificado
 - Desabilitado edição do TCR compilado em plano de trabalho
 - Retirado opção do texto complementar da unidade executora no formulário do plano de trabalho
 - Configurações do supervisor para envio da API PGD
 - Removidos menus de Tipos de Meta, Tipos de Avaliação, Tipos de Modalidade, Tipos de Motivos de Afastamento
## 2.3.1 23/10/2024 (Hotfixes)
### Adicionado
 - Migrate para agendar os JOBS do SIAPE automaticamente
### Corrigido
 - Ajuste da fila de JOBS
### Modificado
 - Adicionado validação na tela de execução do SIAPE
### Removido
 - Módulo dump do tenant no painel
 - Retirado código de integração da chefia substituta
 - Arquivos obsoletos
### Obsoleto
 - LogChanges 
## 2.3.0 - 18/10/2024
### Modificado
 - Modificação da busca dos dados do SIAPE, com tabelas auxiliares
 - Alteração no processamento dos dados do SIAPE, alterando das requisições e passando para os dados da tabelas auxiliares
 - Aumento no timeout do processamento SIAPE e processamento em fila diferente
 - Envio para a API PGD em conformidade com a versão 3.2.1
### Adicionado
 - Adicionado botão no painel dos tenantes para forçar uma atualização completa de dados do SIAPE
 - Adição do Telescope para monitoramento das consultas e logs
 - Adição do Horizon para monitoramento dos Jobs
 - Adicionado módulo dump do tenant no painel
 - Adicionado módulo central_domains no painel
### Corrigido
 - Consulta na busca das cidades no SIAPE 
 - Correção do tamanho do campo fundamentos/objetivo.
 - Correção ao editar um tenant.
 - Correção ao editar unidade.
## 2.2.0 - 04/10/2024 (Hotfixes)
### Segurança 
- Adicionado validações para usuários do painel.
- Adicionado validações para manipulação dos dados do tenant.
### Corrigido
- Correção para associar o perfil do usuário baseado na informação de chefia.
### Removido
- Remoção de arquivos não usados.
## 2.1.3 - 03/10/2024
### Corrigido
- Correção no SIAPE falha de processamento servidores dos dados para banco de dados

## 2.1.2 - 30/09/2024
### Corrigido
- URL de redirecionamento do login único (GovBR).
- CPF do Desenvolvedor, aceitar somente números (Tenant).
- Atualizar usuário ao atualizar dados do tenant.
### Adicionado
- Opção para o usuário do painel alterar a senha.
## 2.1.1 - 18/09/2024 (Hotfixes)
### Corrigido
- Validação de Planos de Entrega.
- Seleção automática do regramento.
- Não permitir o uso da atribuição "Lotado" (somente SIAPE).
- Permissão para Administrador negocial editar o template do TCR.
- Permissão para Administrador negocial não visualizar o menu cadastros.
## 2.1.0 - 06/09/2024
### Adicionado
- Campo para informar a unidade autorizadora no regramento.
- Opção para clonar Planos de Trabalho e Planos de Entrega.
- Adicionado nível de "Configurador" do tenant
- Adiciona Auditoria do Sistema
- Adição de campos para informar usuário e senha da API PGD nos Tenants
### Corrigido
- Correção para refletir afastamentos nos registros de execução.
- Correção para incluir Planos de Trabalho no mesmo dia de início do regramento.
- Correção na regra para bloquear Planos de Trabalho com datas sobrepostas
- Correção do cadastro do tenant
- Correção no login da Azure(Microsoft)
### Removido
- Arquivos de documentação. Documentação oficial será no site do PGD
- Acesso direto ao SIAPE
### Modificado
- Remoção do caracter '#' dos endereços (URL) do sistema
- Modificação no acesso aos dados do SIAPE, alterando de conexão direta ao SIAPE para o conectaGov, no painel do administrador deverá ser alterado a rota e inserido a chave e senha.
- Alterado a forma que é definição de chefia e chefia substituta no sistema, se baseando nos campos advindos do SIAPE
### Segurança 
### Obsoleto 
### Não Publicado
- Exportação de dados para o Programa de Gestão - PGD
