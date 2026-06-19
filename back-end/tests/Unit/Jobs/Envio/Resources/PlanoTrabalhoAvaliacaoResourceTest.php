<?php

use App\Jobs\Envio\Resources\PlanoTrabalhoAvaliacaoResource;
use App\Models\Avaliacao;
use App\Models\PlanoTrabalhoConsolidacao;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

describe('PlanoTrabalhoAvaliacaoResource', function () {
    test('usa a avaliação mais recente da relação avaliacoes quando avaliacao_id está nulo', function () {
        $consolidacao = new PlanoTrabalhoConsolidacao([
            'id' => 'cons-1',
            'data_inicio' => '2026-01-01',
            'data_fim' => '2026-01-31',
        ]);

        $avaliacaoAntiga = new Avaliacao([
            'nota' => 'Adequado',
            'data_avaliacao' => '2026-02-01 10:00:00',
            'created_at' => '2026-02-01 10:00:00',
        ]);
        $avaliacaoRecente = new Avaliacao([
            'nota' => 'Alto desempenho',
            'data_avaliacao' => '2026-02-10 10:00:00',
            'created_at' => '2026-02-10 10:00:00',
        ]);

        $consolidacao->setRelation('avaliacoes', new Collection([$avaliacaoAntiga, $avaliacaoRecente]));
        $consolidacao->setRelation('avaliacao', null);

        $payload = (new PlanoTrabalhoAvaliacaoResource($consolidacao))->resolve();

        expect($payload['avaliacao_registros_execucao'])->toBe(2);
        expect($payload['data_avaliacao_registros_execucao'])->toBe('2026-02-10');
    });

    test('usa a relação avaliacao quando avaliacoes não está carregada', function () {
        $consolidacao = new PlanoTrabalhoConsolidacao([
            'id' => 'cons-2',
            'data_inicio' => '2026-02-01',
            'data_fim' => '2026-02-28',
        ]);

        $avaliacao = new Avaliacao([
            'nota' => 'Excepcional',
            'data_avaliacao' => '2026-03-01 08:00:00',
        ]);

        $consolidacao->setRelation('avaliacao', $avaliacao);

        $payload = (new PlanoTrabalhoAvaliacaoResource($consolidacao))->resolve();

        expect($payload['avaliacao_registros_execucao'])->toBe(1);
        expect($payload['data_avaliacao_registros_execucao'])->toBe('2026-03-01');
    });
});
