<?php

use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeStoreValidator;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->consolidacaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);

    $this->validator = new AtividadeStoreValidator($this->consolidacaoRepo);
});

afterEach(fn () => Mockery::close());

describe('AtividadeStoreValidator', function () {

    test('valida com sucesso quando PT ativo e consolidação incluída', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        /** @var PlanoTrabalhoEntrega $entrega */
        $entrega = Mockery::mock(PlanoTrabalhoEntrega::class)->makePartial();
        $entrega->id = 'entrega-1';

        $plano->setRelation('entregas', new Collection([$entrega]));

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->id = 'consolidacao-1';
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'INCLUIDO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')
            ->with('consolidacao-1')
            ->andReturn($consolidacao);

        $result = $this->validator->validar($plano, 'consolidacao-1', ['plano_trabalho_entrega_id' => 'entrega-1']);

        expect($result)->toBe($consolidacao);
    });

    test('lança exceção quando PT não está ativo', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->status = 'INCLUIDO';

        $this->consolidacaoRepo->shouldNotReceive('findConsolidacaoById');

        $this->validator->validar($plano, 'c-1', []);
    })->throws(ValidateException::class, 'O Plano de Trabalho precisa estar com status ATIVO.');

    test('lança exceção quando consolidação não encontrada', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->status = 'ATIVO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn(null);

        $this->validator->validar($plano, 'c-x', []);
    })->throws(NotFoundException::class, 'Consolidação não encontrada.');

    test('lança exceção quando consolidação não pertence ao plano', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-outro';
        $consolidacao->status = 'INCLUIDO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validar($plano, 'c-1', []);
    })->throws(ValidateException::class, 'A consolidação não pertence a este Plano de Trabalho.');

    test('lança exceção quando consolidação não está incluída', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'CONCLUIDO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validar($plano, 'c-1', []);
    })->throws(ValidateException::class, 'A consolidação precisa estar com status INCLUIDO.');

    test('lança exceção quando entrega não pertence ao plano', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        /** @var PlanoTrabalhoEntrega $entrega */
        $entrega = Mockery::mock(PlanoTrabalhoEntrega::class)->makePartial();
        $entrega->id = 'entrega-1';

        $plano->setRelation('entregas', new Collection([$entrega]));

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'INCLUIDO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validar($plano, 'c-1', ['plano_trabalho_entrega_id' => 'entrega-inexistente']);
    })->throws(ValidateException::class, 'A entrega informada não pertence a este Plano de Trabalho.');

    test('aceita data vazia sem validar entrega', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'INCLUIDO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $result = $this->validator->validar($plano, 'c-1', []);

        expect($result)->toBe($consolidacao);
    });
});
