<?php

use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\AvaliacaoService;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\DTOs\AvaliacaoStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoAuthorizationValidator;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoDestroyValidator;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoStoreValidator;
use App\Repository\AvaliacaoRepository;
use App\V2\StatusService;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\TipoAvaliacaoNota;
use App\Exceptions\ForbiddenException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->authValidator = Mockery::mock(AvaliacaoAuthorizationValidator::class);
    $this->storeValidator = Mockery::mock(AvaliacaoStoreValidator::class);
    $this->destroyValidator = Mockery::mock(AvaliacaoDestroyValidator::class);
    $this->avaliacaoRepo = Mockery::mock(AvaliacaoRepository::class);
    $this->statusService = Mockery::mock(StatusService::class);

    $this->service = new AvaliacaoService(
        $this->authValidator,
        $this->storeValidator,
        $this->destroyValidator,
        $this->avaliacaoRepo,
        $this->statusService,
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
});

describe('AvaliacaoService::destroy', function () {

    test('propaga exceção do destroyValidator', function () {
        $this->destroyValidator->shouldReceive('validar')
            ->andThrow(new ForbiddenException('Apenas quem realizou a avaliação pode cancelá-la.'));

        $this->service->destroy('plano-1', 'cons-1', 'av-1', 'user-1');
    })->throws(ForbiddenException::class, 'Apenas quem realizou a avaliação pode cancelá-la.');

    test('deleta avaliação e atualiza status para CONCLUIDO', function () {
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->id = 'cons-1';
        $consolidacao->shouldReceive('refresh')->andReturnSelf();
        $consolidacao->shouldReceive('load')->andReturnSelf();

        $avaliacao = Mockery::mock(\App\Models\Avaliacao::class)->makePartial();
        $avaliacao->id = 'av-1';
        $avaliacao->shouldReceive('getAttribute')->with('planoTrabalhoConsolidacao')->andReturn($consolidacao);

        $this->destroyValidator->shouldReceive('validar')->andReturn($avaliacao);
        $this->avaliacaoRepo->shouldReceive('delete')->with('av-1')->once()->andReturn(true);
        $this->statusService->shouldReceive('atualizaStatus')
            ->with($consolidacao, 'CONCLUIDO', 'Avaliação do período avaliativo cancelada pela chefia.')
            ->once();

        $result = $this->service->destroy('plano-1', 'cons-1', 'av-1', 'user-1');

        expect($result)->toBe($consolidacao);
    });
});
