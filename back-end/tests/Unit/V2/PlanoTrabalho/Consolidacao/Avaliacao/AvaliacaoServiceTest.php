<?php

use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\AvaliacaoService;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\AvaliacaoPolicy;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\DTOs\AvaliacaoStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoDestroyValidator;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoStoreValidator;
use App\Repository\AvaliacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\V2\PlanoTrabalho\PlanoTrabalhoAvaliacaoStatusPolicy;
use App\V2\StatusService;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\TipoAvaliacaoNota;
use App\Exceptions\ForbiddenException;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    DB::shouldReceive('transaction')->andReturnUsing(fn (callable $callback) => $callback());

    $this->authValidator = Mockery::mock(AvaliacaoAuthorizationValidator::class);
    $this->storeValidator = Mockery::mock(AvaliacaoStoreValidator::class);
    $this->destroyValidator = Mockery::mock(AvaliacaoDestroyValidator::class);
    $this->avaliacaoRepo = Mockery::mock(AvaliacaoRepository::class);
    $this->planoTrabalhoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->statusService = Mockery::mock(StatusService::class);
    $this->avaliacaoPolicy = Mockery::mock(AvaliacaoPolicy::class);
    $this->planoAvaliacaoStatusPolicy = Mockery::mock(PlanoTrabalhoAvaliacaoStatusPolicy::class);

    $this->service = new AvaliacaoService(
        $this->authValidator,
        $this->storeValidator,
        $this->destroyValidator,
        $this->avaliacaoRepo,
        $this->planoTrabalhoRepo,
        $this->statusService,
        $this->avaliacaoPolicy,
        $this->planoAvaliacaoStatusPolicy,
    );
});

afterEach(fn () => Mockery::close());

describe('AvaliacaoService::store', function () {

    test('propaga exceção de autorização', function () {
        $dto = new AvaliacaoStoreDTO('plano-1', 'consolidacao-1', 'usuario-1', 'nota-1', null);

        $this->authValidator->shouldReceive('validar')
            ->andThrow(new ForbiddenException('Apenas a chefia da unidade pode avaliar períodos avaliativos.'));

        $this->service->store($dto);
    })->throws(ForbiddenException::class, 'Apenas a chefia da unidade pode avaliar períodos avaliativos.');

    test('adquire lock no plano e cria avaliação sob o lock', function () {
        $dto = new AvaliacaoStoreDTO('plano-1', 'cons-1', 'user-1', 'nota-1', 'justificativa');

        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';

        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->id = 'cons-1';
        $consolidacao->setRelation('avaliacoes', new \Illuminate\Database\Eloquent\Collection());
        $consolidacao->setRelation('planoTrabalho', $plano);
        $consolidacao->shouldReceive('load')->with('avaliacoes')->andReturnSelf();
        $consolidacao->shouldReceive('refresh')->andReturnSelf();
        $consolidacao->shouldReceive('load')->with(['avaliacoes', 'statusHistorico'])->andReturnSelf();

        $nota = Mockery::mock(TipoAvaliacaoNota::class)->makePartial();
        $nota->nota = 5;
        $nota->tipo_avaliacao_id = 'tipo-1';

        $avaliacao = Mockery::mock(\App\Models\Avaliacao::class)->makePartial();
        $avaliacao->id = 'av-nova';

        $this->authValidator->shouldReceive('validar')->once()->with('plano-1', 'user-1')->andReturn($plano);
        $this->storeValidator->shouldReceive('validar')->once()->with($plano, $dto)->andReturn($consolidacao);
        $this->storeValidator->shouldReceive('validarNota')->once()->andReturn($nota);

        $this->planoTrabalhoRepo->shouldReceive('findByIdForUpdate')->once()->with('plano-1')->andReturn($plano);
        $this->avaliacaoRepo->shouldReceive('create')->once()->andReturn($avaliacao);
        $this->statusService->shouldReceive('atualizaStatus')
            ->once()
            ->with($consolidacao, 'AVALIADO', 'Período avaliado pela chefia.');
        $this->planoAvaliacaoStatusPolicy->shouldReceive('sincronizarAposMudancaConsolidacao')->once()->with($consolidacao);
        $this->avaliacaoPolicy->shouldReceive('podeCancelar')->once()->andReturn(true);

        expect($this->service->store($dto))->toBe($avaliacao);
    });
});

describe('AvaliacaoService::destroy', function () {

    test('propaga exceção do destroyValidator', function () {
        $this->destroyValidator->shouldReceive('validar')
            ->andThrow(new ForbiddenException('Apenas quem realizou a avaliação pode cancelá-la.'));

        $this->service->destroy('plano-1', 'cons-1', 'av-1', 'user-1');
    })->throws(ForbiddenException::class, 'Apenas quem realizou a avaliação pode cancelá-la.');

    test('deleta avaliação e atualiza status para CONCLUIDO', function () {
        $avaliacoesCollection = new \Illuminate\Database\Eloquent\Collection();

        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->id = 'cons-1';
        $consolidacao->setRelation('avaliacoes', $avaliacoesCollection);
        $consolidacao->setRelation('planoTrabalho', Mockery::mock(PlanoTrabalho::class)->makePartial());
        $consolidacao->shouldReceive('refresh')->once()->andReturnSelf();
        $consolidacao->shouldReceive('load')
            ->once()
            ->with(['avaliacoes.avaliador', 'atividades', 'afastamentos.afastamento', 'statusHistorico'])
            ->andReturnSelf();

        $avaliacao = Mockery::mock(\App\Models\Avaliacao::class)->makePartial();
        $avaliacao->id = 'av-1';
        $avaliacao->setRelation('planoTrabalhoConsolidacao', $consolidacao);

        $this->destroyValidator->shouldReceive('validar')->andReturn($avaliacao);
        $this->planoTrabalhoRepo->shouldReceive('findByIdForUpdate')->once()->with('plano-1')->andReturnNull();
        $this->avaliacaoRepo->shouldReceive('delete')->with('av-1')->once()->andReturn(true);
        $this->statusService->shouldReceive('atualizaStatus')
            ->with($consolidacao, 'CONCLUIDO', 'Avaliação do período avaliativo cancelada pela chefia.')
            ->once();
        $this->planoAvaliacaoStatusPolicy->shouldReceive('sincronizarAposMudancaConsolidacao')
            ->with($consolidacao)
            ->once();

        $result = $this->service->destroy('plano-1', 'cons-1', 'av-1', 'user-1');

        expect($result)->toBe($consolidacao);
    });
});
