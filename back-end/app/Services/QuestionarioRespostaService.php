<?php

namespace App\Services;

use App\Models\QuestionarioResposta;
use App\Services\ServiceBase;

class QuestionarioRespostaService extends ServiceBase {

    public function proxyStore($data, $unidade, $action){

        if ($action == ServiceBase::ACTION_INSERT){
              
          
        }
        
        /*foreach($data["graduacoes"] as $graduacao) {
            if($graduacao['_status']=='ADD'){
                
             }
             if($graduacao['_status']=='EDIT'){
                
             }
             if($graduacao['_status']=='DEL'){
                
             }
        }*/
        return $data;
    }
}
