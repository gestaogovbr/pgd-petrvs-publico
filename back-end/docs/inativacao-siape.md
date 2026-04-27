# Processo de Inativacao SIAPE

## Objetivo

Este documento descreve como o Petrvs-PGD trata a inativacao de usuarios e unidades relacionadas ao SIAPE, incluindo rotinas automaticas, ativacoes temporarias, remocao de blacklist, pontos criticos, pontos de falha e sugestoes de melhoria.

O comportamento descrito foi levantado a partir do codigo atual do back-end Laravel. O processo e tenant-aware: as rotinas de negocio rodam dentro do tenant e gravam nas tabelas tenant.

## Execucao manual

Quando for necessario executar uma rotina manualmente em ambiente de desenvolvimento, use sempre o container PHP:

```bash
docker exec petrvs_php sh -lc "cd /var/www && php artisan app:inativa-usuario-siape {tenant}"
docker exec petrvs_php sh -lc "cd /var/www && php artisan usuarios:inativar-temporarios {tenant}"
docker exec petrvs_php sh -lc "cd /var/www && php artisan app:inativa-unidades-siape {tenant}"
docker exec petrvs_php sh -lc "cd /var/www && php artisan unidades:inativar-temporarios {tenant}"
```

## Estados e tabelas envolvidas

### Usuarios

O estado SIAPE do usuario fica em `usuarios.situacao_siape`, com os valores:

- `ATIVO`: usuario considerado ativo.
- `INATIVO`: usuario bloqueado/inativo por regra SIAPE.
- `ATIVO_TEMPORARIO`: usuario liberado temporariamente no Petrvs mesmo estando em processo de inativacao.

Campos auxiliares:

- `usuarios.data_ativacao_temporaria`: data da liberacao temporaria.
- `usuarios.justicativa_ativacao_temporaria`: justificativa da liberacao temporaria. O nome da coluna esta grafado como `justicativa`.
- `siape_blacklist_servidores.cpf`: CPF que falhou na consulta ou deixou de aparecer no SIAPE.
- `siape_blacklist_servidores.matricula`: matricula afetada quando a regra consegue distinguir multiplas matriculas do mesmo CPF. Pode ser `null`.
- `siape_blacklist_servidores.inativado`: `0` enquanto a inativacao ainda nao foi aplicada; `1` apos a rotina marcar o usuario como inativo.
- `siape_blacklist_servidores.created_at`: data usada para contar o prazo de 30 dias antes da inativacao automatica.

### Unidades

O estado da unidade fica em datas, nao em enum:

- `unidades.data_inativacao = null`: unidade ativa.
- `unidades.data_inativacao != null`: unidade inativa.
- `unidades.data_inicio_inativacao`: inicio do periodo intermediario de inativacao. A unidade ainda fica ativa ate a rotina final preencher `data_inativacao`.
- `unidades.data_ativacao_temporaria` e `unidades.justificativa_ativacao_temporaria`: registram a ativacao temporaria.
- `siape_blacklist_unidades.codigo`: codigo SIAPE/UORG que falhou ou deixou de existir.
- `siape_blacklist_unidades.inativado`: `0` enquanto a unidade ainda nao entrou no processo; `1` depois que `data_inicio_inativacao` e preenchida.
- `siape_blacklist_unidades.created_at`: data usada para contar o primeiro prazo de 30 dias.

## Como a blacklist e criada

### Servidores

A blacklist de servidores pode ser criada em dois tipos de situacao:

1. A consulta ao SIAPE retorna fault catalogado como "nao existem dados". Nesse caso `ProcessaDadosSiapeBD::prepareResponseServidorXml()` ou `SiapeServidorFaultProcessor::process()` cria registro em `siape_blacklist_servidores` por CPF.
2. O processamento identifica multiplas matriculas locais para o mesmo CPF e compara com as matriculas retornadas pelo SIAPE. Matriculas locais que nao aparecem como ativas no SIAPE entram na blacklist com CPF e matricula.

Quando uma matricula volta a aparecer ativa no SIAPE, `ProcessaDadosSiapeBD::ativarMatricula()` remove a blacklist daquela matricula e atualiza o usuario para `ATIVO`, limpando dados de ativacao temporaria.

Durante a busca em lote, `BuscarDadosSiapeServidor` ignora CPFs que ja estao na blacklist. Isso evita reprocessar CPFs problematicos, mas tambem pode atrasar recuperacoes se a blacklist nao for removida.

### Unidades

A blacklist de unidades e criada quando a consulta da UORG retorna fault catalogado como "nao existem dados". `ProcessaDadosSiapeBD::prepareResponseUorgXml()` grava `siape_blacklist_unidades` com o codigo da unidade.

Durante a busca em lote, `BuscarDadosSiapeUnidade` ignora unidades que ja estao na blacklist.

## Descoberta para refatoracao de unidades

Foi identificado que a consulta SIAPE `listaUorgs` retorna apenas UORGs ativas. Com isso, uma unidade local com `codigo` preenchido que nao aparece em `listaUorgs` pode ser tratada como candidata ao fluxo de blacklist/inativacao. Essa ausencia, porem, nao deve ser usada sozinha para efetivar `data_inativacao`, porque a integracao SIAPE e instavel e a inativacao final remove atribuicoes/lotacoes dos servidores vinculados.

Diretriz planejada para a refatoracao:

1. `listaUorgs` sera a evidencia primaria de unidades ativas.
2. Unidades locais ativas ou em processo de inativacao que nao aparecerem em `listaUorgs` devem entrar ou permanecer em `siape_blacklist_unidades`.
3. Unidades que reaparecerem em `listaUorgs` devem ter a pendencia cancelada, com limpeza de `data_inicio_inativacao`.
4. O prazo padrao de unidade passa a ser configurado por `SIAPE_INATIVACAO_UNIDADE_PRAZO_DIAS`, com default de 7 dias.
5. A inativacao final so deve ocorrer apos o prazo em blacklist, o prazo em `data_inicio_inativacao` e confirmacao negativa por `dadosUorg`.
6. A confirmacao negativa por `dadosUorg` deve aceitar apenas ausencia inequivoca, como fault `0002` com mensagem "Nao existem dados para consulta" ou ausencia clara de `<dadosUorgResponse><out>` em SOAP valido.
7. Falha de rede, erro de token, XML invalido, resposta vazia, SOAP fault diferente ou resposta com `<out>` contendo dados da unidade devem impedir a inativacao final.

O plano detalhado dessa refatoracao esta em `back-end/docs/refatoracao-inativacao-unidade-siape.md`.

## Fluxo automatico de inativacao de usuarios SIAPE

Entrada principal:

- Job: `App\Jobs\InativacaoUsuariosSiape`
- Comando manual: `php artisan app:inativa-usuario-siape {tenant}`
- Fila: `siape_queue`
- Regra de negocio: `IntegracaoServidorService::processaServidoresRemovidosNoSiape()`

Processo:

1. O job inicializa o tenant recebido no construtor.
2. O service busca usuarios que fazem join com `siape_blacklist_servidores`.
3. Um usuario e elegivel quando:
   - o CPF bate com a blacklist;
   - a matricula da blacklist e `null` ou igual a `usuarios.matricula`;
   - `siape_blacklist_servidores.inativado = 0`;
   - `siape_blacklist_servidores.created_at < now()->subDays(30)`.
4. Se nao houver usuarios elegiveis, a rotina encerra sem alterar dados.
5. A rotina busca o perfil de consulta via `NivelAcessoService::getPerfilConsulta()`.
6. Os usuarios elegiveis recebem:
   - `situacao_siape = INATIVO`;
   - `perfil_id = perfil de consulta`.
7. Os registros correspondentes na blacklist recebem `inativado = 1`.
8. A rotina registra log no `SiapeLog` e no log Laravel.

Efeito pratico:

- Usuario `INATIVO` deixa de ser retornado por buscas que usam `findActivesByCpf()` ou filtros `situacao_siape != INATIVO`.
- Fluxos de login rejeitam usuario `INATIVO` ou tentam localizar outro usuario ativo pelo mesmo CPF, quando aplicavel.
- O registro do usuario nao e deletado; o bloqueio e logico.

## Ativacao temporaria de usuarios

Entrada principal:

- Rota: `POST /api/Usuario/ativar-temporariamente`
- Permissao: `MOD_USER_EDT`
- Regra de negocio: `UsuarioService::ativarTemporariamente()`

Request esperado no campo `data`:

```json
{
  "usuario_id": "uuid",
  "justificativa": "texto"
}
```

Processo:

1. O controller valida `usuario_id` e `justificativa`.
2. O service busca o usuario.
3. O usuario recebe:
   - `situacao_siape = ATIVO_TEMPORARIO`;
   - `justicativa_ativacao_temporaria = justificativa`;
   - `data_ativacao_temporaria = now()`;
   - `perfil_id = perfil participante`.

Expiracao:

- O `Console\Kernel` agenda `InativacaoUsuariosTemporarios` diariamente as 03:00 para todos os tenants.
- O job seleciona usuarios com `situacao_siape = ATIVO_TEMPORARIO` e `data_ativacao_temporaria <= now()->subDays(30)`.
- Esses usuarios voltam para `INATIVO`.
- A rotina atual nao limpa `data_ativacao_temporaria`, `justicativa_ativacao_temporaria` nem o perfil.

## Remocao de blacklist de usuarios

Entrada principal:

- Rota: `POST /api/siape-blacklist/remover-cpf`
- Service: `SiapeBlackListServidorService::remover()`

Processo:

1. O controller valida e normaliza o CPF.
2. O service busca todos os registros de blacklist daquele CPF.
3. Se existirem, todos sao removidos com `forceDelete()`.
4. O primeiro usuario encontrado por CPF recebe:
   - `situacao_siape = ATIVO`;
   - `data_ativacao_temporaria = null`.

Observacao: a rota esta protegida por `auth:sanctum`, mas o controller retorna `true` em `checkPermissions()`. Na pratica, a remocao depende de estar autenticado, sem capacidade especifica adicional nesse controller.

## Fluxo automatico de inativacao de unidades SIAPE

Entradas principais:

- Job: `App\Jobs\InativacaoUnidadesSiape`
- Comando manual: `php artisan app:inativa-unidades-siape {tenant}`
- Agendamento fixo: diariamente as 00:15 para todos os tenants.
- Regra de negocio: `IntegracaoUnidadeService::processaUnidadesRemovidasNoSiape()`

Primeira etapa: inicio do processo

1. O job inicializa o tenant recebido no construtor.
2. O service busca unidades que fazem join com `siape_blacklist_unidades`.
3. Uma unidade e elegivel quando:
   - `unidades.codigo = siape_blacklist_unidades.codigo`;
   - `siape_blacklist_unidades.inativado = 0`;
   - `siape_blacklist_unidades.created_at <= now()->subDays(30)`;
   - `unidades.data_inicio_inativacao IS NULL`.
4. Para as unidades elegiveis, o service preenche `unidades.data_inicio_inativacao = now()`.
5. A blacklist correspondente recebe `inativado = 1`.
6. A unidade ainda nao e inativada nessa etapa, porque `data_inativacao` continua `null`.

Segunda etapa: inativacao final

- Job: `App\Jobs\InativacaoUnidadesTemporarios`
- Comando manual: `php artisan unidades:inativar-temporarios {tenant}`
- Agendamento fixo: diariamente as 00:30 para todos os tenants.
- Regra de negocio: `UnidadeService::processarUnidadesTemporarias()`

Processo:

1. A rotina busca unidades com:
   - `data_inicio_inativacao IS NOT NULL`;
   - `data_inicio_inativacao <= now()->subDays(30)`;
   - `data_inativacao IS NULL`.
2. Para cada unidade, preenche `data_inativacao = now()`.
3. Busca vinculos ativos em `unidades_integrantes`.
4. Para cada vinculo, chama `LimparAtribuicoes(..., true)`, removendo todas as atribuicoes daquele integrante na unidade, inclusive `LOTADO`.
5. Registra logs com quantidade, IDs e usuarios afetados.

Tempo total esperado:

- Unidades podem levar cerca de 60 dias desde a entrada na blacklist ate a inativacao final: 30 dias para iniciar `data_inicio_inativacao` e mais 30 dias para preencher `data_inativacao`.

## Inativacao manual de unidades

Entrada principal:

- Rota: `POST /api/Unidade/inativar`
- Permissao: `MOD_UND_INATV`
- Regra de negocio: `UnidadeService::inativar()`

Request:

```json
{
  "id": "uuid",
  "inativo": true
}
```

Processo:

1. O controller valida permissao `MOD_UND_INATV`.
2. O service abre transaction.
3. Busca a unidade por ID.
4. Se `inativo = true`, preenche `data_inativacao` com a data/hora atual.
5. Se `inativo = false`, limpa `data_inativacao`.
6. Salva e faz commit.

Observacoes importantes:

- A inativacao manual nao usa `data_inicio_inativacao`.
- A inativacao manual nao remove atribuicoes dos integrantes.
- A reativacao manual nao limpa `data_inicio_inativacao`; se esse campo ja estiver vencido, a rotina de unidades temporarias pode inativar a unidade novamente.

## Ativacao temporaria de unidades

Entrada principal:

- Rota: `POST /api/Unidade/ativar-temporariamente`
- Permissao: `MOD_UND_EDT`
- Regra de negocio: `UnidadeService::ativarTemporariamente()`

Request esperado no campo `data`:

```json
{
  "unidade_id": "uuid",
  "justificativa": "texto"
}
```

Processo:

1. O controller valida `unidade_id` e `justificativa`.
2. O service busca a unidade.
3. A unidade recebe:
   - `justificativa_ativacao_temporaria = justificativa`;
   - `data_ativacao_temporaria = now()`;
   - `data_inicio_inativacao = now()`;
   - `data_inativacao = null`.

Efeito:

- A unidade volta a ficar ativa imediatamente porque `data_inativacao` e limpa.
- Como `data_inicio_inativacao` tambem e preenchida com `now()`, a propria rotina `InativacaoUnidadesTemporarios` tende a inativar novamente a unidade apos 30 dias.

## Remocao de blacklist de unidades

Entrada principal:

- Rota: `POST /api/unidade/remover-blacklist`
- Service: `SiapeBlacklistUnidadeService::remover()`

Processo:

1. O controller valida e normaliza `codigo`.
2. O service busca registros de `siape_blacklist_unidades.codigo`.
3. Se existirem, remove cada registro com `delete()`; como o model herda `SoftDeletes`, a remocao e logica.
4. A rotina nao altera `unidades.data_inicio_inativacao` nem `unidades.data_inativacao`.

Observacao: assim como no controller de blacklist de servidores, a rota esta em grupo autenticado, mas `checkPermissions()` retorna `true`.

## Impactos no restante do sistema

- Unidade inativa e filtrada das consultas padrao de unidade quando o front-end nao solicita inativos.
- `UnidadeIntegranteService::salvarIntegrantes()` impede criar ou manter vinculo em unidade com `data_inativacao` preenchida.
- `PlanoTrabalhoService::validateStore()` e `PlanoEntregaService::validateStore()` bloqueiam criacao/alteracao quando a unidade esta inativa.
- Usuarios `INATIVO` sao excluidos de buscas de usuarios ativos e podem ser bloqueados em login.
- Relatorios de agente tratam `situacao_siape = INATIVO` como situacao inativa.

## Pontos criticos

1. CPF sozinho nao identifica sempre o vinculo correto. O codigo tenta usar `matricula` quando disponivel, mas ainda existem rotas e remocoes por CPF que afetam todos os registros do CPF ou apenas o primeiro usuario encontrado.
2. O significado de `inativado` na blacklist e diferente do estado final da entidade. Para servidores, `inativado = 1` acompanha a mudanca para `usuarios.situacao_siape = INATIVO`. Para unidades, `inativado = 1` significa apenas que `data_inicio_inativacao` foi iniciada, nao que `data_inativacao` foi preenchida.
3. A inativacao de unidade tem duas janelas de 30 dias. Isso reduz risco de inativar por falha transitoria, mas torna o processo lento e mais dificil de auditar.
4. A inativacao manual de unidade nao remove atribuicoes, enquanto a inativacao final automatica remove todas as atribuicoes dos integrantes.
5. A ativacao temporaria de unidade preenche `data_inicio_inativacao = now()`. Isso funciona como uma reativacao temporaria por 30 dias, mas o nome do metodo pode induzir a entender que o prazo foi suspenso.
6. A reativacao por `IntegracaoService` limpa `data_inativacao` quando a unidade volta a aparecer ativa em `integracao_unidades`, mas nao ha limpeza explicita de `data_inicio_inativacao`.
7. Os comandos inicializam tenant no construtor dos jobs. Em jobs serializados, isso merece cuidado porque a inicializacao no construtor acontece no momento do dispatch, e o `handle()` tambem depende do estado tenant ja inicializado.
8. Logs de blacklist e inativacao podem envolver CPF e dados pessoais. Devem permanecer restritos ao necessario.

## Pontos de falha

1. `InativacaoUsuariosSiape` nao aparece no agendamento fixo do `Console\Kernel`; ele existe como job agendavel e comando manual. Se nao for configurado em `jobs_schedules` ou executado manualmente, usuarios em blacklist podem nunca passar para `INATIVO`.
2. Se `NivelAcessoService::getPerfilConsulta()` nao retornar perfil, a inativacao de usuarios encerra sem alterar ninguem.
3. A selecao de usuarios usa `created_at < now()->subDays(30)`, enquanto unidades usam `<=`. Isso cria uma pequena diferenca operacional no limite exato de 30 dias.
4. `SiapeBlackListServidorService::remover()` remove todos os registros de um CPF e reativa apenas o primeiro usuario encontrado por CPF. Em CPFs com multiplas matriculas, isso pode deixar matriculas com estado incorreto.
5. `SiapeBlacklistUnidadeService::remover()` usa soft delete. Se o objetivo operacional for apagar definitivamente a pendencia, a tabela pode acumular historico e permitir recriacoes futuras para o mesmo codigo.
6. Remover blacklist de unidade nao reativa a unidade nem cancela `data_inicio_inativacao`. Uma unidade pode continuar caminhando para inativacao mesmo depois de remover a blacklist.
7. Reativar manualmente unidade limpando apenas `data_inativacao` pode ser revertido pelo job `InativacaoUnidadesTemporarios` se `data_inicio_inativacao` antigo continuar vencido.
8. A rotina de inativacao final de unidades remove todas as atribuicoes dos integrantes, mas nao ha transacao envolvendo a unidade e todos os vinculos. Uma falha no meio pode deixar unidade inativa com parte dos vinculos ainda ativos.
9. A inativacao manual de unidade nao tem o mesmo efeito colateral da automatica. Isso cria dois comportamentos diferentes para "unidade inativa".
10. O processo depende fortemente da blacklist. Se uma falha SIAPE transitoria criar blacklist indevida e ela nao for revisada, a entidade entra no fluxo de inativacao.
11. As rotas de remocao de blacklist estao autenticadas, mas nao exigem capacidade especifica no controller. Isso e sensivel porque essas rotas podem reativar usuarios ou desbloquear processamento SIAPE.
12. Alguns logs usam `Log` e outros usam `SiapeLog`; isso dificulta auditoria consolidada do ciclo completo.

## Sugestoes de melhoria

1. Criar um estado explicito para inativacao, por exemplo `PENDENTE_INATIVACAO`, `INATIVADO`, `REATIVADO`, em vez de reutilizar `inativado` com semanticas diferentes para usuarios e unidades.
2. Unificar a regra de prazo em uma configuracao de tenant ou constante de dominio, evitando valores `30` espalhados em jobs/services.
3. Criar um service unico de ciclo de vida SIAPE para usuario e outro para unidade, centralizando blacklist, inicio, efetivacao, reativacao e auditoria.
4. Exigir capacidade especifica para remocao de blacklist, separada de edicao comum, e registrar quem fez a acao.
5. Em usuarios, preferir operacoes por CPF + matricula quando a matricula existir. A remocao por CPF deveria ser uma acao explicita de escopo amplo.
6. Em unidades, ao remover blacklist ou reativar manualmente, decidir explicitamente se `data_inicio_inativacao` deve ser limpa. Se a intencao for cancelar a inativacao, limpar o campo.
7. Envolver a inativacao final de unidade e a limpeza de atribuicoes em transaction.
8. Padronizar os efeitos de inativacao manual e automatica de unidade, ou documentar claramente no front-end que sao acoes diferentes.
9. Adicionar testes `IntegrationTenant` para:
   - usuario entra em `INATIVO` apos blacklist vencida;
   - usuario `ATIVO_TEMPORARIO` expira apos 30 dias;
   - unidade entra em `data_inicio_inativacao` apos blacklist vencida;
   - unidade recebe `data_inativacao` e perde atribuicoes apos o segundo prazo;
   - remocao de blacklist nao reativa indevidamente matricula errada.
10. Adicionar uma tela ou endpoint de auditoria com timeline: blacklist criada, prazo iniciado, inativacao efetivada, ativacao temporaria, remocao de blacklist e reativacao.
11. Avaliar se `InativacaoUsuariosSiape` deve ter agendamento fixo no `Console\Kernel`, assim como unidades, ou se a criacao dos jobs SIAPE por tenant deve incluir esse job.
12. Usar `SiapeLog` de forma consistente em todos os passos operacionais relevantes, preservando cuidado com CPF e payloads sensiveis.

## Referencias principais no codigo

- `app/Jobs/InativacaoUsuariosSiape.php`
- `app/Jobs/InativacaoUsuariosTemporarios.php`
- `app/Jobs/InativacaoUnidadesSiape.php`
- `app/Jobs/InativacaoUnidadesTemporarios.php`
- `app/Services/IntegracaoServidorService.php`
- `app/Services/IntegracaoUnidadeService.php`
- `app/Services/UsuarioService.php`
- `app/Services/UnidadeService.php`
- `app/Services/Siape/ProcessaDadosSiapeBD.php`
- `app/Services/Siape/SiapeServidorFaultProcessor.php`
- `app/Services/SiapeBlackListServidorService.php`
- `app/Services/SiapeBlacklistUnidadeService.php`
- `app/Services/LoginService.php`
- `routes/api_tenant.php`
