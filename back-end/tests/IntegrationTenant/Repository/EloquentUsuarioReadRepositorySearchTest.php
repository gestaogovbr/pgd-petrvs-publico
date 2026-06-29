<?php

use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Repository\Usuario\Eloquent\EloquentUsuarioReadRepository;
use Illuminate\Support\Facades\Bus;

beforeEach(function () {
    Bus::fake();
});

describe('EloquentUsuarioReadRepository - search areasTrabalhoFilter (Integration)', function () {

    test('com subordinadas=true retorna lotados na hierarquia', function () {
        $repository = app(EloquentUsuarioReadRepository::class);

        $unidadePai = Unidade::factory()->create();
        $unidadeFilha = Unidade::factory()->create([
            'unidade_pai_id' => $unidadePai->id,
            'path' => "/{$unidadePai->id}/",
        ]);
        $unidadeOutra = Unidade::factory()->create();

        $usuarioNaPai = Usuario::factory()->create();
        $integrantePai = UnidadeIntegrante::query()->create(['unidade_id' => $unidadePai->id, 'usuario_id' => $usuarioNaPai->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $integrantePai->id, 'atribuicao' => 'LOTADO']);

        $usuarioNaFilha = Usuario::factory()->create();
        $integranteFilha = UnidadeIntegrante::query()->create(['unidade_id' => $unidadeFilha->id, 'usuario_id' => $usuarioNaFilha->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $integranteFilha->id, 'atribuicao' => 'LOTADO']);

        $usuarioFora = Usuario::factory()->create();
        $integranteFora = UnidadeIntegrante::query()->create(['unidade_id' => $unidadeOutra->id, 'usuario_id' => $usuarioFora->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $integranteFora->id, 'atribuicao' => 'LOTADO']);

        $result = $repository->search(['where' => [['areasTrabalhoFilter', [$unidadePai->id], true]]]);
        $ids = $result->pluck('id')->all();

        expect($ids)->toContain($usuarioNaPai->id)
            ->and($ids)->toContain($usuarioNaFilha->id)
            ->and($ids)->not->toContain($usuarioFora->id);
    });

    test('com subordinadas=false retorna apenas lotados na unidade direta', function () {
        $repository = app(EloquentUsuarioReadRepository::class);

        $unidadePai = Unidade::factory()->create();
        $unidadeFilha = Unidade::factory()->create([
            'unidade_pai_id' => $unidadePai->id,
            'path' => "/{$unidadePai->id}/",
        ]);

        $usuarioNaPai = Usuario::factory()->create();
        $integrantePai = UnidadeIntegrante::query()->create(['unidade_id' => $unidadePai->id, 'usuario_id' => $usuarioNaPai->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $integrantePai->id, 'atribuicao' => 'LOTADO']);

        $usuarioNaFilha = Usuario::factory()->create();
        $integranteFilha = UnidadeIntegrante::query()->create(['unidade_id' => $unidadeFilha->id, 'usuario_id' => $usuarioNaFilha->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $integranteFilha->id, 'atribuicao' => 'LOTADO']);

        $result = $repository->search(['where' => [['areasTrabalhoFilter', [$unidadePai->id], false]]]);
        $ids = $result->pluck('id')->all();

        expect($ids)->toContain($usuarioNaPai->id)
            ->and($ids)->not->toContain($usuarioNaFilha->id);
    });

    test('com multiplas unidades retorna lotados em todas as hierarquias', function () {
        $repository = app(EloquentUsuarioReadRepository::class);

        $unidadeA = Unidade::factory()->create();
        $unidadeB = Unidade::factory()->create();
        $filhaA = Unidade::factory()->create(['unidade_pai_id' => $unidadeA->id, 'path' => "/{$unidadeA->id}/"]);

        $usuarioA = Usuario::factory()->create();
        $intA = UnidadeIntegrante::query()->create(['unidade_id' => $unidadeA->id, 'usuario_id' => $usuarioA->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $intA->id, 'atribuicao' => 'LOTADO']);

        $usuarioFilhaA = Usuario::factory()->create();
        $intFA = UnidadeIntegrante::query()->create(['unidade_id' => $filhaA->id, 'usuario_id' => $usuarioFilhaA->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $intFA->id, 'atribuicao' => 'LOTADO']);

        $usuarioB = Usuario::factory()->create();
        $intB = UnidadeIntegrante::query()->create(['unidade_id' => $unidadeB->id, 'usuario_id' => $usuarioB->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $intB->id, 'atribuicao' => 'LOTADO']);

        $result = $repository->search(['where' => [['areasTrabalhoFilter', [$unidadeA->id, $unidadeB->id], true]]]);
        $ids = $result->pluck('id')->all();

        expect($ids)->toContain($usuarioA->id)
            ->and($ids)->toContain($usuarioFilhaA->id)
            ->and($ids)->toContain($usuarioB->id);
    });
});
