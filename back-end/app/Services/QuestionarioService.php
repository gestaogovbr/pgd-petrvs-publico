<?php

namespace App\Services;

use App\Models\Questionario;
use App\Services\ServiceBase;

class QuestionarioService extends ServiceBase
{

  public function proxyStore($data, $unidade, $action)
  {
    $data["versao"] = $action == ServiceBase::ACTION_INSERT ? 1 : Questionario::find($data['id'])->versao + 1;
    foreach ($data["perguntas"] as $pergunta) {
      if ($pergunta['_status'] == 'ADD') {
        $pergunta['criado_versao'] = $data['versao'];
      }
      if ($pergunta['_status'] == 'EDIT') {
        $pergunta['deletado_versao'] = $data['versao'];
      }
      if ($pergunta['_status'] == 'DEL') {
        $clone = $pergunta;
        $clone['id'] = null;
      }
    }
    return $data;
  }
}
