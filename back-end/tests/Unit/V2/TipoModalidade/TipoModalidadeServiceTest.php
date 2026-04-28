<?php

use App\V2\TipoModalidade\TipoModalidadeService;
use Illuminate\Support\Collection;
use Tests\TestCase;

uses(TestCase::class);

describe('TipoModalidadeService::index', function () {
    test('retorna collection com opções de modalidade', function () {
        $service = new TipoModalidadeService();
        $result = $service->index();

        expect($result)->toBeInstanceOf(Collection::class)
            ->and($result)->not->toBeEmpty();
    });

    test('cada opção possui key e value', function () {
        $service = new TipoModalidadeService();
        $result = $service->index();

        expect($result->first())->toHaveKeys(['key', 'value']);
    });
});
