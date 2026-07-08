<?php

namespace App\Services\Snapshot\Creator;

use App\Models\Atividade;
use App\Models\PlanoTrabalhoConsolidacaoAtividade;

/**
 * @deprecated #2270 - Será eliminado com a remoção da tabela pivot
 */
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