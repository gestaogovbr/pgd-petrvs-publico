<?php

use App\V2\ArvoreInstitucional\ArvoreInstitucionalEsforcoSupport;
use Tests\TestCase;

uses(TestCase::class);

describe('ArvoreInstitucionalEsforcoSupport::visibilidadeEsforco', function () {

    test('PE aguardando homologação exibe apenas esforço disponível', function () {
        $vis = ArvoreInstitucionalEsforcoSupport::visibilidadeEsforco('HOMOLOGANDO', true, true);

        expect($vis['mostrar_disponivel'])->toBeTrue()
            ->and($vis['mostrar_planejado'])->toBeFalse()
            ->and($vis['mostrar_executado'])->toBeFalse();
    });

    test('PE em execução com PT pactuado exibe disponível e planejado', function () {
        $vis = ArvoreInstitucionalEsforcoSupport::visibilidadeEsforco('ATIVO', true, false);

        expect($vis['mostrar_disponivel'])->toBeTrue()
            ->and($vis['mostrar_planejado'])->toBeTrue()
            ->and($vis['mostrar_executado'])->toBeFalse();
    });

    test('PE em execução com PT concluído exibe executado', function () {
        $vis = ArvoreInstitucionalEsforcoSupport::visibilidadeEsforco('ATIVO', true, true);

        expect($vis['mostrar_disponivel'])->toBeTrue()
            ->and($vis['mostrar_planejado'])->toBeTrue()
            ->and($vis['mostrar_executado'])->toBeTrue();
    });

    test('PE concluído exibe todos os tipos de esforço', function () {
        $vis = ArvoreInstitucionalEsforcoSupport::visibilidadeEsforco('CONCLUIDO', false, false);

        expect($vis['mostrar_disponivel'])->toBeTrue()
            ->and($vis['mostrar_planejado'])->toBeFalse()
            ->and($vis['mostrar_executado'])->toBeTrue();
    });
});

describe('ArvoreInstitucionalEsforcoSupport::percentual', function () {

    test('calcula percentual com duas casas decimais', function () {
        expect(ArvoreInstitucionalEsforcoSupport::percentual(25, 100))->toBe(25.0)
            ->and(ArvoreInstitucionalEsforcoSupport::percentual(1, 3))->toBe(33.33);
    });

    test('retorna zero quando total é zero ou negativo', function () {
        expect(ArvoreInstitucionalEsforcoSupport::percentual(10, 0))->toBe(0.0)
            ->and(ArvoreInstitucionalEsforcoSupport::percentual(10, -5))->toBe(0.0);
    });
});
