<?php

namespace App\Services;
use App\Services\ServiceBase;

class ProdutoService extends ServiceBase
{
  public function proxyQuery($query, &$data){
    $produtos_do_cliente = $this->extractWhere($data, "produtos_do_cliente");
    if ($produtos_do_cliente) {
        $query->whereHas('produtoCliente', function ($query) use ($produtos_do_cliente) {
          $query->where('cliente_id', $produtos_do_cliente[2]);
        });
    }
  }

  public function proxyRows($rows)
  {
    foreach ($rows as $row) {
      $row->_metadata = [
        "vinculoEntregas" => $row->entregas->count(),
      ];
    }
    return $rows;  
  }
}