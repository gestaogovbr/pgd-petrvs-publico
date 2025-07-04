<?php

namespace App\Services;

use App\Enums\Atribuicao;
use App\Facades\SiapeLog;
use App\Models\UnidadeIntegrante;
use App\Models\Usuario;
use App\Services\ServiceBase;
use App\Services\Siape\Unidade\Integracao;

class IntegracaoServidorService extends ServiceBase {

    public function processaServidoresRemovidosNoSiape() : array
  {
    $ids = $this->listIdsUsuariosRemovidosNaoExcluidos();

    if (empty($ids)) {
      return [];
    }
    
    $unidadesIntegrantes = UnidadeIntegrante::whereIn('usuario_id', $ids)->get();
    $integracaoUnidadeGestor = new Integracao([]);

    $atribuicoes = array_column(Atribuicao::cases(), 'value');

    foreach ($unidadesIntegrantes as $unidadeIntegrante) {
        
        // $integracaoUnidadeGestor->removeDeterminadasAtribuicoes($atribuicoes, $unidadeIntegrante->usuario_id, $unidadeIntegrante->unidade_id);
    }
     Usuario::whereIn('id', $ids)->delete();

    SiapeLog::info("ISiape: Servidores removidos do SIAPE e excluídos do sistema.", ['ids' => $ids]);

    return $ids;
  }

  private function listIdsUsuariosRemovidosNaoExcluidos():array
  {
    $ids = Usuario::join('siape_blacklist_servidores as s', 'usuarios.cpf', '=', 's.cpf')
              ->pluck('usuarios.id');

    return $ids->toArray();
  }
}
