<?php

use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoStoreDTO;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoStoreDTO', function () {

    test('extrai todos os campos corretamente', function () {
        $dto = PlanoTrabalhoStoreDTO::fromArray([
            'usuario_id' => 'user-123',
            'unidade_id' => 'unidade-456',
            'programa_id' => 'programa-789',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'modalidade_pgd' => 'presencial',
            'justificativa_modalidade' => 'Justificativa teste',
        ], 'criador-999');

        expect($dto->usuarioId)->toBe('user-123')
            ->and($dto->unidadeId)->toBe('unidade-456')
            ->and($dto->programaId)->toBe('programa-789')
            ->and($dto->dataInicio)->toBe('2024-01-01')
            ->and($dto->dataFim)->toBe('2024-12-31')
            ->and($dto->modalidadePgd)->toBe('presencial')
            ->and($dto->justificativaModalidade)->toBe('Justificativa teste')
            ->and($dto->criacaoUsuarioId)->toBe('criador-999')
            ->and($dto->cargaHoraria)->toBe(PlanoTrabalhoStoreDTO::HORAS_DIARIAS_JORNADA_INTEGRAL_PADRAO);
    });

    test('justificativa é null quando não informada', function () {
        $dto = PlanoTrabalhoStoreDTO::fromArray([
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'programa_id' => 'programa-1',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-06-30',
            'modalidade_pgd' => 'presencial',
        ], 'criador-1');

        expect($dto->justificativaModalidade)->toBeNull();
    });

    test('toArray retorna array compatível com o model', function () {
        $dto = PlanoTrabalhoStoreDTO::fromArray([
            'usuario_id' => 'user-123',
            'unidade_id' => 'unidade-456',
            'programa_id' => 'programa-789',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'modalidade_pgd' => 'presencial',
            'justificativa_modalidade' => 'Justificativa',
        ], 'criador-999');

        $array = $dto->toArray();

        expect($array)->toBe([
            'usuario_id' => 'user-123',
            'unidade_id' => 'unidade-456',
            'programa_id' => 'programa-789',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'modalidade_pgd' => 'presencial',
            'criacao_usuario_id' => 'criador-999',
            'carga_horaria' => 8.0,
            'justificativa_modalidade' => 'Justificativa',
        ]);
    });
});

describe('PlanoTrabalhoStoreDTO::isClone', function () {

    test('retorna true quando clone_de é informado', function () {
        $dto = PlanoTrabalhoStoreDTO::fromArray([
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'programa_id' => 'programa-1',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'modalidade_pgd' => 'presencial',
            'clone_de' => 'plano-original',
        ], 'criador-1');

        expect($dto->isClone())->toBeTrue()
            ->and($dto->cloneDe)->toBe('plano-original');
    });

    test('retorna false quando clone_de é null', function () {
        $dto = PlanoTrabalhoStoreDTO::fromArray([
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'programa_id' => 'programa-1',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'modalidade_pgd' => 'presencial',
        ], 'criador-1');

        expect($dto->isClone())->toBeFalse()
            ->and($dto->cloneDe)->toBeNull();
    });

    test('clone_de não aparece no toArray', function () {
        $dto = PlanoTrabalhoStoreDTO::fromArray([
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'programa_id' => 'programa-1',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'modalidade_pgd' => 'presencial',
            'clone_de' => 'plano-original',
        ], 'criador-1');

        expect($dto->toArray())->not->toHaveKey('clone_de');
    });
});