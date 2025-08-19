<?php

namespace App\Services;

use App\Enums\Atribuicao;
use App\Facades\SiapeLog;
use App\Models\Perfil;
use App\Models\SiapeBlackListServidores;
use App\Models\UnidadeIntegrante;
use App\Models\Usuario;
use App\Services\ServiceBase;
use App\Services\Siape\Unidade\Integracao;

class IntegracaoServidorService extends ServiceBase
{

  public function processaServidoresRemovidosNoSiape(): array
  {
    $ids = $this->listIdsUsuariosRemovidosNaoExcluidos();

    if (empty($ids)) {
      return [];
    }

    $consultaId = $this->nivelAcessoService->getPerfilConsulta()->id;
    if (!$consultaId) {
      return [];
    }
    // Atualizar os usuários para perfil consulta
    Usuario::whereIn('id', $ids)->update([
      'situacao_siape' => 'INATIVO',
      'perfil_id' => $consultaId,
    ]);

    $cpfs = Usuario::whereIn('id', $ids)->pluck('cpf');
    SiapeBlackListServidores::whereIn('cpf', $cpfs)->update([
      'inativado' => 1
    ]);
    SiapeLog::info("ISiape: Servidores removidos do SIAPE e excluídos do sistema.", ['ids' => $ids]);

    return $ids;
  }

  private function listIdsUsuariosRemovidosNaoExcluidos(): array
  {
    $ids = Usuario::join('siape_blacklist_servidores as s', 'usuarios.cpf', '=', 's.cpf')
      ->where('s.inativado', 0)
      ->pluck('usuarios.id');

    return $ids->toArray();
  }
}
