<?php

namespace App\Services;

use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\PlanoTrabalho;
use App\Services\ServiceBase;
use App\Exceptions\ServerException;

class ProgramaService extends ServiceBase {

    public function assinaturasExigidas($plano_trabalho): array {
        $ids = [];
        if(strlen($plano_trabalho["programa_id"]) && strlen($plano_trabalho["usuario_id"]) && strlen($plano_trabalho["unidade_id"])) {
          $programa = Programa::find($plano_trabalho["programa_id"]);
          $participante = Usuario::find($plano_trabalho["usuario_id"]);
          $unidade = Unidade::find($plano_trabalho["unidade_id"]);
          $lotacao = Unidade::find($participante->lotacao->unidade_id);
          $entidade = $unidade->entidade;
          if($programa->plano_trabalho_assinatura_participante && isset($participante)) $ids[] = $participante->id;
          if($programa->plano_trabalho_assinatura_gestor_unidade && isset($unidade)) array_merge($ids, array_filter([$unidade->gestor ? $unidade->gestor->usuario_id : null, $unidade->gestorSubstituto ? $unidade->gestorSubstituto->usuario_id : null, $unidade->gestorDelegado ? $unidade->gestorDelegado->usuario_id : null]));
          if($programa->plano_trabalho_assinatura_gestor_lotacao && isset($lotacao)) array_merge($ids, array_filter([$lotacao->gestor ? $lotacao->gestor->usuario_id : null, $lotacao->gestorSubstituto ? $lotacao->gestorSubstituto->usuario_id : null, $lotacao->gestorDelegado ? $lotacao->gestorDelegado->usuario_id : null]));
          if($programa->plano_trabalho_assinatura_gestor_entidade && isset($entidade)) array_merge($ids, array_filter([$entidade->gestor_id, $entidade->gestor_substituto_id]));
        } else {
          throw new ServerException("ValidatePlanoTrabalho", "Plano de Trabalho inconsistente (programa/usuário/unidade)!"); 
        }
        return array_values($ids);
    }
}