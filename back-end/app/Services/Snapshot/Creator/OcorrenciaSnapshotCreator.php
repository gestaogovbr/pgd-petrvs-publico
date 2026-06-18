<?php

namespace App\Services\Snapshot\Creator;

use App\Models\Ocorrencia;
use App\Models\PlanoTrabalhoConsolidacaoOcorrencia;

/**
 * @deprecated #2270 - Será eliminado com a remoção da tabela pivot
 */
class OcorrenciaSnapshotCreator implements SnapshotCreatorInterface
{
    public function create(string $entityId, string $consolidacaoId, $dataConclusao): void
    {
        $ocorrencia = Ocorrencia::find($entityId);
        if (!$ocorrencia) throw new \Exception("Ocorrência não encontrada");
        $consolidacao = new PlanoTrabalhoConsolidacaoOcorrencia([
            "data_conclusao" => $dataConclusao,
            "snapshot" => $ocorrencia->toArray(),
            "plano_trabalho_consolidacao_id" => $consolidacaoId,
            "ocorrencia_id" => $ocorrencia->id
        ]);
        $consolidacao->save();
    }
}