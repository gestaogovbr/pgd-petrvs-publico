<?php

use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Repository\EnvioUsuario\Eloquent\EloquentEnvioUsuarioReadRepository;
use Illuminate\Support\Facades\Bus;

beforeEach(function () {
    Bus::fake();
});

describe('EloquentEnvioUsuarioReadRepository - baseQuery hierarquia (Integration)', function () {

    test('gestor sem MOD_USER_TUDO vê apenas lotados na sua hierarquia', function () {
        $repository = new EloquentEnvioUsuarioReadRepository();

        $unidadePai = Unidade::factory()->create();
        $unidadeFilha = Unidade::factory()->create([
            'unidade_pai_id' => $unidadePai->id,
            'path' => "/{$unidadePai->id}/",
        ]);
        $unidadeOutra = Unidade::factory()->create();

        $gestor = Usuario::factory()->create();
        $intGestor = UnidadeIntegrante::query()->create(['unidade_id' => $unidadePai->id, 'usuario_id' => $gestor->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $intGestor->id, 'atribuicao' => 'GESTOR']);

        $usuarioLotadoPai = Usuario::factory()->create();
        $intPai = UnidadeIntegrante::query()->create(['unidade_id' => $unidadePai->id, 'usuario_id' => $usuarioLotadoPai->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $intPai->id, 'atribuicao' => 'LOTADO']);

        $usuarioLotadoFilha = Usuario::factory()->create();
        $intFilha = UnidadeIntegrante::query()->create(['unidade_id' => $unidadeFilha->id, 'usuario_id' => $usuarioLotadoFilha->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $intFilha->id, 'atribuicao' => 'LOTADO']);

        $usuarioFora = Usuario::factory()->create();
        $intFora = UnidadeIntegrante::query()->create(['unidade_id' => $unidadeOutra->id, 'usuario_id' => $usuarioFora->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $intFora->id, 'atribuicao' => 'LOTADO']);

        $result = $repository->query(['where' => []], $gestor);
        $ids = $result['rows']->pluck('id')->all();

        expect($ids)->toContain($usuarioLotadoPai->id)
            ->and($ids)->toContain($usuarioLotadoFilha->id)
            ->and($ids)->not->toContain($usuarioFora->id);
    });

    test('não vê usuarios sem atribuicao LOTADO', function () {
        $repository = new EloquentEnvioUsuarioReadRepository();

        $unidade = Unidade::factory()->create();

        $gestor = Usuario::factory()->create();
        $intGestor = UnidadeIntegrante::query()->create(['unidade_id' => $unidade->id, 'usuario_id' => $gestor->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $intGestor->id, 'atribuicao' => 'GESTOR']);

        $usuarioColab = Usuario::factory()->create();
        $intColab = UnidadeIntegrante::query()->create(['unidade_id' => $unidade->id, 'usuario_id' => $usuarioColab->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $intColab->id, 'atribuicao' => 'COLABORADOR']);

        $result = $repository->query(['where' => []], $gestor);
        $ids = $result['rows']->pluck('id')->all();

        expect($ids)->not->toContain($usuarioColab->id);
    });

    test('admin com MOD_USER_TUDO vê todos os usuarios', function () {
        $repository = new EloquentEnvioUsuarioReadRepository();

        $unidadeA = Unidade::factory()->create();
        $unidadeB = Unidade::factory()->create();

        $usuarioA = Usuario::factory()->create();
        $intA = UnidadeIntegrante::query()->create(['unidade_id' => $unidadeA->id, 'usuario_id' => $usuarioA->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $intA->id, 'atribuicao' => 'LOTADO']);

        $usuarioB = Usuario::factory()->create();
        $intB = UnidadeIntegrante::query()->create(['unidade_id' => $unidadeB->id, 'usuario_id' => $usuarioB->id]);
        UnidadeIntegranteAtribuicao::query()->create(['unidade_integrante_id' => $intB->id, 'atribuicao' => 'LOTADO']);

        $admin = Usuario::factory()->create();
        $adminMock = Mockery::mock($admin)->makePartial();
        $adminMock->shouldReceive('hasPermissionTo')->with('MOD_USER_TUDO')->andReturn(true);

        $result = $repository->query(['where' => []], $adminMock);
        $ids = $result['rows']->pluck('id')->all();

        expect($ids)->toContain($usuarioA->id)
            ->and($ids)->toContain($usuarioB->id);
    });
});
