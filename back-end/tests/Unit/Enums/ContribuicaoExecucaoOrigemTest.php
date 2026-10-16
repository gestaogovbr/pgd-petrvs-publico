<?php

use App\Enums\ContribuicaoExecucaoOrigem;

describe('ContribuicaoExecucaoOrigem', function () {
    test('mantém os valores esperados', function () {
        expect(ContribuicaoExecucaoOrigem::PROPRIA_UNIDADE->value)->toBe('PROPRIA_UNIDADE');
        expect(ContribuicaoExecucaoOrigem::OUTRA_UNIDADE->value)->toBe('OUTRA_UNIDADE');
        expect(ContribuicaoExecucaoOrigem::OUTRO_ORGAO->value)->toBe('OUTRO_ORGAO');
        expect(ContribuicaoExecucaoOrigem::SEM_ENTREGA->value)->toBe('SEM_ENTREGA');
    });

    test('isVinculadaAEntrega é verdadeiro apenas para unidades', function () {
        expect(ContribuicaoExecucaoOrigem::PROPRIA_UNIDADE->isVinculadaAEntrega())->toBeTrue();
        expect(ContribuicaoExecucaoOrigem::OUTRA_UNIDADE->isVinculadaAEntrega())->toBeTrue();
        expect(ContribuicaoExecucaoOrigem::OUTRO_ORGAO->isVinculadaAEntrega())->toBeFalse();
        expect(ContribuicaoExecucaoOrigem::SEM_ENTREGA->isVinculadaAEntrega())->toBeFalse();
    });

    test('exigeOrgao é verdadeiro apenas para outro órgão', function () {
        expect(ContribuicaoExecucaoOrigem::OUTRO_ORGAO->exigeOrgao())->toBeTrue();
        expect(ContribuicaoExecucaoOrigem::PROPRIA_UNIDADE->exigeOrgao())->toBeFalse();
        expect(ContribuicaoExecucaoOrigem::OUTRA_UNIDADE->exigeOrgao())->toBeFalse();
        expect(ContribuicaoExecucaoOrigem::SEM_ENTREGA->exigeOrgao())->toBeFalse();
    });

    test('values retorna todos os valores do enum', function () {
        expect(ContribuicaoExecucaoOrigem::values())->toBe([
            'PROPRIA_UNIDADE',
            'OUTRA_UNIDADE',
            'OUTRO_ORGAO',
            'SEM_ENTREGA',
        ]);
    });
});
