<?php

namespace App\Services\Snapshot\Rebuilder;

use App\Models\Afastamento;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;

class AfastamentoSnapshotRebuilder extends BaseRebuilder
{
    public function rebuildFromSnapshot($afastamento, $consolidacaoId, $consolidacaoDataConclusao)
    {
        assert($afastamento instanceof Afastamento);
        $afastamento = $afastamento->toArray();
        if (!empty($consolidacaoDataConclusao)) {
            $consolidacaoAfastameto = PlanoTrabalhoConsolidacaoAfastamento::where("plano_trabalho_consolidacao_id", $consolidacaoId)
                ->where("data_conclusao", $consolidacaoDataConclusao)
                ->where("afastamento_id", $afastamento["id"])->first();
            if (!empty($consolidacaoAfastameto)) {
                $snapshot = (object) $consolidacaoAfastameto->snapshot;
                $afastamento["observacoes"] = $snapshot->observacoes;
                $afastamento["data_inicio"] = $snapshot->data_inicio;
                $afastamento["data_fim"] = $snapshot->data_fim;
                $afastamento["deleted_at"] = $snapshot->deleted_at;
            }
        }
        return $afastamento;
    }
}
