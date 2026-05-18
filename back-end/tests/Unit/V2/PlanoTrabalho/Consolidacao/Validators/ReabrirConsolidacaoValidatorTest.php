<?php

use App\V2\PlanoTrabalho\Consolidacao\Validators\ReabrirConsolidacaoValidator;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Avaliacao;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->consolidacaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);

    $this->validator = new ReabrirConsolidacaoValidator($this->consolidacaoRepo);
});

afterEach(fn () => Mockery::close());

describe('ReabrirConsolidacaoValidator', function () {

    test('valida com sucesso quando consolidação concluída sem avaliação', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->id = 'consolidacao-1';
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'CONCLUIDO';
        $consolidacao->setRelation('avaliacoes', new Collection());

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')
            ->with('consolidacao-1')->andReturn($consolidacao);

        $result = $this->validator->validar($plano, 'consolidacao-1');

        expect($result)->toBe($consolidacao);
    });

    test('lança exceção quando PT não está ativo', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->status = 'INCLUIDO';

        $this->consolidacaoRepo->shouldNotReceive('findConsolidacaoById');

        $this->validator->validar($plano, 'c-1');
    })->throws(ValidateException::class, 'O Plano de Trabalho precisa estar com status ATIVO.');

    test('lança exceção quando consolidação não encontrada', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->status = 'ATIVO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn(null);

        $this->validator->validar($plano, 'c-x');
    })->throws(NotFoundException::class, 'Período avaliativo não encontrado.');

    test('lança exceção quando consolidação não pertence ao plano', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-outro';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validar($plano, 'c-1');
    })->throws(ValidateException::class, 'O período avaliativo não pertence a este Plano de Trabalho.');

    test('lança exceção quando consolidação não está concluída', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'INCLUIDO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validar($plano, 'c-1');
    })->throws(ValidateException::class, 'O período avaliativo precisa estar com status CONCLUIDO para ser reaberto.');

    test('lança exceção quando consolidação já possui avaliação', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'CONCLUIDO';

        $avaliacao = Mockery::mock(Avaliacao::class)->makePartial();
        $consolidacao->setRelation('avaliacoes', new Collection([$avaliacao]));

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validar($plano, 'c-1');
    })->throws(ValidateException::class, 'Não é possível reabrir um período avaliativo que já possui avaliação.');
});
