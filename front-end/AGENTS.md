# Guia Codex do Front-End Petrvs

## Verdades do Projeto

- Este diretório é a aplicação Angular 21 do Petrvs-PGD.
- A aplicação usa arquitetura clássica com NgModules, não uma arquitetura standalone-first. Componentes são declarados em feature modules ou no `SharedModule`, e componentes gerados existentes usam explicitamente `standalone: false`.
- O TypeScript está configurado com `strict`, `noImplicitReturns`, `strictTemplates`, `strictInjectionParameters`, `strictInputAccessModifiers` e `strictOutputEventTypes`.
- A UI é construída com Bootstrap 5, Bootstrap Icons, Font Awesome, PrimeNG 21, TinyMCE, FullCalendar, Chart.js, ngx-mask, ngx-drag-drop e ngx-infinite-scroll.
- O build de produção do Angular gera saída em `../back-end/public` e depois executa `postbuild.js`, que atualiza `app.json`, move `index.html` para `back-end/resources/views/angular.blade.php` e escreve informações de build para a aplicação Laravel.
- A aplicação suporta premissas de execução em navegador, modo embarcado/semelhante ao SEI e estilo extensão por meio de globals em `src/environments/environment.ts`, `src/app.json`, `GlobalsService` e assets copiados pelo `angular.json`.
- O caminho raiz `.codex` é um arquivo vazio neste repositório. Não o trate como diretório.

## Contexto Obrigatório

- Leia `../AGENTS.md` antes de alterar este diretório.
- Use a skill Codex `petrvs-angular-ui` para trabalho em UI Angular, services, rotas, forms, testes, lint ou build.
- Inspecione a feature afetada em `src/app/modules` e os itens compartilhados relevantes em `src/app/components`, `src/app/services`, `src/app/dao` e `src/app/models` antes de editar.
- Para telas ou services ligados ao SIAPE em `modules/siape`, `modules/consultas`, `modules/rotinas/integracao` ou DAOs/models `siape-*`, use também a orientação SIAPE do repositório/skills.
- Para autorização visível ao usuário, contexto tenant/unidade ou mudanças de contrato com o back-end, inspecione a rota/resource/service correspondente em `../back-end` quando o comportamento do front-end depender disso.

## Comandos

- Rode comandos de front-end somente dentro do container Node:
  `docker exec petrvs_node sh -lc "cd /usr/src/app && <command>"`
- Não rode `npm`, `ng`, builds, lint, testes ou e2e diretamente no host.
- Se o container Node estiver ausente ou parado, siga a orientação Docker do `AGENTS.md` raiz e mantenha a execução de comandos containerizada.
- Instalar dependências:
  `docker exec petrvs_node sh -lc "cd /usr/src/app && npm install"`
- Iniciar servidor de desenvolvimento:
  `docker exec petrvs_node sh -lc "cd /usr/src/app && npm start"`
- Build de produção para os arquivos públicos do Laravel:
  `docker exec petrvs_node sh -lc "cd /usr/src/app && npm run build"`
- Build de desenvolvimento para os arquivos públicos do Laravel:
  `docker exec petrvs_node sh -lc "cd /usr/src/app && npm run build-dev"`
- Lint:
  `docker exec petrvs_node sh -lc "cd /usr/src/app && npm run lint"`
- Testes unitários:
  `docker exec petrvs_node sh -lc "cd /usr/src/app && npm test"`
- E2E:
  `docker exec petrvs_node sh -lc "cd /usr/src/app && npm run e2e"`

## Mapa da Aplicação

- `src/app/app.module.ts`: NgModule raiz, providers globais, locale `pt-BR`, interceptor HTTP e tema PrimeNG.
- `src/app/app-routing.module.ts`: rotas de topo e feature modules lazy-loaded, em sua maioria protegidos por `AuthGuard`.
- `src/app/shared/shared.module.ts`: módulo de UI compartilhada. Declare e exporte componentes reutilizáveis do Petrvs aqui quando forem de fato compartilhados.
- `src/app/components`: primitivas de UI do Petrvs, como `grid`, `filter`, `columns`, `pagination`, `toolbar`, `editable-form`, `input-*`, `tabs`, `accordion`, `map`, `kanban`, `document-preview`, `json-viewer` e componentes de ação/status.
- `src/app/modules`: feature modules agrupados por domínio: `cadastros`, `configuracoes`, `gestao`, `relatorios`, `siape`, `rotinas`, `logs`, `panel`, `home`, `login`, `uteis` e áreas de suporte/consulta.
- `src/app/modules/base`: classes base de página usadas por telas CRUD e relatórios.
- `src/app/dao`: services de acesso a dados do front-end. A maioria dos DAOs de entidade estende `DaoBaseService<T>`.
- `src/app/models`: models de entidade. A maioria das entidades persistentes estende `Base`.
- `src/app/services`: services transversais para autenticação, chamadas ao servidor, navegação, diálogos, lookups, forms, utilitários, calendários, relatórios, globals e helpers de domínio.
- `src/assets/scss` e `src/styles.scss`: temas globais. O Bootstrap é escopado sob `.petrvs` e variantes de tema usam `data-bs-theme`.

## Arquitetura de Features

- Mantenha código de feature dentro do módulo de domínio existente. Adicione um novo domínio somente quando houver uma fronteira real de navegação ou responsabilidade.
- Prefira o formato de feature já estabelecido:
  `feature.module.ts`, `feature-routing.module.ts`, `feature-list/feature-list.component.*`, `feature-form/feature-form.component.*`, além de componentes filhos especializados quando necessário.
- Mantenha pastas de componentes em kebab-case e preserve nomes de arquivos Angular:
  `*.component.ts`, `*.component.html`, `*.component.scss`, `*.component.spec.ts`.
- Use `standalone: false` em novos componentes, salvo se a feature ao redor for convertida intencionalmente e todas as declarações/imports de módulo forem tratados.
- Faça lazy-load de feature modules a partir de `app-routing.module.ts`; defina rotas filhas de telas no routing module da feature.
- Use `AuthGuard`, `ConfigResolver`, `runGuardsAndResolvers: 'always'` e `data: { title: ..., modal: true }` de forma consistente com as rotas próximas.
- Rotas modais de criação/edição/consulta devem seguir o padrão existente `new`, `:id/edit` e `:id/consult` quando a tela for semelhante a CRUD.

## Padrões de CRUD

- Models geralmente devem estender `Base`, inicializar campos declarados e chamar `this.initialization(data)` no construtor.
- DAOs geralmente devem estender `DaoBaseService<Model>`, passar o nome da collection do back-end para `super`, configurar `inputSearchConfig.searchFields` e implementar `dataset()` quando a entidade for usada em templates/relatórios/exportações.
- Páginas de lista geralmente devem estender `PageListBase<Model, DaoService>` e definir `title`, `code`, `filter`, `filterWhere`, `join`, `orderBy`, `rowsLimit`, options e permissões do grid.
- Páginas de formulário geralmente devem estender `PageFormBase<Model, DaoService>`, definir `form` por meio de `FormHelperService.FormBuilder`, implementar `loadData`, `initializeData`, `saveData` e opcionalmente `titleEdit` ou `formValidation`.
- Editores embarcados ou filhos devem usar `PageFrameBase` quando precisarem funcionar tanto como modais baseados em rota quanto como fragmentos de formulário aninhados.
- Relatórios devem seguir os padrões `PageReportBase` / `PageReportFilterBase` já presentes em `modules/base` e `modules/relatorios`.
- Ao adicionar uma entidade de primeira classe, verifique se `EntityService` precisa de entrada para label, ícone, metadata de table/campo, lookup de DAO, links de auditoria/logs ou comportamento de rota de seleção.

## Forms e Templates

- Prefira reactive forms por meio de `FormHelperService.FormBuilder`; validators devem retornar `null` ou uma string de erro voltada ao usuário.
- Use os componentes compartilhados `input-*` em vez de markup Bootstrap cru para forms normais do Petrvs.
- Use `editable-form` em telas de criação/edição/consulta, com `initialFocus`, `(submit)="onSaveData()"` e `(cancel)="onCancel()"` quando aplicável.
- Use `grid`, `filter`, `columns`, `column`, `pagination` e `toolbar` em telas de lista.
- Mantenha templates seguros para dados vindos do servidor. Evite escrita direta no DOM, `[innerHTML]` ou bypass de sanitizer, salvo quando a fonte dos dados e o risco estiverem explicitamente compreendidos.
- Use `lex.translate(...)` quando labels fizerem parte de nomenclatura de entidade/domínio que pode variar por entidade configurada.
- Mantenha classes de Bootstrap Icons (`bi ...`) e Font Awesome consistentes com telas próximas.

## Dados e API

- Prefira DAOs e `ServerService` em vez de chamadas diretas com `HttpClient`. `ServerService` centraliza URLs base, credenciais, token XSRF, `X-PETRVS`, unidade selecionada, headers de entidade, batching e normalização de erros do back-end.
- Preserve os nomes de collection do back-end esperados pelos endpoints de `DaoBaseService`, como `api/<Collection>/query`, `get-by-id`, `search-text`, `search-key`, upload/download e delete.
- Use `QueryOptions` e `QueryContext` para queries paginadas de grids/listas; inclua `join`, `leftJoin`, `fields`, `where`, `orderBy` e `limit` deliberadamente.
- Tenha cuidado com comportamento sensível a unidade/tenant. A unidade selecionada é enviada em `X-PETRVS`; premissas de UI sobre unidade, lotação, gestor, servidor, SIAPE ou permissões de perfil devem corresponder à autorização do back-end.
- Preserve o comportamento de `dateToIso8601` / `iso8601ToDate` em DAOs e `UtilService` ao tocar em serialização de datas.
- Evite introduzir novos `any` em fronteiras que podem ser modeladas. Se um payload do back-end ainda for dinâmico, estreite-o localmente com um type/interface assim que for prático.

## Autenticação, Permissões e Navegação

- Use `AuthGuard` para rotas autenticadas e `data.permission` em rotas quando a própria tela exigir uma capacidade.
- Use `auth.hasPermissionTo(...)` em templates/componentes para visibilidade de ações, mas não trate botões ocultos como a única camada de autorização.
- Use `NavigateService` (`go`) para navegação da aplicação, metadata de modais, params codificados, rotas de retorno e resultados de modal.
- Use `DialogService` para alerts, confirmações, manuseio de modais, top alerts e overlays de spinner.
- Não armazene novos secrets ou tokens sensíveis em local storage. O armazenamento de token de autenticação existente é centralizado em `AuthService`.

## RxJS e Async

- Mantenha fluxos observables tipados. Prefira `Observable<T>`, `Subject<T>` e tipos explícitos de callback/resultado para código novo.
- Para novas conversões assíncronas, prefira helpers atuais do RxJS, como `firstValueFrom`, quando fizerem sentido; mantenha o estilo local ao modificar um método existente que já usa promises ou subscriptions de forma consistente.
- Gerencie subscriptions com cuidado em componentes de longa duração. Use fluxos curtos de rota/componente ou teardown explícito ao adicionar streams persistentes.
- Preserve o comportamento de `catchError` no `ServerService` e em services que normalizam erros de API para forms/grids.

## Estilo Visual e UI

- Reutilize componentes compartilhados e padrões Bootstrap/PrimeNG existentes antes de adicionar novas primitivas de UI.
- Mudanças globais de CSS devem ser raras. Prefira SCSS de componente, salvo quando a regra pertencer de fato ao theming `.petrvs` ou layout compartilhado.
- Respeite a configuração Bootstrap escopada em `src/styles.scss`; estilos globais da aplicação ficam aninhados sob `.petrvs`.
- Preserve variáveis de tema para os modos `blue`, `light` e `dark` ao alterar cores.
- Use layouts estáveis para grids, toolbars, filtros, forms modais e cards repetidos, para que o conteúdo não salte ao carregar, filtrar ou mudar permissões.
- Textos visíveis ao usuário devem estar em português e corresponder ao service de vocabulário/nomenclatura quando o termo de domínio for configurável.

## Testes

- Testes unitários usam Jasmine/Karma por meio do Angular CLI.
- Specs existentes frequentemente são testes de criação/smoke; para mudanças de comportamento, adicione expectativas focadas em validação, construção de query, gating por permissão, mapeamento de dados ou interações com services.
- Prefira `HttpClientTestingModule`, `RouterTestingModule` e DAOs/services mockados para testes de componente/service que não devem tocar o back-end.
- Ao alterar componente compartilhado, service, comportamento base de DAO, guard, fluxo de auth, navegação ou form helper, amplie os testes além da feature imediata porque o alcance é maior.
- E2E está configurado com Protractor para cobertura legada. Não introduza outro framework de E2E salvo pedido explícito.

## Portão de Qualidade

- Para mudanças de código, rode primeiro o teste ou comando de lint relevante mais estreito; depois rode verificações mais amplas quando o código tocado for compartilhado ou de alto risco.
- No mínimo, considere `npm run lint` para mudanças TypeScript/template e `npm run build` para mudanças em rotas/módulos/configuração de build.
- Lembre-se de que `npm run build` escreve em `../back-end/public` e `../back-end/resources/views/angular.blade.php`; evite versionar saída gerada sem relação, salvo quando a tarefa exigir.
- Não versione secrets, valores de `.env`, certificados gerados, dumps locais ou assets gerados sem relação com a tarefa.
- Preserve mudanças do usuário na working tree. Não reverta edições não relacionadas.

## Perfis Codex

- Use `petrvs-angular-ui` para implementação normal em Angular, refactors, debug, testes, lint e build neste diretório.
- Use `petrvs-siape-integracao` junto com a skill Angular para SIAPE, gestores, servidores, unidades, lotação, blacklist ou fluxos de logs de integração que toquem o front-end.
- Use `petrvs-code-review` ao revisar mudanças de front-end antes de merge, especialmente para segurança, permissões, performance, contexto tenant/unidade, testes e manutenibilidade.
- Use `petrvs-tech-docs` ao criar ou atualizar documentação técnica relacionada à arquitetura do front-end, rotas, contratos de API ou notas de release.
