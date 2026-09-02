<?php

use App\Models\PlanoTrabalho;
use App\Services\CSV\RelatorioPlanoTrabalhoCsv;

test('labels de status do relatório de PT seguem a nomenclatura da v2', function () {
    expect(PlanoTrabalho::STATUSES['INCLUIDO'])->toBe('Rascunho')
        ->and(PlanoTrabalho::STATUSES['ATIVO'])->toBe('Execução')
        ->and(PlanoTrabalho::STATUSES['CONCLUIDO'])->toBe('Concluído');
});

test('csv do relatório de PT exporta os labels da v2', function () {
    $row = (object) [
        'numero' => 10,
        'participanteNome' => 'Participante',
        'unidadeHierarquia' => 'UNIDADE',
        'chd' => 100,
        'dataFim' => '2026-08-15',
        'status' => 'INCLUIDO',
    ];

    $csv = RelatorioPlanoTrabalhoCsv::toCSV([$row]);

    expect($csv)->toContain('Rascunho')
        ->and($csv)->not->toContain('Incluído');

    $row->status = 'ATIVO';
    expect(RelatorioPlanoTrabalhoCsv::toCSV([$row]))->toContain('Execução')
        ->and(RelatorioPlanoTrabalhoCsv::toCSV([$row]))->not->toContain('Aprovado');

    $row->status = 'CONCLUIDO';
    expect(RelatorioPlanoTrabalhoCsv::toCSV([$row]))->toContain('Concluído')
        ->and(RelatorioPlanoTrabalhoCsv::toCSV([$row]))->not->toContain('Executado');
});
