<?php

namespace App\Services\Snapshot;

use App\Models\Afastamento;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;

class AfastamentoSnapshotCreator implements SnapshotCreatorInterface
{
    public function create(string $entityId, string $consolidacaoId, \DateTime $dataConclusao): void
    {
        $afastamento = Afastamento::find($entityId);
        $consolidacao = new PlanoTrabalhoConsolidacaoAfastamento([
            "data_conclusao" => $dataConclusao,
            "snapshot" => $afastamento->toArray(),
            "plano_trabalho_consolidacao_id" => $consolidacaoId,
            "afastamento_id" => $afastamento->id
        ]);
        $consolidacao->save();
    }
}