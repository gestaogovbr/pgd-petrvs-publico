<?php

use App\Models\Afastamento;
use App\Models\Perfil;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\Usuario;
use App\Repository\Afastamento\AfastamentoRepository;

beforeEach(function () {
    $this->perfilId = Perfil::factory()->create(['nome' => 'Padrão'])->id;
    $this->repository = app(AfastamentoRepository::class);
});

describe('AfastamentoRepository', function () {
    test('findById retorna a ocorrência quando existe', function () {
        $usuario = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);
        $afastamento = Afastamento::factory()->create([
            'usuario_id' => $usuario->id,
        ]);

        $found = $this->repository->findById($afastamento->id);

        expect($found)->not->toBeNull()
            ->and($found->id)->toBe($afastamento->id);
    });

    test('findById retorna null quando id está vazio', function () {
        expect($this->repository->findById(''))->toBeNull();
    });

    test('findById retorna null quando não existe', function () {
        expect($this->repository->findById('00000000-0000-0000-0000-000000000000'))->toBeNull();
    });

    test('usuarioPossuiVinculoEmUnidades retorna false quando usuário ou lista de unidades está vazia', function () {
        $unidade = Unidade::factory()->create();

        expect($this->repository->usuarioPossuiVinculoEmUnidades('', [$unidade->id]))->toBeFalse()
            ->and($this->repository->usuarioPossuiVinculoEmUnidades((string) \Illuminate\Support\Str::uuid(), []))->toBeFalse();
    });

    test('usuarioPossuiVinculoEmUnidades reflete vínculo em unidades_integrantes', function () {
        $usuario = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);
        $unidadeA = Unidade::factory()->create();
        $unidadeB = Unidade::factory()->create();

        UnidadeIntegrante::query()->create([
            'unidade_id' => $unidadeA->id,
            'usuario_id' => $usuario->id,
        ]);

        expect($this->repository->usuarioPossuiVinculoEmUnidades((string) $usuario->id, [$unidadeA->id]))->toBeTrue()
            ->and($this->repository->usuarioPossuiVinculoEmUnidades((string) $usuario->id, [$unidadeB->id]))->toBeFalse();
    });

    test('findAll respeita filtro por usuario_id e retorna total', function () {
        $usuarioA = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);
        $usuarioB = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);

        Afastamento::factory()->create(['usuario_id' => $usuarioA->id]);
        Afastamento::factory()->create(['usuario_id' => $usuarioA->id]);
        Afastamento::factory()->create(['usuario_id' => $usuarioB->id]);

        $result = $this->repository->findAll([
            'where' => [
                ['usuario_id', '==', $usuarioA->id],
            ],
        ]);

        expect($result->total)->toBe(2)
            ->and($result->data)->toHaveCount(2)
            ->and(collect($result->data)->every(fn ($row) => $row->usuario_id === $usuarioA->id))->toBeTrue();
    });

    test('insert persiste afastamento', function () {
        $usuario = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);

        $defaults = Afastamento::factory()->make(['usuario_id' => $usuario->id]);

        $created = $this->repository->insert([
            'usuario_id' => $usuario->id,
            'tipo_motivo_afastamento_id' => $defaults->tipo_motivo_afastamento_id,
            'data_inicio' => $defaults->data_inicio,
            'data_fim' => $defaults->data_fim,
            'observacoes' => 'teste insert repository',
            'horas' => 4,
        ]);

        expect($created->id)->not->toBeEmpty()
            ->and(Afastamento::query()->find($created->id))->not->toBeNull()
            ->and($created->observacoes)->toBe('teste insert repository');
    });

    test('update altera campos do afastamento', function () {
        $usuario = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);
        $afastamento = Afastamento::factory()->create([
            'usuario_id' => $usuario->id,
            'observacoes' => 'antes',
        ]);

        $updated = $this->repository->update($afastamento->id, ['observacoes' => 'depois']);

        expect($updated)->not->toBeNull()
            ->and($updated->observacoes)->toBe('depois')
            ->and(Afastamento::query()->find($afastamento->id)?->observacoes)->toBe('depois');
    });

    test('destroy remove o registro', function () {
        $usuario = Usuario::factory()->create([
            'perfil_id' => $this->perfilId,
        ]);
        $afastamento = Afastamento::factory()->create(['usuario_id' => $usuario->id]);

        $deleted = $this->repository->destroy($afastamento->id);

        expect($deleted)->toBeTrue()
            ->and(Afastamento::query()->find($afastamento->id))->toBeNull();
    });
});
