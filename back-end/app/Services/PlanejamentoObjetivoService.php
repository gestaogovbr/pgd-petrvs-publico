<?php

namespace App\Services;

use App\Services\PlanejamentoService;

/**
 * @property PlanejamentoService $planejamentoService
 */
class PlanejamentoObjetivoService extends ServiceBase
{
    public function extraStore($planejamentoObjetivo, $unidade, $action) {
        $this->planejamentoService->buildSequencia($planejamentoObjetivo->planejamento_id);
    }

    public function extraUpdate($planejamentoObjetivo, $unidade) {
        $this->planejamentoService->buildSequencia($planejamentoObjetivo->planejamento_id);
    }

}
