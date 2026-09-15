<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Models\Usuario;
use App\Models\UnidadeIntegrante;
use App\Exceptions\ServerException;
use App\Services\Siape\Unidade\Enum\Atribuicao;

class UnidadeIntegranteAtribuicaoService extends ServiceBase
{

  public function proxyStore($data, $unidade, $action)
  {
    if ($action == ServiceBase::ACTION_INSERT && $data["atribuicao"] == Atribuicao::LOTADO->value) {
      $vinculo = UnidadeIntegrante::find($data["unidade_integrante_id"]);
      $lotacaoAtual = $vinculo?->usuario?->lotacao;

      if (!empty($lotacaoAtual) && $lotacaoAtual->unidade_id != $vinculo->unidade_id) {
        app(UnidadeAtribuicaoService::class)->removerLotacoesAnterioresPreservandoVinculo($vinculo->usuario, $vinculo);
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
