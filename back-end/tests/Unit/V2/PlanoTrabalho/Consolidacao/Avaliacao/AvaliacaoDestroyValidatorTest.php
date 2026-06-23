<?php

use App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators\AvaliacaoDestroyValidator;
use App\Repository\AvaliacaoRepository;
use App\Models\Avaliacao;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Enums\StatusEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->avaliacaoRepo = Mockery::mock(AvaliacaoRepository::class);
    $this->validator = new AvaliacaoDestroyValidator($this->avaliacaoRepo);
});

afterEach(fn () => Mockery::close());

function mockAvaliacao(string $id, string $avaliadorId, string $consolidacaoId, string $planoId): Avaliacao
{
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = $planoId;

    $consolidacao = Mockery::mock(PlanoTrabalhoConsolidacao::class)->makePartial();
    $consolidacao->id = $consolidacaoId;
    $consolidacao->status = StatusEnum::AVALIADO->value;
    $consolidacao->shouldReceive('getAttribute')->with('planoTrabalho')->andReturn($plano);

    $avaliacao = Mockery::mock(Avaliacao::class)->makePartial();
    $avaliacao->id = $id;
    $avaliacao->avaliador_id = $avaliadorId;
    $avaliacao->shouldReceive('getAttribute')->with('planoTrabalhoConsolidacao')->andReturn($consolidacao);

    return $avaliacao;
}

describe('AvaliacaoDestroyValidator', function () {

    test('lança exceção quando avaliação não encontrada', function () {
        $this->avaliacaoRepo->shouldReceive('findById')->with('av-1')->andReturn(null);

        $this->validator->validar('plano-1', 'cons-1', 'av-1', 'user-1');
    })->throws(NotFoundException::class, 'Avaliação não encontrada.');

    test('lança exceção quando consolidação não encontrada', function () {
        $avaliacao = Mockery::mock(Avaliacao::class)->makePartial();
        $avaliacao->id = 'av-1';
        $avaliacao->shouldReceive('getAttribute')->with('planoTrabalhoConsolidacao')->andReturn(null);

        $this->avaliacaoRepo->shouldReceive('findById')->andReturn($avaliacao);

        $this->validator->validar('plano-1', 'cons-1', 'av-1', 'user-1');
    })->throws(NotFoundException::class, 'Período avaliativo não encontrado.');

    test('lança exceção quando avaliação não pertence ao plano/consolidação', function () {
        $avaliacao = mockAvaliacao('av-1', 'user-1', 'cons-1', 'plano-outro');

        $this->avaliacaoRepo->shouldReceive('findById')->andReturn($avaliacao);

        $this->validator->validar('plano-1', 'cons-1', 'av-1', 'user-1');
    })->throws(ValidateException::class, 'A avaliação não pertence a este período avaliativo.');

    test('lança exceção quando usuário não é o avaliador', function () {
        $avaliacao = mockAvaliacao('av-1', 'outro-user', 'cons-1', 'plano-1');

        $this->avaliacaoRepo->shouldReceive('findById')->andReturn($avaliacao);

        $this->validator->validar('plano-1', 'cons-1', 'av-1', 'user-1');
    })->throws(ForbiddenException::class, 'Apenas quem realizou a avaliação pode cancelá-la.');

    test('lança exceção quando status não é AVALIADO', function () {
        $avaliacao = mockAvaliacao('av-1', 'user-1', 'cons-1', 'plano-1');
        $avaliacao->planoTrabalhoConsolidacao->status = StatusEnum::CONCLUIDO->value;

        $this->avaliacaoRepo->shouldReceive('findById')->andReturn($avaliacao);

        $this->validator->validar('plano-1', 'cons-1', 'av-1', 'user-1');
    })->throws(ValidateException::class, 'O período avaliativo precisa estar com status AVALIADO para cancelar a avaliação.');

    test('lança exceção quando não é a avaliação mais recente', function () {
        $avaliacao = mockAvaliacao('av-1', 'user-1', 'cons-1', 'plano-1');

        $outraAvaliacao = Mockery::mock(Avaliacao::class)->makePartial();
        $outraAvaliacao->id = 'av-2';

        $this->avaliacaoRepo->shouldReceive('findById')->andReturn($avaliacao);
        $this->avaliacaoRepo->shouldReceive('findMaisRecenteDaConsolidacao')
            ->with('cons-1')
            ->andReturn($outraAvaliacao);

        $this->validator->validar('plano-1', 'cons-1', 'av-1', 'user-1');
    })->throws(ValidateException::class, 'Apenas a avaliação mais recente pode ser cancelada.');

    test('retorna avaliação quando todas as validações passam', function () {
        $avaliacao = mockAvaliacao('av-1', 'user-1', 'cons-1', 'plano-1');

        $this->avaliacaoRepo->shouldReceive('findById')->andReturn($avaliacao);
        $this->avaliacaoRepo->shouldReceive('findMaisRecenteDaConsolidacao')
            ->with('cons-1')
            ->andReturn($avaliacao);

        $result = $this->validator->validar('plano-1', 'cons-1', 'av-1', 'user-1');

        expect($result)->toBe($avaliacao);
    });
});
