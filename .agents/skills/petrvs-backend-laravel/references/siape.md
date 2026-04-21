# Referência SIAPE Petrvs

Docs principais:

- `back-end/docs/integracao_gestor_logica.md`
- `back-end/docs/refactor-integracao-service.md`
- `back-end/docs/siape-unidade-relatorio-routes.md`

## Áreas Centrais

- Sincronização e hierarquia de unidade.
- Sincronização, normalização, validação e tratamento de matricula de servidor.
- Atribuição de gestor/chefia.
- Associação e correção de lotacao.
- Fontes de dados SIAPE local/API.
- `SiapeLog`, audit, download logs, and process summaries.
- Comportamento de integração tenant-aware.

## Lógica De Gestor

- `montarArrayChefias` deve retornar entradas no shape `['id_unidade' => ..., 'id_chefe' => ...]`.
- `cpf_titular_autoridade_uorg` vazio significa que a unidade não tem chefe e deve produzir `id_chefe => null`.
- Quando houver CPF, resolva o servidor com precisão via `integracao_servidores`, usando CPF mais o código SIAPE da unidade de exercício.
- Depois resolva a linha correspondente em `usuarios`.
- Se o usuário não for encontrado, registre via `SiapeLog` e continue.
- Garanta que o chefe esteja lotado na unidade onde exerce chefia.
- Evite reprocessamento quando o usuário já for gestor da mesma unidade.

## Direção De Refatoração

- Preserve compatibilidade pública de `IntegracaoService` enquanto extrai colaboradores focados.
- Colaboradores candidatos: token provider, clients SIAPE, service de sync de unidade, service de sync de servidor, lotacao updater, validators e logging port.
- Prefira interfaces e injeção por construtor para services externos, repositories e logging.
- Substitua SQL bruto gradualmente por repositories quando o comportamento estiver coberto.

## Routes E Shape De API

- Routes SIAPE de unidade existentes incluem consult, process, export e download.
- `POST /api/unidade/relatorio-processamento-siape` retorna dados agregados de processamento:
  `success`, `chefeCpf`, and `quantidadeServidoresLotados`.
- `POST /api/unidade/processar-siape` pode retornar `log` e `resumo`.
- Valores de status de item de resumo seguem o fluxo de CPF: `sucesso`, `parcial`, `erro`.

## Diretrizes De Teste

- Formatação/normalização pura: Unit com mocks.
- Comportamento de banco tenant: `tests/IntegrationTenant`.
- Preserve logs de processo e comportamento de auditoria em testes quando isso for visível ao usuário.
- Payloads SIAPE podem conter dados pessoais; mantenha fixtures mínimas e mascaradas quando possível.
