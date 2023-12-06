<?php

namespace App\Services;

use App\Models\Questionario;
use App\Services\ServiceBase;

class QuestionarioService extends ServiceBase {

   public function proxyStore($data, $unidade, $action){

        if ($action == ServiceBase::ACTION_INSERT){
           
            //$data.versao = 1;
        }else{
            //$data.versao = Questionario::find('versao').get() + 1;
        }
        return $data;

   }

}


//$action == ServiceBase::ACTION_INSERT ? data.versao = 1 : questionario.versao + 1;
// foreach($data.perguntas as $pergunta) {
     //pergunta._status == "ADD" ? criado_versao = questionarios.versao,
     //if(pergunta._status == "EDIT"){
     //    $pergunta.deletado_versao = questionario.versao,

    // }
 //}


 //$action == ServiceBase::ACTION_INSERT ? data.versao = 1 : questionarios.versao + 1 
      /* foreach($data.perguntas as $pergunta) {
           pergunta._status == "ADD" ? criado_versao = questionarios.versao,
           if(pergunta._status == "EDIT"){
               $pergunta.deletado_versao = questionario.versao,

           }
     // _sataus == "EDIT" {
      //  deletado_versao = questionarios.versao,
       // _status: "DEL"
        //clone() { /* Copia todo o objeto, mas com id = null 
         //  _status = "ADD"
         //  criado_versao = questionarios.versao,
       // }
      //}
      //_status == "DEL" ? deletado_versao = questionarios.versao
  // }
*/