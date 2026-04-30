<?php

declare(strict_types=1);

use App\Models\Usuario;
use App\Repository\EnvioUsuario\Eloquent\EloquentEnvioUsuarioReadRepository;
use App\Repository\UnidadeRepository;
use Illuminate\Support\Facades\DB;

uses(Tests\TestCase::class);

afterEach(function () {
    Mockery::close();
});

function makeRequestUsuario(): Usuario
{
    $user = Mockery::mock(Usuario::class);
    $user->shouldReceive('hasPermissionTo')->andReturn(true);

    return $user;
}

test('query aplica filtro isFalha', function () {
    $unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $unidadeRepo->shouldReceive('getAreasTrabalhoWhereClause')->never();

    $user = makeRequestUsuario();

    DB::shouldReceive('select')
        ->once()
        ->withArgs(function (string $sql, array $params): bool {
            return str_contains($sql, 'COUNT(*) AS total')
                && str_contains($sql, 'u.data_agendamento_envio IS NOT NULL')
                && str_contains($sql, 'u.log_envio IS NOT NULL')
                && str_contains($sql, "u.log_envio <> 'Envio realizado com sucesso.'")
                && $params === [];
        })
        ->andReturn([(object) ['total' => 1]]);

    DB::shouldReceive('select')
        ->once()
        ->withArgs(function (string $sql, array $params): bool {
            return str_contains($sql, 'ORDER BY u.data_agendamento_envio DESC, u.id ASC')
                && str_contains($sql, 'LIMIT 10 OFFSET 0')
                && $params === [];
        })
        ->andReturn([
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
        ]);

    $repository = new EloquentEnvioUsuarioReadRepository($unidadeRepo);

    $result = $repository->query([
        'where' => [['isFalha', true]],
        'page' => 1,
        'limit' => 10,
    ], $user);

    expect($result['count'])->toBe(1);
    expect($result['rows'])->toHaveCount(1);
    expect($result['rows']->first()->nome)->toBe('Nome');
});

test('query aplica data_agendamento_envio_gte com parametro', function () {
    $unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $unidadeRepo->shouldReceive('getAreasTrabalhoWhereClause')->never();
    $user = makeRequestUsuario();
    $esperado = ['2026-03-01'];

    DB::shouldReceive('select')
        ->once()
        ->withArgs(function (string $sql, array $params) use ($esperado): bool {
            return str_contains($sql, 'COUNT(*) AS total')
                && str_contains($sql, 'u.data_agendamento_envio >= ?')
                && $params === $esperado;
        })
        ->andReturn([(object) ['total' => 0]]);

    DB::shouldReceive('select')
        ->once()
        ->withArgs(function (string $sql, array $params) use ($esperado): bool {
            return str_contains($sql, 'ORDER BY u.data_agendamento_envio DESC')
                && $params === $esperado;
        })
        ->andReturn([]);

    $repository = new EloquentEnvioUsuarioReadRepository($unidadeRepo);
    $repository->query([
        'where' => [['data_agendamento_envio_gte', '2026-03-01']],
        'page' => 1,
        'limit' => 10,
    ], $user);
});

test('query aplica data_agendamento_envio_lte somando um dia ao limite exclusivo', function () {
    $unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $unidadeRepo->shouldReceive('getAreasTrabalhoWhereClause')->never();
    $user = makeRequestUsuario();
    $esperado = ['2026-05-01'];

    DB::shouldReceive('select')
        ->once()
        ->withArgs(function (string $sql, array $params) use ($esperado): bool {
            return str_contains($sql, 'COUNT(*) AS total')
                && str_contains($sql, 'u.data_agendamento_envio < ?')
                && $params === $esperado;
        })
        ->andReturn([(object) ['total' => 0]]);

    DB::shouldReceive('select')
        ->once()
        ->withArgs(function (string $sql, array $params) use ($esperado): bool {
            return str_contains($sql, 'ORDER BY u.data_agendamento_envio DESC')
                && $params === $esperado;
        })
        ->andReturn([]);

    $repository = new EloquentEnvioUsuarioReadRepository($unidadeRepo);
    $repository->query([
        'where' => [['data_agendamento_envio_lte', '2026-04-30']],
        'page' => 1,
        'limit' => 10,
    ], $user);
});

test('query aplica isNaoEnviado sem parametros adicionais', function () {
    $unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $unidadeRepo->shouldReceive('getAreasTrabalhoWhereClause')->never();
    $user = makeRequestUsuario();

    DB::shouldReceive('select')
        ->once()
        ->withArgs(function (string $sql, array $params): bool {
            return str_contains($sql, 'COUNT(*) AS total')
                && str_contains($sql, 'u.data_envio_api_pgd IS NULL')
                && $params === [];
        })
        ->andReturn([(object) ['total' => 0]]);

    DB::shouldReceive('select')
        ->once()
        ->withArgs(function (string $sql, array $params): bool {
            return str_contains($sql, 'ORDER BY u.data_agendamento_envio DESC')
                && $params === [];
        })
        ->andReturn([]);

    $repository = new EloquentEnvioUsuarioReadRepository($unidadeRepo);
    $repository->query([
        'where' => [['isNaoEnviado', true]],
        'page' => 1,
        'limit' => 10,
    ], $user);
});

test('query aplica cpf com like e parametros', function () {
    $unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $unidadeRepo->shouldReceive('getAreasTrabalhoWhereClause')->never();
    $user = makeRequestUsuario();
    $esperado = ['%123%'];

    DB::shouldReceive('select')
        ->once()
        ->withArgs(function (string $sql, array $params) use ($esperado): bool {
            return str_contains($sql, 'COUNT(*) AS total')
                && str_contains($sql, 'u.cpf LIKE ?')
                && $params === $esperado;
        })
        ->andReturn([(object) ['total' => 0]]);

    DB::shouldReceive('select')
        ->once()
        ->withArgs(function (string $sql, array $params) use ($esperado): bool {
            return str_contains($sql, 'ORDER BY u.data_agendamento_envio DESC')
                && $params === $esperado;
        })
        ->andReturn([]);

    $repository = new EloquentEnvioUsuarioReadRepository($unidadeRepo);
    $repository->query([
        'where' => [['cpf', '123']],
        'page' => 1,
        'limit' => 10,
    ], $user);
});
