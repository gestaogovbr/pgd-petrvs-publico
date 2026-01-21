<?php

namespace App\Services\Snapshot\Creator;

use App\Models\Atividade;
use App\Models\PlanoTrabalhoConsolidacaoAtividade;

class AtividadeSnapshotCreator implements SnapshotCreatorInterface
{
    public function create(string $entityId, string $consolidacaoId, $dataConclusao): void
    {
        $atividade = Atividade::find($entityId);
        if (!$atividade) throw new \Exception("Atividade não encontrada");
        $consolidacao = new PlanoTrabalhoConsolidacaoAtividade([
            "data_conclusao" => $dataConclusao,
            "snapshot" => $atividade->toArray(),
            "plano_trabalho_consolidacao_id" => $consolidacaoId,
            "atividade_id" => $atividade->id
        ]);
        $consolidacao->save();
    }
}