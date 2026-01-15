<?php

namespace App\Services\Snapshot\Rebuilder;

use App\Models\Atividade;
use App\Models\PlanoTrabalhoConsolidacaoAtividade;
use App\Services\AtividadeService;
use App\Services\UtilService;

class AtividadeSnapshotRebuilder extends BaseRebuilder
{
    private AtividadeService $atividadeService;

    public function __construct()
    {
        $this->atividadeService = new AtividadeService();
    }

    public function rebuildFromSnapshot($atividade, $consolidacaoId, $consolidacaoDataConclusao)
    {
        if (!$atividade instanceof Atividade) throw new \TypeError;
        $atividade = $atividade->toArray();
        if (!empty($consolidacaoDataConclusao)) {
            $consolidacaoAtividade = PlanoTrabalhoConsolidacaoAtividade::where("plano_trabalho_consolidacao_id", $consolidacaoId)
                ->where("data_conclusao", $consolidacaoDataConclusao)
                ->where("atividade_id", $atividade["id"])->first();
            if (!empty($consolidacaoAtividade)) {
                $snapshot = (object) $consolidacaoAtividade->snapshot;
                $atividade["descricao"] = $snapshot->descricao;
                $atividade["tempo_planejado"] = $snapshot->tempo_planejado;
                $atividade["data_estipulada_entrega"] = $snapshot->data_estipulada_entrega;
                $atividade["data_entrega"] = $snapshot->data_entrega;
                $atividade["tempo_despendido"] = $snapshot->tempo_despendido;
                $atividade["data_arquivamento"] = $snapshot->data_arquivamento;
                $atividade["status"] = $snapshot->status;
                $atividade["etiquetas"] = $snapshot->etiquetas;
                $atividade["checklist"] = $snapshot->checklist;
                $atividade["prioridade"] = $snapshot->prioridade;
                $atividade["progresso"] = $snapshot->progresso;
                $atividade["deleted_at"] = $snapshot->deleted_at;
            }

            $this->atualizarComentarios($atividade["comentarios"], $consolidacaoDataConclusao);
            $this->atualizarPausas($atividade["pausas"], $consolidacaoDataConclusao);
            $this->atualizarTarefas($atividade["tarefas"], $consolidacaoDataConclusao);
        }
        return $atividade;
    }

    public function rebuildCollection($collection, $consolidacaoId, $consolidacaoDataConclusao)
    {
        $rebuilt = parent::rebuildCollection($collection, $consolidacaoId, $consolidacaoDataConclusao);

        $rebuilt = array_map(
            fn($atividade) =>
            array_merge($atividade, ["metadados" => $this->atividadeService->metadados($atividade)]),
            $rebuilt
        );

        return $rebuilt;
    }

    private function atualizarComentarios(&$atividadeComentarios, $consolidacaoDataConclusao)
    {
        $comentarios = [];
        foreach ($atividadeComentarios as $comentario) {
            if (
                UtilService::asTimestamp($comentario["created_at"]) < UtilService::asTimestamp($consolidacaoDataConclusao) &&
                (empty($comentario["deleted_at"]) || UtilService::asTimestamp($comentario["deleted_at"]) < UtilService::asTimestamp($consolidacaoDataConclusao))
            ) {
                $comentarios[] = $comentario;
            }
        }
        $atividadeComentarios = $comentarios;
    }

    private function atualizarPausas(&$atividadePausas, $consolidacaoDataConclusao)
    {
        $pausas = [];
        foreach ($atividadePausas as $pausa) {
            if (
                UtilService::asTimestamp($pausa["created_at"]) < UtilService::asTimestamp($consolidacaoDataConclusao) &&
                (empty($pausa["deleted_at"]) || UtilService::asTimestamp($pausa["deleted_at"]) < UtilService::asTimestamp($consolidacaoDataConclusao))
            ) {
                $pausas[] = $pausa;
            }
        }
        $atividadePausas = $pausas;
    }

    private function atualizarTarefas(&$atividadeTarefas, $consolidacaoDataConclusao)
    {
        $tarefas = [];
        foreach ($atividadeTarefas as $tarefa) {
            if (
                UtilService::asTimestamp($tarefa["created_at"]) < UtilService::asTimestamp($consolidacaoDataConclusao) &&
                (empty($tarefa["deleted_at"]) || UtilService::asTimestamp($tarefa["deleted_at"]) < UtilService::asTimestamp($consolidacaoDataConclusao))
            ) {
                $tarefa["data_conclusao"] = !empty($tarefa["data_conclusao"]) && UtilService::asTimestamp($tarefa["data_conclusao"]) < UtilService::asTimestamp($consolidacaoDataConclusao) ? $consolidacaoDataConclusao : null;
                $tarefas[] = $tarefa;
            }
        }
        $atividadeTarefas = $tarefas;
    }
}
