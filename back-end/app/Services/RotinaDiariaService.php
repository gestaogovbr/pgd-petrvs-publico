<?php

namespace App\Services;

use App\Models\Entidade;
use App\Services\IntegracaoService;

class RotinaDiariaService {

    public function run() {
        $integracao = new IntegracaoService();
        return $integracao->sincronizar(["unidades" => true, "servidores" => true]);
    }

    /**
     * (RN_CSLD_8) Após a data fim, e passado-se os dias determinado na Tolerância determinada no programa para lançamento da consolidação, o sistema automaticamente irá alterar o status de INCLUIDO para CONCLUIDO
     */
    public function concluirConsolidacoes() {
        // TODO: Implementar
    }
}

