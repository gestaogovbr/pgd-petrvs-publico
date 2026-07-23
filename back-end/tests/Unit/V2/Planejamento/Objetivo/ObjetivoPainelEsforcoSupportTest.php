<?php

use App\V2\Planejamento\Objetivo\ObjetivoPainelEsforcoSupport;
use Tests\TestCase;

uses(TestCase::class);

describe('ObjetivoPainelEsforcoSupport::visibilidadeEsforco', function () {

    test('PE aguardando homologação exibe apenas esforço disponível', function () {
        $vis = ObjetivoPainelEsforcoSupport::visibilidadeEsforco('HOMOLOGANDO', true, true);

        expect($vis['mostrar_disponivel'])->toBeTrue()
            ->and($vis['mostrar_planejado'])->toBeFalse()
            ->and($vis['mostrar_executado'])->toBeFalse();
    });

    test('PE em execução com PT pactuado exibe disponível e planejado', function () {
        $vis = ObjetivoPainelEsforcoSupport::visibilidadeEsforco('ATIVO', true, false);

        expect($vis['mostrar_disponivel'])->toBeTrue()
            ->and($vis['mostrar_planejado'])->toBeTrue()
            ->and($vis['mostrar_executado'])->toBeFalse();
    });

    test('PE em execução com PT concluído exibe executado', function () {
        $vis = ObjetivoPainelEsforcoSupport::visibilidadeEsforco('ATIVO', true, true);

        expect($vis['mostrar_disponivel'])->toBeTrue()
            ->and($vis['mostrar_planejado'])->toBeTrue()
            ->and($vis['mostrar_executado'])->toBeTrue();
    });

    test('PE concluído exibe todos os tipos de esforço', function () {
        $vis = ObjetivoPainelEsforcoSupport::visibilidadeEsforco('CONCLUIDO', false, false);

        expect($vis['mostrar_disponivel'])->toBeTrue()
            ->and($vis['mostrar_planejado'])->toBeFalse()
            ->and($vis['mostrar_executado'])->toBeTrue();
    });
});

describe('ObjetivoPainelEsforcoSupport::percentual', function () {

    test('calcula percentual com duas casas decimais', function () {
        expect(ObjetivoPainelEsforcoSupport::percentual(25, 100))->toBe(25.0)
            ->and(ObjetivoPainelEsforcoSupport::percentual(1, 3))->toBe(33.33);
    });

    test('retorna zero quando total é zero ou negativo', function () {
        expect(ObjetivoPainelEsforcoSupport::percentual(10, 0))->toBe(0.0)
            ->and(ObjetivoPainelEsforcoSupport::percentual(10, -5))->toBe(0.0);
    });
});
