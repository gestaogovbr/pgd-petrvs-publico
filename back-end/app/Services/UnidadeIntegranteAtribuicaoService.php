<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Models\Usuario;
use App\Models\UnidadeIntegrante;
use App\Exceptions\ServerException;

class UnidadeIntegranteAtribuicaoService extends ServiceBase
{

  public function proxyStore($data, $unidade, $action)
  {
    if ($action == ServiceBase::ACTION_INSERT && $data["atribuicao"] == "LOTADO") {
      $vinculo = UnidadeIntegrante::find($data["unidade_integrante_id"]);
      $unidadeLotacao = $vinculo->usuario->lotacao->unidade;
      if (!empty($unidadeLotacao) && $unidadeLotacao->id != $unidade->id) {
        $vinculo->usuario->lotacao->lotado->delete();
      }
    }
    return $data;
  }

  public function extraStore($entity, $unidade, $action)
  {
    $this->checkLotacoes($entity->vinculo->usuario_id);
  }

  public function extraDestroy($entity)
  {
    $this->checkLotacoes($entity->vinculo->usuario_id);
  }

  public function checkLotacoes($usuarioId)
  {
    $usuario = Usuario::find($usuarioId);
    if (!$usuario->usuario_externo && !isset($usuario->lotacao)) throw new ServerException("ValidateLotacao", "Usuário não pode ficar sem lotação");
  }
}
