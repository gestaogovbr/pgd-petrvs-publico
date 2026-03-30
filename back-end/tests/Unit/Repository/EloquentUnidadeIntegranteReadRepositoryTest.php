<?php

namespace Tests\Unit\Repository;

use App\Models\UnidadeIntegrante;
use App\Repository\UnidadeIntegrante\Eloquent\EloquentUnidadeIntegranteReadRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Mockery;
use Tests\TestCase;

class EloquentUnidadeIntegranteReadRepositoryTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function testFindGestorByUnidadeRetornaIntegranteQuandoEloquentRetornaModelCorreto(): void
    {
        $unidadeId = 'u-1';

        $builder = Mockery::mock(Builder::class);
        $builder->shouldReceive('with')->with('gestor')->andReturnSelf();
        $builder->shouldReceive('where')->with('unidade_id', $unidadeId)->andReturnSelf();
        $builder->shouldReceive('has')->with('gestor')->andReturnSelf();

        $integrante = new UnidadeIntegrante();
        $integrante->id = 'ui-1';

        $builder->shouldReceive('first')->andReturn($integrante);

        $model = Mockery::mock(UnidadeIntegrante::class);
        $model->shouldReceive('newQuery')->andReturn($builder);

        $repo = new EloquentUnidadeIntegranteReadRepository($model);

        $result = $repo->findGestorByUnidade($unidadeId);

        $this->assertInstanceOf(UnidadeIntegrante::class, $result);
        $this->assertSame('ui-1', $result->id);
    }

    public function testFindGestorByUnidadeRetornaNullQuandoEloquentRetornaOutroModel(): void
    {
        $unidadeId = 'u-2';

        $builder = Mockery::mock(Builder::class);
        $builder->shouldReceive('with')->with('gestor')->andReturnSelf();
        $builder->shouldReceive('where')->with('unidade_id', $unidadeId)->andReturnSelf();
        $builder->shouldReceive('has')->with('gestor')->andReturnSelf();
        $builder->shouldReceive('first')->andReturn(Mockery::mock(Model::class));

        $model = Mockery::mock(UnidadeIntegrante::class);
        $model->shouldReceive('newQuery')->andReturn($builder);

        $repo = new EloquentUnidadeIntegranteReadRepository($model);

        $this->assertNull($repo->findGestorByUnidade($unidadeId));
    }

    public function testFindUnidadeIntegranteRetornaIntegranteQuandoEloquentRetornaModelCorreto(): void
    {
        $unidadeId = 'u-3';
        $usuarioId = 'us-1';

        $builder = Mockery::mock(Builder::class);
        $builder->shouldReceive('where')->with('usuario_id', $usuarioId)->andReturnSelf();
        $builder->shouldReceive('where')->with('unidade_id', $unidadeId)->andReturnSelf();

        $integrante = new UnidadeIntegrante();
        $integrante->id = 'ui-2';

        $builder->shouldReceive('first')->andReturn($integrante);

        $model = Mockery::mock(UnidadeIntegrante::class);
        $model->shouldReceive('newQuery')->andReturn($builder);

        $repo = new EloquentUnidadeIntegranteReadRepository($model);

        $result = $repo->findUnidadeIntegrante($usuarioId, $unidadeId);

        $this->assertInstanceOf(UnidadeIntegrante::class, $result);
        $this->assertSame('ui-2', $result->id);
    }

    public function testFindUnidadeIntegranteRetornaNullQuandoEloquentRetornaNull(): void
    {
        $unidadeId = 'u-4';
        $usuarioId = 'us-2';

        $builder = Mockery::mock(Builder::class);
        $builder->shouldReceive('where')->with('usuario_id', $usuarioId)->andReturnSelf();
        $builder->shouldReceive('where')->with('unidade_id', $unidadeId)->andReturnSelf();
        $builder->shouldReceive('first')->andReturn(null);

        $model = Mockery::mock(UnidadeIntegrante::class);
        $model->shouldReceive('newQuery')->andReturn($builder);

        $repo = new EloquentUnidadeIntegranteReadRepository($model);

        $this->assertNull($repo->findUnidadeIntegrante($usuarioId, $unidadeId));
    }
}

