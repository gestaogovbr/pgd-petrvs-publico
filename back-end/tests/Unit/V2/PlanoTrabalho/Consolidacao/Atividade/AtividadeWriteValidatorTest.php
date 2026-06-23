<?php

use App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators\AtividadeWriteValidator;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeStoreDTO;
use App\V2\PlanoTrabalho\Consolidacao\Atividade\DTOs\AtividadeDestroyDTO;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\AtividadeRepository;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\Atividade;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->consolidacaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->atividadeRepo = Mockery::mock(AtividadeRepository::class);

    $this->validator = new AtividadeWriteValidator($this->consolidacaoRepo, $this->atividadeRepo);
});

afterEach(fn () => Mockery::close());

describe('AtividadeWriteValidator::validar', function () {

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
            ->with('consolidacao-1')->andReturn($consolidacao);

        $dto = AtividadeStoreDTO::fromArray(
            ['plano_trabalho_entrega_id' => 'entrega-1', 'descricao' => 'Desc'],
            'plano-1', 'consolidacao-1', 'usuario-1',
        );

        $result = $this->validator->validar($plano, $dto);

        expect($result)->toBe($consolidacao);
    });

    test('lança exceção quando PT não está ativo', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->status = 'INCLUIDO';

        $dto = new AtividadeDestroyDTO('plano-1', 'c-1', 'a-1', 'u-1');

        $this->validator->validar($plano, $dto);
    })->throws(ValidateException::class, 'O Plano de Trabalho precisa estar com status ATIVO.');

    test('lança exceção quando consolidação não encontrada', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->status = 'ATIVO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn(null);

        $dto = new AtividadeDestroyDTO('plano-1', 'c-x', 'a-1', 'u-1');

        $this->validator->validar($plano, $dto);
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

        $dto = new AtividadeDestroyDTO('plano-1', 'c-1', 'a-1', 'u-1');

        $this->validator->validar($plano, $dto);
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

        $dto = new AtividadeDestroyDTO('plano-1', 'c-1', 'a-1', 'u-1');

        $this->validator->validar($plano, $dto);
    })->throws(ValidateException::class, 'O período avaliativo precisa estar com status INCLUIDO.');

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

        $dto = AtividadeStoreDTO::fromArray(
            ['plano_trabalho_entrega_id' => 'entrega-inexistente', 'descricao' => 'Desc'],
            'plano-1', 'c-1', 'u-1',
        );

        $this->validator->validar($plano, $dto);
    })->throws(ValidateException::class, 'A entrega informada não pertence a este Plano de Trabalho.');

    test('não consulta entregas quando entrega_id ausente', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'INCLUIDO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $dto = new AtividadeDestroyDTO('plano-1', 'c-1', 'a-1', 'u-1');

        $result = $this->validator->validar($plano, $dto);

        expect($result)->toBe($consolidacao);
    });
});

describe('AtividadeWriteValidator::validarExistencia', function () {

    test('retorna atividade quando existe e pertence à consolidação', function () {
        /** @var Atividade $atividade */
        $atividade = Mockery::mock(Atividade::class)->makePartial();
        $atividade->id = 'atividade-1';
        $atividade->plano_trabalho_consolidacao_id = 'consolidacao-1';

        $this->atividadeRepo->shouldReceive('findById')
            ->with('atividade-1')->andReturn($atividade);

        $dto = new AtividadeDestroyDTO('plano-1', 'consolidacao-1', 'atividade-1', 'u-1');

        expect($this->validator->validarExistencia($dto))->toBe($atividade);
    });

    test('lança exceção quando atividade não encontrada', function () {
        $this->atividadeRepo->shouldReceive('findById')->andReturn(null);

        $dto = new AtividadeDestroyDTO('p-1', 'c-1', 'a-x', 'u-1');

        $this->validator->validarExistencia($dto);
    })->throws(NotFoundException::class, 'Registro de execução não encontrado.');

    test('lança exceção quando atividade não pertence à consolidação', function () {
        /** @var Atividade $atividade */
        $atividade = Mockery::mock(Atividade::class)->makePartial();
        $atividade->plano_trabalho_consolidacao_id = 'outra-consolidacao';

        $this->atividadeRepo->shouldReceive('findById')->andReturn($atividade);

        $dto = new AtividadeDestroyDTO('p-1', 'c-1', 'a-1', 'u-1');

        $this->validator->validarExistencia($dto);
    })->throws(ValidateException::class, 'O registro de execução não pertence a este período avaliativo.');
});
