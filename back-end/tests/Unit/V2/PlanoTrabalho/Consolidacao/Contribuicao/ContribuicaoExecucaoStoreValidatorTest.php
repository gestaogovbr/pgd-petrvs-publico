<?php

use App\V2\PlanoTrabalho\Consolidacao\Contribuicao\Validators\ContribuicaoExecucaoStoreValidator;
use App\V2\PlanoTrabalho\Consolidacao\Contribuicao\DTOs\ContribuicaoExecucaoStoreDTO;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoContribuicaoRepository;
use App\Repository\PlanoEntregaRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoConsolidacaoContribuicao;
use App\Models\PlanoEntregaEntrega;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->consolidacaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->contribuicaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoContribuicaoRepository::class);
    $this->planoEntregaRepo = Mockery::mock(PlanoEntregaRepository::class);

    $this->validator = new ContribuicaoExecucaoStoreValidator(
        $this->consolidacaoRepo,
        $this->contribuicaoRepo,
        $this->planoEntregaRepo,
    );
});

afterEach(fn () => Mockery::close());

function planoAtivoStore(string $id = 'plano-1'): PlanoTrabalho
{
    /** @var PlanoTrabalho $plano */
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = $id;
    $plano->status = 'ATIVO';

    return $plano;
}

function consolidacaoStore(string $status = 'INCLUIDO', string $planoId = 'plano-1'): PlanoTrabalhoConsolidacao
{
    /** @var PlanoTrabalhoConsolidacao $c */
    $c = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
    $c->id = 'consolidacao-1';
    $c->plano_trabalho_id = $planoId;
    $c->status = $status;

    return $c;
}

function dtoStore(string $origem = 'PROPRIA_UNIDADE'): ContribuicaoExecucaoStoreDTO
{
    return ContribuicaoExecucaoStoreDTO::fromArray([
        'origem' => $origem,
        'plano_entrega_entrega_id' => 'pee-1',
        'descricao' => 'Trabalho',
        'esforco_executado' => 50,
    ], 'plano-1', 'consolidacao-1');
}

describe('ContribuicaoExecucaoStoreValidator', function () {

    test('valida store com sucesso quando período aberto e vínculo existe', function () {
        $plano = planoAtivoStore();
        $consolidacao = consolidacaoStore();

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')
            ->with('consolidacao-1')->andReturn($consolidacao);
        $this->planoEntregaRepo->shouldReceive('findEntregaById')
            ->with('pee-1')->andReturn(Mockery::mock(PlanoEntregaEntrega::class));

        $result = $this->validator->validarStore($plano, dtoStore());

        expect($result)->toBe($consolidacao);
    });

    test('bloqueia quando PT não está em execução', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'INCLUIDO';

        $this->validator->validarStore($plano, dtoStore());
    })->throws(ValidateException::class, 'Contribuições de execução só podem ser gerenciadas quando o Plano de Trabalho está em execução.');

    test('bloqueia quando período está CONCLUIDO', function () {
        $plano = planoAtivoStore();
        $consolidacao = consolidacaoStore('CONCLUIDO');

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validarStore($plano, dtoStore());
    })->throws(ValidateException::class, 'Não é possível incluir ou excluir contribuições quando o período avaliativo está Aguardando Avaliação ou Avaliado.');

    test('bloqueia quando período está AVALIADO', function () {
        $plano = planoAtivoStore();
        $consolidacao = consolidacaoStore('AVALIADO');

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validarStore($plano, dtoStore());
    })->throws(ValidateException::class, 'Não é possível incluir ou excluir contribuições quando o período avaliativo está Aguardando Avaliação ou Avaliado.');

    test('bloqueia quando consolidação não pertence ao plano', function () {
        $plano = planoAtivoStore();
        $consolidacao = consolidacaoStore('INCLUIDO', 'plano-outro');

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validarStore($plano, dtoStore());
    })->throws(ValidateException::class, 'O período avaliativo não pertence a este Plano de Trabalho.');

    test('bloqueia quando entrega vinculada não existe', function () {
        $plano = planoAtivoStore();
        $consolidacao = consolidacaoStore();

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);
        $this->planoEntregaRepo->shouldReceive('findEntregaById')->with('pee-1')->andReturn(null);

        $this->validator->validarStore($plano, dtoStore());
    })->throws(NotFoundException::class, 'A entrega do plano de entregas não foi encontrada.');

    test('validarDestroy exige que a contribuição pertença ao período', function () {
        $plano = planoAtivoStore();
        $consolidacao = consolidacaoStore();

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        /** @var PlanoTrabalhoConsolidacaoContribuicao $contribuicao */
        $contribuicao = Mockery::mock(PlanoTrabalhoConsolidacaoContribuicao::class)->makePartial();
        $contribuicao->id = 'contribuicao-1';
        $contribuicao->plano_trabalho_consolidacao_id = 'consolidacao-outra';

        $this->contribuicaoRepo->shouldReceive('findById')->with('contribuicao-1')->andReturn($contribuicao);

        $this->validator->validarDestroy($plano, 'consolidacao-1', 'contribuicao-1');
    })->throws(ValidateException::class, 'A contribuição não pertence a este período avaliativo.');
});
