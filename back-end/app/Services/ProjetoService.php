<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use App\Services\ServiceBase;
use App\Models\Projeto;
use App\Models\ProjetoHistorico;
use Exception;
use stdClass;

class ProjetoService extends ServiceBase {
    /* Utilizado para armazenar o objeto Projeto antes da gravação para ser gerado o delta do ProjetoHistorico */
    public $projectBeforeStore = null;
    public $faseIdBuffer = null;

    public function validateStore($data, $unidade, $action) {
        /* Realiza validações básicas do projeto */
    }

    public function proxyStore(&$data, $unidade, $action) {
        /* Evita que dê erro de constraint devido ao fato de as fases não terem sido inseridas no banco ainda */
        $this->faseIdBuffer = $data["fase_id"];
        $data["fase_id"] = null;
        /* Carrega o projeto antes de salvar para permitir realizar o delta */
        if($action != self::ACTION_INSERT) $this->projectBeforeStore = Projeto::with(["tarefas", "regras", "alocacoes", "recursos", "fases"])->find($data["id"])->toArray();
        return $data;
    }

    public function extraStore(&$entity, $unidade, $action) {
        $entity->fase_id = $this->faseIdBuffer;
        $entity->save();
        $this->recalcular($entity);
        $delta = $this->delta($this->projectBeforeStore, $entity->toArray());
        $historico = new ProjetoHistorico([
            'data_modificacao' => now(),
            'linha_base' => false,
            'completo' => $action == ServiceBase::ACTION_INSERT,
            'delta' => json_encode($delta),
            'projeto_id' => $entity->id,
            'usuario_id' => parent::loggedUser()->id
        ]);
        $historico->save();
    }

    /* Todas as validações realizadas aqui DEVEM ser realizadas tambem no front-end em ProjetoService.recalcular */
    public function recalcular(&$projeto) {
        // Reindexar os indices 
        // Recalcular recursos
        // recacular valores
        // recalcular os prazos
        $minData = null;
        $maxData = null;
        foreach($projeto->tarefas as $tarefa) {
          $minData = (empty($minData) && !empty($tarefa->data_inicio)) || UtilService::lessThanOrIqual($tarefa->data_inicio, $minData) ? $tarefa->data_inicio : $minData;
          $maxData = (empty($maxData) && !empty($tarefa->data_fim)) || UtilService::greaterThanOrIqual($tarefa->data_fim, $maxData) ? $tarefa->data_fim : $maxData;
        }
        if($projeto->calcula_intervalo) {
          $projeto->data_inicio = $minData ?? $maxData ?? date("Y-m-d H:i:s");
          $projeto->data_fim = $maxData ?? $projeto->data_inicio;
        }
    }
}

