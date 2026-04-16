<?php

use App\V2\PlanoTrabalho\Consolidacao\PlanoTrabalhoConsolidacaoService;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Validators\ConcluirConsolidacaoValidator;
use App\V2\PlanoTrabalho\Consolidacao\Validators\ReabrirConsolidacaoValidator;
use App\V2\PlanoTrabalho\Consolidacao\Validators\RecursoValidator;
use App\V2\StatusService;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\ProgramaRepository;
use App\Repository\UnidadeRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Exceptions\NotFoundException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->consolidacaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->programaRepo = Mockery::mock(ProgramaRepository::class);
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->authValidator = Mockery::mock(AtividadeAuthorizationValidator::class);
    $this->concluirValidator = Mockery::mock(ConcluirConsolidacaoValidator::class);
    $this->reabrirValidator = Mockery::mock(ReabrirConsolidacaoValidator::class);
    $this->recursoValidator = Mockery::mock(RecursoValidator::class);
    $this->statusService = Mockery::mock(StatusService::class);

    $this->service = new PlanoTrabalhoConsolidacaoService(
        $this->planoRepo,
        $this->consolidacaoRepo,
        $this->programaRepo,
        $this->unidadeRepo,
        $this->authValidator,
        $this->concluirValidator,
        $this->reabrirValidator,
        $this->recursoValidator,
        $this->statusService,
    );
});

afterEach(fn () => Mockery::close());

describe('PlanoTrabalhoConsolidacaoService::index', function () {

    test('retorna consolidações do plano', function () {
        Auth::shouldReceive('id')->andReturn('dono-1');

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->usuario_id = 'dono-1';
        $plano->unidade_id = 'u-1';

        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);
        $this->consolidacaoRepo->shouldReceive('findByPlanoTrabalhoId')
            ->with('plano-1')
            ->andReturn(new Collection([
                Mockery::mock(PlanoTrabalhoConsolidacao::class),
                Mockery::mock(PlanoTrabalhoConsolidacao::class),
            ]));

        expect($this->service->index('plano-1'))->toHaveCount(2);
    });

    test('lança exceção quando plano não encontrado', function () {
        $this->planoRepo->shouldReceive('findById')->with('plano-x')->andReturn(null);
        $this->consolidacaoRepo->shouldNotReceive('findByPlanoTrabalhoId');

        $this->service->index('plano-x');
    })->throws(NotFoundException::class, 'Plano de Trabalho não encontrado.');

    test('retorna collection vazia quando plano não tem consolidações', function () {
        Auth::shouldReceive('id')->andReturn('dono-1');

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->usuario_id = 'dono-1';
        $plano->unidade_id = 'u-1';
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->consolidacaoRepo->shouldReceive('findByPlanoTrabalhoId')->andReturn(new Collection());

        expect($this->service->index('plano-1'))->toBeEmpty();
    });

    test('remove afastamentos quando usuário não é dono nem chefia', function () {
        Auth::shouldReceive('id')->andReturn('estranho-1');

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->usuario_id = 'outro';
        $plano->unidade_id = 'u-1';
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);

        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->shouldReceive('unsetRelation')->with('afastamentos')->once();

        $this->consolidacaoRepo->shouldReceive('findByPlanoTrabalhoId')
            ->andReturn(new Collection([$consolidacao]));

        $this->unidadeRepo->shouldReceive('isUsuarioGestorRecursivo')
            ->with('u-1', 'estranho-1')->andReturn(false);

        $this->service->index('plano-1');
    });

    test('mantém afastamentos quando usuário é dono ou chefia', function () {
        Auth::shouldReceive('id')->andReturn('dono-1');

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->usuario_id = 'dono-1';
        $plano->unidade_id = 'u-1';
        $this->planoRepo->shouldReceive('findById')->andReturn($plano);

        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->shouldNotReceive('unsetRelation');

        $this->consolidacaoRepo->shouldReceive('findByPlanoTrabalhoId')
            ->andReturn(new Collection([$consolidacao]));

        $this->service->index('plano-1');
    });
});

describe('PlanoTrabalhoConsolidacaoService::concluir', function () {

    test('conclui consolidação com sucesso', function () {
        Auth::shouldReceive('id')->andReturn('usuario-1');
        Auth::shouldReceive('user')->andReturn((object) ['nome' => 'João']);

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();

        $this->authValidator->shouldReceive('validar')
            ->with('plano-1', 'usuario-1')->andReturn($plano);

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();

        $this->concluirValidator->shouldReceive('validar')
            ->with($plano, 'consolidacao-1')->andReturn($consolidacao);

        $this->statusService->shouldReceive('atualizaStatus')
            ->with($consolidacao, 'CONCLUIDO', Mockery::type('string'))->once();

        expect($this->service->concluir('plano-1', 'consolidacao-1'))->toBe($consolidacao);
    });
});

describe('PlanoTrabalhoConsolidacaoService::reabrir', function () {

    test('reabre consolidação com sucesso', function () {
        Auth::shouldReceive('id')->andReturn('usuario-1');
        Auth::shouldReceive('user')->andReturn((object) ['nome' => 'João']);

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();

        $this->authValidator->shouldReceive('validar')
            ->with('plano-1', 'usuario-1')->andReturn($plano);

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();

        $this->reabrirValidator->shouldReceive('validar')
            ->with($plano, 'consolidacao-1')->andReturn($consolidacao);

        $this->statusService->shouldReceive('atualizaStatus')
            ->with($consolidacao, 'INCLUIDO', Mockery::type('string'))->once();

        expect($this->service->reabrir('plano-1', 'consolidacao-1', 'Motivo da reabertura'))->toBe($consolidacao);
    });
});
