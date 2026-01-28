<?php

namespace App\Services;

use App\Enums\UsuarioSituacaoSiape;
use App\Facades\SiapeLog;
use App\Models\SiapeBlackListServidor;
use App\Models\Usuario;
use App\Services\ServiceBase;

class IntegracaoServidorService extends ServiceBase
{
  const SIAPE_BLACKLIST_INATIVO = 1;
  const SIAPE_BLACKLIST_ATIVO = 0;


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

    Usuario::whereIn('id', $ids)->update([
      'situacao_siape' => UsuarioSituacaoSiape::INATIVO->value,
      'perfil_id' => $consultaId,
    ]);

    $usuarios = Usuario::whereIn('id', $ids)->select('cpf', 'matricula')->get();
    $cpfs = $usuarios->pluck('cpf');
    SiapeBlackListServidor::whereIn('cpf', $cpfs)->whereNull('matricula')->update(['inativado' => 1]);
    foreach ($usuarios as $usuario) {
      if (empty($usuario->matricula)) {
        continue;
      }
      SiapeBlackListServidor::where('cpf', $usuario->cpf)
        ->where('matricula', $usuario->matricula)
        ->update(['inativado' => self::SIAPE_BLACKLIST_INATIVO]);
    }
    SiapeLog::info("ISiape: Servidores removidos do SIAPE e excluídos do sistema.", ['ids' => $ids]);

    return $ids;
  }

  private function listIdsUsuariosRemovidosNaoExcluidos(): array
  {
    $ids = Usuario::join('siape_blacklist_servidores as s', function ($join) {
      $join->on('usuarios.cpf', '=', 's.cpf')
        ->where(function ($q) {
          $q->whereNull('s.matricula')
            ->orWhereColumn('usuarios.matricula', 's.matricula');
        });
    })
      ->where('s.inativado', self::SIAPE_BLACKLIST_ATIVO)
      ->where('s.created_at', '<', now()->subDays(30))
      ->pluck('usuarios.id');

    return $ids->toArray();
  }
}
