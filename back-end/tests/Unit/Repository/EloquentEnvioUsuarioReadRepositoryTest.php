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

test('query aplica filtro envio_com_falha quando usuario tem MOD_USER_TUDO', function () {
    $unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $unidadeRepo->shouldReceive('getAreasTrabalhoWhereClause')->never();

    $user = Mockery::mock(Usuario::class);
    $user->shouldReceive('hasPermissionTo')
        ->with('MOD_USER_TUDO')
        ->andReturn(true);

    DB::shouldReceive('select')
        ->once()
        ->withArgs(function (string $sql, array $params): bool {
            return str_contains($sql, 'COUNT(*) AS total')
                && str_contains($sql, 'u.data_agendamento_envio IS NOT NULL')
                && str_contains($sql, "u.log_envio <> 'Envio realizado com sucesso.'")
                && !str_contains($sql, 'EXISTS (SELECT where_lotacoes')
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
        'where' => [['envio_com_falha', '==', 1]],
        'page' => 1,
        'limit' => 10,
    ], $user);

    expect($result['count'])->toBe(1);
    expect($result['rows'])->toHaveCount(1);
    expect($result['rows']->first()->nome)->toBe('Nome');
});
