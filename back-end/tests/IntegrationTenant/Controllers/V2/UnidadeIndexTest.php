<?php

use App\Models\Unidade;
use App\V2\Unidade\DTOs\UnidadeIndexDTO;

beforeEach(function () {
    Unidade::factory()->count(5)->create();
});

describe('UnidadeIndexDTO', function () {

    test('fromRequest com valores padrão', function () {
        $dto = UnidadeIndexDTO::fromRequest([]);

        expect($dto->termo)->toBeNull();
        expect($dto->page)->toBe(1);
        expect($dto->perPage)->toBe(20);
    });

    test('fromRequest com todos os campos', function () {
        $dto = UnidadeIndexDTO::fromRequest([
            'page' => 2,
            'size' => 10,
            'filters' => ['termo' => 'MGI'],
        ]);

        expect($dto->termo)->toBe('MGI');
        expect($dto->page)->toBe(2);
        expect($dto->perPage)->toBe(10);
    });
});

describe('Unidade index - paginação', function () {

    test('retorna LengthAwarePaginator com dados corretos', function () {
        $dto = new UnidadeIndexDTO(termo: null, page: 1, perPage: 3);
        $repository = app(\App\Repository\UnidadeRepository::class);

        $result = $repository->index($dto);

        expect($result)->toBeInstanceOf(\Illuminate\Pagination\LengthAwarePaginator::class);
        expect($result->count())->toBe(3);
        expect($result->total())->toBeGreaterThanOrEqual(5);
    });

    test('segunda página retorna itens diferentes', function () {
        $dto1 = new UnidadeIndexDTO(termo: null, page: 1, perPage: 3);
        $dto2 = new UnidadeIndexDTO(termo: null, page: 2, perPage: 3);
        $repository = app(\App\Repository\UnidadeRepository::class);

        $page1 = $repository->index($dto1);
        $page2 = $repository->index($dto2);

        $idsPage1 = $page1->pluck('id')->toArray();
        $idsPage2 = $page2->pluck('id')->toArray();

        expect(array_intersect($idsPage1, $idsPage2))->toBeEmpty();
    });

    test('ordena por sigla ASC', function () {
        $dto = new UnidadeIndexDTO(termo: null, page: 1, perPage: 100);
        $repository = app(\App\Repository\UnidadeRepository::class);

        $result = $repository->index($dto);
        $siglas = $result->pluck('sigla')->toArray();

        $ordenadas = $siglas;
        sort($ordenadas, SORT_STRING | SORT_FLAG_CASE);

        expect($siglas)->toBe($ordenadas);
    });

    test('retorna apenas id, nome, codigo, sigla', function () {
        $dto = new UnidadeIndexDTO(termo: null, page: 1, perPage: 1);
        $repository = app(\App\Repository\UnidadeRepository::class);

        $result = $repository->index($dto);
        $item = $result->first();

        expect($item->id)->not->toBeNull();
        expect($item->nome)->not->toBeNull();
        expect($item->sigla)->not->toBeNull();
    });
});

describe('Unidade index - filtro por termo', function () {

    test('filtra por sigla', function () {
        $unidade = Unidade::factory()->create(['sigla' => 'XPTO_UNICA']);

        $dto = new UnidadeIndexDTO(termo: 'XPTO_UNICA', page: 1, perPage: 20);
        $repository = app(\App\Repository\UnidadeRepository::class);

        $result = $repository->index($dto);

        expect($result->total())->toBe(1);
        expect($result->first()->id)->toBe($unidade->id);
    });

    test('filtra por nome', function () {
        $unidade = Unidade::factory()->create(['nome' => 'Unidade Específica Teste']);

        $dto = new UnidadeIndexDTO(termo: 'Específica Teste', page: 1, perPage: 20);
        $repository = app(\App\Repository\UnidadeRepository::class);

        $result = $repository->index($dto);

        expect($result->total())->toBe(1);
        expect($result->first()->id)->toBe($unidade->id);
    });

    test('filtra por codigo', function () {
        $unidade = Unidade::factory()->create(['codigo' => '999888777']);

        $dto = new UnidadeIndexDTO(termo: '999888777', page: 1, perPage: 20);
        $repository = app(\App\Repository\UnidadeRepository::class);

        $result = $repository->index($dto);

        expect($result->total())->toBe(1);
        expect($result->first()->id)->toBe($unidade->id);
    });

    test('busca é case-insensitive', function () {
        $unidade = Unidade::factory()->create(['sigla' => 'CaSe_TeSt']);

        $dto = new UnidadeIndexDTO(termo: 'case_test', page: 1, perPage: 20);
        $repository = app(\App\Repository\UnidadeRepository::class);

        $result = $repository->index($dto);

        expect($result->total())->toBe(1);
    });

    test('sem termo retorna todas paginadas', function () {
        $dto = new UnidadeIndexDTO(termo: null, page: 1, perPage: 20);
        $repository = app(\App\Repository\UnidadeRepository::class);

        $result = $repository->index($dto);

        expect($result->total())->toBeGreaterThanOrEqual(5);
    });

    test('exclui unidades soft-deleted', function () {
        $unidade = Unidade::factory()->create(['sigla' => 'DELETADA_XYZ']);
        $unidade->delete();

        $dto = new UnidadeIndexDTO(termo: 'DELETADA_XYZ', page: 1, perPage: 20);
        $repository = app(\App\Repository\UnidadeRepository::class);

        $result = $repository->index($dto);

        expect($result->total())->toBe(0);
    });
});
