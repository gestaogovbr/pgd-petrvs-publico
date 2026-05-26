<?php

use App\Enums\StatusEnum;
use App\Models\Avaliacao;
use App\Models\PlanoTrabalhoConsolidacao;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

afterEach(fn () => Mockery::close());

function criarConsolidacaoComAvaliacoes(string $status, array $avaliacoes): PlanoTrabalhoConsolidacao
{
    $consolidacao = new PlanoTrabalhoConsolidacao();
    $consolidacao->status = $status;
    $consolidacao->setRelation('avaliacoes', new Collection($avaliacoes));

    return $consolidacao;
}

function criarAvaliacao(?string $recurso = null): Avaliacao
{
    $avaliacao = new Avaliacao();
    $avaliacao->recurso = $recurso;

    return $avaliacao;
}

describe('PlanoTrabalhoConsolidacao::possuiRecursoSemReavaliacao', function () {

    test('retorna true quando há exatamente 1 avaliação com recurso', function () {
        $consolidacao = criarConsolidacaoComAvaliacoes(
            StatusEnum::CONCLUIDO->value,
            [criarAvaliacao('Justificativa do recurso')]
        );

        expect($consolidacao->possuiRecursoSemReavaliacao())->toBeTrue();
    });

    test('retorna false quando não há avaliações', function () {
        $consolidacao = criarConsolidacaoComAvaliacoes(StatusEnum::CONCLUIDO->value, []);

        expect($consolidacao->possuiRecursoSemReavaliacao())->toBeFalse();
    });

    test('retorna false quando avaliação não tem recurso', function () {
        $consolidacao = criarConsolidacaoComAvaliacoes(
            StatusEnum::CONCLUIDO->value,
            [criarAvaliacao(null)]
        );

        expect($consolidacao->possuiRecursoSemReavaliacao())->toBeFalse();
    });

    test('retorna false quando há 2 avaliações (reavaliação já feita)', function () {
        $consolidacao = criarConsolidacaoComAvaliacoes(
            StatusEnum::CONCLUIDO->value,
            [criarAvaliacao('Recurso'), criarAvaliacao(null)]
        );

        expect($consolidacao->possuiRecursoSemReavaliacao())->toBeFalse();
    });
});
