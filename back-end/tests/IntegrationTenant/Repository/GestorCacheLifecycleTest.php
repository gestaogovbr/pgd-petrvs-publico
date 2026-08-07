<?php

use App\Cache\GestorHierarquiaCache;
use App\Models\Entidade;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Repository\Unidade\Eloquent\EloquentUnidadeReadRepository;
use App\Services\UnidadeIntegranteService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

beforeEach(function () {
    Cache::flush();
    app()->singleton(\App\Cache\CacheInvalidator::class, \Tests\Helpers\CacheInvalidatorE2E::class);

    $this->entidade = Entidade::on('tenant')->firstOrCreate(
        ['sigla' => 'LIFECYCLE-V1'],
        [
            'id' => Str::uuid()->toString(),
            'nome' => 'Entidade Lifecycle V1',
            'abrangencia' => 'NACIONAL',
            'layout_formulario_atividade' => 'COMPLETO',
            'forma_contagem_carga_horaria' => 'DIA',
            'carga_horaria_padrao' => 8,
        ]
    );

    $this->unidadePai = new Unidade();
    $this->unidadePai->setConnection('tenant');
    $this->unidadePai->fill([
        'id' => Str::uuid()->toString(),
        'nome' => 'Unidade Pai V1',
        'sigla' => 'UPV1',
        'codigo' => '8801',
        'entidade_id' => $this->entidade->id,
    ]);
    $this->unidadePai->save();

    $this->unidadeFilha = new Unidade();
    $this->unidadeFilha->setConnection('tenant');
    $this->unidadeFilha->fill([
        'id' => Str::uuid()->toString(),
        'nome' => 'Unidade Filha V1',
        'sigla' => 'UFV1',
        'codigo' => '8802',
        'entidade_id' => $this->entidade->id,
        'unidade_pai_id' => $this->unidadePai->id,
    ]);
    $this->unidadeFilha->save();

    $this->usuario = Usuario::factory()->create();

    // Lotação inicial na unidade PAI (para que GESTOR possa ser adicionado na mesma unidade)
    $integrante = UnidadeIntegrante::on('tenant')->create([
        'unidade_id' => $this->unidadePai->id,
        'usuario_id' => $this->usuario->id,
    ]);
    UnidadeIntegranteAtribuicao::on('tenant')->create([
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'LOTADO',
    ]);

    $this->repository = app(EloquentUnidadeReadRepository::class);
    $this->integranteService = app(UnidadeIntegranteService::class);
});

describe('Lifecycle V1: salvarIntegrantes invalida cache ao adicionar/remover gestão', function () {

    test('sem gestão → false; adiciona GESTOR via salvarIntegrantes → true; remove via salvarIntegrantes → false', function () {
        $usuarioId = $this->usuario->id;
        $unidadeFilhaId = $this->unidadeFilha->id;
        $unidadePaiId = $this->unidadePai->id;

        // ─── PASSO 1: sem gestão → isGestorRecursivo(filha) = false 2x ───
        expect($this->repository->isUsuarioGestorRecursivo($unidadeFilhaId, $usuarioId))->toBeFalse();
        expect($this->repository->isUsuarioGestorRecursivo($unidadeFilhaId, $usuarioId))->toBeFalse();
        expect(Cache::has('unidades-geridas:' . $usuarioId))->toBeTrue();

        // ─── PASSO 2: adicionar GESTOR na unidade pai (onde está lotado) via salvarIntegrantes ───
        $this->integranteService->salvarIntegrantes([
            [
                'unidade_id' => $unidadePaiId,
                'usuario_id' => $usuarioId,
                'atribuicoes' => ['LOTADO', 'GESTOR'],
            ],
        ]);

        // Cache invalidado pelo observer
        expect(Cache::has('unidades-geridas:' . $usuarioId))->toBeFalse();

        // ─── PASSO 3: com gestão → isGestorRecursivo(filha) = true 2x ───
        expect($this->repository->isUsuarioGestorRecursivo($unidadeFilhaId, $usuarioId))->toBeTrue();
        expect($this->repository->isUsuarioGestorRecursivo($unidadeFilhaId, $usuarioId))->toBeTrue();

        // ─── PASSO 4: remover GESTOR via salvarIntegrantes (mantém apenas LOTADO) ───
        $this->integranteService->salvarIntegrantes([
            [
                'unidade_id' => $unidadePaiId,
                'usuario_id' => $usuarioId,
                'atribuicoes' => ['LOTADO'],
            ],
        ]);

        // Cache invalidado
        expect(Cache::has('unidades-geridas:' . $usuarioId))->toBeFalse();

        // ─── PASSO 5: sem gestão novamente → false 2x ───
        expect($this->repository->isUsuarioGestorRecursivo($unidadeFilhaId, $usuarioId))->toBeFalse();
        expect($this->repository->isUsuarioGestorRecursivo($unidadeFilhaId, $usuarioId))->toBeFalse();
    });
});
