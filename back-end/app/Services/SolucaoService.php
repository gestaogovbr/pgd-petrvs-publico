<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Models\Unidade;
use App\Models\Solucao;
use App\Models\SolucaoUnidade;
use Ramsey\Uuid\Uuid;
use DB;

class SolucaoService extends ServiceBase
{
  public function searchText($data)
  {
    if (empty($data['query']) && empty($data['where'])) return [];
    else return parent::searchText($data);
  }

  public function atribuirTodos(string $unidade_id) {
    foreach(Solucao::all() as $solucao) {
      $solucaoUnidade = SolucaoUnidade::where('id_solucao', $solucao->id)
        ->where('id_unidade', $unidade_id)
        ->first();

      if (!$solucaoUnidade) {
        DB::table('solucoes_unidades')->insert([
          'id' => Uuid::uuid4(),
          'id_solucao' => $solucao->id,
          'id_unidade' => $unidade_id,
          'status' => 1
        ]);
      } else {
        $solucaoUnidade->status = 1;
        $solucaoUnidade->save();
      }
    }
  }

  public function desatribuirTodos($unidade_id) {
      DB::table('solucoes_unidades')
        ->where('id_unidade', $unidade_id)
        ->delete();
  }
}
