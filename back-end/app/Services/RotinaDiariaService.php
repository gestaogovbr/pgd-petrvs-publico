<?php

namespace App\Services;

use App\Models\Entidade;
use App\Services\IntegracaoService;

class RotinaDiariaService {

    public function run() {
        $integracao = new IntegracaoService();
        return $integracao->sincronizar(["unidades" => true, "servidores" => true]);
    }
}

