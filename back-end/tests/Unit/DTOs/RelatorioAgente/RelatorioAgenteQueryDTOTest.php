<?php

declare(strict_types=1);

use App\DTOs\RelatorioAgente\RelatorioAgenteFiltersDTO;
use App\DTOs\RelatorioAgente\RelatorioAgenteQueryDTO;

test('filters dto mapeia where da interface para campos tipados', function () {
    $filters = RelatorioAgenteFiltersDTO::fromWhere([
        ['unidade_id', '==', 'u-1'],
        ['incluir_unidades_subordinadas', '==', 1],
        ['nome', 'like', '%Ana%'],
        ['unidadeHierarquia', 'like', '%DG%'],
        ['matricula', 'like', '%123%'],
        ['situacao', '==', 'ATIVO'],
        ['participantePGD', '==', 'SIM'],
        ['programaNome', 'like', '%PGD%'],
        ['modalidade_pgd', '==', 'TELETRABALHO'],
        ['modalidadeSouGov', '==', 'PRESENCIAL'],
        ['comparacaoSouGovPetrvs', '==', 'IGUAL'],
        ['tipo_pedagio', '==', '1'],
        ['data_inicial_pedagio', '==', '2026-01-01'],
        ['data_final_pedagio', '==', '2026-01-31'],
        ['dispensa_plano_trabalho', '==', 'SIM'],
        ['data_inicio_dispensa_pt', '==', '2026-02-01'],
        ['data_fim_dispensa_pt', '==', '2026-02-28'],
        ['atribuicao', '==', 'LOTADO'],
        ['plano_entrega_entrega_id', '==', 'pe-1'],
        ['somente_vigentes', '==', 1],
    ]);

    expect($filters->unidadeId)->toBe('u-1')
        ->and($filters->incluirUnidadesSubordinadas)->toBeTrue()
        ->and($filters->nome)->toBe('Ana')
        ->and($filters->unidadeHierarquia)->toBe('DG')
        ->and($filters->matricula)->toBe('123')
        ->and($filters->situacao)->toBe('ATIVO')
        ->and($filters->participantePgd)->toBe('SIM')
        ->and($filters->programaNome)->toBe('PGD')
        ->and($filters->modalidadePgd)->toBe('TELETRABALHO')
        ->and($filters->modalidadeSouGov)->toBe('PRESENCIAL')
        ->and($filters->comparacaoSouGovPetrvs)->toBe('IGUAL')
        ->and($filters->tipoPedagio)->toBe('1')
        ->and($filters->dataInicialPedagio)->toBe('2026-01-01')
        ->and($filters->dataFinalPedagio)->toBe('2026-01-31')
        ->and($filters->dispensaPlanoTrabalho)->toBe('SIM')
        ->and($filters->dataInicioDispensaPt)->toBe('2026-02-01')
        ->and($filters->dataFimDispensaPt)->toBe('2026-02-28')
        ->and($filters->atribuicao)->toBe('LOTADO')
        ->and($filters->planoEntregaEntregaId)->toBe('pe-1')
        ->and($filters->somenteVigentes)->toBeTrue();
});

test('filters dto reconverte campos tipados para where legado', function () {
    $filters = new RelatorioAgenteFiltersDTO(
        unidadeId: 'u-1',
        incluirUnidadesSubordinadas: true,
        nome: 'Ana',
        matricula: '123',
        situacao: 'ATIVO',
    );

    expect($filters->toWhereArray())->toBe([
        ['unidade_id', '==', 'u-1'],
        ['incluir_unidades_subordinadas', '==', 1],
        ['nome', 'like', '%Ana%'],
        ['matricula', 'like', '%123%'],
        ['situacao', '==', 'ATIVO'],
    ]);
});

test('filters dto restringe ao usuário removendo filtros de unidade', function () {
    $filters = new RelatorioAgenteFiltersDTO(
        unidadeId: 'u-1',
        incluirUnidadesSubordinadas: true,
        nome: 'Ana',
    );

    $restrito = $filters->restritoAoUsuario('user-9');

    expect($restrito->unidadeId)->toBeNull()
        ->and($restrito->incluirUnidadesSubordinadas)->toBeFalse()
        ->and($restrito->usuarioId)->toBe('user-9')
        ->and($restrito->nome)->toBe('Ana')
        ->and($restrito->toWhereArray())->toBe([
            ['usuario_id', '==', 'user-9'],
            ['nome', 'like', '%Ana%'],
        ]);
});

test('query dto não expõe where genérico e monta query array tipado', function () {
    $dto = RelatorioAgenteQueryDTO::fromValidatedRequest([
        'where' => [
            ['unidade_id', '==', 'u-1'],
            ['nome', 'like', '%Ana%'],
        ],
        'orderBy' => [['nome', 'asc']],
        'page' => 2,
        'limit' => 50,
    ]);

    expect($dto->filters->unidadeId)->toBe('u-1')
        ->and($dto->filters->nome)->toBe('Ana')
        ->and($dto->orderBy)->toBe([['nome', 'asc']])
        ->and($dto->page)->toBe(2)
        ->and($dto->limit)->toBe(50)
        ->and($dto->toQueryArray())->toBe([
            'where' => [
                ['unidade_id', '==', 'u-1'],
                ['nome', 'like', '%Ana%'],
            ],
            'orderBy' => [['nome', 'asc']],
            'page' => 2,
            'limit' => 50,
            'deleted' => null,
        ]);
});

test('query dto withFilters preserva paginação e ordenação', function () {
    $dto = new RelatorioAgenteQueryDTO(
        filters: new RelatorioAgenteFiltersDTO(unidadeId: 'u-1'),
        orderBy: [['nome', 'asc']],
        page: 1,
        limit: 10,
    );

    $atualizado = $dto->withFilters(
        $dto->filters->restritoAoUsuario('user-1')
    );

    expect($atualizado->filters->usuarioId)->toBe('user-1')
        ->and($atualizado->filters->unidadeId)->toBeNull()
        ->and($atualizado->orderBy)->toBe([['nome', 'asc']])
        ->and($atualizado->page)->toBe(1)
        ->and($atualizado->limit)->toBe(10);
});
