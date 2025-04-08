<?php

namespace App\Services;

use App\Models\Unidade;
use App\Models\SolucaoUnidade;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SolucaoUnidadeService extends ServiceBase
{
    public function afterUpdate($entity, $data)
    {
        // Carrega todas as unidades de uma vez só para evitar múltiplas queries
        $todasUnidades = Unidade::all()->keyBy('id');
        $subordinadas = $this->buscarSubordinadas($entity->id_unidade, $todasUnidades);

        foreach ($subordinadas as $unidade) {
            $solucaoUnidade = SolucaoUnidade::firstOrNew([
                'id_solucao' => $entity->id_solucao,
                'id_unidade' => $unidade->id
            ]);

            if (!$solucaoUnidade->exists) {
                $solucaoUnidade->id = (string) Str::uuid();
            }

            $solucaoUnidade->status = $data['status'];
            $solucaoUnidade->save();
        }
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
}
