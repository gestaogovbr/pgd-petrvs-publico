<?php

namespace App\Services;

use App\Models\Comparecimento;
use App\Models\Unidade;
use App\Models\PlanoTrabalhoConsolidacao;

use App\Services\ServiceBase;
use Illuminate\Support\Facades\Artisan;
use Carbon\Carbon;

class ComparecimentoService extends ServiceBase {
    
   /**
     * Store a newly created resource in storage.
     *
     * @param  Array $data
     * @return Object
   */

    public function proxyStore($unidade, 
        $plano_trabalho_consolidacao, $data_comparecimento) {
        
        try {
            $unidade_id = Unidade::find($unidade->id);
            $plano_trabalho_consolidacao_id = PlanoTrabalhoConsolidacao::find($plano_trabalho_consolidacao->id);

            $comparecimento = new Comparecimento([
              'data_comparecimento'=> $data_comparecimento,
              'unidade_id' => $unidade_id,
              'plano_trabalho_consolidacao_id' => $plano_trabalho_consolidacao_id,
            ]);
            $comparecimento->save();
            return $comparecimento;
        } catch (\Exception $e) {
              throw $e;
          }
    }
}