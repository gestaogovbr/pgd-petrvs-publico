<?php

use App\Enums\StatusEnum;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\V2\PlanoTrabalho\Consolidacao\DispensaAvaliacaoPolicy;
use App\V2\PlanoTrabalho\PlanoTrabalhoAvaliacaoStatusPolicy;
use App\V2\StatusService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Tests\TestCase;

uses(TestCase::class);

afterEach(fn () => Mockery::close());

function criarConsolidacaoParaSync(string $planoId = 'plano-1'): PlanoTrabalhoConsolidacao
{
    $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
    $consolidacao->id = 'consolidacao-1';
    $consolidacao->plano_trabalho_id = $planoId;
    $consolidacao->setRelation('avaliacoes', new Collection());

    return $consolidacao;
}

function mockPlanoTrabalhoRelation(PlanoTrabalhoConsolidacao $consolidacao, PlanoTrabalho $plano): void
{
    $planoTrabalhoRelation = Mockery::mock(BelongsTo::class);
    $planoTrabalhoRelation->shouldReceive('first')->andReturn($plano);
    $consolidacao->shouldReceive('planoTrabalho')->andReturn($planoTrabalhoRelation);
}

describe('PlanoTrabalhoAvaliacaoStatusPolicy::sincronizarAposMudancaConsolidacao', function () {

    test('conclui plano ATIVO quando todas consolidações vigentes estão avaliadas', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = StatusEnum::ATIVO->value;
        $plano->usuario_id = 'usuario-1';
        $plano->data_inicio = '2026-01-01';
        $plano->data_fim = '2026-01-31';
        $plano->encerrado_at = null;
        $plano->avaliado_at = null;
        $plano->shouldReceive('update')->once()->with(['avaliado_at' => date('Y-m-d')]);

        $consolidacaoAvaliada = new PlanoTrabalhoConsolidacao();
        $consolidacaoAvaliada->id = 'consolidacao-1';
        $consolidacaoAvaliada->status = StatusEnum::AVALIADO->value;

        $consolidacao = criarConsolidacaoParaSync();
        mockPlanoTrabalhoRelation($consolidacao, $plano);

        $consolidacaoRepository = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
        $consolidacaoRepository->shouldReceive('findConsolidacoesVigentes')
            ->with('plano-1', null)
            ->andReturn(new Collection([$consolidacaoAvaliada]));

        $dispensaPolicy = Mockery::mock(DispensaAvaliacaoPolicy::class);
        $dispensaPolicy->shouldReceive('consolidacoesDispensadas')
            ->andReturn([]);

        $statusService = Mockery::mock(StatusService::class);
        $statusService->shouldReceive('atualizaStatus')
            ->once()
            ->with($plano, StatusEnum::CONCLUIDO->value, Mockery::type('string'));
        app()->instance(StatusService::class, $statusService);

        $policy = new PlanoTrabalhoAvaliacaoStatusPolicy($consolidacaoRepository, $dispensaPolicy);
        $policy->sincronizarAposMudancaConsolidacao($consolidacao);
    });

    test('não altera plano ATIVO quando ainda há consolidação pendente de avaliação', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = StatusEnum::ATIVO->value;
        $plano->usuario_id = 'usuario-1';
        $plano->data_inicio = '2026-01-01';
        $plano->data_fim = '2026-06-30';
        $plano->encerrado_at = null;
        $plano->shouldReceive('update')->never();

        $consolidacaoAvaliada = new PlanoTrabalhoConsolidacao();
        $consolidacaoAvaliada->id = 'consolidacao-1';
        $consolidacaoAvaliada->status = StatusEnum::AVALIADO->value;

        $consolidacaoPendente = new PlanoTrabalhoConsolidacao();
        $consolidacaoPendente->id = 'consolidacao-2';
        $consolidacaoPendente->status = StatusEnum::INCLUIDO->value;

        $consolidacao = criarConsolidacaoParaSync();
        mockPlanoTrabalhoRelation($consolidacao, $plano);

        $consolidacaoRepository = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
        $consolidacaoRepository->shouldReceive('findConsolidacoesVigentes')
            ->andReturn(new Collection([$consolidacaoAvaliada, $consolidacaoPendente]));

        $dispensaPolicy = Mockery::mock(DispensaAvaliacaoPolicy::class);
        $dispensaPolicy->shouldReceive('consolidacoesDispensadas')->andReturn([]);

        $statusService = Mockery::mock(StatusService::class);
        $statusService->shouldReceive('atualizaStatus')->never();
        app()->instance(StatusService::class, $statusService);

        $policy = new PlanoTrabalhoAvaliacaoStatusPolicy($consolidacaoRepository, $dispensaPolicy);
        $policy->sincronizarAposMudancaConsolidacao($consolidacao);
    });

    test('ignora planos sem consolidações vigentes', function () {
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->shouldReceive('update')->never();

        $consolidacao = criarConsolidacaoParaSync();
        mockPlanoTrabalhoRelation($consolidacao, $plano);

        $consolidacaoRepository = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
        $consolidacaoRepository->shouldReceive('findConsolidacoesVigentes')
            ->andReturn(new Collection());

        $dispensaPolicy = Mockery::mock(DispensaAvaliacaoPolicy::class);
        $dispensaPolicy->shouldReceive('consolidacoesDispensadas')->never();

        $policy = new PlanoTrabalhoAvaliacaoStatusPolicy($consolidacaoRepository, $dispensaPolicy);
        $policy->sincronizarAposMudancaConsolidacao($consolidacao);
    });
});
