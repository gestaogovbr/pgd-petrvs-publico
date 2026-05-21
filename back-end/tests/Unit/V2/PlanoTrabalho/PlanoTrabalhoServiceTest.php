<?php

use App\V2\PlanoTrabalho\PlanoTrabalhoService;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoStoreDTO;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoIndexValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoStoreValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoArquivarValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoCancelarValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoClonarValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoDestroyValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoEncerrarValidator;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoWriteRepositoryContract;
use App\Repository\UnidadeRepository;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoUpdateValidator;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use App\V2\StatusService;
use App\V2\PlanoTrabalho\Documento\TCR\TCRInvalidador;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->readRepository = Mockery::mock(PlanoTrabalhoReadRepositoryContract::class);
    $this->writeRepository = Mockery::mock(PlanoTrabalhoWriteRepositoryContract::class);
    $this->unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $this->storeValidator = Mockery::mock(PlanoTrabalhoStoreValidator::class);
    $this->updateValidator = Mockery::mock(PlanoTrabalhoUpdateValidator::class);
    $this->destroyValidator = Mockery::mock(PlanoTrabalhoDestroyValidator::class);
    $this->cancelarValidator = Mockery::mock(PlanoTrabalhoCancelarValidator::class);
    $this->encerrarValidator = Mockery::mock(PlanoTrabalhoEncerrarValidator::class);
    $this->arquivarValidator = Mockery::mock(PlanoTrabalhoArquivarValidator::class);
    $this->clonarValidator = Mockery::mock(PlanoTrabalhoClonarValidator::class);
    $this->indexValidator = Mockery::mock(PlanoTrabalhoIndexValidator::class);
    $this->statusService = Mockery::mock(StatusService::class);
    $this->tcrInvalidador = Mockery::mock(TCRInvalidador::class);
    $this->consolidacaoRepository = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);

    $this->service = new PlanoTrabalhoService(
        $this->readRepository,
        $this->writeRepository,
        $this->unidadeRepository,
        $this->storeValidator,
        $this->updateValidator,
        $this->destroyValidator,
        $this->cancelarValidator,
        $this->encerrarValidator,
        $this->arquivarValidator,
        $this->clonarValidator,
        $this->indexValidator,
        $this->statusService,
        $this->tcrInvalidador,
        $this->consolidacaoRepository,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoService::index', function () {

    test('delega ao repository com o filtro construído', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->indexValidator->shouldReceive('validar')->once()->with(Mockery::type(PlanoTrabalhoIndexDTO::class))->andReturnUsing(fn ($f) => $f);
        $paginator = Mockery::mock(LengthAwarePaginator::class);

        $this->readRepository
            ->shouldReceive('buscarPlanosListagem')
            ->once()
            ->with(Mockery::type(PlanoTrabalhoIndexDTO::class))
            ->andReturn($paginator);

        $result = $this->service->index(['filters' => ['vigentes' => true]]);

        expect($result)->toBe($paginator);
    });

    test('expande unidades com subordinadas quando flag subordinadas=true', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->indexValidator->shouldReceive('validar')->once()->with(Mockery::type(PlanoTrabalhoIndexDTO::class))->andReturnUsing(fn ($f) => $f);
        $paginator = Mockery::mock(LengthAwarePaginator::class);

        $this->unidadeRepository
            ->shouldReceive('getSubordinadasRecursivas')
            ->once()
            ->with(['unidade-1'])
            ->andReturn(new Collection([
                (object) ['id' => 'unidade-2'],
                (object) ['id' => 'unidade-3'],
            ]));

        $this->readRepository
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
                'incluir_subordinadas' => true,
            ],
        ]);
    });

    test('propaga usuario_nome e unidade_regramento no filtro ao repository', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->indexValidator->shouldReceive('validar')->once()->andReturnUsing(fn ($f) => $f);
        $paginator = Mockery::mock(LengthAwarePaginator::class);

        $this->readRepository
            ->shouldReceive('buscarPlanosListagem')
            ->once()
            ->with(Mockery::on(fn (PlanoTrabalhoIndexDTO $f) =>
                $f->usuarioNome === 'João' && $f->unidadeRegramento === 'COGEP'
            ))
            ->andReturn($paginator);

        $this->service->index([
            'filters' => [
                'vigentes' => true,
                'usuario_nome' => 'João',
                'unidade_regramento' => 'COGEP',
            ],
        ]);
    });

    test('não expande subordinadas quando flag subordinadas está ausente', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->indexValidator->shouldReceive('validar')->once()->with(Mockery::type(PlanoTrabalhoIndexDTO::class))->andReturnUsing(fn ($f) => $f);
        $paginator = Mockery::mock(LengthAwarePaginator::class);

        $this->unidadeRepository->shouldNotReceive('getSubordinadasRecursivas');

        $this->readRepository
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

        $this->storeValidator
            ->shouldReceive('validarAutorizacao')
            ->once();

        $this->storeValidator
            ->shouldReceive('validar')
            ->once()
            ->with(Mockery::type(PlanoTrabalhoStoreDTO::class));

        $this->writeRepository
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
            'modalidade_pgd' => 'presencial',
        ]);

        expect($result)->toBe($plano);
    });

    test('não persiste quando validação lança exceção', function () {
        Auth::shouldReceive('id')->andReturn('criador-1');

        $this->storeValidator
            ->shouldReceive('validarAutorizacao')
            ->once();

        $this->storeValidator
            ->shouldReceive('validar')
            ->once()
            ->andThrow(new ValidateException('A unidade está inativa.'));

        $this->writeRepository->shouldNotReceive('create');

        $this->service->store([
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-inativa',
            'programa_id' => 'programa-1',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'modalidade_pgd' => 'presencial',
        ]);
    })->throws(ValidateException::class, 'A unidade está inativa.');

    test('passa criacao_usuario_id do usuário autenticado ao DTO', function () {
        Auth::shouldReceive('id')->andReturn('criador-xyz');

        $plano = Mockery::mock(PlanoTrabalho::class);

        $this->storeValidator->shouldReceive('validarAutorizacao')->once();
        $this->storeValidator->shouldReceive('validar')->once();

        $this->writeRepository
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
            'modalidade_pgd' => 'presencial',
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

        $this->writeRepository
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
            ->andThrow(new ValidateException('Plano de Trabalho não pode ser excluído pois não é mais um rascunho.'));

        $this->writeRepository->shouldNotReceive('delete');

        $this->service->destroy('plano-1');
    })->throws(ValidateException::class, 'Plano de Trabalho não pode ser excluído pois não é mais um rascunho.');
});

describe('PlanoTrabalhoService::show', function () {

    test('retorna plano quando sem entregas', function () {
        Auth::shouldReceive('id')->andReturn('user-1');

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->usuario_id = 'user-1';
        $plano->unidade_id = 'u-1';

        $this->readRepository
            ->shouldReceive('findByIdComRelacoes')
            ->once()
            ->with('plano-1')
            ->andReturn($plano);

        $result = $this->service->show('plano-1');

        expect($result)->toBe($plano);
    });

    test('retorna plano quando tem entregas', function () {
        Auth::shouldReceive('id')->andReturn('user-1');

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->usuario_id = 'user-1';
        $plano->unidade_id = 'u-1';
        $plano->setRelation('entregas', new Collection([
            (object) ['id' => 'entrega-1'],
        ]));

        $this->readRepository
            ->shouldReceive('findByIdComRelacoes')
            ->once()
            ->with('plano-2')
            ->andReturn($plano);

        $result = $this->service->show('plano-2');

        expect($result)->toBe($plano);
    });

    test('lança NotFoundException quando plano não encontrado', function () {
        $this->readRepository
            ->shouldReceive('findByIdComRelacoes')
            ->once()
            ->with('inexistente')
            ->andReturn(null);

        $this->service->show('inexistente');
    })->throws(NotFoundException::class, 'Plano de Trabalho não encontrado.');

    test('mantém afastamentos quando usuário é dono do plano', function () {
        Auth::shouldReceive('id')->andReturn('dono-1');

        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->shouldNotReceive('unsetRelation');

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->usuario_id = 'dono-1';
        $plano->unidade_id = 'unidade-1';
        $plano->setRelation('consolidacoes', new Collection([$consolidacao]));

        $this->readRepository->shouldReceive('findByIdComRelacoes')->andReturn($plano);

        $this->service->show('plano-1');
    });

    test('mantém afastamentos quando usuário é chefia', function () {
        Auth::shouldReceive('id')->andReturn('chefia-1');

        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->shouldNotReceive('unsetRelation');

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->usuario_id = 'outro-user';
        $plano->unidade_id = 'unidade-1';
        $plano->setRelation('consolidacoes', new Collection([$consolidacao]));

        $this->readRepository->shouldReceive('findByIdComRelacoes')->andReturn($plano);
        $this->unidadeRepository->shouldReceive('isUsuarioGestorRecursivo')
            ->with('unidade-1', 'chefia-1')->andReturn(true);

        $this->service->show('plano-1');
    });

    test('remove afastamentos quando usuário não é dono nem chefia', function () {
        Auth::shouldReceive('id')->andReturn('estranho-1');

        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->shouldReceive('unsetRelation')->with('afastamentos')->once();

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->usuario_id = 'outro-user';
        $plano->unidade_id = 'unidade-1';
        $plano->setRelation('consolidacoes', new Collection([$consolidacao]));

        $this->readRepository->shouldReceive('findByIdComRelacoes')->andReturn($plano);
        $this->unidadeRepository->shouldReceive('isUsuarioGestorRecursivo')
            ->with('unidade-1', 'estranho-1')->andReturn(false);

        $this->service->show('plano-1');
    });
});

describe('PlanoTrabalhoService::statuses', function () {

    test('retorna statuses do Model', function () {
        expect($this->service->statuses())->toBe(PlanoTrabalho::STATUSES);
    });
});

describe('PlanoTrabalhoService::update', function () {

    test('perfil Consulta é bloqueado ao tentar editar um PT', function () {
        Auth::shouldReceive('id')->andReturn('user-consulta');

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';

        $this->readRepository->shouldReceive('findById')->with('plano-1')->andReturn($plano);

        $this->storeValidator->shouldReceive('validarAutorizacao')
            ->once()
            ->andThrow(new \App\Exceptions\ForbiddenException('Usuário com este perfil não pode cadastrar plano de trabalho.'));

        $this->updateValidator->shouldNotReceive('validar');
        $this->writeRepository->shouldNotReceive('update');

        $this->service->update('plano-1', [
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'programa_id' => 'programa-1',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'modalidade_pgd' => 'presencial',
        ]);
    })->throws(\App\Exceptions\ForbiddenException::class);
});

describe('PlanoTrabalhoService::encerrar', function () {
    test('ajusta data_fim, soft-deleta consolidações futuras e ajusta vigente', function () {
        $planoId = 'plano-123';
        $userId = 'user-456';
        $hoje = now()->format('Y-m-d');

        Auth::shouldReceive('id')->andReturn($userId);

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = $planoId;
        $plano->shouldReceive('refresh')->andReturnSelf();
        $plano->shouldReceive('load')->andReturnSelf();

        $this->encerrarValidator->shouldReceive('validar')
            ->with($planoId, $userId)
            ->andReturn($plano);

        $this->writeRepository->shouldReceive('update')
            ->once()
            ->with($planoId, Mockery::on(fn ($data) =>
                $data['encerrado_at'] === $hoje && $data['data_fim'] === $hoje
            ))
            ->andReturn($plano);

        $this->consolidacaoRepository->shouldReceive('ajustarDataFimVigente')
            ->once()
            ->with($planoId, $hoje);

        $this->consolidacaoRepository->shouldReceive('concluirTodas')
            ->once()
            ->with($planoId);

        $this->statusService->shouldReceive('atualizaStatus')
            ->once()
            ->with($plano, 'CONCLUIDO', Mockery::on(fn ($msg) => str_contains($msg, 'motivo teste')));

        $result = $this->service->encerrar($planoId, 'motivo teste');

        expect($result)->toBe($plano);
    });
});
