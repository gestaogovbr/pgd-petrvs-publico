<?php

use App\Enums\StatusEnum;
use App\Services\PlanoTrabalhoConsolidacaoService;
use Mockery;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

it('não conclui o plano quando ainda existem consolidações não avaliadas', function () {
    $service = Mockery::mock(PlanoTrabalhoConsolidacaoService::class)->makePartial();

    $statusServiceMock = Mockery::mock();
    $service->statusService = $statusServiceMock;

    $queryMock = Mockery::mock();
    $queryMock->shouldReceive('where')
        ->once()
        ->with('status', '!=', StatusEnum::AVALIADO->value)
        ->andReturn($queryMock);
    $queryMock->shouldReceive('doesntExist')
        ->once()
        ->andReturn(false);

    $planoMock = Mockery::mock();
    $planoMock->shouldReceive('consolidacoes')
        ->once()
        ->andReturn($queryMock);

    $consolidacaoMock = Mockery::mock();
    $consolidacaoMock->planoTrabalho = $planoMock;
    $consolidacaoMock->shouldReceive('save')->once();

    $statusServiceMock->shouldReceive('atualizaStatus')
        ->once()
        ->with($consolidacaoMock, StatusEnum::AVALIADO);

    $statusServiceMock->shouldReceive('atualizaStatus')
        ->never()
        ->with($planoMock, StatusEnum::CONCLUIDO);

    $avaliacao = new stdClass();
    $avaliacao->id = 'avaliacao-id';
    $avaliacao->planoTrabalhoConsolidacao = $consolidacaoMock;

    $service->avaliar($avaliacao);
});

it('conclui o plano quando todas as consolidações estão avaliadas', function () {
    $service = Mockery::mock(PlanoTrabalhoConsolidacaoService::class)->makePartial();

    $statusServiceMock = Mockery::mock();
    $service->statusService = $statusServiceMock;

    $queryMock = Mockery::mock();
    $queryMock->shouldReceive('where')
        ->once()
        ->with('status', '!=', StatusEnum::AVALIADO->value)
        ->andReturn($queryMock);
    $queryMock->shouldReceive('doesntExist')
        ->once()
        ->andReturn(true);

    $planoMock = Mockery::mock();
    $planoMock->shouldReceive('consolidacoes')
        ->once()
        ->andReturn($queryMock);

    $consolidacaoMock = Mockery::mock();
    $consolidacaoMock->planoTrabalho = $planoMock;
    $consolidacaoMock->shouldReceive('save')->once();

    $statusServiceMock->shouldReceive('atualizaStatus')
        ->once()
        ->with($consolidacaoMock, StatusEnum::AVALIADO);

    $statusServiceMock->shouldReceive('atualizaStatus')
        ->once()
        ->with($planoMock, StatusEnum::CONCLUIDO);

    $avaliacao = new stdClass();
    $avaliacao->id = 'avaliacao-id';
    $avaliacao->planoTrabalhoConsolidacao = $consolidacaoMock;

    $service->avaliar($avaliacao);
});

