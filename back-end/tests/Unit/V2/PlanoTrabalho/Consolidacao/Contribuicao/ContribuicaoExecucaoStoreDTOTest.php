<?php

use App\V2\PlanoTrabalho\Consolidacao\Contribuicao\DTOs\ContribuicaoExecucaoStoreDTO;
use Tests\TestCase;

uses(TestCase::class);

describe('ContribuicaoExecucaoStoreDTO', function () {

    test('mapeia contribuição vinculada à própria unidade', function () {
        $dto = ContribuicaoExecucaoStoreDTO::fromArray([
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => 'pee-1',
            'descricao' => 'Trabalho executado',
            'esforco_executado' => 60,
        ], 'plano-1', 'consolidacao-1');

        expect($dto->planoTrabalhoId)->toBe('plano-1');
        expect($dto->consolidacaoId)->toBe('consolidacao-1');
        expect($dto->planoEntregaEntregaId)->toBe('pee-1');
        expect($dto->orgao)->toBeNull();
        expect($dto->esforcoExecutado)->toBe(60.0);
        expect($dto->isVinculadaAEntrega())->toBeTrue();
    });

    test('mapeia contribuição de outro órgão sem vínculo com entrega', function () {
        $dto = ContribuicaoExecucaoStoreDTO::fromArray([
            'origem' => 'OUTRO_ORGAO',
            'orgao' => 'Ministério X',
            'plano_entrega_entrega_id' => 'pee-1',
            'descricao' => 'Apoio externo',
            'esforco_executado' => 10,
        ], 'plano-1', 'consolidacao-1');

        expect($dto->planoEntregaEntregaId)->toBeNull();
        expect($dto->orgao)->toBe('Ministério X');
        expect($dto->isVinculadaAEntrega())->toBeFalse();
    });

    test('não vinculada a entrega ignora plano_entrega_entrega_id e orgao', function () {
        $dto = ContribuicaoExecucaoStoreDTO::fromArray([
            'origem' => 'SEM_ENTREGA',
            'orgao' => 'ignorado',
            'plano_entrega_entrega_id' => 'ignorado',
            'descricao' => 'Atividade de gestão',
            'esforco_executado' => 20,
        ], 'plano-1', 'consolidacao-1');

        expect($dto->planoEntregaEntregaId)->toBeNull();
        expect($dto->orgao)->toBeNull();
        expect($dto->isVinculadaAEntrega())->toBeFalse();
    });

    test('toPersistArray monta os campos de persistência', function () {
        $dto = ContribuicaoExecucaoStoreDTO::fromArray([
            'origem' => 'PROPRIA_UNIDADE',
            'plano_entrega_entrega_id' => 'pee-1',
            'descricao' => 'Trabalho',
            'esforco_executado' => 50,
        ], 'plano-1', 'consolidacao-1', 'contribuicao-1');

        expect($dto->contribuicaoId)->toBe('contribuicao-1');
        expect($dto->toPersistArray())->toBe([
            'plano_trabalho_consolidacao_id' => 'consolidacao-1',
            'plano_entrega_entrega_id' => 'pee-1',
            'orgao' => null,
            'descricao' => 'Trabalho',
            'esforco_executado' => 50.0,
        ]);
    });
});
