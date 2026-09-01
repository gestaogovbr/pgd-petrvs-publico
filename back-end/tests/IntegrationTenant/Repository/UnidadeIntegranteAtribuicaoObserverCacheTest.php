<?php

use App\Models\Entidade;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

beforeEach(function () {
    Cache::flush();
    app()->singleton(\App\Cache\CacheInvalidator::class, \Tests\Helpers\CacheInvalidatorE2E::class);

    $this->entidade = Entidade::on('tenant')->firstOrCreate(
        ['sigla' => 'OBS-TEST'],
        [
            'id' => Str::uuid()->toString(),
            'nome' => 'Entidade Observer Test',
            'abrangencia' => 'NACIONAL',
            'layout_formulario_atividade' => 'COMPLETO',
            'forma_contagem_carga_horaria' => 'DIA',
            'carga_horaria_padrao' => 8,
        ]
    );

    $this->unidade = new Unidade();
    $this->unidade->setConnection('tenant');
    $this->unidade->forceFill([
        'id' => Str::uuid()->toString(),
        'nome' => 'Unidade Observer',
        'sigla' => 'UOBS',
        'codigo' => '200000',
        'instituidora' => 1,
        'atividades_arquivamento_automatico' => 0,
        'atividades_avaliacao_automatico' => 0,
        'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
        'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
        'entidade_id' => $this->entidade->id,
    ])->save();

    $this->usuario = new Usuario();
    $this->usuario->setConnection('tenant');
    $this->usuario->forceFill([
        'id' => Str::uuid()->toString(),
        'nome' => 'Usuario Observer Test',
        'email' => 'observer-test@test.com',
        'cpf' => '11122233344',
        'apelido' => 'ObsTest',
        'password' => 'password',
        'modalidade_pgd' => 'presencial',
    ])->save();

    $this->integrante = new UnidadeIntegrante();
    $this->integrante->setConnection('tenant');
    $this->integrante->forceFill([
        'id' => Str::uuid()->toString(),
        'unidade_id' => $this->unidade->id,
        'usuario_id' => $this->usuario->id,
    ])->save();

    $this->atribuicao = new UnidadeIntegranteAtribuicao();
    $this->atribuicao->setConnection('tenant');
    $this->atribuicao->forceFill([
        'id' => Str::uuid()->toString(),
        'unidade_integrante_id' => $this->integrante->id,
        'atribuicao' => 'GESTOR',
    ])->save();

    $cacheKey = 'unidades-geridas:' . $this->usuario->id;
    Cache::put($cacheKey, [$this->unidade->id], 3600);
});

describe('UnidadeIntegranteAtribuicaoObserver - invalidação de cache', function () {

    test('observer invalida cache ao deletar model individualmente', function () {
        $cacheKey = 'unidades-geridas:' . $this->usuario->id;

        expect(Cache::has($cacheKey))->toBeTrue();

        $this->atribuicao->delete();

        expect(Cache::has($cacheKey))->toBeFalse('Observer deveria invalidar cache ao deletar model');
    });

    test('observer NÃO invalida cache em operação em massa query()->delete()', function () {
        $cacheKey = 'unidades-geridas:' . $this->usuario->id;

        expect(Cache::has($cacheKey))->toBeTrue();

        UnidadeIntegranteAtribuicao::query()
            ->where('id', $this->atribuicao->id)
            ->delete();

        expect(Cache::has($cacheKey))->toBeTrue(
            'Operação em massa NÃO dispara observer — cache permanece stale. '
            . 'Callers de mass delete devem chamar invalidarCacheHierarquia() manualmente.'
        );
    });

    test('observer invalida cache ao criar nova atribuição de gestor', function () {
        $cacheKey = 'unidades-geridas:' . $this->usuario->id;

        Cache::forget($cacheKey);
        Cache::put($cacheKey, [], 3600);

        $novaAtribuicao = new UnidadeIntegranteAtribuicao();
        $novaAtribuicao->setConnection('tenant');
        $novaAtribuicao->forceFill([
            'id' => Str::uuid()->toString(),
            'unidade_integrante_id' => $this->integrante->id,
            'atribuicao' => 'GESTOR_SUBSTITUTO',
        ])->save();

        expect(Cache::has($cacheKey))->toBeFalse('Observer deveria invalidar cache ao criar atribuição de gestor');
    });

    test('observer NÃO invalida cache para atribuições não-gestor', function () {
        $cacheKey = 'unidades-geridas:' . $this->usuario->id;

        expect(Cache::has($cacheKey))->toBeTrue();

        $colaborador = new UnidadeIntegranteAtribuicao();
        $colaborador->setConnection('tenant');
        $colaborador->forceFill([
            'id' => Str::uuid()->toString(),
            'unidade_integrante_id' => $this->integrante->id,
            'atribuicao' => 'COLABORADOR',
        ])->save();

        expect(Cache::has($cacheKey))->toBeTrue('Atribuição COLABORADOR não deveria invalidar cache de gestor');
    });

    test('observer invalida cache de atribuições ao criar atribuição não-gestor', function () {
        $cacheKey = 'unidades-atribuicoes:' . $this->usuario->id;
        Cache::put($cacheKey, [$this->unidade->id], 3600);

        expect(Cache::has($cacheKey))->toBeTrue();

        $colaborador = new UnidadeIntegranteAtribuicao();
        $colaborador->setConnection('tenant');
        $colaborador->forceFill([
            'id' => Str::uuid()->toString(),
            'unidade_integrante_id' => $this->integrante->id,
            'atribuicao' => 'COLABORADOR',
        ])->save();

        expect(Cache::has($cacheKey))->toBeFalse('COLABORADOR deveria invalidar cache de unidades com atribuição');
    });

    test('repository delete dispara observer e invalida cache', function () {
        $cacheKey = 'unidades-geridas:' . $this->usuario->id;

        expect(Cache::has($cacheKey))->toBeTrue();

        $repository = app(\App\Repository\UnidadeIntegranteAtribuicao\Contracts\UnidadeIntegranteAtribuicaoWriteRepositoryContract::class);
        $repository->delete($this->atribuicao->id);

        expect(Cache::has($cacheKey))->toBeFalse('Repository delete deveria disparar observer e invalidar cache');
    });
});
