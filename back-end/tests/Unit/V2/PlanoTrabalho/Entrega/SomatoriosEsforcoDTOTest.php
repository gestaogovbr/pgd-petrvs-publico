<?php

use App\V2\PlanoTrabalho\Entrega\DTOs\SomatoriosEsforcoDTO;
use Tests\TestCase;

uses(TestCase::class);

describe('SomatoriosEsforcoDTO', function () {

    test('considera somatórios iguais com tolerância de centésimos', function () {
        $dto = new SomatoriosEsforcoDTO(100.0, 100.0);
        expect($dto->planejadoIgualExecutado())->toBeTrue();

        $dtoQuase = new SomatoriosEsforcoDTO(100.0, 99.995);
        expect($dtoQuase->planejadoIgualExecutado())->toBeTrue();

        $dtoDiferente = new SomatoriosEsforcoDTO(100.0, 90.0);
        expect($dtoDiferente->planejadoIgualExecutado())->toBeFalse();
    });
});
