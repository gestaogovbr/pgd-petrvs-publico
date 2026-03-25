<?php

namespace Tests\IntegrationTenant\Repository\V2;

use App\Models\PlanoTrabalho;
use App\Models\Programa;
use App\Models\TipoModalidade;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\Perfil;
use App\Repository\PlanoTrabalhoRepository;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoListagemFiltro;
use Tests\DatabaseTenantTestCase;

beforeEach(function () {
    $this->repository = app(PlanoTrabalhoRepository::class);

    $perfil = Perfil::factory()->create();
    $tipoModalidade = TipoModalidade::factory()->create();

    $this->unidade = Unidade::factory()->create();
    $this->usuario = Usuario::factory()->create([
        'perfil_id' => $perfil->id,
        'tipo_modalidade_id' => $tipoModalidade->id,
    ]);
    $this->programa = Programa::factory()->create();
    $this->tipoModalidadeId = $tipoModalidade->id;
});

describe('PlanoTrabalhoRepository::create', function () {

    test('persiste o plano de trabalho no banco', function () {
        $attrs = [
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'criacao_usuario_id' => $this->usuario->id,
        ];

        $plano = $this->repository->create($attrs);

        expect($plano)->toBeInstanceOf(PlanoTrabalho::class)
            ->and($plano->exists)->toBeTrue()
            ->and($plano->usuario_id)->toBe($this->usuario->id)
            ->and($plano->unidade_id)->toBe($this->unidade->id);

        $this->assertDatabaseHas('planos_trabalhos', [
            'id' => $plano->id,
            'usuario_id' => $this->usuario->id,
            'status' => 'INCLUIDO',
        ]);
    });

    test('gera numero automaticamente via stored procedure', function () {
        $attrs = [
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'programa_id' => $this->programa->id,
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'criacao_usuario_id' => $this->usuario->id,
        ];

        $plano = $this->repository->create($attrs);

        expect($plano->numero)->toBeGreaterThan(0);
    });
});

describe('PlanoTrabalhoRepository::buscarPlanosListagem', function () {

    test('retorna plano do usuário quando filtrado por usuario_id', function () {
        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'status' => 'INCLUIDO',
        ]);

        $outroUsuario = Usuario::factory()->create();
        PlanoTrabalho::factory()->create([
            'usuario_id' => $outroUsuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $filtro = PlanoTrabalhoListagemFiltro::fromArray(['usuario_id' => $this->usuario->id]);
        $result = $this->repository->buscarPlanosListagem($filtro);

        expect($result->total())->toBe(1)
            ->and($result->items()[0]->usuario_id)->toBe($this->usuario->id);
    });

    test('retorna apenas planos vigentes quando vigentes=true', function () {
        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => now()->subMonth(),
            'data_fim' => now()->addMonth(),
        ]);

        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => now()->subYear(),
            'data_fim' => now()->subMonth(),
        ]);

        $filtro = PlanoTrabalhoListagemFiltro::fromArray(['vigentes' => true]);
        $result = $this->repository->buscarPlanosListagem($filtro);

        expect($result->total())->toBe(1);
    });

    test('retorna planos dentro do intervalo de datas', function () {
        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => '2024-03-01',
            'data_fim' => '2024-06-30',
        ]);

        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => '2025-01-01',
            'data_fim' => '2025-12-31',
        ]);

        $filtro = PlanoTrabalhoListagemFiltro::fromArray([
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
        ]);
        $result = $this->repository->buscarPlanosListagem($filtro);

        expect($result->total())->toBe(1);
    });

    test('retorna planos da unidade quando filtrado por unidade_id', function () {
        $outraUnidade = Unidade::factory()->create();

        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => now()->subMonth(),
            'data_fim' => now()->addMonth(),
        ]);

        PlanoTrabalho::factory()->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $outraUnidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_inicio' => now()->subMonth(),
            'data_fim' => now()->addMonth(),
        ]);

        $filtro = PlanoTrabalhoListagemFiltro::fromArray([
            'vigentes' => true,
            'unidade_id' => [$this->unidade->id],
        ]);
        $result = $this->repository->buscarPlanosListagem($filtro);

        expect($result->total())->toBe(1);
    });

    test('respeita paginação', function () {
        PlanoTrabalho::factory()->count(5)->create([
            'usuario_id' => $this->usuario->id,
            'unidade_id' => $this->unidade->id,
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $filtro = PlanoTrabalhoListagemFiltro::fromArray([
            'usuario_id' => $this->usuario->id,
            'page' => 1,
            'size' => 2,
        ]);
        $result = $this->repository->buscarPlanosListagem($filtro);

        expect($result->total())->toBe(5)
            ->and($result->count())->toBe(2)
            ->and($result->lastPage())->toBe(3);
    });
});
