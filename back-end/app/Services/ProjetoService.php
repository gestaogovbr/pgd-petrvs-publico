<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use App\Services\ServiceBase;
use App\Traits\UseDataFim;
use App\Models\Projeto;
use App\Models\ProjetoHistorico;
use Exception;
use stdClass;

class ProjetoService extends ServiceBase {
    use UseDataFim;

    /* Utilizado para armazenar o objeto Projeto antes da gravação para ser gerado o delta do ProjetoHistorico */
    public $projectBeforeStore = null;

    public function validateStore($data, $unidade, $action) {
        if($action != self::ACTION_INSERT) $this->projectBeforeStore = Projeto::find($data["id"])->toArray();
    }

    public function extraStore(&$entity, $unidade, $action) {
        $this->recalcular($entity);
        $delta = $this->delta($this->projectBeforeStore, $entity);
        $historico = new ProjetoHistorico([
            'data_hora' => now(),
            'linha_base' => false,
            'completo' => $action == self::ACTION_INSERT,
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
          $minData = (empty($minData) && !empty($tarefa->inicio)) || UtilService::lessThanOrIqual($tarefa->inicio, $minData) ? $tarefa->inicio : $minData;
          $maxData = (empty($maxData) && !empty($tarefa->termino)) || UtilService::greaterThanOrIqual($tarefa->termino, $maxData) ? $tarefa->termino : $maxData;
        }
        if($projeto->calcula_intervalo) {
          $projeto->inicio = $minData ?? $maxData ?? date("Y-m-d H:i:s");
          $projeto->termino = $maxData ?? $projeto->inicio;
        }
    }
}

