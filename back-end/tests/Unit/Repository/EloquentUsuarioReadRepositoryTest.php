<?php

use App\Enums\PerfilEnum;
use App\Models\Usuario;
use App\Repository\Usuario\Eloquent\EloquentUsuarioReadRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UnidadeIntegranteRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

afterAll(function () {
    \Mockery::close();
});

function makeUsuarioRepo($model): EloquentUsuarioReadRepository {
    $unidadeRepo = \Mockery::mock(UnidadeRepository::class);
    $integranteRepo = \Mockery::mock(UnidadeIntegranteRepository::class);
    return new EloquentUsuarioReadRepository($model, $unidadeRepo, $integranteRepo);
}

test('findByEmail retorna null quando email vazio sem consultar o banco', function () {
    $builder = \Mockery::mock(Builder::class);
    $builder->shouldReceive('where')->withAnyArgs()->andReturnSelf()->byDefault();
    $builder->shouldReceive('first')->andReturn(null)->byDefault();

    $model = \Mockery::mock(Usuario::class);
    $model->shouldReceive('newQuery')->never()->andReturn($builder);

    $repo = makeUsuarioRepo($model);

    expect($repo->findByEmail(''))->toBeNull();
});

test('findByEmail retorna null quando email nulo sem consultar o banco', function () {
    $builder = \Mockery::mock(Builder::class);
    $builder->shouldReceive('where')->withAnyArgs()->andReturnSelf()->byDefault();
    $builder->shouldReceive('first')->andReturn(null)->byDefault();

    $model = \Mockery::mock(Usuario::class);
    $model->shouldReceive('newQuery')->never()->andReturn($builder);

    $repo = makeUsuarioRepo($model);

    expect($repo->findByEmail(null))->toBeNull();
});

test('findByCpfOrEmail não adiciona filtro de email quando email vazio', function () {
    $cpf = '123.456.789-01';
    $email = '';

    $outerBuilder = \Mockery::mock(Builder::class);
    $outerBuilder->shouldReceive('where')
        ->once()
        ->with(\Mockery::on(function ($callback) {
            if (!is_callable($callback)) {
                return false;
            }

            $innerBuilder = \Mockery::mock(Builder::class);
            $innerBuilder->shouldReceive('where')->once()->with('cpf', \Mockery::any())->andReturnSelf();
            $innerBuilder->shouldNotReceive('orWhere');

            $callback($innerBuilder);

            return true;
        }))
        ->andReturnSelf();

    $outerBuilder->shouldReceive('first')->andReturn(null);

    $model = \Mockery::mock(Usuario::class);
    $model->shouldReceive('newQuery')->andReturn($outerBuilder);

    $repo = makeUsuarioRepo($model);

    expect($repo->findByCpfOrEmail($cpf, $email))->toBeNull();
});

test('findByCpfOrEmail não adiciona filtro de email quando email nulo', function () {
    $cpf = '123.456.789-01';
    $email = null;

    $outerBuilder = \Mockery::mock(Builder::class);
    $outerBuilder->shouldReceive('where')
        ->once()
        ->with(\Mockery::on(function ($callback) {
            if (!is_callable($callback)) {
                return false;
            }

            $innerBuilder = \Mockery::mock(Builder::class);
            $innerBuilder->shouldReceive('where')->once()->with('cpf', \Mockery::any())->andReturnSelf();
            $innerBuilder->shouldNotReceive('orWhere');

            $callback($innerBuilder);

            return true;
        }))
        ->andReturnSelf();

    $outerBuilder->shouldReceive('first')->andReturn(null);

    $model = \Mockery::mock(Usuario::class);
    $model->shouldReceive('newQuery')->andReturn($outerBuilder);

    $repo = makeUsuarioRepo($model);

    expect($repo->findByCpfOrEmail($cpf, $email))->toBeNull();
});

test('findByIdComAreasTrabalho aplica whereKey e eager load areasTrabalho.unidade', function () {
    $usuario = \Mockery::mock(Usuario::class);

    $builder = \Mockery::mock(Builder::class);
    $builder->shouldReceive('whereKey')->once()->with('user-1')->andReturnSelf();
    $builder->shouldReceive('with')->once()->with(['areasTrabalho.unidade'])->andReturnSelf();
    $builder->shouldReceive('first')->once()->andReturn($usuario);

    $model = \Mockery::mock(Usuario::class);
    $model->shouldReceive('newQuery')->andReturn($builder);

    $repo = makeUsuarioRepo($model);

    expect($repo->findByIdComAreasTrabalho('user-1'))->toBe($usuario);
});

test('findAgentesPublicosNoEscopoCadastrante retorna coleção vazia quando cadastrante não tem unidades no escopo', function () {
    $integranteRepo = \Mockery::mock(UnidadeIntegranteRepository::class);
    $integranteRepo->shouldReceive('findAllComAtribuicoesAtivasByUsuario')
        ->once()
        ->with('cad-1')
        ->andReturn(new Collection());

    $unidadeRepo = \Mockery::mock(UnidadeRepository::class);
    $unidadeRepo->shouldReceive('getSubordinadasRecursivas')
        ->once()
        ->with([])
        ->andReturn(new Collection());

    $model = \Mockery::mock(Usuario::class);
    $model->shouldReceive('newQuery')->never();
    $empty = new Collection();
    $model->shouldReceive('newCollection')->once()->andReturn($empty);

    $repo = new EloquentUsuarioReadRepository($model, $unidadeRepo, $integranteRepo);

    expect($repo->findAgentesPublicosNoEscopoCadastrante('João', 'cad-1'))->toBe($empty);
});

test('findAgentesPublicosNoEscopoCadastrante aplica participa_pgd sim e filtros de escopo RN18', function () {
    $integrante = new \stdClass();
    $integrante->unidade_id = 'unidade-1';

    $subordinada = new \stdClass();
    $subordinada->id = 'unidade-2';

    $integranteRepo = \Mockery::mock(UnidadeIntegranteRepository::class);
    $integranteRepo->shouldReceive('findAllComAtribuicoesAtivasByUsuario')
        ->once()
        ->with('cad-1')
        ->andReturn(new Collection([$integrante]));

    $unidadeRepo = \Mockery::mock(UnidadeRepository::class);
    $unidadeRepo->shouldReceive('getSubordinadasRecursivas')
        ->once()
        ->with(['unidade-1'])
        ->andReturn(new Collection([$subordinada]));

    $expected = new Collection([(object) ['id' => 'agent-1', 'nome' => 'Agente', 'matricula' => '001', 'cpf' => '000']]);

    $builder = \Mockery::mock(Builder::class);
    $builder->shouldReceive('select')
        ->once()
        ->with(['usuarios.id', 'usuarios.nome', 'usuarios.matricula', 'usuarios.cpf', 'usuarios.modalidade_pgd'])
        ->andReturnSelf();
    $builder->shouldReceive('where')
        ->once()
        ->with(\Mockery::on(function ($callback) {
            if (!is_callable($callback)) {
                return false;
            }

            $inner = \Mockery::mock(Builder::class);
            $inner->shouldReceive('where')->once()->with('usuarios.nome', 'like', '%João%')->andReturnSelf();
            $inner->shouldReceive('orWhere')->once()->with('usuarios.matricula', 'like', '%João%')->andReturnSelf();
            $callback($inner);

            return true;
        }))
        ->andReturnSelf();
    $builder->shouldReceive('where')
        ->once()
        ->with('participa_pgd', '=', 'sim')
        ->andReturnSelf();
    $builder->shouldReceive('whereHas')
        ->once()
        ->with('perfil', \Mockery::on(function ($callback) {
            if (!is_callable($callback)) {
                return false;
            }

            $perfilQuery = \Mockery::mock(Builder::class);
            $perfilQuery->shouldReceive('where')
                ->once()
                ->with('nivel', '<', PerfilEnum::COLABORADOR->value)
                ->andReturnSelf();
            $callback($perfilQuery);

            return true;
        }))
        ->andReturnSelf();
    $builder->shouldReceive('whereHas')
        ->once()
        ->with('areasTrabalho', \Mockery::on(function ($callback) {
            if (!is_callable($callback)) {
                return false;
            }

            $areasQuery = \Mockery::mock(Builder::class);
            $areasQuery->shouldReceive('whereIn')
                ->once()
                ->with('unidade_id', ['unidade-1', 'unidade-2'])
                ->andReturnSelf();
            $callback($areasQuery);

            return true;
        }))
        ->andReturnSelf();
    $builder->shouldReceive('with')
        ->once()
        ->with(['lotacao:id,usuario_id,unidade_id', 'lotacao.unidade:id,unidade_pai_id'])
        ->andReturnSelf();
    $builder->shouldReceive('limit')->once()->with(25)->andReturnSelf();
    $builder->shouldReceive('get')->once()->andReturn($expected);

    $model = \Mockery::mock(Usuario::class);
    $model->shouldReceive('getTable')->andReturn('usuarios');
    $model->shouldReceive('newQuery')->andReturn($builder);

    $repo = new EloquentUsuarioReadRepository($model, $unidadeRepo, $integranteRepo);

    $result = $repo->findAgentesPublicosNoEscopoCadastrante('João', 'cad-1', 25);

    expect($result)->toBe($expected);
});
