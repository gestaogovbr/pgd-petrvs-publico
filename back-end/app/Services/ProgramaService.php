<?php

namespace App\Services;

use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\PlanoTrabalho;
use App\Services\ServiceBase;

class ProgramaService extends ServiceBase {

    public function assinaturasExigidas($plano_trabalho_id): array {
        $result = [];
        if(strlen($plano_trabalho_id)) {
          $planoTrabalho = PlanoTrabalho::find($plano_trabalho_id);
          $unidadeExecutora = Unidade::find($planoTrabalho["unidade_id"]);
          $programa = Programa::find($planoTrabalho["programa_id"]);
          if($programa->plano_trabalho_assinatura_participante) array_push($result,$planoTrabalho["usuario_id"]);
          if($programa->plano_trabalho_assinatura_gestor_lotacao) array_push($result,Usuario::find($planoTrabalho["usuario_id"])->lotacao->unidade->gestor->usuario->id);
          if($programa->plano_trabalho_assinatura_gestor_unidade) array_push($result,$unidadeExecutora->gestor->usuario->id);
          if($programa->plano_trabalho_assinatura_gestor_entidade) array_push($result,$unidadeExecutora->entidade->gestor->usuario->id);
        }
        return array_values(array_unique($result));
      }
}

