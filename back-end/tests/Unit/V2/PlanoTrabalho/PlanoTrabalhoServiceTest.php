<?php

use App\V2\PlanoTrabalho\PlanoTrabalhoService;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoStoreDTO;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoIndexValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoStoreValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoArquivarValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoCancelarValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoClonarValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoDesarquivarValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoDestroyValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoEncerrarValidator;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoWriteRepositoryContract;
use App\Repository\UnidadeRepository;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoUpdateValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoUpdateAuthorizationValidator;
use App\V2\PlanoTrabalho\Authorization\PlanoTrabalhoAuthorization;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoAcoesDTO;
use App\Repository\UsuarioRepository;
use App\Models\Usuario;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use App\V2\StatusService;
use App\V2\PlanoTrabalho\Documento\TCR\TCRInvalidador;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoEntrega\Contracts\PlanoTrabalhoEntregaWriteRepositoryContract;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
    $this->desarquivarValidator = Mockery::mock(PlanoTrabalhoDesarquivarValidator::class);
    $this->clonarValidator = Mockery::mock(PlanoTrabalhoClonarValidator::class);
    $this->indexValidator = Mockery::mock(PlanoTrabalhoIndexValidator::class);
    $this->updateAuthorizationValidator = Mockery::mock(PlanoTrabalhoUpdateAuthorizationValidator::class);
    $this->authorization = Mockery::mock(PlanoTrabalhoAuthorization::class);
    $this->usuarioRepository = Mockery::mock(UsuarioRepository::class);
    $this->usuarioRepository->shouldReceive('findById')->byDefault()->andReturnUsing(function () {
        $u = Mockery::mock(Usuario::class)->makePartial();
        $u->cod_jornada = 40;
        $u->cpf = '12345678901';
        return $u;
    });
    $this->statusService = Mockery::mock(StatusService::class);
    $this->tcrInvalidador = Mockery::mock(TCRInvalidador::class);
    $this->consolidacaoRepository = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->entregaWriteRepository = Mockery::mock(PlanoTrabalhoEntregaWriteRepositoryContract::class);

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
        $this->desarquivarValidator,
        $this->clonarValidator,
        $this->indexValidator,
        $this->updateAuthorizationValidator,
        $this->authorization,
        $this->usuarioRepository,
        $this->statusService,
        $this->tcrInvalidador,
        $this->consolidacaoRepository,
        $this->entregaWriteRepository,
    );
});

afterEach(function () {
    Mockery::close();
});

function mockPaginatorComEnriquecimentoAcoes(): LengthAwarePaginator
{
    $planoItem = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $planoItem->id = 'plano-mock';
    $collection = new Collection([$planoItem]);
    $paginator = Mockery::mock(LengthAwarePaginator::class);
    $paginator->shouldReceive('getCollection')->andReturn($collection);

    $usuario = Mockery::mock(Usuario::class)->makePartial();
    $usuario->shouldReceive('loadMissing')->with('perfil')->andReturnSelf();

    test()->usuarioRepository
        ->shouldReceive('findByIdComAreasTrabalho')
        ->with('user-1')
        ->andReturn($usuario);

    test()->arquivarValidator
        ->shouldReceive('isElegivelParaArquivamento')
        ->andReturn(false);

    test()->authorization
        ->shouldReceive('acoes')
        ->andReturn(new PlanoTrabalhoAcoesDTO(editar: false));

    return $paginator;
}

function mockShowEnriquecimentoAcoes(PlanoTrabalho $plano): void
{
    $usuario = Mockery::mock(Usuario::class)->makePartial();
    $usuario->shouldReceive('loadMissing')->with('perfil')->andReturnSelf();

    test()->usuarioRepository
        ->shouldReceive('findByIdComAreasTrabalho')
        ->andReturn($usuario);

    test()->arquivarValidator
        ->shouldReceive('isElegivelParaArquivamento')
        ->andReturn(false);

    test()->authorization
        ->shouldReceive('acoes')
        ->with($plano, $usuario, Mockery::type('bool'))
        ->andReturn(new PlanoTrabalhoAcoesDTO(editar: false));

    $participante = Mockery::mock(Usuario::class)->makePartial();
    $participante->cpf = '12345678901';

    test()->usuarioRepository
        ->shouldReceive('findById')
        ->with($plano->usuario_id)
        ->andReturn($participante);

    $authUser = Mockery::mock(Usuario::class)->makePartial();
    $authUser->cpf = '12345678901';
    Auth::shouldReceive('user')->andReturn($authUser);
}

describe('PlanoTrabalhoService::index', function () {

    test('delega ao repository com o filtro construído e enriquece acoes', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->indexValidator->shouldReceive('validar')->once()->with(Mockery::type(PlanoTrabalhoIndexDTO::class))->andReturnUsing(fn ($f) => $f);

        $planoItem = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $planoItem->id = 'plano-1';
        $collection = new Collection([$planoItem]);
        $paginator = Mockery::mock(LengthAwarePaginator::class);
        $paginator->shouldReceive('getCollection')->once()->andReturn($collection);

        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->shouldReceive('loadMissing')->with('perfil')->andReturnSelf();

        $this->readRepository
            ->shouldReceive('buscarPlanosListagem')
            ->once()
            ->with(Mockery::type(PlanoTrabalhoIndexDTO::class))
            ->andReturn($paginator);

        $this->usuarioRepository
            ->shouldReceive('findByIdComAreasTrabalho')
            ->once()
            ->with('user-1')
            ->andReturn($usuario);

        $this->arquivarValidator
            ->shouldReceive('isElegivelParaArquivamento')
            ->once()
            ->with($planoItem)
            ->andReturn(false);

        $this->authorization
            ->shouldReceive('acoes')
            ->once()
            ->with($planoItem, $usuario, false)
            ->andReturn(new PlanoTrabalhoAcoesDTO(editar: true));

        $result = $this->service->index(['filters' => ['vigentes' => true]]);

        expect($result)->toBe($paginator)
            ->and($planoItem->getAttribute('acoes'))->toBe(['editar' => true, 'arquivar' => false, 'desarquivar' => false, 'encerrar' => false]);
    });

    test('expande unidades com subordinadas quando flag subordinadas=true', function () {
        Auth::shouldReceive('id')->andReturn('user-1');
        $this->indexValidator->shouldReceive('validar')->once()->with(Mockery::type(PlanoTrabalhoIndexDTO::class))->andReturnUsing(fn ($f) => $f);
        $paginator = mockPaginatorComEnriquecimentoAcoes();

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
        $paginator = mockPaginatorComEnriquecimentoAcoes();

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
        $paginator = mockPaginatorComEnriquecimentoAcoes();

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

        $usuario = Mockery::mock(\App\Models\Usuario::class)->makePartial();
        $usuario->cod_jornada = 40;

        $this->usuarioRepository
            ->shouldReceive('findById')
            ->with('user-1')
            ->andReturn($usuario);

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
            ->with(Mockery::on(fn ($data) => $data['carga_horaria'] === 8.0))
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

        $usuario = Mockery::mock(\App\Models\Usuario::class)->makePartial();
        $usuario->cod_jornada = 40;

        $this->usuarioRepository
            ->shouldReceive('findById')
            ->with('user-1')
            ->andReturn($usuario);

        $this->storeValidator->shouldReceive('validarAutorizacao')->once();
        $this->storeValidator->shouldReceive('validar')->once();

        $this->writeRepository
            ->shouldReceive('create')
            ->once()
            ->with(Mockery::on(fn (array $attrs) =>
                $attrs['criacao_usuario_id'] === 'criador-xyz'
                && $attrs['carga_horaria'] === 8.0
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
        $plano->id = 'plano-1';
        $plano->usuario_id = 'user-1';
        $plano->unidade_id = 'u-1';

        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->shouldReceive('loadMissing')->with('perfil')->andReturnSelf();

        $this->readRepository
            ->shouldReceive('findByIdComRelacoes')
            ->once()
            ->with('plano-1')
            ->andReturn($plano);

        $this->usuarioRepository
            ->shouldReceive('findByIdComAreasTrabalho')
            ->once()
            ->with('user-1')
            ->andReturn($usuario);

        $this->arquivarValidator
            ->shouldReceive('isElegivelParaArquivamento')
            ->once()
            ->with($plano)
            ->andReturn(false);

        $this->authorization
            ->shouldReceive('acoes')
            ->once()
            ->with($plano, $usuario, false)
            ->andReturn(new PlanoTrabalhoAcoesDTO(editar: true));

        $participante = Mockery::mock(Usuario::class)->makePartial();
        $participante->cpf = '12345678901';

        $this->usuarioRepository
            ->shouldReceive('findById')
            ->with('user-1')
            ->andReturn($participante);

        $authUser = Mockery::mock(Usuario::class)->makePartial();
        $authUser->cpf = '12345678901';
        Auth::shouldReceive('user')->andReturn($authUser);

        $result = $this->service->show('plano-1');

        expect($result)->toBe($plano)
            ->and($plano->getAttribute('acoes'))->toBe(['editar' => true, 'arquivar' => false, 'desarquivar' => false, 'encerrar' => false])
            ->and($plano->getAttribute('is_proprio'))->toBeTrue();
    });

    test('retorna plano quando tem entregas', function () {
        Auth::shouldReceive('id')->andReturn('user-1');

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-2';
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

        mockShowEnriquecimentoAcoes($plano);

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
        $plano->id = 'plano-1';
        $plano->usuario_id = 'dono-1';
        $plano->unidade_id = 'unidade-1';
        $plano->setRelation('consolidacoes', new Collection([$consolidacao]));

        $this->readRepository->shouldReceive('findByIdComRelacoes')->andReturn($plano);

        mockShowEnriquecimentoAcoes($plano);

        $this->service->show('plano-1');
    });

    test('mantém afastamentos quando usuário é chefia', function () {
        Auth::shouldReceive('id')->andReturn('chefia-1');

        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->shouldNotReceive('unsetRelation');

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->usuario_id = 'outro-user';
        $plano->unidade_id = 'unidade-1';
        $plano->setRelation('consolidacoes', new Collection([$consolidacao]));

        $this->readRepository->shouldReceive('findByIdComRelacoes')->andReturn($plano);
        $this->unidadeRepository->shouldReceive('isUsuarioGestorRecursivo')
            ->with('unidade-1', 'chefia-1')->andReturn(true);

        mockShowEnriquecimentoAcoes($plano);

        $this->service->show('plano-1');
    });

    test('remove afastamentos quando usuário não é dono nem chefia', function () {
        Auth::shouldReceive('id')->andReturn('estranho-1');

        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->shouldReceive('unsetRelation')->with('afastamentos')->once();

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->usuario_id = 'outro-user';
        $plano->unidade_id = 'unidade-1';
        $plano->setRelation('consolidacoes', new Collection([$consolidacao]));

        $this->readRepository->shouldReceive('findByIdComRelacoes')->andReturn($plano);
        $this->unidadeRepository->shouldReceive('isUsuarioGestorRecursivo')
            ->with('unidade-1', 'estranho-1')->andReturn(false);

        mockShowEnriquecimentoAcoes($plano);

        $this->service->show('plano-1');
    });
});

describe('PlanoTrabalhoService::statuses', function () {

    test('retorna statuses do Model', function () {
        expect($this->service->statuses())->toBe(PlanoTrabalho::STATUSES);
    });
});

describe('PlanoTrabalhoService::update', function () {

    test('bloqueia edição quando usuário não tem permissão', function () {
        Auth::shouldReceive('id')->andReturn('user-consulta');

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';

        $this->readRepository->shouldReceive('findById')->with('plano-1')->andReturn($plano);

        $this->updateAuthorizationValidator
            ->shouldReceive('validar')
            ->once()
            ->with($plano, 'user-consulta')
            ->andThrow(new \App\Exceptions\ForbiddenException('Usuário não tem permissão para editar este Plano de Trabalho.'));

        $this->updateValidator->shouldNotReceive('validar');
        $this->storeValidator->shouldNotReceive('validarAutorizacao');
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

        $this->consolidacaoRepository->shouldReceive('encerrarPeriodosFuturos')
            ->once()
            ->with($planoId, $hoje, 'motivo teste');

        $this->statusService->shouldReceive('atualizaStatus')
            ->once()
            ->with($plano, 'CONCLUIDO', Mockery::on(fn ($msg) => str_contains($msg, 'motivo teste')));

        $result = $this->service->encerrar($planoId, 'motivo teste');

        expect($result)->toBe($plano);
    });
});

describe('PlanoTrabalhoService::store com clone_de', function () {

    test('cria plano e copia entregas válidas do plano original', function () {
        Auth::shouldReceive('id')->andReturn('criador-1');
        DB::shouldReceive('transaction')->once()->andReturnUsing(fn (callable $cb) => $cb());

        $entregaValida = Mockery::mock(\App\Models\PlanoTrabalhoEntrega::class)->makePartial();
        $entregaValida->plano_entrega_entrega_id = 'pee-1';
        $entregaValida->orgao = 'Órgão X';
        $entregaValida->descricao = 'Entrega válida';
        $entregaValida->setRelation('planoEntregaEntrega', (object) ['id' => 'pee-1', 'data_inicio' => '2025-01-01', 'data_fim' => '2025-12-31']);

        $planoOriginal = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $planoOriginal->id = 'plano-original';
        $planoOriginal->setRelation('entregas', new Collection([$entregaValida]));

        $this->readRepository->shouldReceive('loadRelacoesClonar')
            ->once()
            ->with($planoOriginal)
            ->andReturn($planoOriginal);

        $this->clonarValidator->shouldReceive('validar')
            ->once()
            ->with('plano-original', 'criador-1')
            ->andReturn($planoOriginal);

        $this->storeValidator->shouldReceive('validarAutorizacao')->once();
        $this->storeValidator->shouldReceive('validar')->once();

        $clone = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $clone->id = 'clone-id';

        $this->writeRepository->shouldReceive('create')
            ->once()
            ->with(Mockery::on(fn (array $attrs) =>
                $attrs['usuario_id'] === 'user-1'
                && $attrs['data_inicio'] === '2025-01-01'
            ))
            ->andReturn($clone);

        $this->entregaWriteRepository->shouldReceive('createForPlano')
            ->once()
            ->with('clone-id', Mockery::on(fn (array $data) =>
                $data['plano_entrega_entrega_id'] === 'pee-1'
                && $data['forca_trabalho'] === 0
                && $data['descricao'] === 'Entrega válida'
            ));

        $result = $this->service->store([
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'programa_id' => 'programa-1',
            'data_inicio' => '2025-01-01',
            'data_fim' => '2025-12-31',
            'modalidade_pgd' => 'presencial',
            'clone_de' => 'plano-original',
        ]);

        expect($result)->toBe($clone);
    });

    test('ignora entregas cuja planoEntregaEntrega foi removida', function () {
        Auth::shouldReceive('id')->andReturn('criador-1');
        DB::shouldReceive('transaction')->once()->andReturnUsing(fn (callable $cb) => $cb());

        $entregaInvalida = Mockery::mock(\App\Models\PlanoTrabalhoEntrega::class)->makePartial();
        $entregaInvalida->plano_entrega_entrega_id = 'pee-removida';
        $entregaInvalida->orgao = 'Órgão Y';
        $entregaInvalida->descricao = 'Entrega inválida';
        $entregaInvalida->setRelation('planoEntregaEntrega', null);

        $planoOriginal = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $planoOriginal->id = 'plano-original';
        $planoOriginal->setRelation('entregas', new Collection([$entregaInvalida]));

        $this->readRepository->shouldReceive('loadRelacoesClonar')
            ->once()
            ->andReturn($planoOriginal);

        $this->clonarValidator->shouldReceive('validar')->andReturn($planoOriginal);
        $this->storeValidator->shouldReceive('validarAutorizacao')->once();
        $this->storeValidator->shouldReceive('validar')->once();

        $clone = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $clone->id = 'clone-id';

        $this->writeRepository->shouldReceive('create')->andReturn($clone);
        $this->entregaWriteRepository->shouldNotReceive('createForPlano');

        $result = $this->service->store([
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'programa_id' => 'programa-1',
            'data_inicio' => '2025-01-01',
            'data_fim' => '2025-12-31',
            'modalidade_pgd' => 'presencial',
            'clone_de' => 'plano-original',
        ]);

        expect($result)->toBe($clone);
    });

    test('sem clone_de não aciona lógica de clone', function () {
        Auth::shouldReceive('id')->andReturn('criador-1');

        $plano = Mockery::mock(PlanoTrabalho::class);

        $this->storeValidator->shouldReceive('validarAutorizacao')->once();
        $this->storeValidator->shouldReceive('validar')->once();
        $this->clonarValidator->shouldNotReceive('validar');

        $this->writeRepository->shouldReceive('create')->once()->andReturn($plano);

        $result = $this->service->store([
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'programa_id' => 'programa-1',
            'data_inicio' => '2025-01-01',
            'data_fim' => '2025-12-31',
            'modalidade_pgd' => 'presencial',
        ]);

        expect($result)->toBe($plano);
    });

    test('propaga exceção do clonarValidator quando PT original inválido', function () {
        Auth::shouldReceive('id')->andReturn('criador-1');

        $this->storeValidator->shouldReceive('validarAutorizacao')->once();
        $this->storeValidator->shouldReceive('validar')->once();

        $this->clonarValidator->shouldReceive('validar')
            ->once()
            ->andThrow(new NotFoundException('Plano de Trabalho não encontrado.'));

        $this->writeRepository->shouldNotReceive('create');

        $this->service->store([
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'programa_id' => 'programa-1',
            'data_inicio' => '2025-01-01',
            'data_fim' => '2025-12-31',
            'modalidade_pgd' => 'presencial',
            'clone_de' => 'inexistente',
        ]);
    })->throws(NotFoundException::class, 'Plano de Trabalho não encontrado.');

    test('ignora entregas sem interseção de período com o novo plano', function () {
        Auth::shouldReceive('id')->andReturn('criador-1');
        DB::shouldReceive('transaction')->once()->andReturnUsing(fn (callable $cb) => $cb());

        $entregaComIntersecao = Mockery::mock(\App\Models\PlanoTrabalhoEntrega::class)->makePartial();
        $entregaComIntersecao->plano_entrega_entrega_id = 'pee-1';
        $entregaComIntersecao->orgao = 'Órgão A';
        $entregaComIntersecao->descricao = 'Entrega com interseção';
        $pee1 = (object) ['id' => 'pee-1', 'data_inicio' => '2025-03-01', 'data_fim' => '2025-09-01'];
        $entregaComIntersecao->setRelation('planoEntregaEntrega', $pee1);

        $entregaSemIntersecao = Mockery::mock(\App\Models\PlanoTrabalhoEntrega::class)->makePartial();
        $entregaSemIntersecao->plano_entrega_entrega_id = 'pee-2';
        $entregaSemIntersecao->orgao = 'Órgão B';
        $entregaSemIntersecao->descricao = 'Entrega fora do período';
        $pee2 = (object) ['id' => 'pee-2', 'data_inicio' => '2024-01-01', 'data_fim' => '2024-06-30'];
        $entregaSemIntersecao->setRelation('planoEntregaEntrega', $pee2);

        $planoOriginal = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $planoOriginal->id = 'plano-original';
        $planoOriginal->setRelation('entregas', new Collection([$entregaComIntersecao, $entregaSemIntersecao]));

        $this->readRepository->shouldReceive('loadRelacoesClonar')
            ->once()
            ->andReturn($planoOriginal);

        $this->clonarValidator->shouldReceive('validar')->andReturn($planoOriginal);
        $this->storeValidator->shouldReceive('validarAutorizacao')->once();
        $this->storeValidator->shouldReceive('validar')->once();

        $clone = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $clone->id = 'clone-id';

        $this->writeRepository->shouldReceive('create')->andReturn($clone);

        $this->entregaWriteRepository->shouldReceive('createForPlano')
            ->once()
            ->with('clone-id', Mockery::on(fn (array $data) => $data['descricao'] === 'Entrega com interseção'));

        $this->service->store([
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'programa_id' => 'programa-1',
            'data_inicio' => '2025-01-01',
            'data_fim' => '2025-12-31',
            'modalidade_pgd' => 'presencial',
            'clone_de' => 'plano-original',
        ]);
    });
});

describe('PlanoTrabalhoService::update (happy path)', function () {

    test('valida autorização, valida regras e persiste via repository', function () {
        Auth::shouldReceive('id')->andReturn('chefia-1');
        DB::shouldReceive('transaction')->once()->andReturnUsing(fn (callable $cb) => $cb());

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';

        $updated = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $updated->id = 'plano-1';

        $this->readRepository->shouldReceive('findById')->with('plano-1')->andReturn($plano);
        $this->updateAuthorizationValidator->shouldReceive('validar')->once()->with($plano, 'chefia-1');
        $this->updateValidator->shouldReceive('validar')->once();
        $this->writeRepository->shouldReceive('update')->once()->with('plano-1', Mockery::type('array'))->andReturn($updated);
        $this->tcrInvalidador->shouldReceive('invalidar')->once()->with('plano-1');

        $result = $this->service->update('plano-1', [
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'programa_id' => 'programa-1',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'modalidade_pgd' => 'presencial',
        ]);

        expect($result)->toBe($updated);
    });

    test('lança NotFoundException quando plano não encontrado', function () {
        Auth::shouldReceive('id')->andReturn('user-1');

        $this->readRepository->shouldReceive('findById')->with('plano-inexistente')->andReturn(null);

        $this->service->update('plano-inexistente', [
            'usuario_id' => 'user-1',
            'unidade_id' => 'unidade-1',
            'programa_id' => 'programa-1',
            'data_inicio' => '2024-01-01',
            'data_fim' => '2024-12-31',
            'modalidade_pgd' => 'presencial',
        ]);
    })->throws(NotFoundException::class, 'Plano de Trabalho não encontrado.');
});

describe('PlanoTrabalhoService::arquivar', function () {

    test('valida e seta data_arquivamento via repository', function () {
        Auth::shouldReceive('id')->andReturn('user-1');

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->shouldReceive('refresh')->once()->andReturnSelf();

        $this->arquivarValidator->shouldReceive('validar')
            ->once()
            ->with('plano-1', 'user-1')
            ->andReturn($plano);

        $this->writeRepository->shouldReceive('update')
            ->once()
            ->with('plano-1', Mockery::on(fn ($data) => $data['data_arquivamento'] !== null));

        $result = $this->service->arquivar('plano-1');

        expect($result)->toBe($plano);
    });

    test('propaga exceção do validator', function () {
        Auth::shouldReceive('id')->andReturn('user-1');

        $this->arquivarValidator->shouldReceive('validar')
            ->andThrow(new \App\Exceptions\ValidateException('Este Plano de Trabalho já está arquivado.'));

        $this->writeRepository->shouldNotReceive('update');

        $this->service->arquivar('plano-1');
    })->throws(\App\Exceptions\ValidateException::class, 'Este Plano de Trabalho já está arquivado.');
});

describe('PlanoTrabalhoService::desarquivar', function () {

    test('valida e seta data_arquivamento null via repository', function () {
        Auth::shouldReceive('id')->andReturn('user-1');

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->shouldReceive('refresh')->once()->andReturnSelf();

        $this->desarquivarValidator->shouldReceive('validar')
            ->once()
            ->with('plano-1', 'user-1')
            ->andReturn($plano);

        $this->writeRepository->shouldReceive('update')
            ->once()
            ->with('plano-1', ['data_arquivamento' => null]);

        $result = $this->service->desarquivar('plano-1');

        expect($result)->toBe($plano);
    });

    test('propaga exceção quando plano não está arquivado', function () {
        Auth::shouldReceive('id')->andReturn('user-1');

        $this->desarquivarValidator->shouldReceive('validar')
            ->andThrow(new \App\Exceptions\ValidateException('Este Plano de Trabalho não está arquivado.'));

        $this->writeRepository->shouldNotReceive('update');

        $this->service->desarquivar('plano-1');
    })->throws(\App\Exceptions\ValidateException::class, 'Este Plano de Trabalho não está arquivado.');
});
