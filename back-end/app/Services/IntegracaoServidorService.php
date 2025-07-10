<?php

namespace App\Services;

use App\Enums\Atribuicao;
use App\Facades\SiapeLog;
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


    $unidadesIntegrantes = UnidadeIntegrante::whereIn('usuario_id', $ids)->get();
    $integracaoUnidade = new Integracao([]);

    $atribuicoes = array_column(Atribuicao::cases(), 'value');

    foreach ($unidadesIntegrantes as $unidadeIntegrante) {
      $usuarioId = $unidadeIntegrante->usuario->id;
      $cpf = $unidadeIntegrante->usuario->cpf;
      $temPlanodeTrabalhoAtivo = $integracaoUnidade->usuarioTemPlanodeTrabalhoAtivo($unidadeIntegrante->usuario, $unidadeIntegrante->unidade);
      if ($temPlanodeTrabalhoAtivo) {
        SiapeLog::info("ISiape: Servidor com plano de trabalho ativo, não será removido.", $unidadeIntegrante->toArray());
        unset($ids[$usuarioId]);
        continue;
      }
      $integracaoUnidade->removeDeterminadasAtribuicoes($atribuicoes, $unidadeIntegrante);
      Usuario::where('id', $usuarioId)->delete();
      SiapeBlackListServidores::where('cpf', $cpf)
      ->update([
          'inativado' => 1
      ]);
      }

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
