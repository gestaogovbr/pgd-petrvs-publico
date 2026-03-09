<?php

use App\Enums\StatusEnum;
use App\Models\Avaliacao;
use App\Services\PlanoTrabalhoConsolidacaoService;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

it('não conclui o plano quando ainda existem consolidações não avaliadas', function () {
    Log::shouldReceive('info')->withAnyArgs();
    Log::shouldReceive('error')->withAnyArgs();
    Log::shouldReceive('warning')->withAnyArgs();

    /** @var PlanoTrabalhoConsolidacaoService|Mockery\MockInterface $service */
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

    /** @var Avaliacao|Mockery\MockInterface $avaliacao */
    $avaliacao = Mockery::mock(Avaliacao::class)->makePartial();
    $avaliacao->shouldReceive('getAttribute')->with('id')->andReturn('avaliacao-id');
    $avaliacao->shouldReceive('getAttribute')->with('planoTrabalhoConsolidacao')->andReturn($consolidacaoMock);

    $service->avaliar($avaliacao);
});

it('conclui o plano quando todas as consolidações estão avaliadas', function () {
    Log::shouldReceive('info')->withAnyArgs();
    Log::shouldReceive('error')->withAnyArgs();
    Log::shouldReceive('warning')->withAnyArgs();

    /** @var PlanoTrabalhoConsolidacaoService|Mockery\MockInterface $service */
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

    /** @var Avaliacao|Mockery\MockInterface $avaliacao */
    $avaliacao = Mockery::mock(Avaliacao::class)->makePartial();
    $avaliacao->shouldReceive('getAttribute')->with('id')->andReturn('avaliacao-id');
    $avaliacao->shouldReceive('getAttribute')->with('planoTrabalhoConsolidacao')->andReturn($consolidacaoMock);

    $service->avaliar($avaliacao);
});

