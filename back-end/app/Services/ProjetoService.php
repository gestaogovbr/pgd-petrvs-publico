<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Traits\UseDataFim;

class ProjetoService extends ServiceBase {
    use UseDataFim;

    public function validateStore($data, $unidade, $action) {
    }

    public function proxyStore(&$data, $unidade, $action) {
        $this->recalcular($data);
    }

    public function recalcular(&$projeto) {
    }
}

