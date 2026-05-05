<?php

declare(strict_types=1);

use App\Repository\EnvioPlanoTrabalho\Eloquent\EloquentEnvioPlanoTrabalhoReadRepository;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

uses(Tests\TestCase::class);

afterEach(function () {
    Mockery::close();
});

function preparaDbMockEnvioPlanoTrabalho(int $count, Collection $rows): void
{
    $builder = Mockery::mock(Builder::class);
    $builder->shouldReceive('leftJoin')->andReturnSelf()->byDefault();
    $builder->shouldReceive('select')->andReturnSelf()->byDefault();
    $builder->shouldReceive('whereNull')->andReturnSelf()->byDefault();
    $builder->shouldReceive('whereNotNull')->andReturnSelf()->byDefault();
    $builder->shouldReceive('where')->andReturnSelf()->byDefault();
    $builder->shouldReceive('orWhereColumn')->andReturnSelf()->byDefault();
    $builder->shouldReceive('orderByDesc')->andReturnSelf()->byDefault();
    $builder->shouldReceive('orderBy')->andReturnSelf()->byDefault();
    $builder->shouldReceive('forPage')->andReturnSelf()->byDefault();

    $builder->shouldReceive('count')->once()->withNoArgs()->andReturn($count);
    $builder->shouldReceive('get')->once()->withNoArgs()->andReturn($rows);

    DB::shouldReceive('table')->once()->with('planos_trabalhos as pt')->andReturn($builder);
}

test('query devolve count e rows conforme o builder', function (array $where, int $count, Collection $rows) {
    preparaDbMockEnvioPlanoTrabalho($count, $rows);

    $repository = new EloquentEnvioPlanoTrabalhoReadRepository();
    $result = $repository->query([
        'where' => $where,
        'page' => 1,
        'limit' => 10,
    ]);

    expect($result['count'])->toBe($count);
    expect($result['rows']->count())->toBe($rows->count());

    if ($rows->isNotEmpty()) {
        expect($result['rows']->first()->unidade->sigla)->toBe('U1');
        expect($result['rows']->first()->programa->nome)->toBe('Programa 1');
    }
})->with([
    'isFalha' => [
        [['isFalha', true]],
        1,
        collect([
            (object) [
                'id' => 'pt-1',
                'numero' => 1,
                'data_inicio' => '2026-04-01 00:00:00',
                'data_fim' => '2026-04-30 00:00:00',
                'updated_at' => '2026-04-24 10:00:00',
                'data_agendamento_envio' => '2026-04-24 11:00:00',
                'data_tentativa_envio' => '2026-04-24 10:30:00',
                'data_conclusao_envio' => '2026-04-24 10:45:00',
                'data_envio_api_pgd' => '2026-04-24 10:40:00',
                'log_envio' => 'Erro de envio',
                'unidade_id' => 'u-1',
                'unidade_sigla' => 'U1',
                'programa_id' => 'p-1',
                'programa_nome' => 'Programa 1',
            ],
        ]),
    ],
    'numero' => [
        [['numero', '10']],
        0,
        collect(),
    ],
    'data_agendamento_envio_lte' => [
        [['data_agendamento_envio_lte', '2026-04-30']],
        0,
        collect(),
    ],
    'isNaoEnviado' => [
        [['isNaoEnviado', true]],
        0,
        collect(),
    ],
    'isPendente' => [
        [['isPendente', true]],
        0,
        collect(),
    ],
]);
