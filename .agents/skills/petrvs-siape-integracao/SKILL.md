---
name: petrvs-siape-integracao
description: Use para trabalho de integração SIAPE no Petrvs-PGD envolvendo unidades, servidores, gestores, chefia, lotacao, matricula, fontes SIAPE local/API, SiapeLog, resumo de processamento ou fluxos tenant-aware.
---

# Petrvs SIAPE Integracao

## Referências

- Leia `back-end/AGENTS.md`.
- Carregue `../petrvs-backend-laravel/references/siape.md`.
- Carregue `../petrvs-backend-laravel/references/testing.md` para escolhas de validação.
- Carregue `../petrvs-backend-laravel/references/repository-pattern.md` ao mover persistência para trás de repositories.

## Fluxo

1. Identifique se a mudança afeta unidade, servidor, gestor, lotacao, matricula, logs, routes, jobs ou estado tenant.
2. Inspecione services e testes SIAPE existentes antes de editar.
3. Preserve compatibilidade de métodos públicos em services legados de integração, salvo pedido explícito de refactor com quebra.
4. Mantenha comportamento de logging/auditoria visível via `SiapeLog` ou pelo caminho de log existente.
5. Proteja CPF e dados pessoais em logs, testes e responses.
6. Adicione testes Unit para lógica pura de normalização/roteamento e testes IntegrationTenant para persistência tenant.
7. Rode Pest focado e PHPStan nos paths SIAPE alterados.

## Cuidados

- Não remova comportamento de fallback entre arquivos locais e fontes API sem escopo explícito.
- Não assuma que CPF sozinho identifica o servidor correto quando matricula ou código da unidade de exercício fizer parte da regra.
- Não contorne o contexto tenant para dados de negócio tenant.

## Cenários De Regressão SIAPE

- Campo ausente no SIAPE não significa automaticamente resposta negativa; preserve dado local quando a ausência não for uma negativa explícita.
- Mesmo CPF pode ter múltiplas matrículas; avalie CPF, matrícula e unidade antes de concluir que é o mesmo vínculo.
- Troca de matrícula dentro da mesma unidade é regra real do sistema e deve preservar o usuário existente quando esse for o cenário confirmado.
- Duas ou mais matrículas ativas em unidades distintas devem coexistir e manter lotações independentes.
- Duas matrículas ativas do mesmo CPF na mesma unidade é cenário conflitante com a regra de troca de matrícula; registre TODO/FIXME até decisão da equipe.
- Servidor pode voltar para matrícula antiga após período usando matrícula nova.
- Servidor ausente no SIAPE por prazo configurado pode entrar em inativação/blacklist; retorno posterior deve limpar o estado de ausência quando aplicável.
- Como SIAPE não roda localmente, use fixtures/arrays/XML determinísticos e asserts no estado final do banco tenant.

## Inativacao De Unidades SIAPE

- `listaUorgs` retorna apenas unidades ativas; ausencia de uma unidade local nessa lista e sinal para blacklist, nao prova final para inativacao.
- O prazo padrao planejado para inativacao de unidade e `config('integracao.siape.inativacao_unidade_prazo_dias', 7)`, vindo de `SIAPE_INATIVACAO_UNIDADE_PRAZO_DIAS`.
- Antes de preencher `unidades.data_inativacao`, confirme a ausencia com `dadosUorg`; somente fault `0002`/"Nao existem dados para consulta" ou ausencia inequivoca de `<dadosUorgResponse><out>` em SOAP valido deve permitir a efetivacao.
- Falha de rede, token, XML invalido, resposta vazia, SOAP fault diferente ou retorno com `<out>` devem impedir a inativacao final e gerar auditoria via `SiapeLog`.
- A inativacao final de unidade deve ser transacional junto com a remocao de atribuicoes/lotacoes, inclusive `LOTADO`.
- Remocao de blacklist ou reativacao manual de unidade deve cancelar `data_inicio_inativacao`; remocao de blacklist nao deve reativar automaticamente unidade ja finalizada.
