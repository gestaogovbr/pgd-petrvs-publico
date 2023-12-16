<?php

namespace App\Services;

use App\Models\Questionario;
use App\Services\ServiceBase;

class QuestionarioService extends ServiceBase {

   public function proxyStore($data, $unidade, $action){

      if ($action == ServiceBase::ACTION_INSERT){
           $data["versao"] = 1;
      }else{
           $data["versao"] = Questionario::find($data['id'])->versao + 1;
           
      }

      foreach($data["perguntas"] as $pergunta) {
         if($pergunta['_status']=='ADD'){
            $pergunta['criado_versao']= $data['versao'];
         }
         if($pergunta['_status']=='EDIT'){
            $pergunta['deletado_versao']= $data['versao'];
         }
         if($pergunta['_status']=='DEL'){
            $clone = $pergunta;
            $clone['id']=null;
         }

      }
      return $data;

   }

}

//$data["perguntas"][0]['respostas'][0]['data']['valorResposta']
//$action == ServiceBase::ACTION_INSERT ? data.versao = 1 : questionario.versao + 1;
// foreach($data.perguntas as $pergunta) {
     //pergunta._status == "ADD" ? criado_versao = questionarios.versao,
     //if(pergunta._status == "EDIT"){
     //    $pergunta.deletado_versao = questionario.versao,

    // }
 //}


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
