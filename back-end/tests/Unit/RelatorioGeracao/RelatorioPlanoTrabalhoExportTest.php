<?php

use App\Exports\RelatorioPlanoTrabalhoDetalhadoExport;
use App\Exports\RelatorioPlanoTrabalhoExport;
use Illuminate\Support\Collection;

test('export de PT mapeia a quantidade de períodos avaliativos', function () {
    $export = new RelatorioPlanoTrabalhoExport(new Collection());
    $map = $export->map((object) [
        'numero' => 7,
        'participanteNome' => 'Fulano',
        'unidadeHierarquia' => 'SE/CO',
        'chd' => 40,
        'status' => 'ATIVO',
        'dataInicio' => '2024-01-01',
        'dataFim' => '2024-01-31',
        'duracao' => 31,
        'qtdePeriodosAvaliativos' => 2,
    ]);

    expect($map[0])->toBe('#7')
        ->and($map[8])->toBe(2);
});

test('export detalhado mapeia a view sem qtdePeriodosAvaliativos', function () {
    $export = new RelatorioPlanoTrabalhoDetalhadoExport(new Collection());
    $map = $export->map((object) [
        'numero' => 10,
        'participanteNome' => 'Fulano',
        'unidadeHierarquia' => 'SE/CO',
        'chd' => 50.5,
        'status' => 'ATIVO',
        'dataInicio' => '2024-01-01',
        'dataFim' => '2024-01-31',
        'duracao' => 31,
        'data_inicio_avaliativo' => '2024-01-01',
        'data_fim_avaliativo' => '2024-01-15',
        'data_conclusao' => null,
        'situacao_execucao' => 'Aguardando',
        'data_avaliacao' => null,
        'situacao_avaliacao' => null,
        'nota' => null,
        'data_recurso' => null,
        'data_reavaliacao' => null,
        'nota_reavaliacao' => null,
    ]);

    expect($map[0])->toBe('#10')
        ->and($map[1])->toBe('Fulano')
        ->and($map[7])->toBe(31)
        ->and($map[11])->toBe('Aguardando')
        ->and($map)->toHaveCount(18);
});
