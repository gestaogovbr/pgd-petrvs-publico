<?php

namespace App\Services;

use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\PlanoTrabalho;
use App\Services\ServiceBase;

class ProgramaService extends ServiceBase {

    public function assinaturasExigidas($plano_trabalho_id): array {
        $ids = [];
        if(strlen($plano_trabalho_id)) {
          $plano = PlanoTrabalho::withTrashed()->with(["tipoModalidade", "programa", "unidade.entidade", "unidade.gestor:id,usuario_id", "unidade.gestorSubstituto:id,usuario_id", "unidade.gestorDelegado:id,usuario_id",
                          "usuario.lotacao.unidade.gestor:id,usuario_id", "usuario.lotacao.unidade.gestorSubstituto:id,usuario_id", "usuario.lotacao.unidade.gestorDelegado:id,usuario_id"])
                          ->find($plano_trabalho_id);
          $programa = $plano->programa;
          $servidor = $plano->usuario;
          $unidade = $plano->unidade;
          $lotacao = $plano->usuario->lotacao->unidade;
          $entidade = $unidade->entidade;
          if($programa->plano_trabalho_assinatura_participante && isset($servidor)) $ids[] = $servidor->id;
          if($programa->plano_trabalho_assinatura_gestor_unidade && isset($unidade)) array_merge($ids, array_filter([$unidade->gestor ? $unidade->gestor->usuario_id : null, $unidade->gestorSubstituto ? $unidade->gestorSubstituto->usuario_id : null, $unidade->gestorDelegado ? $unidade->gestorDelegado->usuario_id : null]));
          if($programa->plano_trabalho_assinatura_gestor_lotacao && isset($lotacao)) array_merge($ids, array_filter([$lotacao->gestor ? $lotacao->gestor->usuario_id : null, $lotacao->gestorSubstituto ? $lotacao->gestorSubstituto->usuario_id : null, $lotacao->gestorDelegado ? $lotacao->gestorDelegado->usuario_id : null]));
          if($programa->plano_trabalho_assinatura_gestor_entidade && isset($entidade)) array_merge($ids, array_filter([$entidade->gestor_id, $entidade->gestor_substituto_id]));
        }
        return array_values($ids);
    }
}