# Refatoracao da inativacao de unidades SIAPE

## Objetivo

Refatorar o fluxo de inativacao de unidades SIAPE para reduzir o prazo padrao de 30 para 7 dias sem perder seguranca operacional. A descoberta central e que `listaUorgs` retorna apenas unidades ativas; portanto, uma unidade local que nao aparece nessa lista passa a ser candidata a blacklist, mas a inativacao final so deve ocorrer depois de confirmacao adicional via `dadosUorg`.

O risco principal e inativar uma unidade erroneamente. Hoje a inativacao final remove atribuicoes/lotacoes dos servidores vinculados, inclusive `LOTADO`, entao qualquer decisao automatica precisa ser conservadora, auditavel e transacional.

## Plano de alto nivel

- Usar `listaUorgs` como evidencia primaria de unidades ativas.
- Criar um service unico de ciclo de vida para unidade SIAPE, centralizando blacklist, inicio de inativacao, efetivacao, cancelamento, reativacao e auditoria.
- Configurar o prazo de unidade por variavel de ambiente, com default de 7 dias.
- Manter duas janelas de seguranca:
  - 7 dias em `siape_blacklist_unidades`.
  - 7 dias em `unidades.data_inicio_inativacao`.
- Antes da inativacao final, chamar `dadosUorg` para confirmar que a unidade continua inexistente/inativa no SIAPE.
- Se `dadosUorg` retornar unidade ativa, falhar, vier vazio ou vier ambiguo, nao inativar.
- Efetivar `data_inativacao` e remover atribuicoes dentro de uma mesma transaction.
- Usar `SiapeLog` nos passos operacionais relevantes, sem payloads sensiveis desnecessarios.
- Agendar `InativacaoUsuariosSiape` no `Console\Kernel`, sem alterar regras de usuario neste momento.

## Checklist de implementacao

### Documentacao e configuracao

- [x] Adicionar `SIAPE_INATIVACAO_UNIDADE_PRAZO_DIAS=7` nos templates versionados de `.env`.
- [x] Expor `integracao.siape.inativacao_unidade_prazo_dias` em `back-end/config/integracao.php`.
- [x] Atualizar `back-end/docs/inativacao-siape.md` com o novo entendimento de `listaUorgs` e `dadosUorg`.
- [x] Atualizar `.agents/skills/petrvs-siape-integracao/SKILL.md` e sincronizar para `~/.codex/skills/petrvs-siape-integracao/SKILL.md`.

### Novo service de ciclo de vida

- [x] Criar `App\Services\Siape\Unidade\SiapeUnidadeLifecycleService`.
- [x] Centralizar no service:
  - [x] cruzamento entre unidades locais e `listaUorgs`;
  - [x] criacao/restauracao/manutencao de blacklist;
  - [x] cancelamento de pendencia quando a unidade reaparece;
  - [x] inicio de `data_inicio_inativacao`;
  - [x] confirmacao final por `dadosUorg`;
  - [x] efetivacao de `data_inativacao`;
  - [x] remocao de atribuicoes/lotacoes;
  - [x] logs `SiapeLog`.
- [x] Preservar `created_at` de blacklist ja ativa para nao reiniciar indevidamente a contagem.
- [x] Ao restaurar blacklist soft-deleted, reiniciar a contagem com novo `created_at`, pois e uma nova evidencia de ausencia.

### Criacao e cancelamento de blacklist

- [x] No processamento de `listaUorgs`, normalizar codigos para comparacao.
- [x] Ignorar unidades locais sem `codigo`.
- [x] Ignorar unidades locais ja finalizadas com `data_inativacao` preenchida ao criar novas blacklists.
- [x] Para unidade local ativa/pending ausente de `listaUorgs`, criar ou manter blacklist com `inativado = 0`.
- [x] Para unidade que voltou em `listaUorgs`, remover/cancelar blacklist ativa e limpar `data_inicio_inativacao`.
- [x] Nao limpar `data_inativacao` apenas por remocao de blacklist; reativacao final deve ser confirmada pelo SIAPE ou feita manualmente.
- [x] Integrar a sincronizacao ao `BuscarDadosSiapeUnidade::enviar()` antes da busca de `dadosUorg`, para que unidade presente na lista atual nao seja ignorada por blacklist antiga.

### Inicio da inativacao

- [x] Substituir o prazo fixo de 30 dias por `config('integracao.siape.inativacao_unidade_prazo_dias', 7)`.
- [x] Selecionar unidades com blacklist ativa, `inativado = 0`, criada ha pelo menos o prazo configurado e `data_inicio_inativacao IS NULL`.
- [x] Preencher `unidades.data_inicio_inativacao = now()`.
- [x] Atualizar `siape_blacklist_unidades.inativado = 1`.
- [x] Registrar `SiapeLog` com codigo, unidade e quantidade, sem payload SOAP completo.
- [x] Fazer `IntegracaoUnidadeService::processaUnidadesRemovidasNoSiape()` delegar ao lifecycle para manter o contrato usado pelo job.

### Inativacao final

- [x] Selecionar unidades com `data_inicio_inativacao <= now()->subDays(prazo)` e `data_inativacao IS NULL`.
- [x] Antes de alterar dados, chamar `dadosUorg` para o codigo da unidade.
- [x] Inativar somente se a resposta for uma confirmacao negativa inequívoca:
  - faultcode `0002` com faultstring "Nao existem dados para consulta" ou equivalente catalogado; ou
  - ausencia inequívoca de `<dadosUorgResponse><out>` em resposta SOAP valida.
- [x] Nao inativar em caso de:
  - erro de rede;
  - erro de token;
  - XML invalido;
  - resposta vazia;
  - SOAP fault diferente;
  - resposta com `<out>` contendo dados da unidade.
- [x] Tratar SOAP valido sem `dadosUorgResponse` nem fault conhecido como retorno ambiguo, preservando a unidade.
- [x] Efetivar cada unidade em transaction:
  - [x] recarregar/travar a unidade;
  - [x] revalidar que ainda esta sem `data_inativacao`;
  - [x] preencher `data_inativacao = now()`;
  - [x] remover todas as atribuicoes dos integrantes da unidade, inclusive `LOTADO`;
  - [x] registrar quantidade de integrantes/atribuicoes afetados;
  - [x] abortar tudo se qualquer remocao falhar.
- [x] Fazer `UnidadeService::processarUnidadesTemporarias()` delegar ao lifecycle para manter o contrato usado pelo job.

### Reativacao e remocao de blacklist

- [ ] Atualizar `SiapeBlacklistUnidadeService::remover()` para cancelar a pendencia:
  - remover blacklist;
  - limpar `data_inicio_inativacao`;
  - nao limpar `data_inativacao` de unidade ja finalizada.
- [ ] Atualizar `UnidadeService::inativar($id, false)` para reativacao manual definitiva:
  - limpar `data_inativacao`;
  - limpar `data_inicio_inativacao`;
  - limpar `data_ativacao_temporaria`;
  - limpar `justificativa_ativacao_temporaria`.
- [ ] Manter `UnidadeService::ativarTemporariamente()` como liberacao temporaria:
  - `data_inativacao = null`;
  - `data_inicio_inativacao = now()`;
  - expiracao pelo prazo configurado de 7 dias.

### Agendamento de usuario

- [ ] Agendar `InativacaoUsuariosSiape` no `Console\Kernel` para todos os tenants.
- [ ] Nao alterar regra de usuario nesta etapa, exceto o agendamento fixo.

## Checklist de testes

Criar testes em `tests/IntegrationTenant`, pois o fluxo altera dados tenant e remove atribuicoes.

- [x] Unidade ausente em `listaUorgs` cria blacklist.
- [x] Unidade ausente com blacklist ja existente preserva `created_at`.
- [x] Unidade que reaparece em `listaUorgs` remove blacklist e limpa `data_inicio_inativacao`.
- [x] Unidade ja inativada nao ganha nova blacklist apenas por ausencia em `listaUorgs`.
- [x] Processamento real de `listaUorgs` sincroniza blacklist antes de buscar `dadosUorg` das unidades ativas.
- [x] Blacklist vencida inicia `data_inicio_inativacao`.
- [x] Blacklist nao vencida nao inicia inativacao.
- [x] `IntegracaoUnidadeService` inicia inativacao usando o prazo configurado do lifecycle.
- [x] Segundo prazo vencido com `dadosUorg` negativo preenche `data_inativacao`.
- [x] Segundo prazo vencido com `dadosUorg` negativo remove atribuicoes, inclusive `LOTADO`.
- [x] Segundo prazo vencido com `dadosUorg` positivo nao inativa e preserva atribuicoes.
- [x] Falha/retorno ambiguo de `dadosUorg` nao inativa.
- [x] SOAP fault diferente de ausencia nao confirma inativacao.
- [x] SOAP valido sem `dadosUorgResponse` e tratado como ambiguo.
- [x] `UnidadeService::processarUnidadesTemporarias()` efetiva inativacao via lifecycle.
- [x] Erro ao remover atribuicoes faz rollback e preserva `data_inativacao = null`.
- [x] Remocao de blacklist limpa pendencia sem reativar unidade ja inativada.
- [ ] Reativacao manual limpa `data_inicio_inativacao` para nao ser revertida pelo job.
- [ ] `InativacaoUsuariosSiape` aparece no agendamento fixo sem mudar a regra de usuario.

## Criterios de seguranca

- A inativacao final exige tres evidencias: ausencia em `listaUorgs`, prazo minimo em blacklist e confirmacao negativa por `dadosUorg`.
- Falhas do SIAPE sempre devem favorecer nao inativar.
- A ausencia de resposta nao equivale a ausencia da unidade.
- O payload SOAP completo nao deve ir para `SiapeLog` em operacoes rotineiras.
- CPF e dados pessoais nao devem ser adicionados aos logs desse fluxo de unidade.
- A remocao de lotacoes/atribuicoes deve estar na mesma transaction de `data_inativacao`.
- A remocao manual de blacklist deve cancelar o processo pendente, mas nao reativar automaticamente uma unidade ja finalizada.
- A reativacao manual deve limpar datas pendentes para impedir nova inativacao automatica por resquicio antigo.

## Comandos de validacao

Todos os comandos devem rodar no container PHP.

```bash
docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest tests/IntegrationTenant/Services/SiapeUnidadeLifecycleServiceTest.php"
```

```bash
docker exec petrvs_php sh -lc "cd /var/www && ./vendor/bin/pest tests/IntegrationTenant/Services/UnidadeServiceTest.php tests/IntegrationTenant/Services/SiapeUnidadeLifecycleServiceTest.php"
```

```bash
docker exec petrvs_php sh -lc "cd /var/www && vendor/bin/phpstan analyse app/Services/Siape app/Services/IntegracaoUnidadeService.php app/Services/SiapeBlacklistUnidadeService.php app/Services/UnidadeService.php app/Console/Kernel.php --configuration=phpstan.neon.dist --memory-limit=1G --no-progress"
```

## Estado do rascunho TDD

Foi criado um rascunho em `back-end/tests/IntegrationTenant/Services/SiapeUnidadeLifecycleServiceTest.php` para capturar os cenarios acima. Ele foi executado uma vez em fase red e falhou pelo motivo esperado: o service `SiapeUnidadeLifecycleService` ainda nao existe e os pontos legados ainda nao limpam a pendencia.

O arquivo foi deixado com comentario explicativo e marcado como skipped ate a etapa de implementacao, para documentar a intencao sem quebrar a suite.
