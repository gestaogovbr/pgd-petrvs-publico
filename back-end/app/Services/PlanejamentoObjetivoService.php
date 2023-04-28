<?php

namespace App\Services;

use App\Models\Planejamento;
use App\Traits\UseDataFim;

class PlanejamentoObjetivoService extends ServiceBase
{
    use UseDataFim;

    public function extraStore($planejamentoObjetivo, $unidade, $action) {
        $this->planejamentoService->buildSequencia($planejamentoObjetivo->planejamento_id);
    }

    public function extraUpdate($planejamentoObjetivo, $unidade) {
        $this->planejamentoService->buildSequencia($planejamentoObjetivo->planejamento_id);
    }

}
