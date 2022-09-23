<?php

namespace App\Services;

use App\Models\Lotacao;
use App\Services\ServiceBase;
use App\Traits\UseDataFim;
use App\Services\UtilService;

class LotacaoService extends ServiceBase
{
    use UseDataFim;

    public function proxyStore($data, $unidade, $action)
    {
        $lotacoes = Lotacao::where('usuario_id', $data["usuario_id"])->whereNull("data_fim")->get();
        if(count($lotacoes) == 0) {
            $data["principal"] = 1;
        } else {
            $principal = null;
            foreach ($lotacoes as $key => $lotacao) {
                if(UtilService::emptyEntry($data, "id") || $lotacao->id != $data["id"]){
                    if($data["principal"]) {
                        $lotacao->principal = 0;
                        $lotacao->save();
                    } else if($lotacao->principal) {
                        $principal = $key;
                    }
                }
            }
            if(!$data["principal"] && $principal == null) {
                $lotacoes[0]->principal = 1;
                $lotacoes[0]->save();
            }
        }
        return $data;
    }

}


