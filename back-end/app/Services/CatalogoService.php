<?php

namespace App\Services;

use App\Services\ServiceBase;

class CatalogoService extends ServiceBase
{
  public function searchText($data)
  {
    if (empty($data['query']) && empty($data['where'])) return [];
    else return parent::searchText($data);
  }
}
