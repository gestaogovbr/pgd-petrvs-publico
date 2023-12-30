<?php

namespace App\Services;

use App\Models\Curriculum;
use App\Models\Unidade;
use App\Models\Funcao;
use App\Models\Cargo;
use App\Models\CentroTreinamento;
use App\Models\GrupoEspecializado;
use App\Services\ServiceBase;

class CurriculumService extends ServiceBase {

    public function lookupsCurriculum(): array
    {
        $unidades = Unidade::all()->map(fn($u) => ["key" => $u->id, "value" => $u->sigla])->toArray();
        $funcoes = Funcao::all()->map(fn($u) => ["key" => $u->id, "value" => $u->nome])->toArray();
        $grupos = GrupoEspecializado::all()->map(fn($u) => ["key" => $u->id, "value" => $u->nome])->toArray();
        $ct = CentroTreinamento::all()->map(fn($u) => ["key" => $u->id, "value" => $u->nome])->toArray();
        $cargos = Cargo::all()->map(fn($u) => ["key" => $u->id, "value" => $u->nome])->toArray();
        return ["unidades" => $unidades, "funcoes" => $funcoes, "grupos" => $grupos, "ct" => $ct, "cargos" => $cargos];
    }

    public function proxyStore($data, $unidade, $action){

        if ($action == ServiceBase::ACTION_INSERT){
            
  
            foreach($data["graduacoes"] as $graduacao) {
            
            }
          
        }
        return $data;
    }
}
