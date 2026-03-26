# Plano Técnico – Refatoração “email nullable” com TDD (Back-end)

## Escopo e Premissas
- Baseado no documento de referência: [refatoracao-email-nullable.md](file:///home/diego/projetos/petrvs-pgd/back-end/docs/refatoracao-email-nullable.md#L1-L153).
- Objetivo: permitir `usuarios.email` nulo, manter `UNIQUE`, alinhar integrações SIAPE, autenticação GovBR por CPF, e remover jobs de envio de e-mail.
- As migrações não serão executadas automaticamente neste fluxo. O deploy das migrações será manual.
- A abordagem é TDD: primeiro construir/ajustar testes cobrindo repositórios, services e migrações; só depois aplicar migrações; por fim, implementar código funcional até os testes passarem.

## Ordem Macro de Execução
1) Testes (TDD), sem alterar código funcional:
- Atualizar/criar testes unitários e de integração (IntegrationTenant) cobrindo todos os comportamentos esperados após a refatoração.
- Os testes devem falhar no estado atual (RED), servindo como especificação.

2) Migrações (execução manual pelo operador):
- Aplicar as migrações descritas em “Migrações – Escopo e Comandos”.
- Confirmar que o schema do tenant está atualizado (inclusive arquivo de schema para suites de integração, se aplicável).

3) Implementação e ajustes de código:
- Adequar services/repositórios/autenticação/integração ao novo contrato definido pelos testes.
- Remover o job de emails e chamados associados.

4) Validação:
- Executar suites de testes e análise estática.
- Checagens manuais pontuais em features sensíveis.

## TDD – Testes a Criar/Ajustar
Diretrizes gerais:
- Unit: sem interação com banco (Mockery). Seguir [docs/pest.md](file:///home/diego/projetos/petrvs-pgd/back-end/docs/pest.md).
- IntegrationTenant: interage com o banco do tenant. Seguir [docs/pest-bd.md](file:///home/diego/projetos/petrvs-pgd/back-end/docs/pest-bd.md).
- Cobrir cenários de sucesso e falha, especialmente “email ausente ou inválido”.

1) Integração SIAPE
- PreparaServidor::getEmail
  - Quando `emailfuncional` estiver vazio, retornar `null` (não mais gerar “@petrvs.gov.br”).
  - Quando houver valor, normalizar em minúsculas e completar domínio apenas se já vier sem “@” (regra atual), mantendo compatibilidade.
  - Arquivo-alvo de teste existente para ajuste: [tests/Unit/Services/Siape/Servidor/PreparaServidorTest.php](file:///home/diego/projetos/petrvs-pgd/back-end/tests/Unit/Services/Siape/Servidor/PreparaServidorTest.php).
- Siape/Servidor/Integracao::montaEntidadeServidor
  - Não descartar servidor por ausência de e-mail; permitir `emailfuncional = null`.
  - Garantir logs no SiapeLog para matrículas/CPF vazios continuam funcionando.
  - Criar teste unitário focal ou integração do componente de montagem (caso já exista cobertura suficiente, validar cenários com e sem email).
- UsuarioService::gerarUsuario
  - Aceitar `email = null` quando origem for SIAPE.
  - E-mails não nulos devem ser validados com regra padrão do Laravel; se inválido, registrar em SiapeLog e salvar `email = null`.
  - Cobrir via testes unitários simulando entradas válidas/invalidas.
- IntegracaoService::verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake
  - Novo comportamento: quando houver conflito de e-mail entre usuários, não gerar “@petrvs.gov.br”; deve-se liberar o e-mail conflitante definindo `email = null` no(s) usuário(s) conflitante(s) conforme regra de negócio.
  - Cobrir no suite IntegrationTenant: usuário ativo e soft-deleted.

2) Autenticação
- Login GovBR (LoginService::resolveGovBrUsuario)
  - Identificação exclusivamente por CPF; nenhuma validação/fallback por e-mail.
  - Quando CPF não for localizado no sistema ativo, negar acesso.
  - Atualizar/ajustar testes unitários em [tests/Unit/Services/LoginServiceTest.php](file:///home/diego/projetos/petrvs-pgd/back-end/tests/Unit/Services/LoginServiceTest.php) removendo cenários de fallback por e-mail.
  - Obs.: Interpretação adotada da diretriz “GovBR apenas por CPF” elimina completamente a busca por e-mail nesse fluxo.

3) Notificações
- Remover do sistema o job [ProcessEmails](file:///home/diego/projetos/petrvs-pgd/back-end/app/Jobs/ProcessEmails.php) e todo fluxo que o aciona (ex.: [NotificacoesService::send](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/NotificacoesService.php#L119-L135)).
  - Novo contrato testável: sem despacho de e-mail em background; manter apenas o registro de Notificacao/NotificacaoDestinatario onde pertinente (ou adequar conforme política do produto).
  - Cobrir com testes unitários do serviço, garantindo que nenhuma chamada ao job é realizada, e que destinatários sem e-mail não geram envio.

4) Regras de negócio – Atualizações/Escrita de E-mail
- “E-mail só deve ser incluído/alterado se `usuario_externo = 1`.”
  - Garantir via testes unitários nos serviços/repositórios que alterações em e-mail por fluxos de back-end respeitam esse gate.
  - Para usuários internos (usuario_externo = 0), a origem da verdade é a integração SIAPE.

5) TemplateDatasetService
- Impacto esperado: leitura/relato apenas. `usuario.email` pode ser `null` e deve ser exibido como vazio. Ver [TemplateDatasetService](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/TemplateDatasetService.php#L164-L177).
  - Criar um teste de unidade leve para garantir que o dataset não quebra com `email = null` (exposição “vazia”).

6) Consultas e Repositórios
- EloquentUsuarioReadRepository
  - `findByEmail` e consultas combinadas (CPF/Email) devem ignorar parâmetros nulos/strings vazias, evitando consultas `email = null` não intencionais.
  - Adicionar testes unitários cobrindo chamadas com e sem e-mail.

## Migrações – Escopo e Comandos (Execução Manual)
Observação: operações serão executadas manualmente. Abaixo está o escopo a ser implementado/criado nas migrations.

1) `usuarios.email` nullable mantendo UNIQUE
- Alterar a coluna para permitir nulos, preservando a constraint UNIQUE (MySQL/MariaDB permitem múltiplos NULLs).
- Efeito: usuários podem existir sem e-mail; fluxos de login por e-mail continuarão funcionando apenas para quem possuir e-mail.
- Referência de criação original: [2021_08_19_212000_create_usuarios_table.php](file:///home/diego/projetos/petrvs-pgd/back-end/database/migrations/tenant/2021_08_19_212000_create_usuarios_table.php#L85).

2) `integracao_servidores.emailfuncional`
- Verificado como `nullable` na criação: [2021_10_18_235402_create_integracao_servidores_table.php](file:///home/diego/projetos/petrvs-pgd/back-end/database/migrations/tenant/2021_10_18_235402_create_integracao_servidores_table.php#L25).
- Nenhuma ação necessária. Caso ambientes legados não estejam alinhados, aplicar migração de “change->nullable()”.

3) Remoção de e-mails “@petrvs” (data migration)
- Criar migração que saneia registros existentes, definindo `email = null` quando o domínio for “@petrvs…”; preservar demais campos.
- Garantir que a operação respeita o índice UNIQUE e mantém a integridade.

4) Remoção do job ProcessEmails
- Excluir arquivo e remover referências em services/configs.
- Ajustar migrations/seeders apenas se houver dependências de tabela para registros exclusivamente relacionados a envio por e-mail (não esperado).

5) Regeneração do schema do tenant para a suíte IntegrationTenant
- Após as migrations, atualizar `database/schema/tenant-schema.sql` conforme diretriz do projeto para manter os testes rápidos.

## Implementação (Após Migrações)
- Integração SIAPE
  - Remover fallback “@petrvs.gov.br” em `PreparaServidor::getEmail`; propagar `null`.
  - Não descartar servidor por ausência de e-mail em `Integracao::montaEntidadeServidor`.
  - Em `UsuarioService::gerarUsuario`, aceitar `null` e validar e-mails não nulos; inválidos → `SiapeLog` + persistir `null`.
  - Em `IntegracaoService::verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake`, substituir a geração de “email fake” por liberação do conflito atribuindo `null` conforme regra.

- Autenticação GovBR
  - `resolveGovBrUsuario` deve localizar apenas por CPF. Remover busca por e-mail.
  - Se não localizar por CPF, negar acesso.

- Notificações
  - Remover `ProcessEmails::dispatch` e dependências. Destinatários com `email = null` não devem gerar tentativa de envio.
  - Ajustar documentação de produto sobre canal e-mail, quando indisponível para alguns usuários.

- Regras de escrita de e-mail
  - Em serviços de back-end, aplicar a regra: só incluir/alterar e-mail se `usuario_externo = 1`.
  - Para usuários internos, o dado vem da integração.

## Validação e Qualidade
- Testes (executar dentro do container `petrvs_php`, conforme regras do projeto):
  - Todos os testes:
    - docker exec petrvs_php bash -lc "cd /var/www && ./vendor/bin/pest --ci"
  - Cobertura opcional:
    - docker exec petrvs_php bash -lc "cd /var/www && XDEBUG_MODE=coverage ./vendor/bin/pest --ci --coverage-clover app/coverage/cov.xml"
- Análise estática (PHPStan), conforme [docs/phpstan.md](file:///home/diego/projetos/petrvs-pgd/back-end/docs/phpstan.md):
  - docker exec petrvs_php sh -lc "vendor/bin/phpstan analyse app --configuration=phpstan.neon.dist --memory-limit=1G"

## Riscos e Mitigações
- Provedores externos (Azure/Google) baseados em e-mail: usuários sem e-mail não autenticarão por esses provedores.
  - Mitigação: priorizar GovBR/CPF ou comunicar a restrição.
- Perda de entrega de e-mails transacionais:
  - Remoção do job implica revisão de estratégia de envio; manter apenas notificações internas PETRVS ou adotar outro mecanismo.
- Dados legados com e-mails “fakes”:
  - Migração de saneamento remove “@petrvs…”, evitando inconsistências futuras.

## Rollback
- Reverter migrações que alteram `usuarios.email` e a data migration de saneamento, restaurando backups prévios.
- Reintroduzir o job apenas se estritamente necessário, acompanhando ajustes nos services.

## Checklist de Conclusão
- Testes (Unit/IntegrationTenant) criados e falhando no estado atual (RED), cobrindo:
  - SIAPE: getEmail -> null; montagem sem e-mail; validação/normalização.
  - Autenticação GovBR: apenas CPF.
  - Notificações: sem `ProcessEmails` e sem envio para e-mail ausente.
  - Gate `usuario_externo` para escrita de e-mail.
  - Repositórios: consultas robustas a `email` nulo.
- Migrações aplicadas manualmente:
  - `usuarios.email` nullable + UNIQUE preservado.
  - Saneamento removendo “@petrvs”.
  - Verificação de `integracao_servidores.emailfuncional` como nullable concluída.
- Código ajustado para satisfazer os testes (GREEN).
- Suites e PHPStan executados com sucesso.

## Pontos de Referência (Hotspots)
- Integração SIAPE:
  - [PreparaServidor.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/Siape/Servidor/PreparaServidor.php#L25-L34)
  - [Integracao.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/Siape/Servidor/Integracao.php#L129-L158)
- Usuários/Validações:
  - [UsuarioService.php (gerarUsuario)](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/UsuarioService.php#L178-L213)
  - [UsuarioService.php (validateStore)](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/UsuarioService.php#L573-L624)
- Autenticação (GovBR):
  - [LoginService.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/LoginService.php#L681-L696)
- Notificações:
  - [NotificacoesService.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Services/NotificacoesService.php#L117-L135)
  - [ProcessEmails.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Jobs/ProcessEmails.php)
- Repositórios/Consultas:
  - [EloquentUsuarioReadRepository.php](file:///home/diego/projetos/petrvs-pgd/back-end/app/Repository/Usuario/Eloquent/EloquentUsuarioReadRepository.php#L39-L60)

## Observações Finais
- A diretriz “GovBR apenas por CPF” elimina o uso de e-mail na resolução do usuário no callback. Qualquer menção prévia a fallback por e-mail deve ser removida.
- A regra “e-mail só é escrito quando `usuario_externo = 1`” garante fidelidade ao SIAPE para usuários internos.
- Validação de e-mail: utilizar a regra nativa do Laravel (RFC/DNS) apenas quando o valor não for nulo; em caso de falha, registrar em `SiapeLog` e persistir `null`.
