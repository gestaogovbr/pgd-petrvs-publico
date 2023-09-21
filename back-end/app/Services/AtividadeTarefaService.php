<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\AtividadeTarefa;
use App\Services\ServiceBase;
use Illuminate\Database\Eloquent\Builder;

class AtividadeTarefaService extends ServiceBase {

    public function validateStore($data, $unidade, $action) {
        if($action != ServiceBase::ACTION_INSERT) {
            /* (RN_CSLD_12) e (RN_CSLD_13) */
            $tarefa = AtividadeTarefa::find($data["id"]); 
            $lastConsolidacao = $this->atividadeService->lastConsolidacao($data["atividade_id"]);
            if(!empty($lastConsolidacao) && $lastConsolidacao->status != "INCLUIDO" && UtilService::asTimestamp($lastConsolidacao->data_conclusao) > UtilService::asTimestamp($tarefa->created_at)) throw new ServerException("ValidateAtividadeTarefa", "Já existe uma consolidação com esta tarefa.");
        }
    }

    public function proxyUpdate($data, $unidade) {
        /* (RN_CSLD_12) e (RN_CSLD_13) */
        $tarefa = AtividadeTarefa::find($data["id"]); 
        $lastConsolidacao = $this->atividadeService->lastConsolidacao($data["atividade_id"]);
        if(!empty($lastConsolidacao) && $lastConsolidacao->status != "INCLUIDO" && UtilService::asTimestamp($lastConsolidacao->data_conclusao) > UtilService::asTimestamp($tarefa->data_conclusao)) throw new ServerException("ValidateAtividadeTarefa", "Já existe uma consolidação com esta tarefa como concluída.");
    }

    public function proxyQuery(&$query, &$data) {
        $idProcesso = $this->extractWhere($data, "id_processo");
        if(!empty($idProcesso)) {
            $query->whereHas('documento', function (Builder $query) use ($idProcesso) {
                $query->whereRaw("JSON_CONTAINS(link, ?, '$.id_processo')", [$idProcesso]);
            });
        }
    }
}
