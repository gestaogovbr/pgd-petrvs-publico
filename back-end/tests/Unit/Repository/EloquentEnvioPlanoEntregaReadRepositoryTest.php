<?php

declare(strict_types=1);

use App\Repository\EnvioPlanoEntrega\Eloquent\EloquentEnvioPlanoEntregaReadRepository;
use Illuminate\Support\Facades\DB;

uses(Tests\TestCase::class);

afterEach(function () {
    Mockery::close();
});

test('query aplica filtro envio_com_falha e retorna rows com unidade e programa', function () {
    DB::shouldReceive('select')
        ->once()
        ->withArgs(function (string $sql, array $params): bool {
            return str_contains($sql, 'COUNT(*) AS total')
                && str_contains($sql, 'pe.data_agendamento_envio IS NOT NULL')
                && str_contains($sql, "pe.log_envio <> 'Envio realizado com sucesso.'")
                && $params === [];
        })
        ->andReturn([(object) ['total' => 1]]);

    DB::shouldReceive('select')
        ->once()
        ->withArgs(function (string $sql, array $params): bool {
            return str_contains($sql, 'ORDER BY pe.data_agendamento_envio DESC, pe.id ASC')
                && str_contains($sql, 'LIMIT 10 OFFSET 0')
                && $params === [];
        })
        ->andReturn([
            (object) [
                'id' => 'pe-1',
                'numero' => 1,
                'nome' => 'Plano 1',
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
        ]);

    $repository = new EloquentEnvioPlanoEntregaReadRepository();

    $result = $repository->query([
        'where' => [['envio_com_falha', '==', 1]],
        'page' => 1,
        'limit' => 10,
    ]);

    expect($result['count'])->toBe(1);
    expect($result['rows'])->toHaveCount(1);
    expect($result['rows']->first()->unidade->sigla)->toBe('U1');
    expect($result['rows']->first()->programa->nome)->toBe('Programa 1');
});
