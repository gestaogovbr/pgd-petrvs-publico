<?php

use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoStoreValidator;
use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\DTOs\AvaliacaoStoreDTO;
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
    $this->validator = new AvaliacaoStoreValidator($this->consolidacaoRepo);
});

afterEach(fn () => Mockery::close());

function dtoAvaliacao(string $planoId = 'plano-1', string $consolidacaoId = 'consolidacao-1'): AvaliacaoStoreDTO
{
    return new AvaliacaoStoreDTO($planoId, $consolidacaoId, 'avaliador-1', 'nota-1', null);
}

describe('AvaliacaoStoreValidator::validar', function () {

    test('valida com sucesso', function () {
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

        expect($this->validator->validar($plano, dtoAvaliacao()))->toBe($consolidacao);
    });

    test('lança exceção quando PT não está ativo', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->status = 'INCLUIDO';

        $this->validator->validar($plano, dtoAvaliacao());
    })->throws(ValidateException::class, 'O Plano de Trabalho precisa estar com status ATIVO ou CONCLUÍDO.');

    test('lança exceção quando período não encontrado', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->status = 'ATIVO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn(null);

        $this->validator->validar($plano, dtoAvaliacao());
    })->throws(NotFoundException::class, 'Período avaliativo não encontrado.');

    test('lança exceção quando período não está concluído', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'INCLUIDO';

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validar($plano, dtoAvaliacao());
    })->throws(ValidateException::class, 'O período avaliativo precisa estar com status CONCLUIDO para ser avaliado.');

    test('lança exceção quando já possui avaliação sem recurso', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        $avaliacao = Mockery::mock(Avaliacao::class)->makePartial();
        $avaliacao->recurso = null;

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'CONCLUIDO';
        $consolidacao->setRelation('avaliacoes', new Collection([$avaliacao]));

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validar($plano, dtoAvaliacao());
    })->throws(ValidateException::class, 'Este período avaliativo já possui avaliação.');

    test('permite reavaliação quando existe 1 avaliação com recurso', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        $avaliacao = Mockery::mock(Avaliacao::class)->makePartial();
        $avaliacao->recurso = 'Discordo da nota atribuída.';

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'CONCLUIDO';
        $consolidacao->setRelation('avaliacoes', new Collection([$avaliacao]));

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        expect($this->validator->validar($plano, dtoAvaliacao()))->toBe($consolidacao);
    });

    test('lança exceção quando já foi reavaliado', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';
        $plano->status = 'ATIVO';

        $avaliacao1 = Mockery::mock(Avaliacao::class)->makePartial();
        $avaliacao1->recurso = 'Discordo da nota.';
        $avaliacao2 = Mockery::mock(Avaliacao::class)->makePartial();

        /** @var PlanoTrabalhoConsolidacao $consolidacao */
        $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
        $consolidacao->plano_trabalho_id = 'plano-1';
        $consolidacao->status = 'CONCLUIDO';
        $consolidacao->setRelation('avaliacoes', new Collection([$avaliacao1, $avaliacao2]));

        $this->consolidacaoRepo->shouldReceive('findConsolidacaoById')->andReturn($consolidacao);

        $this->validator->validar($plano, dtoAvaliacao());
    })->throws(ValidateException::class, 'Este período avaliativo já foi reavaliado. A decisão é definitiva.');
});
