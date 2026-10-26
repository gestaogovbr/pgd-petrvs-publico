<?php

use App\V2\PlanoTrabalho\Consolidacao\CopiadorContribuicoesExecucao;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoContribuicaoRepository;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->consolidacaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->entregaRepo = Mockery::mock(PlanoTrabalhoEntregaRepository::class);
    $this->contribuicaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoContribuicaoRepository::class);

    $this->copiador = new CopiadorContribuicoesExecucao(
        $this->consolidacaoRepo,
        $this->entregaRepo,
        $this->contribuicaoRepo,
    );
});

afterEach(fn () => Mockery::close());

function planoCopia(): PlanoTrabalho
{
    /** @var PlanoTrabalho $plano */
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = 'plano-1';

    return $plano;
}

function consolidacaoCopia(string $id): PlanoTrabalhoConsolidacao
{
    /** @var PlanoTrabalhoConsolidacao $c */
    $c = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
    $c->id = $id;

    return $c;
}

function entregaCopia(string $id, float $forca, ?string $pee, ?string $orgao = null): PlanoTrabalhoEntrega
{
    /** @var PlanoTrabalhoEntrega $e */
    $e = Mockery::mock(PlanoTrabalhoEntrega::class)->makePartial();
    $e->id = $id;
    $e->forca_trabalho = $forca;
    $e->plano_entrega_entrega_id = $pee;
    $e->orgao = $orgao;

    return $e;
}

describe('CopiadorContribuicoesExecucao', function () {

    test('copia cada entrega para cada período ainda sem contribuições', function () {
        $plano = planoCopia();
        $consolidacao = consolidacaoCopia('c-1');
        $entrega = entregaCopia('e-1', 60.0, 'pee-1');

        $this->consolidacaoRepo->shouldReceive('findAllByPlanoTrabalhoId')
            ->with('plano-1')->andReturn(new Collection([$consolidacao]));
        $this->entregaRepo->shouldReceive('findAllByPlanoTrabalho')
            ->with('plano-1')->andReturn(new Collection([$entrega]));
        $this->contribuicaoRepo->shouldReceive('findByConsolidacao')
            ->with('c-1')->andReturn(new Collection());

        $this->contribuicaoRepo->shouldReceive('inserirEmLote')
            ->once()
            ->with(Mockery::on(function (array $linhas): bool {
                return count($linhas) === 1
                    && $linhas[0]['plano_trabalho_consolidacao_id'] === 'c-1'
                    && $linhas[0]['plano_trabalho_entrega_id'] === 'e-1'
                    && $linhas[0]['plano_entrega_entrega_id'] === 'pee-1'
                    && (float) $linhas[0]['esforco_executado'] === 60.0
                    && $linhas[0]['descricao'] === null
                    && $linhas[0]['registrado_at'] === null
                    && !empty($linhas[0]['id']);
            }));

        $this->copiador->copiar($plano);
    });

    test('ignora período que já possui contribuições (idempotente)', function () {
        $plano = planoCopia();
        $consolidacao = consolidacaoCopia('c-1');
        $entrega = entregaCopia('e-1', 60.0, 'pee-1');

        $this->consolidacaoRepo->shouldReceive('findAllByPlanoTrabalhoId')
            ->andReturn(new Collection([$consolidacao]));
        $this->entregaRepo->shouldReceive('findAllByPlanoTrabalho')
            ->andReturn(new Collection([$entrega]));
        $this->contribuicaoRepo->shouldReceive('findByConsolidacao')
            ->with('c-1')->andReturn(new Collection([Mockery::mock(\App\Models\PlanoTrabalhoConsolidacaoContribuicao::class)]));

        $this->contribuicaoRepo->shouldNotReceive('inserirEmLote');

        $this->copiador->copiar($plano);
    });

    test('não faz nada quando não há consolidações', function () {
        $plano = planoCopia();

        $this->consolidacaoRepo->shouldReceive('findAllByPlanoTrabalhoId')->andReturn(new Collection());
        $this->entregaRepo->shouldNotReceive('findAllByPlanoTrabalho');
        $this->contribuicaoRepo->shouldNotReceive('inserirEmLote');

        $this->copiador->copiar($plano);
    });

    test('não faz nada quando não há entregas', function () {
        $plano = planoCopia();

        $this->consolidacaoRepo->shouldReceive('findAllByPlanoTrabalhoId')
            ->andReturn(new Collection([consolidacaoCopia('c-1')]));
        $this->entregaRepo->shouldReceive('findAllByPlanoTrabalho')->andReturn(new Collection());
        $this->contribuicaoRepo->shouldNotReceive('inserirEmLote');

        $this->copiador->copiar($plano);
    });
});
