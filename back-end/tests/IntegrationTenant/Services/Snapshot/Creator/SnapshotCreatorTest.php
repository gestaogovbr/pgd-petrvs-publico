<?php

namespace Tests\IntegrationTenant\Services\Snapshot\Creator;

use App\Services\Snapshot\Creator\AtividadeSnapshotCreator;
use App\Services\Snapshot\Creator\AfastamentoSnapshotCreator;
use App\Services\Snapshot\Creator\OcorrenciaSnapshotCreator;
use App\Models\Atividade;
use App\Models\Afastamento;
use App\Models\Ocorrencia;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoConsolidacaoAtividade;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;
use App\Models\PlanoTrabalhoConsolidacaoOcorrencia;
use Carbon\Carbon;

describe('AtividadeSnapshotCreator', function () {
    test('cria snapshot de atividade com sucesso', function () {
        $dataConclusao = Carbon::createFromFormat('Y-m-d H:i:s', now()->format('Y-m-d H:i:s'));
        $atividade = Atividade::factory()->create();
        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create();

        $creator = new AtividadeSnapshotCreator();
        $creator->create($atividade->id, $consolidacao->id, $dataConclusao);

        $snapshot = PlanoTrabalhoConsolidacaoAtividade::where('atividade_id', $atividade->id)
            ->where('plano_trabalho_consolidacao_id', $consolidacao->id)
            ->first();

        expect($snapshot)->not->toBeNull();
        expect($snapshot->data_conclusao)->toEqual($dataConclusao);
        expect($snapshot->snapshot)->toBeObject();
        expect($snapshot->snapshot->id)->toBe($atividade->id);
    });

    test('lança exceção quando atividade não existe', function () {
        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create();
        $creator = new AtividadeSnapshotCreator();

        expect(fn() => $creator->create('inexistente-id', $consolidacao->id, now()))
            ->toThrow(\Exception::class, 'Atividade não encontrada');
    });
});

describe('AfastamentoSnapshotCreator', function () {
    test('cria snapshot de afastamento com sucesso', function () {
        $dataConclusao = Carbon::createFromFormat('Y-m-d H:i:s', now()->format('Y-m-d H:i:s'));
        $afastamento = Afastamento::factory()->create();
        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create();

        $creator = new AfastamentoSnapshotCreator();
        $creator->create($afastamento->id, $consolidacao->id, $dataConclusao);

        $snapshot = PlanoTrabalhoConsolidacaoAfastamento::where('afastamento_id', $afastamento->id)
            ->where('plano_trabalho_consolidacao_id', $consolidacao->id)
            ->first();

        expect($snapshot)->not->toBeNull();
        expect($snapshot->data_conclusao)->toEqual($dataConclusao);
        expect($snapshot->snapshot)->toBeObject();
        expect($snapshot->snapshot->id)->toBe($afastamento->id);
    });

    test('lança exceção quando afastamento não existe', function () {
        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create();
        $creator = new AfastamentoSnapshotCreator();

        expect(fn() => $creator->create('inexistente-id', $consolidacao->id, now()))
            ->toThrow(\Exception::class, 'Afastamento não encontrado');
    });
});

describe('OcorrenciaSnapshotCreator', function () {
    test('cria snapshot de ocorrência com sucesso', function () {
        $dataConclusao = Carbon::createFromFormat('Y-m-d H:i:s', now()->format('Y-m-d H:i:s'));
        $ocorrencia = Ocorrencia::factory()->create();
        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create();

        $creator = new OcorrenciaSnapshotCreator();
        $creator->create($ocorrencia->id, $consolidacao->id, $dataConclusao);

        $snapshot = PlanoTrabalhoConsolidacaoOcorrencia::where('ocorrencia_id', $ocorrencia->id)
            ->where('plano_trabalho_consolidacao_id', $consolidacao->id)
            ->first();

        expect($snapshot)->not->toBeNull();
        expect($snapshot->data_conclusao)->toEqual($dataConclusao);
        expect($snapshot->snapshot)->toBeObject();
        expect($snapshot->snapshot->id)->toBe($ocorrencia->id);
    });

    test('lança exceção quando ocorrência não existe', function () {
        $consolidacao = PlanoTrabalhoConsolidacao::factory()->create();
        $creator = new OcorrenciaSnapshotCreator();

        expect(fn() => $creator->create('inexistente-id', $consolidacao->id, now()))
            ->toThrow(\Exception::class, 'Ocorrência não encontrada');
    });
});