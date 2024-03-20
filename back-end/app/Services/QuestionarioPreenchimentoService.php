<?php

namespace App\Services;

use App\Services\ServiceBase;

class QuestionarioPreenchimentoService extends ServiceBase
{
  public function proxyStore($data, $unidade, $action)
  {
    if ($action == ServiceBase::ACTION_INSERT) {
    }
    return $data;
  }
}