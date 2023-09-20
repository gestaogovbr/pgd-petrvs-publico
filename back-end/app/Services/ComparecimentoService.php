<?php

namespace App\Services;

use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\Comparecimento;
use App\Models\Usuario;
use App\Models\Unidade;

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

    /*
    public function store($dataOrEntity, $unidade, $transaction = true) {
        try{
            parent::store($dataOrEntity, $unidade, false);
        } catch (\Exception $e) {
            throw $e;
        }
    }
    */

    public function extraStore($dataOrEntity, $usuario,$unidade, 
        $plano_trabalho_consolidacao, $data_comparecimento, $action) {
        
        try {
            $unidade_id = Unidade::find($unidade->id);
            $usuario_id = Usuario::find($usuario->id);
            $plano_trabalho_consolidacao_id = PlanoTrabalhoConsolidacao::find($plano_trabalho_consolidacao->id);

            $comparecimento = new Comparecimento([
              'data_comparecimento'=> $data_comparecimento,
              'unidade_id' => $unidade_id,
              'usuario_id' => $usuario_id,
              'plano_trabalho_consolidacao_id' => $plano_trabalho_consolidacao_id,
            ]);
            $comparecimento->save();
            return $comparecimento;
        } catch (\Exception $e) {
              throw $e;
          }  
    }
}