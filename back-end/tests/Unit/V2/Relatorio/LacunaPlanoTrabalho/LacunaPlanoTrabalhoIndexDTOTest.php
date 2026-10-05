<?php

declare(strict_types=1);

use App\V2\Relatorio\LacunaPlanoTrabalho\DTOs\LacunaPlanoTrabalhoIndexDTO;
use App\V2\Relatorio\LacunaPlanoTrabalho\DTOs\LacunaPlanoTrabalhoIndexFiltersDTO;

test('IndexFiltersDTO normaliza filtros e monta payload sem where', function () {
    $filters = LacunaPlanoTrabalhoIndexFiltersDTO::fromArray([
        'unidade_id' => 'u-1',
        'periodo_inicio' => '2024-01-01T00:00:00',
        'periodo_fim' => '2024-01-31T23:59:59',
        'incluir_unidades_subordinadas' => '1',
        'nome' => '  Ana  ',
        'matricula' => '',
        'unidadeHierarquia' => 'DIR',
        'quantidade_dias' => '5',
    ]);

    expect($filters->unidadeId)->toBe('u-1')
        ->and($filters->periodoInicio)->toBe('2024-01-01')
        ->and($filters->periodoFim)->toBe('2024-01-31')
        ->and($filters->incluirUnidadesSubordinadas)->toBeTrue()
        ->and($filters->nome)->toBe('Ana')
        ->and($filters->matricula)->toBeNull()
        ->and($filters->unidadeHierarquia)->toBe('DIR')
        ->and($filters->quantidadeDias)->toBe(5)
        ->and($filters->toArray())->toMatchArray([
            'unidade_id' => 'u-1',
            'periodo_inicio' => '2024-01-01',
            'periodo_fim' => '2024-01-31',
            'incluir_unidades_subordinadas' => true,
            'nome' => 'Ana',
            'matricula' => null,
            'unidadeHierarquia' => 'DIR',
            'quantidade_dias' => 5,
        ]);
});

test('IndexDTO toQueryPayload usa filters e pagina', function () {
    $dto = LacunaPlanoTrabalhoIndexDTO::fromValidatedRequest([
        'page' => 2,
        'filters' => [
            'unidade_id' => 'u-1',
            'periodo_inicio' => '2024-01-01',
            'periodo_fim' => '2024-01-31',
        ],
    ]);

    $payload = $dto->toQueryPayload();

    expect($payload)->toHaveKeys(['page', 'limit', 'filters'])
        ->and($payload)->not->toHaveKey('where')
        ->and($payload['page'])->toBe(2)
        ->and($payload['limit'])->toBe(LacunaPlanoTrabalhoIndexDTO::PAGE_SIZE)
        ->and($payload['filters']['unidade_id'])->toBe('u-1');
});

test('IndexDTO export desliga paginação', function () {
    $dto = LacunaPlanoTrabalhoIndexDTO::fromValidatedRequest([
        'page' => 3,
        'filters' => [
            'unidade_id' => 'u-1',
            'periodo_inicio' => '2024-01-01',
            'periodo_fim' => '2024-01-31',
        ],
    ], paginate: false);

    $payload = $dto->toQueryPayload();

    expect($payload['page'])->toBe(1)
        ->and($payload['limit'])->toBe(0);
});
