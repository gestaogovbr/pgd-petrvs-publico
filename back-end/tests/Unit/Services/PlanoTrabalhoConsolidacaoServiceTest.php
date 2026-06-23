<?php

use App\Enums\StatusEnum;
use App\Models\Avaliacao;
use App\Services\PlanoTrabalhoConsolidacaoService;
use Illuminate\Database\Eloquent\Collection;
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


describe('PlanoTrabalhoConsolidacaoService::pendenciasRecursoUsuario', function () {

    test('retorna array vazio quando não há consolidações com prazo de recurso', function () {
        $consolidacaoRepo = Mockery::mock(\App\Repository\PlanoTrabalhoConsolidacaoRepository::class);
        $consolidacaoRepo->shouldReceive('findAvaliadasComPrazoRecurso')
            ->with('usuario-1', 10)
            ->andReturn(new Collection());

        $service = new PlanoTrabalhoConsolidacaoService(null, $consolidacaoRepo);

        $result = $service->pendenciasRecursoUsuario('usuario-1');

        expect($result)->toBeArray()->toBeEmpty();
    });

    test('retorna pendências mapeadas corretamente', function () {
        $nota = Mockery::mock(\App\Models\TipoAvaliacaoNota::class)->makePartial();
        $nota->descricao = 'Inadequado';
        $nota->aprova = 0;

        $avaliacao = Mockery::mock(Avaliacao::class)->makePartial();
        $avaliacao->data_avaliacao = now()->subDays(3)->format('Y-m-d H:i:s');
        $avaliacao->shouldReceive('getAttribute')->with('tipoAvaliacaoNota')->andReturn($nota);

        $programa = Mockery::mock(\App\Models\Programa::class)->makePartial();
        $programa->nome = 'PGD';

        $unidade = Mockery::mock(\App\Models\Unidade::class)->makePartial();
        $unidade->nome = 'Unidade A';

        $plano = Mockery::mock(\App\Models\PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->numero = 'PT-001';
        $plano->shouldReceive('getAttribute')->with('programa')->andReturn($programa);
        $plano->shouldReceive('getAttribute')->with('unidade')->andReturn($unidade);

        $consolidacao = Mockery::mock(\App\Models\PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->id = 'cons-1';
        $consolidacao->data_inicio = '2026-01-01';
        $consolidacao->data_fim = '2026-01-31';
        $consolidacao->shouldReceive('getAttribute')->with('avaliacoes')->andReturn(new Collection([$avaliacao]));
        $consolidacao->shouldReceive('getAttribute')->with('planoTrabalho')->andReturn($plano);

        $consolidacaoRepo = Mockery::mock(\App\Repository\PlanoTrabalhoConsolidacaoRepository::class);
        $consolidacaoRepo->shouldReceive('findAvaliadasComPrazoRecurso')
            ->with('usuario-1', 10)
            ->andReturn(new Collection([$consolidacao]));

        $service = new PlanoTrabalhoConsolidacaoService(null, $consolidacaoRepo);

        $result = $service->pendenciasRecursoUsuario('usuario-1');

        expect($result)->toHaveCount(1);
        expect($result[0]['id'])->toBe('cons-1');
        expect($result[0]['nota'])->toBe('Inadequado');
        expect($result[0]['plano_trabalho']['numero'])->toBe('PT-001');
        expect($result[0]['dias_restantes'])->toBeGreaterThanOrEqual(0);
        expect($result[0]['data_limite_recurso'])->not->toBeNull();
    });
});
