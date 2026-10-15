<?php

use App\V2\PlanoTrabalho\Consolidacao\Contribuicao\ContribuicaoExecucaoService;
use App\V2\PlanoTrabalho\Consolidacao\Contribuicao\DTOs\ContribuicaoExecucaoStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Contribuicao\Validators\ContribuicaoExecucaoAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Contribuicao\Validators\ContribuicaoExecucaoStoreValidator;
use App\Repository\PlanoTrabalhoConsolidacaoContribuicaoRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoConsolidacaoContribuicao;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    DB::shouldReceive('transaction')->andReturnUsing(fn (callable $cb) => $cb());
    Auth::shouldReceive('id')->andReturn('usuario-1');

    $this->repo = Mockery::mock(PlanoTrabalhoConsolidacaoContribuicaoRepository::class);
    $this->authValidator = Mockery::mock(ContribuicaoExecucaoAuthorizationValidator::class);
    $this->storeValidator = Mockery::mock(ContribuicaoExecucaoStoreValidator::class);

    $this->service = new ContribuicaoExecucaoService(
        $this->repo,
        $this->authValidator,
        $this->storeValidator,
    );
});

afterEach(fn () => Mockery::close());

function dtoServico(?string $contribuicaoId = null): ContribuicaoExecucaoStoreDTO
{
    return ContribuicaoExecucaoStoreDTO::fromArray([
        'origem' => 'PROPRIA_UNIDADE',
        'plano_entrega_entrega_id' => 'pee-1',
        'descricao' => 'Trabalho',
        'esforco_executado' => 50,
    ], 'plano-1', 'consolidacao-1', $contribuicaoId);
}

describe('ContribuicaoExecucaoService', function () {

    test('store cria a contribuição e marca como registrada', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $this->authValidator->shouldReceive('validar')->with('plano-1', 'usuario-1')->andReturn($plano);
        $this->storeValidator->shouldReceive('validarStore')
            ->with($plano, Mockery::type(ContribuicaoExecucaoStoreDTO::class))
            ->andReturn(Mockery::mock(PlanoTrabalhoConsolidacao::class));

        /** @var PlanoTrabalhoConsolidacaoContribuicao $contribuicao */
        $contribuicao = Mockery::mock(PlanoTrabalhoConsolidacaoContribuicao::class)->makePartial();
        $contribuicao->id = 'contribuicao-1';

        $this->repo->shouldReceive('create')->once()->andReturn($contribuicao);
        $this->repo->shouldReceive('marcarRegistrado')
            ->once()
            ->with('contribuicao-1', Mockery::type(DateTimeInterface::class));
        $this->repo->shouldReceive('findById')->once()->with('contribuicao-1')->andReturn($contribuicao);

        expect($this->service->store(dtoServico()))->toBe($contribuicao);
    });

    test('update atualiza e marca como registrada', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $this->authValidator->shouldReceive('validar')->andReturn($plano);

        /** @var PlanoTrabalhoConsolidacaoContribuicao $contribuicao */
        $contribuicao = Mockery::mock(PlanoTrabalhoConsolidacaoContribuicao::class)->makePartial();
        $contribuicao->id = 'contribuicao-1';

        $this->storeValidator->shouldReceive('validarUpdate')
            ->with($plano, Mockery::type(ContribuicaoExecucaoStoreDTO::class))
            ->andReturn($contribuicao);

        $this->repo->shouldReceive('update')->once()->with('contribuicao-1', Mockery::type('array'));
        $this->repo->shouldReceive('marcarRegistrado')->once()->with('contribuicao-1', Mockery::type(DateTimeInterface::class));
        $this->repo->shouldReceive('findById')->once()->with('contribuicao-1')->andReturn($contribuicao);

        expect($this->service->update(dtoServico('contribuicao-1')))->toBe($contribuicao);
    });

    test('destroy remove a contribuição validada', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $this->authValidator->shouldReceive('validar')->andReturn($plano);

        /** @var PlanoTrabalhoConsolidacaoContribuicao $contribuicao */
        $contribuicao = Mockery::mock(PlanoTrabalhoConsolidacaoContribuicao::class)->makePartial();
        $contribuicao->id = 'contribuicao-1';

        $this->storeValidator->shouldReceive('validarDestroy')
            ->with($plano, 'consolidacao-1', 'contribuicao-1')
            ->andReturn($contribuicao);

        $this->repo->shouldReceive('delete')->once()->with('contribuicao-1')->andReturn(true);

        $this->service->destroy('plano-1', 'consolidacao-1', 'contribuicao-1');
    });
});
