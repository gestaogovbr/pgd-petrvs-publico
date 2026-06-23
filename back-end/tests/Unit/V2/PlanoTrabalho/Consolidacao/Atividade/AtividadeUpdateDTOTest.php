<?php

use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeUpdateDTO;
use Tests\TestCase;

uses(TestCase::class);

describe('AtividadeUpdateDTO', function () {

    test('cria DTO com todos os campos', function () {
        $dto = AtividadeUpdateDTO::fromArray(
            ['descricao' => 'Nova descrição', 'plano_trabalho_entrega_id' => 'entrega-1'],
            'plano-1', 'consolidacao-1', 'atividade-1', 'usuario-1',
        );

        expect($dto->planoTrabalhoId)->toBe('plano-1');
        expect($dto->consolidacaoId)->toBe('consolidacao-1');
        expect($dto->atividadeId)->toBe('atividade-1');
        expect($dto->descricao)->toBe('Nova descrição');
        expect($dto->planoTrabalhoEntregaId)->toBe('entrega-1');
    });

    test('campos ausentes ficam null', function () {
        $dto = AtividadeUpdateDTO::fromArray([], 'p-1', 'c-1', 'a-1', 'u-1');

        expect($dto->descricao)->toBeNull();
        expect($dto->planoTrabalhoEntregaId)->toBeNull();
    });

    test('toArray omite campos null', function () {
        $dto = AtividadeUpdateDTO::fromArray(['descricao' => 'Só descrição'], 'p-1', 'c-1', 'a-1', 'u-1');

        expect($dto->toArray())->toBe(['descricao' => 'Só descrição']);
    });
});
