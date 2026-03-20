<?php

namespace Tests\IntegrationTenant\Repository;

use App\Models\Entidade;
use App\Models\Feriado;
use App\Repository\EntidadeRepository;

beforeEach(function () {
    $this->repository = app(EntidadeRepository::class);
});

describe('EntidadeRepository', function () {
    test('findById retorna entidade', function () {
        $entidade = Entidade::factory()->create();

        $found = $this->repository->findById($entidade->id);

        expect($found)->not->toBeNull();
        expect($found->id)->toBe($entidade->id);
    });

    test('findById carrega relações quando solicitado', function () {
        $entidade = Entidade::factory()->create();
        $feriado = Feriado::factory()->create(['entidade_id' => $entidade->id]);

        $found = $this->repository->findById($entidade->id, ['feriados']);

        expect($found)->not->toBeNull();
        expect($found->id)->toBe($entidade->id);
        expect($found->relationLoaded('feriados'))->toBeTrue();
        expect($found->feriados->contains($feriado))->toBeTrue();
    });

    test('findBySigla retorna entidade', function () {
        $entidade = Entidade::factory()->create(['sigla' => 'TEST-SIGLA']);

        $found = $this->repository->findBySigla('TEST-SIGLA');

        expect($found)->not->toBeNull();
        expect($found->id)->toBe($entidade->id);
        expect($found->sigla)->toBe('TEST-SIGLA');
    });

    test('findBySigla carrega relações quando solicitado', function () {
        $entidade = Entidade::factory()->create(['sigla' => 'TEST-SIGLA-REL']);
        $feriado = Feriado::factory()->create(['entidade_id' => $entidade->id]);

        $found = $this->repository->findBySigla('TEST-SIGLA-REL', ['feriados']);

        expect($found)->not->toBeNull();
        expect($found->id)->toBe($entidade->id);
        expect($found->relationLoaded('feriados'))->toBeTrue();
        expect($found->feriados->contains($feriado))->toBeTrue();
    });
});
