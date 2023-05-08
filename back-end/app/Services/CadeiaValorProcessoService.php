<?php

namespace App\Services;

use App\Models\CadeiaValorProcesso;
use App\Traits\UseDataFim;

class CadeiaValorProcessoService extends ServiceBase
{
    use UseDataFim;

    public function extraStore($processo, $unidade, $action) {
        $this->cadeiaValorService->buildSequencia($processo->cadeia_valor_id);
    }

    public function extraUpdate($processo, $unidade) {
        $this->cadeiaValorService->buildSequencia($processo->cadeia_valor_id);
    }

}
