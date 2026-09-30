<?php

use App\Enums\RelatorioGeracaoTipo;

test('tipos de geração conhecidos expõem nome, arquivo e capacidade', function () {
    expect(RelatorioGeracaoTipo::PLANO_TRABALHO->nome())->toBe('Relatório de Planos de Trabalho')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO->arquivoNome())->toBe('relatorio-planos-trabalho.xlsx')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO->capacidade())->toBe('MOD_RELATORIO_PT')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->nome())->toContain('Períodos Avaliativos')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO->nomeExibicao())->toBe('Planos de Trabalho')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->nomeExibicao())->toBe('Planos de Trabalho')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO->grupo())->toBe('planos_trabalho')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->grupo())->toBe('planos_trabalho')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->capacidade())->toBe('MOD_RELATORIO_PT')
        ->and(RelatorioGeracaoTipo::PLANO_ENTREGA->nome())->toBe('Relatório de Planos de Entrega')
        ->and(RelatorioGeracaoTipo::PLANO_ENTREGA->nomeExibicao())->toBe('Planos de Entrega')
        ->and(RelatorioGeracaoTipo::PLANO_ENTREGA->grupo())->toBe('planos_entrega')
        ->and(RelatorioGeracaoTipo::PLANO_ENTREGA->arquivoNome())->toBe('relatorio-planos-entrega.xlsx')
        ->and(RelatorioGeracaoTipo::PLANO_ENTREGA->capacidade())->toBe('MOD_RELATORIO_PE')
        ->and(RelatorioGeracaoTipo::AGENTE->nome())->toBe('Relatório de Agentes Públicos')
        ->and(RelatorioGeracaoTipo::AGENTE->nomeExibicao())->toBe('Agentes Públicos')
        ->and(RelatorioGeracaoTipo::AGENTE->grupo())->toBe('agentes')
        ->and(RelatorioGeracaoTipo::AGENTE->arquivoNome())->toBe('relatorio-agentes.xlsx')
        ->and(RelatorioGeracaoTipo::AGENTE->capacidade())->toBe('MOD_RELATORIO_USUARIO')
        ->and(RelatorioGeracaoTipo::UNIDADE->nome())->toBe('Relatório de Unidades')
        ->and(RelatorioGeracaoTipo::UNIDADE->nomeExibicao())->toBe('Unidades')
        ->and(RelatorioGeracaoTipo::UNIDADE->grupo())->toBe('unidades')
        ->and(RelatorioGeracaoTipo::UNIDADE->arquivoNome())->toBe('relatorio-unidades.xlsx')
        ->and(RelatorioGeracaoTipo::UNIDADE->capacidade())->toBe('MOD_RELATORIO_UNIDADE')
        ->and(RelatorioGeracaoTipo::ENTREGA->nome())->toBe('Relatório de Entregas')
        ->and(RelatorioGeracaoTipo::ENTREGA->nomeExibicao())->toBe('Entregas')
        ->and(RelatorioGeracaoTipo::ENTREGA->grupo())->toBe('entregas')
        ->and(RelatorioGeracaoTipo::ENTREGA->arquivoNome())->toBe('relatorio_entregas.xlsx')
        ->and(RelatorioGeracaoTipo::ENTREGA->capacidade())->toBe('MOD_RELATORIO_PE')
        ->and(RelatorioGeracaoTipo::ENTREGA->capacidades())->toBe(['MOD_RELATORIO_PE', 'MOD_RELATORIO_ENTREGA']);
});
