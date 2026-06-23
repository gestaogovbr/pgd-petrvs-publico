<?php

use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeStoreDTO;
use Tests\TestCase;

uses(TestCase::class);

describe('AtividadeStoreDTO', function () {

    test('cria DTO a partir de array', function () {
        $dto = AtividadeStoreDTO::fromArray(
            ['plano_trabalho_entrega_id' => 'entrega-1', 'descricao' => 'Trabalho executado'],
            'plano-1', 'consolidacao-1', 'usuario-1',
        );

        expect($dto->planoTrabalhoId)->toBe('plano-1');
        expect($dto->consolidacaoId)->toBe('consolidacao-1');
        expect($dto->usuarioId)->toBe('usuario-1');
        expect($dto->planoTrabalhoEntregaId)->toBe('entrega-1');
        expect($dto->descricao)->toBe('Trabalho executado');
    });

    test('toArray retorna campos do request para validação', function () {
        $dto = AtividadeStoreDTO::fromArray(
            ['plano_trabalho_entrega_id' => 'entrega-1', 'descricao' => 'Desc'],
            'plano-1', 'consolidacao-1', 'usuario-1',
        );

        expect($dto->toArray())->toBe([
            'plano_trabalho_entrega_id' => 'entrega-1',
            'descricao' => 'Desc',
        ]);
    });

    test('toPersistArray retorna campos completos para o repository', function () {
        $dto = AtividadeStoreDTO::fromArray(
            ['plano_trabalho_entrega_id' => 'entrega-1', 'descricao' => 'Desc'],
            'plano-1', 'consolidacao-1', 'usuario-1',
        );

        $array = $dto->toPersistArray('plano-1', 'unidade-1');

        expect($array)->toHaveKeys([
            'descricao', 'plano_trabalho_entrega_id', 'plano_trabalho_consolidacao_id',
            'plano_trabalho_id', 'unidade_id', 'demandante_id', 'usuario_id',
            'data_distribuicao', 'data_estipulada_entrega', 'tempo_planejado', 'esforco',
        ]);
        expect($array['plano_trabalho_id'])->toBe('plano-1');
        expect($array['unidade_id'])->toBe('unidade-1');
        expect($array['demandante_id'])->toBe('usuario-1');
    });

    test('atividadeId retorna null', function () {
        $dto = AtividadeStoreDTO::fromArray(
            ['plano_trabalho_entrega_id' => 'e-1', 'descricao' => 'D'],
            'p-1', 'c-1', 'u-1',
        );

        expect($dto->atividadeId())->toBeNull();
    });
});
