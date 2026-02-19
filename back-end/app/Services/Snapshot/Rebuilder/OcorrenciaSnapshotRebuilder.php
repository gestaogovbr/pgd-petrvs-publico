<?php

namespace App\Services\Snapshot\Rebuilder;

use App\Models\Ocorrencia;
use App\Models\PlanoTrabalhoConsolidacaoOcorrencia;

class OcorrenciaSnapshotRebuilder extends BaseRebuilder
{
    public function rebuildFromSnapshot($ocorrencia, $consolidacaoId, $consolidacaoDataConclusao)
    {
        if (!$ocorrencia instanceof Ocorrencia) throw new \TypeError;
        $ocorrencia = $ocorrencia->toArray();
        if (!empty($consolidacaoDataConclusao)) {
            $consolidacaoOcorrencia = $this->consolidacaoOcorrencia($consolidacaoId, $consolidacaoDataConclusao, $ocorrencia["id"]);
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

    protected function consolidacaoOcorrencia($consolidacaoId, $consolidacaoDataConclusao, $ocorrenciaId) {
        return PlanoTrabalhoConsolidacaoOcorrencia::where("plano_trabalho_consolidacao_id", $consolidacaoId)
                ->where("data_conclusao", $consolidacaoDataConclusao)
                ->where("ocorrencia_id", $ocorrenciaId)->first();
    }
}
