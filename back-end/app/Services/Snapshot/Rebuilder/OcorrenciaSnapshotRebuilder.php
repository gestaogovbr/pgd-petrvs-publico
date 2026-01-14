<?php

namespace App\Services\Snapshot;

use App\Models\PlanoTrabalhoConsolidacaoOcorrencia;

class OcorrenciaSnapshotRebuilder implements SnapshotRebuilderInterface
{
    public function rebuildFromSnapshot($ocorrencia, $consolidacaoId, $consolidacaoDataConclusao)
    {
        if (!empty($consolidacaoDataConclusao)) {
            $consolidacaoOcorrencia = PlanoTrabalhoConsolidacaoOcorrencia::where("plano_trabalho_consolidacao_id", $consolidacaoId)
                ->where("data_conclusao", $consolidacaoDataConclusao)
                ->where("ocorrencia_id", $ocorrencia["id"])->first();
            if (!empty($consolidacaoOcorrencia)) {
                $snapshot = (object) $consolidacaoOcorrencia->snapshot;
                $ocorrencia["descricao"] = $snapshot->descricao;
                $ocorrencia["data_inicio"] = $snapshot->data_inicio;
                $ocorrencia["data_fim"] = $snapshot->data_fim;
                $ocorrencia["deleted_at"] = $snapshot->deleted_at;
            }
        }
        return $ocorrencia;
    }
}
