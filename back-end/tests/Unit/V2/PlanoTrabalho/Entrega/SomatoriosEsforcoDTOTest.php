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

    test('exige justificativa quando planejado ou executado difere de 100%', function () {
        expect((new SomatoriosEsforcoDTO(100.0, 100.0))->exigeJustificativaCargaHoraria())->toBeFalse();
        expect((new SomatoriosEsforcoDTO(80.0, 100.0))->exigeJustificativaCargaHoraria())->toBeTrue();
        expect((new SomatoriosEsforcoDTO(100.0, 180.0))->exigeJustificativaCargaHoraria())->toBeTrue();
    });
});
