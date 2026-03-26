# Refatoração: Permitir `email` nulo (nullable) em Usuários

## Objetivo
- Permitir que a coluna `usuarios.email` aceite valor nulo, removendo a necessidade de gerar emails “fakes” quando o SIAPE não disponibiliza um email funcional.
- Documentar impactos, pontos de acoplamento e ajustes necessários em toda a cadeia: integração SIAPE → processamento → usuários → autenticação → notificações.

## Panorama Atual
- Tabela `usuarios` define `email` como NOT NULL e UNIQUE, criada pela migração [2021_08_19_212000_create_usuarios_table.php](file:///home/diego/projetos/petrvs-pgd/back-end/database/migrations/tenant/2021_08_19_212000_create_usuarios_table.php#L85-L110).
- Pipeline SIAPE:
  - Dados brutos de servidores são persistidos em `integracao_servidores` com `emailfuncional` opcional, ver migração de criação em [create_integracao_servidores_table](file:///home/diego/projetos/petrvs-pgd/back-end/database/migrations/tenant/2021_10_18_235402_create_integracao_servidores_table.php#L16-L42).
  - Montagem/normalização dos registros ocorre em [Siape/Servidor/Integracao](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/Siape/Servidor/Integracao.php#L129-L188) e [PreparaServidor](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/Siape/Servidor/PreparaServidor.php#L25-L34).
  - Processamento final e criação/atualização em `usuarios` acontece em [ProcessadorAtualizacaoDadosSiapeService](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/ProcessadorAtualizacaoDadosSiapeService.php#L187-L220) chamando [UsuarioService::gerarUsuario](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/UsuarioService.php#L178-L213).
- Hoje o sistema força a existência de email:
  - `PreparaServidor::getEmail` aplica fallback `matriculasiape@petrvs.gov.br` quando SIAPE não envia email (ver [PreparaServidor](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/Siape/Servidor/PreparaServidor.php#L25-L34)).
  - A integração rejeita entidades sem email ao filtrar `empty($emailFuncional)` (ver [Integracao::montaEntidadeServidor](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/Siape/Servidor/Integracao.php#L135-L139)).
  - No cadastro manual, o serviço exige email (ver [UsuarioService::validateStore](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/UsuarioService.php#L587-L589)).
  - Há rotina de correção de duplicidade de email, gerando emails “fakes” com base na matrícula (ver [IntegracaoService::verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/IntegracaoService.php#L624-L653)).

## Mapeamento de Uso do Email
- Autenticação/Login:
  - Login por email/senha e APIs utilizam email diretamente: [LoginController::authenticateUserPassword](file:///home/diego/projetos/petrvs-pgd/back-end/app/Http/Controllers/LoginController.php#L218-L246), [LoginController::authenticateApiUserPassword](file:///home/diego/projetos/petrvs-pgd/back-end/app/Http/Controllers/LoginController.php#L343-L371).
  - Fluxos sociais:
    - Azure: identifica usuário por email (ver [LoginService::signInAzureCallback](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/LoginService.php#L623-L647)).
    - GovBR: tenta CPF e depois email (ver [LoginService::resolveGovBrUsuario](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/LoginService.php#L681-L696)).
    - Google/Firebase: utilizam email (ver [LoginController::authenticateGoogleToken](file:///home/diego/projetos/petrvs-pgd/back-end/app/Http/Controllers/LoginController.php#L289-L316), [authenticateApiFirebaseToken](file:///home/diego/projetos/petrvs-pgd/back-end/app/Http/Controllers/LoginController.php#L379-L396)).
  - Auto-login por email (config): [LoginService::authenticateSession](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/LoginService.php#L297-L311) e [handleAutoLogin](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/LoginService.php#L325-L337).
- Regras de leitura/consulta:
  - Repositório de usuários por email: [UsuarioRepository/EloquentRead::findByEmail](file:///home/diego/projetos/petrvs-pgd/back-end/app/Repository/Usuario/Eloquent/EloquentUsuarioReadRepository.php#L171-L176).
  - Busca por CPF ou email: [findByCpfOrEmail](file:///home/diego/projetos/petrvs-pgd/back-end/app/Repository/Usuario/Eloquent/EloquentUsuarioReadRepository.php#L39-L60).
- Notificações:
  - Disparo de email usa `$destinatario->email` sem checar nulos, gerando job [ProcessEmails](file:///home/diego/projetos/petrvs-pgd/back-end/app/Jobs/ProcessEmails.php#L37-L49) com `Mail::to($details['email'])` (ver [NotificacoesService::send](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/NotificacoesService.php#L119-L135)).
- Templates/relatórios: dataset inclui `usuario.email`, exibindo vazio caso nulo (ver [TemplateDatasetService](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/TemplateDatasetService.php#L164-L177)).
- Seeds e rotinas administrativas: alguns fluxos exigem email (ex.: [UsuarioAdminSeeder](file:///home/diego/projetos/petrvs-pgd/back-end/database/seeders/UsuarioAdminSeeder.php#L37-L55)).

## Impactos de Tornar `email` Nullable
1. Banco de Dados
   - Ajustar migração para permitir `usuarios.email` nulo mantendo índice único (unique em MySQL/MariaDB permite múltiplos NULLs). A alteração deve ser aplicada a cada tenant.
   - Tabela `password_resets` indexa por email; usuários sem email não terão fluxo de recuperação via email (limitação aceitável e documentada).
2. Integração SIAPE
   - `PreparaServidor::getEmail` não deve mais forçar fallback `@petrvs.gov.br`.
   - `Siape/Servidor/Integracao::montaEntidadeServidor` não pode descartar registros com email vazio; hoje `empty($emailFuncional)` “pula” o servidor.
   - `UsuarioService::gerarUsuario` deve aceitar `email` nulo ao criar usuários.
   - `IntegracaoService::verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake` precisa ignorar quando `$email` for nulo/empty, evitando `mb_strtolower` em `null` e a geração de emails “fakes” desnecessária.
3. Autenticação
   - Fluxos baseados em email devem ter fallback por CPF/matrícula quando possível:
     - Azure/Google/Firebase: obter CPF do provider se disponível; caso contrário, usuários sem email não poderão autenticar por esses provedores (comportamento esperado). Ver pontos em [LoginService](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/LoginService.php#L610-L647) e [LoginController](file:///home/diego/projetos/petrvs-pgd/back-end/app/Http/Controllers/LoginController.php#L289-L316).
   - Login por email/senha permanece exigindo email (nenhuma mudança).
   - Auto-login por email (config `petrvs.auto-login`) deve ser ignorado quando vazio.
4. Notificações
   - Ao enviar email, checar se `$destinatario->email` está preenchido antes de criar `NotificacaoDestinatario` do tipo EMAIL e antes de disparar `ProcessEmails`.
5. Validações e Regras de Negócio
   - `UsuarioService::validateStore` só deve exigir email em cadastros manuais que realmente dependem do login por email/senha ou identidade externa. Para cadastros importados via SIAPE, email deve ser opcional.
   - Consultas “por email” devem tratar parâmetros nulos, evitando `orWhere('email', null)` sem intenção.

## Locais Específicos a Ajustar (Hotspots)
- Integração SIAPE e montagem de entidades:
  - Remover fallback de email: [PreparaServidor::getEmail](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/Siape/Servidor/PreparaServidor.php#L25-L34).
  - Não descartar servidor por ausência de email: [Integracao::montaEntidadeServidor](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/Siape/Servidor/Integracao.php#L135-L139).
- Criação/atualização de usuários:
  - Aceitar `email` nulo em geração: [UsuarioService::gerarUsuario](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/UsuarioService.php#L195-L213).
  - Ajustar validação condicional de email: [UsuarioService::validateStore](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/UsuarioService.php#L587-L624).
  - Ignorar correção de duplicidade quando email nulo: [IntegracaoService::verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/IntegracaoService.php#L624-L653) e chamadas correlatas em [ProcessadorAtualizacaoDadosSiapeService](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/ProcessadorAtualizacaoDadosSiapeService.php#L200-L206) e [UsuarioService::atualizarServidor](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/UsuarioService.php#L113-L129).
- Autenticação:
  - Fallback por CPF para Azure/Google quando disponível: [LoginService](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/LoginService.php#L623-L647) e [LoginController](file:///home/diego/projetos/petrvs-pgd/back-end/app/Http/Controllers/LoginController.php#L289-L316).
- Notificações:
  - Checar email antes de enfileirar envio: [NotificacoesService::send](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/NotificacoesService.php#L119-L135).

## Alterações de Esquema (Plano de Migração)
1. Criar migração tenant para permitir nulo:
   - `Schema::table('usuarios', fn (Blueprint $t) => $t->string('email', 100)->nullable()->change());`
   - Manter índice UNIQUE existente. Em MySQL/MariaDB, múltiplos NULLs são permitidos.
2. Não alterar `password_resets`: usuários sem email não usam esse fluxo.
3. Executar migrations em todos os tenants.

## Regras de Autenticação após a Mudança
- Login por email/senha: continua exigindo email. Usuários com `email = null` não poderão utilizar este método.
- Provedores externos:
  - GovBR: continua prioritariamente por CPF, com fallback por email.
  - Azure/Google/Firebase: ideal adicionar fallback por CPF quando o claim existir; caso o provedor não disponibilize CPF, o usuário precisa ter email cadastrado para autenticar.
- Auto-login por email: funciona apenas quando o email estiver configurado.

## Ajustes de Código Propostos
- Integração:
  - Permitir fluxo com `emailfuncional` vazio e propagar `null` até `usuarios.email`.
  - Descontinuar geração de emails `@petrvs.gov.br` automáticos.
- Validações:
  - Tornar a obrigatoriedade do email contextual (somente onde necessário para autenticação baseada em email/senha).
- Notificações:
  - Ignorar envio por email quando o destinatário não possuir email.
- Autenticação:
  - Adicionar fallback por CPF em Azure/Google quando possível.

## Rastreio de Chamadas “Anônimas/Ocultas” ou Sensíveis
- Jobs/filas: [ProcessEmails](file:///home/diego/projetos/petrvs-pgd/back-end/app/Jobs/ProcessEmails.php#L37-L49) envia email diretamente; precisa receber somente endereços válidos.
- Templates/relatórios: apenas leitura de `usuario.email`; seguro exibir vazio.
- Logs/erros: quando não houver email, já existem fallbacks (ex.: usuário por nome ou id, ver [ErrorInterceptor](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/ErrorInterceptor.php)).

## Testes a Cobrir (indicativos)
- Integração SIAPE:
  - Importar servidor sem email → registro em `integracao_servidores` e criação de `usuarios` com `email = null`.
  - Importar servidor com email duplicado → manter email no primeiro, `null` no segundo ou aplicar regra definida; validar que rotina de “fake email” não roda com email nulo.
- Autenticação:
  - GovBR com CPF válido e email ausente → login ok.
  - Azure/Google com CPF disponível (quando aplicável) → login ok; sem CPF e sem email → bloqueio esperado.
  - Login por senha com email ausente → bloqueio esperado.
- Notificações:
  - Envio com destinatário sem email → não dispara job de email e não lança exceção.

## Riscos e Mitigações
- Usuários sem email não recebem mensagens/recuperação de senha:
  - Mitigar com comunicação clara e uso de GovBR/CPF para autenticação.
- Provedores externos que só identificam por email:
  - Documentar restrição e, quando possível, habilitar fallback por CPF.
- Dados legados com emails “fakes”:
  - Avaliar tarefa de saneamento posterior (opcional) para remover “fakes” quando o SIAPE não fornece email.

## Passo a Passo de Implantação
1. Adicionar migração para `usuarios.email` nullable e rodar em todos os tenants.
2. Ajustar integração para não exigir/forçar email, removendo o filtro `empty($emailFuncional)` e fallback em `PreparaServidor`.
3. Tornar a validação de email opcional no `UsuarioService` para cadastros SIAPE.
4. Proteger `verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake` contra parâmetros nulos.
5. Ajustar `NotificacoesService` para ignorar destinatários sem email.
6. (Opcional) Adicionar fallback por CPF nos fluxos Azure/Google quando disponível.
7. Rodar testes de unidade e integração.
8. Monitorar erros e filas de email após deploy.

## Referências de Código
- Integração SIAPE:
  - [Siape/Servidor/PreparaServidor.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/Siape/Servidor/PreparaServidor.php#L25-L34)
  - [Siape/Servidor/Integracao.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/Siape/Servidor/Integracao.php#L135-L139)
  - [ProcessadorAtualizacaoDadosSiapeService.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/ProcessadorAtualizacaoDadosSiapeService.php#L187-L220)
- Usuários/Validações:
  - [UsuarioService.php (validateStore)](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/UsuarioService.php#L587-L624)
  - [UsuarioService.php (gerarUsuario)](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/UsuarioService.php#L195-L213)
- Autenticação:
  - [LoginService.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/LoginService.php#L610-L647)
  - [LoginController.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Http/Controllers/LoginController.php#L218-L246)
- Notificações:
  - [NotificacoesService.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/NotificacoesService.php#L119-L135)

## Decisão Recomendada
- Adotar `email` nullable no domínio, com validações contextuais.
- Garantir a criação/atualização de usuários via SIAPE mesmo sem email.
- Manter fluxos de autenticação por email apenas para contas que possuem email.
- Proteger envio de emails e rotinas de deduplicação quando `email = null`.

## Checklist de Conclusão
- Migração aplicada nos tenants
- Integração SIAPE aceita `email` ausente
- Validações ajustadas
- Notificações seguras para `email = null`
- Testes de integração cobrindo cenários com e sem email

