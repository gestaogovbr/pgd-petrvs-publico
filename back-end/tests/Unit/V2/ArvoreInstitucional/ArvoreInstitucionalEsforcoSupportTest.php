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

    test('PE em execução com execução registrada em período avaliativo exibe executado', function () {
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

describe('ArvoreInstitucionalEsforcoSupport::esforcoExecutado (por período avaliativo)', function () {

    test('esforcoExecutadoHorasSql multiplica a CH diária pelo fator de horas do join', function () {
        $sql = ArvoreInstitucionalEsforcoSupport::esforcoExecutadoHorasSql();

        expect($sql)->toContain('pte_exec.fator_horas')
            ->and($sql)->toContain('pt.carga_horaria');
    });

    test('esforcoExecutadoPteJoinSql soma esforco × dias úteis do PA, só de PAs a partir de Aguardando Avaliação', function () {
        $join = ArvoreInstitucionalEsforcoSupport::esforcoExecutadoPteJoinSql();

        expect($join)->toContain('planos_trabalhos_consolidacoes_contribuicoes')
            ->and($join)->toContain('planos_trabalhos_consolidacoes')
            ->and($join)->toContain('SUM((ptcc.esforco_executado / 100.0)')
            ->and($join)->toContain('ptcc.registrado_at IS NOT NULL')
            ->and($join)->toContain('ptcc.deleted_at IS NULL')
            ->and($join)->toContain("ptc.status IN ('CONCLUIDO','AVALIADO')")
            ->and($join)->toContain('GROUP BY ptcc.plano_trabalho_entrega_id')
            ->and($join)->toContain('fator_horas');
    });
});
