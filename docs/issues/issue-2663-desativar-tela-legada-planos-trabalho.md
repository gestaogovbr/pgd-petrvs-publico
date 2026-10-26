# Issue #2663 — Desativar a tela legada de Planos de Trabalho

Fonte: https://github.com/gestaogovbr/petrvs-pgd/issues/2663

## Problema relatado

A issue relata que alguns usuários ainda acessam links da tela V1 de Planos de Trabalho (PT) e executam ações por ela. O efeito citado é a entrada de planos em execução sem períodos avaliativos. O pedido é impedir ações pela tela legada e redirecionar seus links para a V2. A issue indica todos os tenants e prioridade baixa; não informa URL, requisição ou plano específico associado à ativação pela V1.

Um comentário sobre o plantão técnico de 07/10/2026 relata ausência de períodos para registro de execução em MAPA, CEFET-MG e UNIPAMPA, desde a versão 3.1.4 e ainda na 3.2.0. Um PT foi identificado no comentário, mas seus dados pessoais foram omitidos aqui. O comentário não demonstra que esses casos passaram pela V1. O outro comentário é um modelo de refinamento técnico sem conteúdo preenchido.

## Entendimento atual

Fatos observados no código deste checkout:

- O Angular ainda registra `gestao/plano-trabalho` e `avaliacao/plano-trabalho` com o módulo V1, além de `gestao/plano-trabalho-v2` com a V2 (`front-end/src/app/app-routing.module.ts`). O módulo V1 contém lista, inclusão, edição, consulta, clonagem e rotas de consolidação/avaliação (`front-end/src/app/modules/gestao/plano-trabalho/plano-trabalho-routing.module.ts`).
- O menu principal de PT aponta para a V2, mas os menus de consolidações e avaliação ainda apontam para rotas V1. O cadastro de entidade usado em seleções também aponta `PlanoTrabalho` para V1 (`front-end/src/app/app.component.ts`, `front-end/src/app/services/entity.service.ts`).
- As rotas HTTP V1 autenticadas ainda incluem operações de escrita, como `ativar`, `reativar`, `suspender` e `cancelar-plano`; a API V2 tem rotas próprias (`back-end/routes/api_tenant/plano-trabalho.php`, `back-end/routes/api_tenant/v2/plano-trabalho.php`). Redirecionar apenas a navegação Angular não desativa esses endpoints V1.
- No serviço V1, `ativar()` atualiza o status para `ATIVO` sem chamar a geração de consolidações naquele método. A geração V1 é chamada em `extraStore()` após criação ou alteração do plano (`back-end/app/Services/PlanoTrabalhoService.php`). Na V2, a assinatura que torna o plano `ATIVO` chama `GeradorPeriodosAvaliativos::gerar()` (`back-end/app/V2/PlanoTrabalho/Documento/PlanoTrabalhoDocumentoService.php`).
- A V2 oferece lista, novo, editar, consultar e TCR. As rotas V1 de consolidação e avaliação não têm correspondência direta em `front-end/src/app/modules/gestao/plano-trabalho-v2/routes.ts`; é preciso definir o destino funcional antes de redirecioná-las indiscriminadamente.

## Hipótese confirmada

O código confirma que a tela e a API V1 continuam acessíveis e que a ação V1 de ativação não gera períodos naquele método. Portanto, ela **pode** deixar um plano ativo sem períodos caso esses períodos já estejam ausentes. Isso não prova que a V1 causou a ausência nos casos do plantão, nem que o plano citado foi ativado por esse caminho.

## Hipóteses secundárias

- Um link salvo, seleção de entidade ou navegação interna pode levar o usuário à V1 apesar de o menu principal de PT apontar para a V2.
- Os casos de períodos ausentes podem envolver falha anterior na geração, dados do regramento ou outro fluxo de ativação. Não há histórico de chamadas, logs ou estado dos períodos desses planos na issue para distinguir essas causas.
- O simples redirecionamento de URLs pode preservar acesso à API V1 por chamadas diretas ou clientes antigos. A necessidade e o alcance do bloqueio no backend dependem da regra de desativação definida para os demais recursos legados.

## Cenários não resolvidos ou conflitantes

- A expressão “desabilitada por completo” conflita com os menus de consolidação e avaliação que ainda usam o módulo V1. É necessário definir se esses fluxos devem migrar, permanecer com exceção explícita ou receber um destino equivalente.
- Falta definir o mapeamento de links V1 de lista, novo, edição, consulta, clonagem e TCR para a V2, inclusive preservação do ID e de parâmetros quando houver. Nem toda rota V1 tem equivalente direto.
- Não há evidência de que as três ocorrências de ausência de períodos tenham a mesma causa ou relação com a navegação legada. A versão, o estado do plano e o histórico de geração de cada caso precisam ser correlacionados sem expor dados pessoais.
- A issue marca o erro como não reincidente, mas descreve acesso continuado por links antigos. É preciso distinguir ocorrência pontual de possibilidade permanente de acesso.

## Critérios de aceite sugeridos

- Links antigos de PT com equivalente V2 levam ao destino correspondente, preservando o identificador do plano quando aplicável; nenhum componente V1 de PT permite criar ou alterar planos.
- A política para ações HTTP V1 de PT é definida e aplicada de forma que chamadas diretas não contornem a desativação, sem interromper integrações ou fluxos ainda dependentes dessas rotas sem decisão explícita.
- Consolidação e avaliação continuam acessíveis e funcionais por rotas aprovadas após a mudança.
- Um plano não deve entrar em execução sem períodos avaliativos exigidos; a regra deve ser validada no fluxo de ativação e em planos já afetados, separadamente do redirecionamento.

## Próximos testes propostos

- Exercitar por HTTP/navegação os links V1 de lista, novo, edição, consulta e clonagem, confirmando o destino V2, parâmetros preservados e impossibilidade de ação na tela V1.
- Cobrir chamadas autenticadas de escrita à API V1, inclusive `ativar`, conforme a política de desativação definida, e verificar que a V2 continua operando.
- Cobrir os menus e links de consolidação/avaliação após definir seus destinos funcionais.
- Em teste E2E backend tenant com dados sintéticos, reproduzir um plano sem consolidações antes da ativação V1 e verificar a transição e os períodos resultantes. Comparar com a ativação por assinatura V2, sem pressupor que isso reproduza os casos reais.
- Investigar os três casos do comentário com identificadores mascarados: histórico de status/assinaturas, existência e datas das consolidações, regramento, logs e versão implantada no momento da ocorrência.

## Reprodução antes da correção

Em 2026-10-13 foi criado `back-end/tests/IntegrationTenant/Issues/Issue2663PlanoTrabalhoLegadoSemPeriodosTest.php`, com banco tenant e dados sintéticos. A execução focada teve **um teste falhando e dois passando**:

- **Falhou:** ao chamar o serviço real de ativação V1 com um PT sem consolidações, o plano terminou `ATIVO` e continuou com zero períodos. A expectativa de ao menos um período falhou. Isso reproduz o risco no serviço, sem provar a origem dos casos reais do plantão.
- **Passou como diagnóstico:** uma requisição HTTP em rota de teste com controller V1 real, usuário sintético elegível e uma entrega recebeu `success: true`; o plano ficou `ATIVO` com zero períodos. A rota de teste usa middleware `api` e `actingAs`, sem passar pelo middleware Sanctum da rota publicada.
- **Passou:** o gerador V2, chamado diretamente com um PT sem consolidações, criou o período mensal esperado.

Antes da correção, o teste de expectativa do serviço V1 ficou vermelho. O cenário HTTP exercitou as validações do controller com dados sintéticos; a execução não passou pela rota publicada nem exercitou a assinatura completa V2. Naquele momento, nenhum código de produção havia sido alterado.

## Correção implementada no checkout local

Após a reprodução, o serviço V1 passou a gerar períodos ausentes antes de ativar ou reativar um PT e a preservar períodos que já existem. Após a revisão de código, a ativação e reativação passaram a buscar o PT com bloqueio de linha via Repository, usar o gerador V2 que persiste pelo Repository de consolidações e verificar se os períodos cobrem toda a vigência. Se houver uma lacuna, a transição é recusada sem alterar o status; períodos existentes não são recriados. As operações HTTP de escrita em `/api/PlanoTrabalho/*` agora retornam HTTP 410 para usuários autenticados. As rotas HTTP V1 de leitura permanecem disponíveis porque outros fluxos ainda as usam; as APIs de consolidação e avaliação são separadas. Os links Angular de lista, novo, edição, consulta e clonagem da V1 foram redirecionados para a V2. Os caminhos legados de consolidação e avaliação permanecem acessíveis, pois não têm equivalentes diretos na V2.

O teste da issue passou após a correção, assim como os testes relacionados do observer e do cálculo de períodos (13 testes e 69 asserções na execução conjunta final). O build Angular em diretório temporário, a checagem de tipos e o PHPStan focado passaram. O lint Angular não executou porque a instalação atual não contém o pacote `@angular-eslint/builder`, embora ele esteja declarado no `package.json`.

Após a revisão, os sete testes focados da issue passaram com 45 asserções, incluindo recusa de lacuna e repetição da ativação sem duplicar períodos. O PHPStan focado nos Services, Repositories e contracts alterados também passou. O bloqueio de linha serializa as ativações que usam esse caminho; não houve execução simultânea de dois processos no teste automatizado.

A correção evita novas ativações V1 sem períodos, mas não preenche automaticamente períodos de planos já ativos afetados. Os três casos reais mencionados no comentário continuam sem correlação causal ou validação de dados neste checkout.

## Validação local da interface

Em 2026-10-13, o Angular foi iniciado em `http://localhost:4200/` e um agente acessou a aplicação em Chromium headless. Sem sessão, a rota raiz V1 e os links V1 de novo, edição, consulta e clonagem encaminharam para a V2 antes de chegar ao login. O link de clonagem levou `clone_de` com o ID e preservou um parâmetro de consulta sintético. Os caminhos de consolidação e avaliação continuaram apontando ao módulo legado, como previsto.

Essa primeira validação revelou que o `AuthGuard` gravava em `redirectTo` apenas a rota pai, perdendo a subrota e o ID. O login também descartava destinos cuja primeira parte não fosse `login`. Ambos os pontos foram corrigidos: o guard agora extrai todos os segmentos e parâmetros da URL solicitada, e o login aceita o destino válido e o repassa ao fluxo de autenticação por popup ou Google. O listener do popup é removido quando a tela é destruída. Testes de navegador cobrem a preservação de rota, ID e parâmetros, a leitura do destino no login e seu uso após a conclusão do popup.

Na segunda validação em Chromium, os links V1 de lista, novo, edição e consulta chegaram ao login com o destino V2 completo. A clonagem preservou `clone_de=123456` e `origem=teste`. Consolidação e avaliação mantiveram as rotas legadas. Não houve exceções JavaScript.

Na terceira validação, um proxy temporário dentro do container Node encaminhou `localhost:80` para o container PHP, sem alteração de arquivos do projeto. O cookie CSRF respondeu HTTP 204 com CORS válido. O Chromium chegou às rotas V2 de lista, novo, edição e consulta; a clonagem chegou a `novo?origem=teste&clone_de=123456`. Consolidação e avaliação permaneceram nas rotas legadas. Não houve erro de conexão ou CORS. As buscas de edição e consulta pelo ID sintético `123456` retornaram 404, como esperado para um plano inexistente.

**Limite da validação:** o backend local aceitou uma sessão durante essa rodada, sem credenciais fornecidas ao teste; por isso não houve redirecionamento para o login nessa navegação. O retorno de um link profundo após autenticação foi coberto pelos testes focados do guard, do parser de destino e do listener do popup, mas não por um login real controlado no navegador. Conteúdo de PT e ações sobre dados reais não foram exercitados.

## Adaptação ao target `feature/CleanProject`

Após a mudança do target do PR #2688, a branch `feature/CleanProject` já havia removido o módulo Angular V1 de PT e apontado os caminhos `gestao/plano-trabalho` e `avaliacao/plano-trabalho` para as rotas V2. A correção mantém essa remoção e coloca os redirecionamentos de links antigos nas rotas V2. Novo, edição, consulta e clonagem têm destino correspondente; a clonagem preserva o ID em `clone_de` e os demais parâmetros de consulta. O caminho antigo de consolidação que contém o ID do plano leva à consulta desse plano. Caminhos antigos de avaliação, recurso e consolidação sem ID de plano levam à lista V2, pois o target não dispõe de um destino direto para esses identificadores.

Assim, as referências anteriores a telas V1 de consolidação e avaliação descrevem a base original da investigação e da validação no navegador; elas não representam o estado da `feature/CleanProject`. Nesta base, os sete testes focados da issue passaram com 45 asserções, o PHPStan focado passou e a checagem TypeScript da aplicação Angular passou. A navegação após a mudança de target ainda não foi validada no navegador.
