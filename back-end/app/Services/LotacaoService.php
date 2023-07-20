<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\Lotacao;
use App\Models\Usuario;
use App\Services\ServiceBase;
use App\Services\UtilService;

class LotacaoService extends ServiceBase
{
    /*public function proxyStore($data, $unidade, $action)
    {
        $lotacoes = Lotacao::where('usuario_id', $data["usuario_id"])->get();
        if(count($lotacoes) == 0) {
            $data["principal"] = 1;
        } else {
            $principal = null;
            foreach ($lotacoes as $key => $lotacao) {
                if(UtilService::emptyEntry($data, "id") || $lotacao->id != $data["id"]){
                    if($data["principal"]) {
                        $lotacao->principal = 0;
                        $lotacao->save();
                    } else if($lotacao->principal) {
                        $principal = $key;
                    }
                }
            }
            if(!$data["principal"] && $principal == null) {
                $lotacoes[0]->principal = 1;
                $lotacoes[0]->save();
            }
        }
        return $data;
    }*/

    public function extraStore($entity, $unidade, $action) {
        $this->checksLotacoes($entity->usuario_id);
    }

    public function extraDestroy($entity) {
        $this->checksLotacoes($entity->usuario_id);
    }

    public function checksLotacoes($usuarioId) {
        $lotacoes = Lotacao::where('usuario_id', $usuarioId)->orderByDesc("updated_at")->get();
        if(count($lotacoes) == 0) throw new ServerException("ValidateLotacao", "Usuário não possui nenhuma lotação");
        $principal = null;
        foreach ($lotacoes as $lotacao) {
            if($lotacao->principal && !empty($principal)) {
                $lotacao->principal = 0;
                $lotacao->save();
            } else if($lotacao->principal) {
                $principal = $lotacao;
            }
        }
        if($principal == null) {
            $lotacoes[0]->principal = 1;
            $lotacoes[0]->save();
        }
    }

/*     public function removerLotacoesUsuario(&$usuario) {
        if(!empty($usuario)) {
            foreach($usuario->lotacoes as $lotacao) { // Garante que as lotações antigas sejam apagadas 
                if(empty($lotacao->data_fim)) $this->destroy($lotacao->id, false);
            }
            $usuario->fresh();
        }
    } */
    
}


 