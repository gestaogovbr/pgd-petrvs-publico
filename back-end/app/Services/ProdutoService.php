<?php

namespace App\Services;
use App\Services\ServiceBase;

class ProdutoService extends ServiceBase
{
  public function proxyQuery($query, &$data){
    $where = $data["where"];
    foreach ($data["where"] as $condition) {
      if (is_array($condition) && $condition[0] == "produtos_do_cliente") {
        // produtoCliente
        $query->whereHas('produtoCliente', function ($query) use ($condition) {
          $query->where('cliente_id', $condition[2]);
        });
      }
    }
    $data["where"] = $where;
    return $data;
  }
}