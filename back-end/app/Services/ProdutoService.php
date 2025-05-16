<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Models\Produto;
use Illuminate\Support\Facades\Auth;
use DB;

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

        foreach ($row->produtoProcessoCadeiaValor as $n => $cadeia) {
            $resultado = DB::select(
                "SELECT fn_obter_processo_sequencia(?) AS sequencia",
                [$cadeia->cadeia_valor_processo_id]
            );

            $row->produtoProcessoCadeiaValor[$n]
                ->cadeiaValorProcesso
                ->sequencia_completa = $resultado[0]->sequencia;
        }
    }
    return $rows;
  }

  public function atribuirTodos() {
    return Produto::query()->update([
      'data_ativado' => now(),
      'data_desativado' => null
    ]);
  }

  public function desatribuirTodos() {
    return Produto::query()->update([
      'data_desativado' => now(),
      'data_ativado' => null
    ]);
  }

  public function proxyStore($data, $unidade, $action)
  {
    if($action == ServiceBase::ACTION_INSERT) {
      $data['unidade_id'] = $unidade->id;
      $data['responsavel_id'] = Auth::user()->id;
    }

    return $data;
  }

}
