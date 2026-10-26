<?php

use App\V2\PlanoTrabalho\Consolidacao\Validators\ConcluirConsolidacaoValidator;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoContribuicaoRepository;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\V2\PlanoTrabalho\Entrega\DTOs\ResumoForcaTrabalhoDTO;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->consolidacaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->entregaRepo = Mockery::mock(PlanoTrabalhoEntregaRepository::class);
    $this->contribuicaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoContribuicaoRepository::class);

    $this->validator = new ConcluirConsolidacaoValidator(
        $this->consolidacaoRepo,
        $this->entregaRepo,
        $this->contribuicaoRepo,
    );
});

afterEach(fn () => Mockery::close());

function mockConsolidacaoIncluida(string $id = 'consolidacao-1', string $planoId = 'plano-1'): PlanoTrabalhoConsolidacao
{
    /** @var PlanoTrabalhoConsolidacao $consolidacao */
    $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
    $consolidacao->id = $id;
    $consolidacao->plano_trabalho_id = $planoId;
    $consolidacao->status = 'INCLUIDO';

    return $consolidacao;
}

function mockPlanoAtivo(string $id = 'plano-1'): PlanoTrabalho
{
    /** @var PlanoTrabalho $plano */
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = $id;
    $plano->status = 'ATIVO';
    $plano->encerrado_at = null;

    return $plano;
}

describe('ConcluirConsolidacaoValidator', function () {

    test('valida com sucesso quando todas contribuições registradas e carga horária confere', function () {
        $plano = mockPlanoAtivo();
        $consolidacao = mockConsolidacaoIncluida();

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')
            ->with('consolidacao-1')->andReturn($consolidacao);
        $this->contribuicaoRepo->shouldReceive('possuiContribuicoes')
            ->with('consolidacao-1')->andReturn(true);
        $this->contribuicaoRepo->shouldReceive('possuiNaoRegistrada')
            ->with('consolidacao-1')->andReturn(false);
        $this->entregaRepo->shouldReceive('resumoForcaTrabalhoPorPlano')
            ->with('plano-1')->andReturn(new ResumoForcaTrabalhoDTO(2, 100.0));
        $this->contribuicaoRepo->shouldReceive('totalEsforcoExecutadoPorConsolidacao')
            ->with('consolidacao-1')->andReturn(100.0);

        $result = $this->validator->validar($plano, 'consolidacao-1');

        expect($result)->toBe($consolidacao);
    });

    test('permite concluir com carga horária divergente quando há justificativa', function () {
        $plano = mockPlanoAtivo();
        $consolidacao = mockConsolidacaoIncluida();

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);
        $this->contribuicaoRepo->shouldReceive('possuiContribuicoes')->andReturn(true);
        $this->contribuicaoRepo->shouldReceive('possuiNaoRegistrada')->andReturn(false);
        $this->entregaRepo->shouldReceive('resumoForcaTrabalhoPorPlano')
            ->andReturn(new ResumoForcaTrabalhoDTO(2, 100.0));
        $this->contribuicaoRepo->shouldReceive('totalEsforcoExecutadoPorConsolidacao')
            ->andReturn(80.0);

        $result = $this->validator->validar($plano, 'consolidacao-1', 'Justificativa da divergência');

        expect($result)->toBe($consolidacao);
    });

    test('lança exceção quando PT não está ativo', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->status = 'INCLUIDO';
        $plano->encerrado_at = null;

        $this->consolidacaoRepo->shouldNotReceive('findConsolidacaoById');

        $this->validator->validar($plano, 'c-1');
    })->throws(ValidateException::class, 'O Plano de Trabalho precisa estar com status ATIVO.');

    test('lança exceção quando consolidação não encontrada', function () {
        $plano = mockPlanoAtivo();

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn(null);

        $this->validator->validar($plano, 'c-x');
    })->throws(NotFoundException::class, 'Período avaliativo não encontrado.');

    test('lança exceção quando consolidação não pertence ao plano', function () {
        $plano = mockPlanoAtivo();
        $consolidacao = mockConsolidacaoIncluida('c-1', 'plano-outro');

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validar($plano, 'c-1');
    })->throws(ValidateException::class, 'O período avaliativo não pertence a este Plano de Trabalho.');

    test('lança exceção quando consolidação não está incluída', function () {
        $plano = mockPlanoAtivo();
        $consolidacao = mockConsolidacaoIncluida();
        $consolidacao->status = 'CONCLUIDO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validar($plano, 'consolidacao-1');
    })->throws(ValidateException::class, 'O período avaliativo precisa estar com status INCLUIDO para ser concluído.');

    test('lança exceção quando período não possui contribuições', function () {
        $plano = mockPlanoAtivo();
        $consolidacao = mockConsolidacaoIncluida();

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);
        $this->contribuicaoRepo->shouldReceive('possuiContribuicoes')->andReturn(false);

        $this->validator->validar($plano, 'consolidacao-1');
    })->throws(ValidateException::class, 'O período avaliativo não possui contribuições para registrar.');

    test('lança exceção quando há contribuição não registrada', function () {
        $plano = mockPlanoAtivo();
        $consolidacao = mockConsolidacaoIncluida();

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);
        $this->contribuicaoRepo->shouldReceive('possuiContribuicoes')->andReturn(true);
        $this->contribuicaoRepo->shouldReceive('possuiNaoRegistrada')->andReturn(true);

        $this->validator->validar($plano, 'consolidacao-1');
    })->throws(ValidateException::class, 'Todas as contribuições devem ter trabalho executado registrado para concluir o período.');

    test('lança exceção quando carga horária diverge e não há justificativa', function () {
        $plano = mockPlanoAtivo();
        $consolidacao = mockConsolidacaoIncluida();

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);
        $this->contribuicaoRepo->shouldReceive('possuiContribuicoes')->andReturn(true);
        $this->contribuicaoRepo->shouldReceive('possuiNaoRegistrada')->andReturn(false);
        $this->entregaRepo->shouldReceive('resumoForcaTrabalhoPorPlano')
            ->andReturn(new ResumoForcaTrabalhoDTO(2, 100.0));
        $this->contribuicaoRepo->shouldReceive('totalEsforcoExecutadoPorConsolidacao')
            ->andReturn(80.0);

        $this->validator->validar($plano, 'consolidacao-1');
    })->throws(ValidateException::class, 'A justificativa é obrigatória quando a carga horária executada diverge da planejada.');
});
