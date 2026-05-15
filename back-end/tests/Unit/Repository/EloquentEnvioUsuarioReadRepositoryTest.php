<?php

declare(strict_types=1);

use App\Models\Usuario;
use App\Repository\EnvioUsuario\Eloquent\EloquentEnvioUsuarioReadRepository;
use App\Repository\UnidadeRepository;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

uses(Tests\TestCase::class);

afterEach(function () {
    Mockery::close();
});

function usuarioComPermissaoTotal(): Usuario
{
    $user = Mockery::mock(Usuario::class);
    $user->shouldReceive('hasPermissionTo')->with('MOD_USER_TUDO')->andReturn(true);

    return $user;
}

/**
 * Monta o mock de {@see Builder} para a cadeia do repositório; só fixa o retorno de count e get.
 */
function preparaDbMockEnvioUsuario(int $count, Collection $rows): void
{
    DB::shouldReceive('raw')->never();

    $builder = Mockery::mock(Builder::class);
    $builder->shouldReceive('select')->andReturnSelf()->byDefault();
    $builder->shouldReceive('whereNull')->andReturnSelf()->byDefault();
    $builder->shouldReceive('whereNotNull')->andReturnSelf()->byDefault();
    $builder->shouldReceive('where')->andReturnSelf()->byDefault();
    $builder->shouldReceive('orderByDesc')->andReturnSelf()->byDefault();
    $builder->shouldReceive('orderBy')->andReturnSelf()->byDefault();
    $builder->shouldReceive('forPage')->andReturnSelf()->byDefault();

    $builder->shouldReceive('count')->once()->withNoArgs()->andReturn($count);
    $builder->shouldReceive('get')->once()->withNoArgs()->andReturn($rows);

    DB::shouldReceive('table')->once()->with('usuarios as u')->andReturn($builder);
}

test('query devolve count e rows conforme o builder', function (array $where, int $count, Collection $rows) {
    preparaDbMockEnvioUsuario($count, $rows);

    $unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $unidadeRepo->shouldReceive('getAreasTrabalhoWhereClause')->never();

    $repository = new EloquentEnvioUsuarioReadRepository($unidadeRepo);
    $result = $repository->query([
        'where' => $where,
        'page' => 1,
        'limit' => 10,
    ], usuarioComPermissaoTotal());

    expect($result['count'])->toBe($count);
    expect($result['rows']->count())->toBe($rows->count());

    if ($rows->isNotEmpty()) {
        expect($result['rows']->first())->toEqual($rows->first());
    }
})->with([
    'isFalha' => [
        [['isFalha', true]],
        1,
        collect([
            (object) [
                'id' => 'u-1',
                'cpf' => '123',
                'nome' => 'Nome',
                'matricula' => 'm1',
                'updated_at' => '2026-04-24 10:00:00',
                'data_agendamento_envio' => '2026-04-24 11:00:00',
                'data_tentativa_envio' => '2026-04-24 10:30:00',
                'data_conclusao_envio' => '2026-04-24 10:45:00',
                'data_envio_api_pgd' => '2026-04-24 10:40:00',
                'log_envio' => 'Erro',
            ],
        ]),
    ],
    'data_agendamento_envio_gte' => [
        [['data_agendamento_envio_gte', '2026-03-01']],
        0,
        collect(),
    ],
    'data_agendamento_envio_lte' => [
        [['data_agendamento_envio_lte', '2026-04-30']],
        0,
        collect(),
    ],
    'updated_at_gte' => [
        [['updated_at_gte', '2026-03-01']],
        0,
        collect(),
    ],
    'updated_at_lte' => [
        [['updated_at_lte', '2026-04-30']],
        0,
        collect(),
    ],
    'isNaoEnviado' => [
        [['isNaoEnviado', true]],
        0,
        collect(),
    ],
    'cpf' => [
        [['cpf', '123']],
        0,
        collect(),
    ],
]);
