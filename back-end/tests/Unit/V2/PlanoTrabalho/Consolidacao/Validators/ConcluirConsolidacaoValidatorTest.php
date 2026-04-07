<?php

use App\V2\PlanoTrabalho\Consolidacao\Validators\ConcluirConsolidacaoValidator;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\AtividadeRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->consolidacaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->atividadeRepo = Mockery::mock(AtividadeRepository::class);

    $this->validator = new ConcluirConsolidacaoValidator(
        $this->consolidacaoRepo,
        $this->atividadeRepo,
    );
});

afterEach(fn () => Mockery::close());

describe('ConcluirConsolidacaoValidator', function () {

    test('valida com sucesso quando todas entregas têm atividade', function () {
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
            ->with('consolidacao-1')->andReturn($consolidacao);

        $this->atividadeRepo->shouldReceive('entregaIdsComAtividade')
            ->with('consolidacao-1')->andReturn(new SupportCollection(['entrega-1']));

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

        $this->validator->validar($plano, 'c-1');
    })->throws(ValidateException::class, 'O período avaliativo precisa estar com status INCLUIDO para ser concluído.');

    test('lança exceção quando entrega sem trabalho executado', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        /** @var PlanoTrabalhoEntrega $entrega1 */
        $entrega1 = Mockery::mock(PlanoTrabalhoEntrega::class)->makePartial();
        $entrega1->id = 'entrega-1';
        /** @var PlanoTrabalhoEntrega $entrega2 */
        $entrega2 = Mockery::mock(PlanoTrabalhoEntrega::class)->makePartial();
        $entrega2->id = 'entrega-2';
        $plano->setRelation('entregas', new Collection([$entrega1, $entrega2]));

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'INCLUIDO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);
        $this->atividadeRepo->shouldReceive('entregaIdsComAtividade')
            ->andReturn(new SupportCollection(['entrega-1']));

        $this->validator->validar($plano, 'c-1');
    })->throws(ValidateException::class, 'Todas as entregas devem ter trabalho executado registrado para concluir o período.');

    test('lança exceção quando plano sem entregas', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';
        $plano->setRelation('entregas', new Collection());

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'INCLUIDO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validar($plano, 'c-1');
    })->throws(ValidateException::class, 'O Plano de Trabalho não possui entregas cadastradas.');
});
