<?php

use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeStoreDTO;
use Tests\TestCase;

uses(TestCase::class);

describe('AtividadeStoreDTO', function () {

    test('cria DTO a partir de array', function () {
        $dto = AtividadeStoreDTO::fromArray(
            ['plano_trabalho_entrega_id' => 'entrega-1', 'descricao' => 'Trabalho executado'],
            'consolidacao-1',
            'plano-1',
            'unidade-1',
            'usuario-1',
        );

        expect($dto->planoTrabalhoEntregaId)->toBe('entrega-1');
        expect($dto->descricao)->toBe('Trabalho executado');
        expect($dto->planoTrabalhoConsolidacaoId)->toBe('consolidacao-1');
        expect($dto->planoTrabalhoId)->toBe('plano-1');
        expect($dto->unidadeId)->toBe('unidade-1');
        expect($dto->demandanteId)->toBe('usuario-1');
    });

    test('trunca descricao em 1500 caracteres', function () {
        $descricaoLonga = str_repeat('a', 2000);

        $dto = AtividadeStoreDTO::fromArray(
            ['plano_trabalho_entrega_id' => 'e-1', 'descricao' => $descricaoLonga],
            'c-1', 'p-1', 'u-1', 'usr-1',
        );

        expect(mb_strlen($dto->descricao))->toBe(1500);
    });

    test('toArray retorna campos obrigatórios para criação', function () {
        $dto = AtividadeStoreDTO::fromArray(
            ['plano_trabalho_entrega_id' => 'entrega-1', 'descricao' => 'Desc'],
            'consolidacao-1', 'plano-1', 'unidade-1', 'usuario-1',
        );

        $array = $dto->toArray();

        expect($array)->toHaveKeys([
            'descricao', 'plano_trabalho_entrega_id', 'plano_trabalho_consolidacao_id',
            'plano_trabalho_id', 'unidade_id', 'demandante_id', 'usuario_id',
            'data_distribuicao', 'data_estipulada_entrega', 'tempo_planejado', 'esforco',
        ]);
        expect($array['descricao'])->toBe('Desc');
        expect($array['plano_trabalho_entrega_id'])->toBe('entrega-1');
    });
});
