<?php

use App\V2\PlanoTrabalho\PlanoTrabalhoService;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoStoreDTO;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoStoreValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoDestroyValidator;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\V2\CalculadoraPeriodosAvaliativos;
use App\Models\PlanoTrabalho;
use App\Exceptions\ServerException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->repository = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $this->calculadora = Mockery::mock(CalculadoraPeriodosAvaliativos::class);
    $this->storeValidacao = Mockery::mock(PlanoTrabalhoStoreValidator::class);
    $this->destroyValidator = Mockery::mock(PlanoTrabalhoDestroyValidator::class);

    $this->service = new PlanoTrabalhoService(
        $this->repository,
        $this->unidadeRepository,
        $this->calculadora,
        $this->storeValidacao,
        $this->destroyValidator,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoService::index', function () {

    test('delega ao repository com o filtro construído', function () {
        $paginator = Mockery::mock(LengthAwarePaginator::class);

        $this->repository
            ->shouldReceive('buscarPlanosListagem')
            ->once()
            ->with(Mockery::type(PlanoTrabalhoIndexDTO::class))
            ->andReturn($paginator);

        $result = $this->service->index(['filters' => ['vigentes' => true]]);

        expect($result)->toBe($paginator);
    });

    test('expande unidades com subordinadas quando flag subordinadas=true', function () {
        $paginator = Mockery::mock(LengthAwarePaginator::class);

        $this->unidadeRepository
            ->shouldReceive('getSubordinadasRecursivas')
            ->once()
            ->with(['unidade-1'])
            ->andReturn(new Collection([
                (object) ['id' => 'unidade-2'],
                (object) ['id' => 'unidade-3'],
            ]));

        $this->repository
            ->shouldReceive('buscarPlanosListagem')
            ->once()
            ->with(Mockery::on(fn (PlanoTrabalhoIndexDTO $f) =>
                $f->unidadesId === ['unidade-1', 'unidade-2', 'unidade-3']
            ))
            ->andReturn($paginator);

        $this->service->index([
            'filters' => [
                'vigentes' => true,
                'unidade_id' => ['unidade-1'],
                'subordinadas' => true,
            ],
        ]);
    });

    test('não expande subordinadas quando flag subordinadas está ausente', function () {
        $paginator = Mockery::mock(LengthAwarePaginator::class);

        $this->unidadeRepository->shouldNotReceive('getSubordinadasRecursivas');

        $this->repository
            ->shouldReceive('buscarPlanosListagem')
            ->once()
            ->andReturn($paginator);

        $this->service->index(['filters' => ['vigentes' => true]]);
    });
});

describe('PlanoTrabalhoService::store', function () {

    test('chama validação e persiste via repository', function () {
        Auth::shouldReceive('id')->andReturn('criador-1');

        $plano = Mockery::mock(PlanoTrabalho::class);

        $this->storeValidacao
            ->shouldReceive('validarAutorizacao')
            ->once();

        $this->storeValidacao
            ->shouldReceive('validar')
            ->once()
            ->with(Mockery::type(PlanoTrabalhoStoreDTO::class));

        $this->repository
            ->shouldReceive('create')
            ->once()
            ->with(Mockery::type('array'))
            ->andReturn($plano);

        $result = $this->service->store([
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'programa_id' => 'programa-1',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'tipo_modalidade_id' => 'mod-1',
        ]);

        expect($result)->toBe($plano);
    });

    test('não persiste quando validação lança exceção', function () {
        Auth::shouldReceive('id')->andReturn('criador-1');

        $this->storeValidacao
            ->shouldReceive('validarAutorizacao')
            ->once();

        $this->storeValidacao
            ->shouldReceive('validar')
            ->once()
            ->andThrow(new ServerException('ValidatePlanoTrabalho', 'A unidade está inativa.'));

        $this->repository->shouldNotReceive('create');

        $this->service->store([
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-inativa',
            'programa_id' => 'programa-1',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'tipo_modalidade_id' => 'mod-1',
        ]);
    })->throws(ServerException::class, 'A unidade está inativa.');

    test('passa criacao_usuario_id do usuário autenticado ao DTO', function () {
        Auth::shouldReceive('id')->andReturn('criador-xyz');

        $plano = Mockery::mock(PlanoTrabalho::class);

        $this->storeValidacao->shouldReceive('validarAutorizacao')->once();
        $this->storeValidacao->shouldReceive('validar')->once();

        $this->repository
            ->shouldReceive('create')
            ->once()
            ->with(Mockery::on(fn (array $attrs) =>
                $attrs['criacao_usuario_id'] === 'criador-xyz'
            ))
            ->andReturn($plano);

        $this->service->store([
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'programa_id' => 'programa-1',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'tipo_modalidade_id' => 'mod-1',
        ]);
    });
});

describe('PlanoTrabalhoService::destroy', function () {

    test('valida e deleta via repository', function () {
        Auth::shouldReceive('id')->andReturn('user-1');

        $this->destroyValidator
            ->shouldReceive('validar')
            ->once()
            ->with('plano-1', 'user-1');

        $this->repository
            ->shouldReceive('delete')
            ->once()
            ->with('plano-1')
            ->andReturn(true);

        $result = $this->service->destroy('plano-1');

        expect($result)->toBeTrue();
    });

    test('não deleta quando validação lança exceção', function () {
        Auth::shouldReceive('id')->andReturn('user-1');

        $this->destroyValidator
            ->shouldReceive('validar')
            ->once()
            ->andThrow(new ServerException('ValidatePlanoTrabalho', 'Plano de Trabalho não pode ser excluído pois não é mais um rascunho.'));

        $this->repository->shouldNotReceive('delete');

        $this->service->destroy('plano-1');
    })->throws(ServerException::class, 'Plano de Trabalho não pode ser excluído pois não é mais um rascunho.');
});

describe('PlanoTrabalhoService::show', function () {

    test('retorna plano quando sem entregas', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();

        $this->repository
            ->shouldReceive('findByIdComRelacoes')
            ->once()
            ->with('plano-1')
            ->andReturn($plano);

        $result = $this->service->show('plano-1');

        expect($result)->toBe($plano);
    });

    test('retorna plano quando tem entregas', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->setRelation('entregas', new Collection([
            (object) ['id' => 'entrega-1'],
        ]));

        $this->repository
            ->shouldReceive('findByIdComRelacoes')
            ->once()
            ->with('plano-2')
            ->andReturn($plano);

        $result = $this->service->show('plano-2');

        expect($result)->toBe($plano);
    });

    test('lança ServerException quando plano não encontrado', function () {
        $this->repository
            ->shouldReceive('findByIdComRelacoes')
            ->once()
            ->with('inexistente')
            ->andReturn(null);

        $this->service->show('inexistente');
    })->throws(ServerException::class, 'Plano de Trabalho não encontrado.');
});
