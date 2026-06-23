<?php

use App\Cache\GestorHierarquiaCache;
use App\Models\Entidade;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Usuario;
use App\Repository\Unidade\Eloquent\EloquentUnidadeReadRepository;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

beforeEach(function () {
    Cache::flush();
    app()->singleton(\App\Cache\CacheInvalidator::class, \Tests\Helpers\CacheInvalidatorE2E::class);

    $this->entidade = Entidade::on('tenant')->firstOrCreate(
        ['sigla' => 'CACHE-TEST'],
        [
            'id' => Str::uuid()->toString(),
            'nome' => 'Entidade Cache Test',
            'abrangencia' => 'NACIONAL',
            'layout_formulario_atividade' => 'COMPLETO',
            'forma_contagem_carga_horaria' => 'DIA',
            'carga_horaria_padrao' => 8,
        ]
    );

    $this->unidadePai = new Unidade();
    $this->unidadePai->setConnection('tenant');
    $this->unidadePai->forceFill([
        'id' => Str::uuid()->toString(),
        'nome' => 'Unidade Pai',
        'sigla' => 'UPAI',
        'codigo' => '100000',
        'instituidora' => 1,
        'atividades_arquivamento_automatico' => 0,
        'atividades_avaliacao_automatico' => 0,
        'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
        'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
        'entidade_id' => $this->entidade->id,
    ])->save();

    $this->unidadeFilha = new Unidade();
    $this->unidadeFilha->setConnection('tenant');
    $this->unidadeFilha->forceFill([
        'id' => Str::uuid()->toString(),
        'nome' => 'Unidade Filha',
        'sigla' => 'UFIL',
        'codigo' => '100001',
        'instituidora' => 0,
        'atividades_arquivamento_automatico' => 0,
        'atividades_avaliacao_automatico' => 0,
        'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
        'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
        'entidade_id' => $this->entidade->id,
        'unidade_pai_id' => $this->unidadePai->id,
    ])->save();

    $this->usuario = new Usuario();
    $this->usuario->setConnection('tenant');
    $this->usuario->forceFill([
        'id' => Str::uuid()->toString(),
        'nome' => 'Gestor Cache Test',
        'email' => 'cache-test@test.com',
        'cpf' => '99988877766',
        'apelido' => 'GestorCache',
        'password' => 'password',
        'modalidade_pgd' => 'presencial',
    ])->save();

    $integrante = new UnidadeIntegrante();
    $integrante->setConnection('tenant');
    $integrante->forceFill([
        'id' => Str::uuid()->toString(),
        'unidade_id' => $this->unidadePai->id,
        'usuario_id' => $this->usuario->id,
    ])->save();

    $atribuicao = new UnidadeIntegranteAtribuicao();
    $atribuicao->setConnection('tenant');
    $atribuicao->forceFill([
        'id' => Str::uuid()->toString(),
        'unidade_integrante_id' => $integrante->id,
        'atribuicao' => 'GESTOR',
    ])->save();

    $this->repository = app(EloquentUnidadeReadRepository::class);
});

describe('EloquentUnidadeReadRepository::isUsuarioGestorRecursivo - Cache E2E', function () {

    test('segunda chamada não executa queries no banco (cache hit)', function () {
        $unidadeId = $this->unidadeFilha->id;
        $usuarioId = $this->usuario->id;

        // Primeira chamada: popula o cache (executa queries)
        $resultado1 = $this->repository->isUsuarioGestorRecursivo($unidadeId, $usuarioId);
        expect($resultado1)->toBeTrue();

        // Segunda chamada: não deve executar queries
        DB::connection('tenant')->enableQueryLog();
        $resultado2 = $this->repository->isUsuarioGestorRecursivo($unidadeId, $usuarioId);
        $queries = DB::connection('tenant')->getQueryLog();
        DB::connection('tenant')->disableQueryLog();

        expect($resultado2)->toBeTrue();
        expect($queries)->toBeEmpty('Segunda chamada não deveria executar queries - cache deveria ser usado');
    });

    test('cache armazena unidades geridas com chave correta', function () {
        $usuarioId = $this->usuario->id;

        $this->repository->isUsuarioGestorRecursivo($this->unidadePai->id, $usuarioId);

        $cached = Cache::get('unidades-geridas:' . $usuarioId);
        expect($cached)->toBeArray();
        expect($cached)->toContain($this->unidadePai->id);
    });

    test('cache armazena hierarquia de subordinadas com chave correta', function () {
        $usuarioId = $this->usuario->id;

        // Chamar com unidade filha força lookup na hierarquia
        $this->repository->isUsuarioGestorRecursivo($this->unidadeFilha->id, $usuarioId);

        $cached = Cache::get('unidade-hierarquia:' . $this->unidadePai->id);
        expect($cached)->toBeArray();
        expect($cached)->toContain($this->unidadeFilha->id);
    });

    test('invalidação do cache força nova consulta ao banco', function () {
        $unidadeId = $this->unidadeFilha->id;
        $usuarioId = $this->usuario->id;

        // Popula cache
        $this->repository->isUsuarioGestorRecursivo($unidadeId, $usuarioId);

        // Invalida cache
        Cache::forget('unidades-geridas:' . $usuarioId);

        // Próxima chamada deve executar queries novamente
        DB::connection('tenant')->enableQueryLog();
        $this->repository->isUsuarioGestorRecursivo($unidadeId, $usuarioId);
        $queries = DB::connection('tenant')->getQueryLog();
        DB::connection('tenant')->disableQueryLog();

        expect($queries)->not->toBeEmpty('Após invalidação, deveria consultar o banco novamente');
    });

    test('retorna dados do cache e não do banco (prova com prefixo cached)', function () {
        $usuarioId = $this->usuario->id;
        $fakeUnidadeId = 'cached:' . $this->unidadeFilha->id;

        // Pré-popula o cache com UUID prefixado que não existe no banco
        Cache::put('unidades-geridas:' . $usuarioId, [$fakeUnidadeId], 3600);

        // Chamada usa o valor do cache — retorna true para o UUID prefixado
        $resultado = $this->repository->isUsuarioGestorRecursivo($fakeUnidadeId, $usuarioId);

        expect($resultado)->toBeTrue('Deveria retornar true pois o cache contém o UUID prefixado como unidade gerida');
    });

    test('retorna dados do cache de hierarquia e não do banco (prova com prefixo cached)', function () {
        $usuarioId = $this->usuario->id;
        $fakeSubordinadaId = 'cached:' . $this->unidadeFilha->id;

        // Pré-popula cache de unidades geridas com a unidade pai real
        Cache::put('unidades-geridas:' . $usuarioId, [$this->unidadePai->id], 3600);

        // Pré-popula cache de hierarquia com UUID prefixado que não existe no banco
        Cache::put('unidade-hierarquia:' . $this->unidadePai->id, [$fakeSubordinadaId], 3600);

        // Chamada busca o UUID prefixado nas subordinadas do cache — retorna true
        $resultado = $this->repository->isUsuarioGestorRecursivo($fakeSubordinadaId, $usuarioId);

        expect($resultado)->toBeTrue('Deveria retornar true pois o cache de hierarquia contém o UUID prefixado como subordinada');
    });

    test('resultado correto para unidade não subordinada (false com cache)', function () {
        $unidadeOrfa = new Unidade();
        $unidadeOrfa->setConnection('tenant');
        $unidadeOrfa->forceFill([
            'id' => Str::uuid()->toString(),
            'nome' => 'Unidade Orfã',
            'sigla' => 'UORF',
            'codigo' => '999999',
            'instituidora' => 0,
            'atividades_arquivamento_automatico' => 0,
            'atividades_avaliacao_automatico' => 0,
            'distribuicao_forma_contagem_prazos' => 'DIAS_UTEIS',
            'entrega_forma_contagem_prazos' => 'HORAS_UTEIS',
            'entidade_id' => $this->entidade->id,
        ])->save();

        // Primeira chamada
        $resultado1 = $this->repository->isUsuarioGestorRecursivo($unidadeOrfa->id, $this->usuario->id);
        expect($resultado1)->toBeFalse();

        // Segunda chamada (cached) - mesmo resultado
        DB::connection('tenant')->enableQueryLog();
        $resultado2 = $this->repository->isUsuarioGestorRecursivo($unidadeOrfa->id, $this->usuario->id);
        $queries = DB::connection('tenant')->getQueryLog();
        DB::connection('tenant')->disableQueryLog();

        expect($resultado2)->toBeFalse();
        expect($queries)->toBeEmpty();
    });

    test('invalidarCacheHierarquia limpa ambas as chaves de cache', function () {
        Cache::flush();

        $usuarioId = $this->usuario->id;

        // Popula ambos caches (agora no Redis)
        $this->repository->isUsuarioGestorRecursivo($this->unidadeFilha->id, $usuarioId);

        expect(Cache::has('unidades-geridas:' . $usuarioId))->toBeTrue();
        expect(Cache::has('unidade-hierarquia:' . $this->unidadePai->id))->toBeTrue();

        // Invalida tudo
        GestorHierarquiaCache::invalidarTudo();

        expect(Cache::has('unidades-geridas:' . $usuarioId))->toBeFalse();
        expect(Cache::has('unidade-hierarquia:' . $this->unidadePai->id))->toBeFalse();
    });
});
