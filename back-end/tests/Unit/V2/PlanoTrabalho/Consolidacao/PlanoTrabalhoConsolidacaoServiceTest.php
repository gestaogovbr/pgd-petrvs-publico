<?php

use App\V2\PlanoTrabalho\Consolidacao\PlanoTrabalhoConsolidacaoService;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Validators\ConcluirConsolidacaoValidator;
use App\V2\StatusService;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
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
    $this->authValidator = Mockery::mock(AtividadeAuthorizationValidator::class);
    $this->concluirValidator = Mockery::mock(ConcluirConsolidacaoValidator::class);
    $this->statusService = Mockery::mock(StatusService::class);

    $this->service = new PlanoTrabalhoConsolidacaoService(
        $this->planoRepo,
        $this->consolidacaoRepo,
        $this->authValidator,
        $this->concluirValidator,
        $this->statusService,
    );
});

afterEach(fn () => Mockery::close());

describe('PlanoTrabalhoConsolidacaoService::index', function () {

    test('retorna consolidações do plano', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';

        $this->planoRepo->shouldReceive('findById')->with('plano-1')->andReturn($plano);

        $consolidacoes = new Collection([
            Mockery::mock(PlanoTrabalhoConsolidacao::class),
            Mockery::mock(PlanoTrabalhoConsolidacao::class),
        ]);

        $this->consolidacaoRepo->shouldReceive('findByPlanoTrabalhoId')
            ->with('plano-1')
            ->andReturn($consolidacoes);

        $result = $this->service->index('plano-1');

        expect($result)->toHaveCount(2);
    });

    test('lança exceção quando plano não encontrado', function () {
        $this->planoRepo->shouldReceive('findById')->with('plano-x')->andReturn(null);
        $this->consolidacaoRepo->shouldNotReceive('findByPlanoTrabalhoId');

        $this->service->index('plano-x');
    })->throws(NotFoundException::class, 'Plano de Trabalho não encontrado.');

    test('retorna collection vazia quando plano não tem consolidações', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->consolidacaoRepo->shouldReceive('findByPlanoTrabalhoId')->andReturn(new Collection());

        $result = $this->service->index('plano-1');

        expect($result)->toBeEmpty();
    });
});

describe('PlanoTrabalhoConsolidacaoService::concluir', function () {

    test('conclui consolidação com sucesso', function () {
        Auth::shouldReceive('id')->andReturn('usuario-1');
        Auth::shouldReceive('user')->andReturn((object) ['nome' => 'João']);

        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';

        $this->authValidator->shouldReceive('validar')
            ->with('plano-1', 'usuario-1')
            ->andReturn($plano);

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->id = 'consolidacao-1';

        $this->concluirValidator->shouldReceive('validar')
            ->with($plano, 'consolidacao-1')
            ->andReturn($consolidacao);

        $this->statusService->shouldReceive('atualizaStatus')
            ->with($consolidacao, 'CONCLUIDO', Mockery::type('string'))
            ->once();

        $result = $this->service->concluir('plano-1', 'consolidacao-1');

        expect($result)->toBe($consolidacao);
    });
});
