<?php

use App\Enums\StatusEnum;
use App\Models\Atividade;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;
use App\Repository\AtividadeRepository;

beforeEach(function () {
    $this->repository = app(AtividadeRepository::class);
    $this->plano = PlanoTrabalho::factory()->create();
    $this->entrega = PlanoTrabalhoEntrega::factory()->create([
        'plano_trabalho_id' => $this->plano->id,
    ]);
});

function criarAtividadeComConsolidacao(
    PlanoTrabalho $plano,
    PlanoTrabalhoEntrega $entrega,
    string $statusConsolidacao,
): Atividade {
    $consolidacao = PlanoTrabalhoConsolidacao::factory()->create([
        'plano_trabalho_id' => $plano->id,
        'status' => $statusConsolidacao,
    ]);

    return Atividade::factory()->create([
        'plano_trabalho_id' => $plano->id,
        'plano_trabalho_entrega_id' => $entrega->id,
        'plano_trabalho_consolidacao_id' => $consolidacao->id,
    ]);
}

describe('AtividadeRepository::possuiEmPeriodosFechados', function () {

    test('retorna false quando não há registros de execução', function () {
        expect($this->repository->possuiEmPeriodosFechados($this->entrega->id))->toBeFalse();
    });

    test('retorna false quando a atividade está em período INCLUIDO', function () {
        criarAtividadeComConsolidacao($this->plano, $this->entrega, StatusEnum::INCLUIDO->value);

        expect($this->repository->possuiEmPeriodosFechados($this->entrega->id))->toBeFalse();
    });

    test('retorna true quando a atividade está em período CONCLUIDO', function () {
        criarAtividadeComConsolidacao($this->plano, $this->entrega, StatusEnum::CONCLUIDO->value);

        expect($this->repository->possuiEmPeriodosFechados($this->entrega->id))->toBeTrue();
    });

    test('retorna true quando a atividade está em período AVALIADO', function () {
        criarAtividadeComConsolidacao($this->plano, $this->entrega, StatusEnum::AVALIADO->value);

        expect($this->repository->possuiEmPeriodosFechados($this->entrega->id))->toBeTrue();
    });
});

describe('AtividadeRepository::idsPorEntregaEmPeriodosIncluidos', function () {

    test('retorna apenas atividades de períodos INCLUIDO', function () {
        $aberta = criarAtividadeComConsolidacao($this->plano, $this->entrega, StatusEnum::INCLUIDO->value);
        criarAtividadeComConsolidacao($this->plano, $this->entrega, StatusEnum::CONCLUIDO->value);

        expect($this->repository->idsPorEntregaEmPeriodosIncluidos($this->entrega->id))
            ->toBe([$aberta->id]);
    });
});
