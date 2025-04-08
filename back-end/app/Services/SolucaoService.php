<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Models\Unidade;
use App\Models\Solucao;
use App\Models\SolucaoUnidade;
use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Builder;
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

  public function proxyQuery($query, &$data)
  {
    $unidade_ativa = $this->extractWhere($data, "unidade_ativa");
    if ($unidade_ativa) {
      $query->whereHas('solucoesUnidades', function (Builder $query) use ($unidade_ativa) {
        $query
          ->where('id_unidade', $unidade_ativa[2]);
      });
    }

    $so_ativos_unidade = $this->extractWhere($data, "so_ativos_unidade");
    if ($so_ativos_unidade) {
      $query->whereHas('solucoesUnidades', function (Builder $query) use ($so_ativos_unidade) {
        $query
          ->where('id_unidade', $so_ativos_unidade[2])
          ->where('status', 1);
      });
    }

    $unidade_inativa = $this->extractWhere($data, "unidade_inativa");
    if ($unidade_inativa) {
      $query->whereDoesntHave('solucoesUnidades', function (Builder $query) use ($unidade_inativa) {
        $query
          ->where('id_unidade', $unidade_inativa[2])
          ->where('status', 1);

      });
    }
  }
}
