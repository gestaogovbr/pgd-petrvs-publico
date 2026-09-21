<?php

use App\Enums\RelatorioGeracaoTipo;
use App\Services\RelatorioGeracao\RelatorioPlanoTrabalhoExcelGerador;
use App\Services\RelatorioPlanoTrabalhoService;

test('tipos de geração conhecidos expõem nome, arquivo e capacidade', function () {
    expect(RelatorioGeracaoTipo::PLANO_TRABALHO->nome())->toBe('Relatório de Planos de Trabalho')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO->arquivoNome())->toBe('relatorio-planos-trabalho.xlsx')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO->capacidade())->toBe('MOD_RELATORIO_PT')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->nome())->toContain('Períodos Avaliativos')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO->nomeExibicao())->toBe('Planos de Trabalho')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->nomeExibicao())->toBe('Planos de Trabalho')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO->grupo())->toBe('planos_trabalho')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->grupo())->toBe('planos_trabalho')
        ->and(RelatorioGeracaoTipo::PLANO_TRABALHO_DETALHADO->capacidade())->toBe('MOD_RELATORIO_PT');
});

test('gerador de PT consulta o serviço de exportação com página e limite', function () {
    $service = Mockery::mock(RelatorioPlanoTrabalhoService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with(Mockery::on(function (array $data) {
            return $data['page'] === 3
                && $data['limit'] === 1000
                && $data['where'] === [['unidade_id', '==', 'u1']]
                && $data['orderBy'] === [['participanteNome', 'asc']];
        }), null)
        ->andReturn([
            'count' => 1200,
            'rows' => collect([(object) ['id' => 'pt-1']]),
            'extra' => null,
        ]);

    $gerador = new RelatorioPlanoTrabalhoExcelGerador($service);
    $result = $gerador->consultarPagina([
        'where' => [['unidade_id', '==', 'u1']],
        'orderBy' => [['participanteNome', 'asc']],
    ], 3, 1000);

    expect($gerador->pageSize())->toBe(1000)
        ->and($result['count'])->toBe(1200)
        ->and($result['rows'])->toHaveCount(1);
});

test('gerador de PT reutiliza o total já conhecido nas páginas seguintes', function () {
    $service = Mockery::mock(RelatorioPlanoTrabalhoService::class);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with(Mockery::on(fn (array $data) => $data['page'] === 1), null)
        ->andReturn([
            'count' => 2500,
            'rows' => collect([(object) ['id' => 'pt-1']]),
            'extra' => null,
        ]);
    $service->shouldReceive('queryForExport')
        ->once()
        ->with(Mockery::on(fn (array $data) => $data['page'] === 2), 2500)
        ->andReturn([
            'count' => 2500,
            'rows' => collect([(object) ['id' => 'pt-2']]),
            'extra' => null,
        ]);

    $gerador = new RelatorioPlanoTrabalhoExcelGerador($service);
    $gerador->consultarPagina(['where' => [], 'orderBy' => []], 1, 1000);
    $segunda = $gerador->consultarPagina(['where' => [], 'orderBy' => []], 2, 1000);

    expect($segunda['count'])->toBe(2500);
});
