<?php

use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeUpdateDTO;
use Tests\TestCase;

uses(TestCase::class);

describe('AtividadeUpdateDTO', function () {

    test('cria DTO com todos os campos', function () {
        $dto = AtividadeUpdateDTO::fromArray([
            'descricao' => 'Nova descrição',
            'plano_trabalho_entrega_id' => 'entrega-1',
        ]);

        expect($dto->descricao)->toBe('Nova descrição');
        expect($dto->planoTrabalhoEntregaId)->toBe('entrega-1');
    });

    test('campos ausentes ficam null', function () {
        $dto = AtividadeUpdateDTO::fromArray([]);

        expect($dto->descricao)->toBeNull();
        expect($dto->planoTrabalhoEntregaId)->toBeNull();
    });

    test('toArray omite campos null', function () {
        $dto = AtividadeUpdateDTO::fromArray(['descricao' => 'Só descrição']);

        expect($dto->toArray())->toBe(['descricao' => 'Só descrição']);
    });

    test('trunca descricao em 1500 caracteres', function () {
        $dto = AtividadeUpdateDTO::fromArray(['descricao' => str_repeat('a', 2000)]);

        expect(mb_strlen($dto->descricao))->toBe(1500);
    });
});
