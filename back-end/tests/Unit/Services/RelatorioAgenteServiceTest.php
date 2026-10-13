<?php

declare(strict_types=1);

use App\DTOs\RelatorioAgente\RelatorioAgenteFiltersDTO;
use App\DTOs\RelatorioAgente\RelatorioAgenteQueryDTO;
use App\Enums\StatusEnum;
use App\Models\Usuario;
use App\Repository\RelatorioAgenteRepository;
use App\Services\RelatorioAgenteService;

afterEach(function () {
    Mockery::close();
});

test('query consulta o repositório e enriquece as linhas', function () {
    $row = (object) [
        'tipo_pedagio' => '1',
        'perfil' => 'Perfil Unidade',
        'plano_trabalho_status' => StatusEnum::ATIVO->value,
    ];

    $dto = new RelatorioAgenteQueryDTO(
        filters: RelatorioAgenteFiltersDTO::fromArray(['unidade_id' => 'u-1']),
        orderBy: [['nome', 'asc']],
        page: 1,
        limit: 10,
    );

    $repository = Mockery::mock(RelatorioAgenteRepository::class);
    $repository->shouldReceive('query')
        ->once()
        ->with(Mockery::on(function (RelatorioAgenteQueryDTO $received) use ($dto): bool {
            return $received->filters->unidadeId === $dto->filters->unidadeId
                && $received->page === 1
                && $received->limit === 10;
        }))
        ->andReturn([
            'count' => 1,
            'rows' => collect([$row]),
        ]);

    $service = new RelatorioAgenteService($repository);
    $result = $service->query($dto);

    expect($result['count'])->toBe(1)
        ->and($result['rows'])->toHaveCount(1)
        ->and($result['rows'][0]->tipoPedagio)->toBe(Usuario::getTiposIndisponibilidades()['1'])
        ->and($result['rows'][0]->perfil)->toBe('Unidade')
        ->and($result['rows'][0]->plano_trabalho_status_label)->toBe(StatusEnum::ATIVO->label());
});

test('queryForExport normaliza página e limite e reutiliza o total conhecido', function () {
    $repository = Mockery::mock(RelatorioAgenteRepository::class);
    $repository->shouldReceive('query')
        ->once()
        ->with(Mockery::on(function (RelatorioAgenteQueryDTO $dto): bool {
            return $dto->filters->nome === 'Ana'
                && $dto->page === 1
                && $dto->limit === 1000;
        }))
        ->andReturn([
            'count' => 50,
            'rows' => collect([
                (object) [
                    'tipo_pedagio' => null,
                    'perfil' => null,
                    'plano_trabalho_status' => null,
                ],
            ]),
        ]);

    $service = new RelatorioAgenteService($repository);
    $result = $service->queryForExport([
        'page' => 0,
        'filters' => ['nome' => 'Ana'],
    ], 999);

    expect($result['count'])->toBe(999)
        ->and($result['rows'])->toHaveCount(1)
        ->and($result['rows'][0]->tipoPedagio)->toBe('-')
        ->and($result['rows'][0]->perfil)->toBe('')
        ->and($result['rows'][0]->plano_trabalho_status_label)->toBe('-');
});

test('queryForExport preserva o count do repositório quando knownCount é nulo', function () {
    $repository = Mockery::mock(RelatorioAgenteRepository::class);
    $repository->shouldReceive('query')
        ->once()
        ->with(Mockery::on(function (RelatorioAgenteQueryDTO $dto): bool {
            return $dto->page === 2
                && $dto->limit === 100
                && $dto->orderBy === [['nome', 'asc']];
        }))
        ->andReturn([
            'count' => 42,
            'rows' => collect([]),
        ]);

    $service = new RelatorioAgenteService($repository);
    $result = $service->queryForExport([
        'page' => 2,
        'limit' => 100,
        'orderBy' => [['nome', 'asc']],
    ]);

    expect($result['count'])->toBe(42)
        ->and($result['rows'])->toHaveCount(0);
});
