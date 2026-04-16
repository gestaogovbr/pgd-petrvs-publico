<?php

use App\Models\Ocorrencia;
use App\Models\Perfil;
use App\Models\TipoModalidade;
use App\Models\Usuario;
use App\Repository\Afastamento\AfastamentoRepository;

beforeEach(function () {
    $this->tipoModalidadeId = TipoModalidade::factory()->create(['nome' => 'Presencial'])->id;
    $this->perfilId = Perfil::factory()->create(['nome' => 'Padrão'])->id;
    $this->repository = app(AfastamentoRepository::class);
});

describe('AfastamentoRepository', function () {
    test('findById retorna a ocorrência quando existe', function () {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);
        $ocorrencia = Ocorrencia::factory()->create([
            'usuario_id' => $usuario->id,
        ]);

        $found = $this->repository->findById($ocorrencia->id);

        expect($found)->not->toBeNull()
            ->and($found->id)->toBe($ocorrencia->id);
    });

    test('findById retorna null quando id está vazio', function () {
        expect($this->repository->findById(''))->toBeNull();
    });

    test('findById retorna null quando não existe', function () {
        expect($this->repository->findById('00000000-0000-0000-0000-000000000000'))->toBeNull();
    });
});
