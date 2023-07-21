<?php

namespace App\Services;

use App\Services\ServiceBase;
use App\Models\Usuario;
use App\Models\Atribuicao;
use App\Models\UnidadeUsuario;
use App\Exceptions\ServerException;

class AtribuicaoService extends ServiceBase {

    public function proxyStore($data, $unidade, $action) {
        if($action == ServiceBase::ACTION_INSERT && $data["atribuicao"] == "LOTADO"){
            $vinculo = UnidadeUsuario::find($data["unidade_usuario_id"]);
            $lotacao = $vinculo->usuario->lotacao;
            if(!empty($lotacao) && $lotacao->id != $unidade->id) {
                Atribuicao::where('unidade_usuario_id',$vinculo->id)->where('atribuicao', 'LOTADO')->first()->delete();
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
