<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Models\Usuario;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\UnidadeIntegrante;
use App\Exceptions\ServerException;

class UnidadeIntegranteAtribuicaoService extends ServiceBase {

    public function proxyStore($data, $unidade, $action) {
        if($action == ServiceBase::ACTION_INSERT && $data["atribuicao"] == "LOTADO"){
            $vinculo = UnidadeIntegrante::find($data["unidade_integrante_id"]);
            $lotacao = $vinculo->usuario->lotacao;
            if(!empty($lotacao) && $lotacao->id != $unidade->id) {
                UnidadeIntegranteAtribuicao::where('unidade_integrante_id',$vinculo->id)->where('atribuicao', 'LOTADO')->first()->delete();
            } else if (!empty($lotacao) && $lotacao->id == $unidade->id) throw new ServerException("ValidateLotacao", "Usuário já é lotado nessa Unidade");
        }
        return $data;
    }

    public function extraStore($entity, $unidade, $action) {
        $this->checkLotacoes($entity->usuario_id);
    }

    public function extraDestroy($entity) {
        $this->checkLotacoes($entity->usuario_id);
    }

    public function checkLotacoes($usuarioId) {
        $usuario = Usuario::find($usuarioId);
        if(!isset($usuario->lotacao)) throw new ServerException("ValidateLotacao", "Usuário não pode ficar sem lotação");
    }
}
