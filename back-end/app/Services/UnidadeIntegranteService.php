<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\Usuario;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;
use Throwable;

class UnidadeIntegranteService extends ServiceBase 
{
    public function loadUsuariosIntegrantes($unidadeId) {
        $result = [];
        $unidade = Unidade::find($unidadeId);
        if(empty($unidade)) throw new ServerException("ValidateUnidade", "Unidade não encontrada no banco");
        foreach($unidade->integrantesAtribuicoes as $id_usuario => $atribuicoes){
            $result[$id_usuario] = [
                "id" => $id_usuario,
                "usuario" => Usuario::find($id_usuario),
                "usuario_id" => $id_usuario,
                "atribuicoes" => $atribuicoes
            ];                
        }
        return ['rows' => array_values($result), 'unidade' => $unidade];
    }

    public function loadUnidadesIntegrantes($usuarioId) {
        $result = [];
        $usuario = Usuario::find($usuarioId);
        if(empty($usuario)) throw new ServerException("ValidateUsuario", "Usuário não encontrado no banco");
        foreach($usuario->unidadesAtribuicoes as $id_unidade => $atribuicoes){
            $result[$id_unidade] = [
                "id" => $id_unidade,
                "unidade" => Unidade::find($id_unidade),
                "unidade_id" => $id_unidade,
                "atribuicoes" => $atribuicoes
            ];                
        }
        return ['rows' => array_values($result), 'usuario' => $usuario];
    }

    public function saveUsuarioIntegrante($unidadeId, $integrante) {
        DB::beginTransaction();
        try {
            $usuario = Usuario::find($integrante["usuario_id"]);
            $lotacao = $usuario->lotacao->unidade;
            $unidade = Unidade::find($unidadeId);
            if(empty($unidade) || empty($usuario)) throw new ServerException("ValidateUnidade", "Unidade/Usuário não existe no banco");
            $novasAtribuicoes = $integrante["atribuicoes"];
            if($usuario && !$novasAtribuicoes) {     // excluir o vínculo unidade-integrante
                UnidadeIntegrante::where('usuario_id',$usuario->id)->where('unidade_id',$unidade->id)->first()->deleteCascade();
            } else {
                $this->validateUsuarioIntegrante($unidadeId, $integrante);
                $lotar = function($vinculoNovo) use ($lotacao,$unidadeId,$usuario) {
                    if(!empty($lotacao) && $lotacao->id != $unidadeId) {
                        $vinculoAntigo = UnidadeIntegrante::where(['unidade_id' => $lotacao->id, 'usuario_id' => $usuario->id])->first();
                        UnidadeIntegranteAtribuicao::where('unidade_integrante_id',$vinculoAntigo->id)->where('atribuicao', 'LOTADO')->first()->delete();
                    }
                    if(empty($lotacao) || $lotacao->id != $unidadeId) UnidadeIntegranteAtribuicao::create(["atribuicao" => "LOTADO","unidade_integrante_id" => $vinculoNovo->id]);
                };
                $vinculoNovo = UnidadeIntegrante::firstOrCreate(['unidade_id' => $unidadeId, 'usuario_id' => $integrante["usuario_id"]]);
                /* Lotação */
                $lotado = in_array("LOTADO", $novasAtribuicoes);
                if($lotado) $lotar($vinculoNovo);
                /* Gerência titular */
                $gestor = in_array("GESTOR", $novasAtribuicoes);
                if($gestor){
                    $gerenciaTitular = $usuario->gerenciaTitular;
                    if(!empty($gerenciaTitular) && $gerenciaTitular->id != $unidadeId) {
                        $vinculoAntigo = UnidadeIntegrante::where(['unidade_id' => $gerenciaTitular->id, 'usuario_id' => $integrante["usuario_id"]])->first();
                        UnidadeIntegranteAtribuicao::where('unidade_integrante_id',$vinculoAntigo->id)->where('atribuicao', 'GESTOR')->first()->delete();
                    }
                    if(empty($gerenciaTitular) || $gerenciaTitular->id != $unidadeId) {
                        $this->unidadeIntegranteAtribuicaoService->store([
                            "atribuicao" => "GESTOR",
                            "unidade_integrante_id" => $vinculoNovo->id
                        ], $unidade);
                    }
                    if(!$lotado) $lotar($vinculoNovo);
                }
                /* Outras atribuições */
                $outrasAtribuicoes = array_diff($novasAtribuicoes, ['LOTADO','GESTOR']);
                foreach($outrasAtribuicoes as $x) { UnidadeIntegranteAtribuicao::updateOrCreate(['atribuicao' => $x, 'unidade_integrante_id' => $vinculoNovo->id],[]); }
                }
                /* Excluir as atribuições remanescentes */
                $vinculoNovo->refresh();
                foreach($vinculoNovo->atribuicoes as $atribuicao) { if(!in_array($atribuicao->atribuicao, $novasAtribuicoes)) $atribuicao->delete(); }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function validateUsuarioIntegrante($unidadeId, $integrante){
        if(count(array_intersect(['GESTOR','GESTOR_SUBSTITUTO'],$integrante["atribuicoes"])) == 2 || count(array_intersect(['LOTADO','COLABORADOR'],$integrante["atribuicoes"])) == 2) throw new ServerException("ValidateAtribuicao", "Há inconsistência nas atribuições: GESTOR/GESTOR_SUBSTITUTO ou LOTADO/COLABORADOR");
    }
}

