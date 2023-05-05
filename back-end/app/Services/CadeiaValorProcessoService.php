<?php

namespace App\Services;

use App\Models\CadeiaValorProcesso;
use App\Traits\UseDataFim;

class CadeiaValorProcessoService extends ServiceBase
{
    use UseDataFim;

    public function extraStore($cadeia, $unidade, $action) {
        $this->cadeiaValorService->buildSequencia($cadeia->id);
    }

    public function extraUpdate($cadeia, $unidade) {
        $this->cadeiaValorService->buildSequencia($cadeia->id);
    }

}
