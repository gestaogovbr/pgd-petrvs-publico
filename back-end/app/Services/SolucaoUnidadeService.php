<?php

namespace App\Services;

use App\Models\Unidade;
use App\Models\SolucaoUnidade;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SolucaoUnidadeService extends ServiceBase
{

    public function afterStore($entity, $action){
      if($entity->status){
        $this->ativarEmSubordinadas($entity->id_unidade, $entity->id_solucao, $entity->status);
      }

    }
    public function afterUpdate($entity, $data)
    {
        $this->ativarEmSubordinadas($entity->id_unidade, $entity->id_solucao, $data['status']);
    }

    private function buscarSubordinadas($unidadeId, $todasUnidades)
    {
        $subordinadas = collect();

        foreach ($todasUnidades as $unidade) {
            if ($unidade->unidade_pai_id == $unidadeId) {
                $subordinadas->push($unidade);
                $subordinadas = $subordinadas->merge(
                    $this->buscarSubordinadas($unidade->id, $todasUnidades)
                );
            }
        }

        return $subordinadas;
    }

    private function ativarEmSubordinadas($unidadeId, $solucaoId, $status)
    {
        // Carrega todas as unidades de uma vez só para evitar múltiplas queries
        $todasUnidades = Unidade::all()->keyBy('id');
        $subordinadas = $this->buscarSubordinadas($unidadeId, $todasUnidades);

        foreach ($subordinadas as $unidade) {
            $solucaoUnidade = SolucaoUnidade::firstOrNew([
                'id_solucao' => $solucaoId,
                'id_unidade' => $unidade->id
            ]);

            if (!$solucaoUnidade->exists) {
                $solucaoUnidade->id = (string) Str::uuid();
            }

            $solucaoUnidade->status = $status;
            $solucaoUnidade->save();
        }
    }
}
