<?php

namespace App\Services;

use App\Models\Entidade;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Tenant;
use App\Services\IntegracaoService;

class RotinaDiariaService {

    public function run($tenantId) {
        tenancy()->initialize(Tenant::find($tenantId));
        /* Chamar a integração */
        $integracao = new IntegracaoService();
        return $integracao->sincronizar(["unidades" => true, "servidores" => true]);
        /* Concluir consolidações */
        $this->concluirConsolidacoes();
    }

    /**
     * (RN_CSLD_8) Após a data fim, e passado-se os dias determinado na Tolerância determinada no programa para lançamento da consolidação, o sistema automaticamente irá alterar o status de INCLUIDO para CONCLUIDO
     */
    public function concluirConsolidacoes() {
        //foreach(Tenant::all() as $tenant) {
            //$tenant->run(function () {
                PlanoTrabalhoConsolidacao::all();
            //});
        //}
    }
}

