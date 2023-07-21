<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\Atribuicao;
use App\Models\Unidade;
use App\Models\UnidadeUsuario;
use App\Models\Usuario;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;
use Throwable;

class UnidadeUsuarioService extends ServiceBase 
{
    public function loadIntegrantes($unidadeId) {
        $result = [];
        $unidade = Unidade::find($unidadeId);
        if(empty($unidade)) throw new ServerException("ValidateUnidade", "Unidade não encontrada no banco");
        foreach($unidade->integrantes as $id_usuario => $atribuicoes){
            $result[$id_usuario] = [
                "id" => $id_usuario,
                "usuario" => Usuario::find($id_usuario),
                "usuario_id" => $id_usuario,
                "atribuicoes" => array_map(fn($x) => $x->atribuicao, $atribuicoes->toArray())
            ];                
        }
        return ['rows' => array_values($result), 'unidade' => $unidade];
    }

    public function saveIntegrante($unidadeId, $integrante) {
        DB::beginTransaction();
        try {
            $usuario = Usuario::find($integrante["usuario_id"]);
            $lotacao = $usuario->lotacao;
            $unidade = Unidade::find($unidadeId);
            if(empty($unidade) || empty($usuario)) throw new ServerException("ValidateUnidade", "Unidade/Usuário não existe no banco");
            $atribuicoes = $integrante["atribuicoes"];
            if(count(array_intersect(['GESTOR','GESTOR_SUBSTITUTO'],$atribuicoes)) == 2 || count(array_intersect(['LOTADO','COLABORADOR'],$atribuicoes)) == 2) throw new ServerException("ValidateAtribuicao", "Há inconsistência nas atribuições: GESTOR/GESTOR_SUBSTITUTO ou LOTADO/COLABORADOR");
            $lotar = function($vinculoNovo) use ($lotacao,$unidadeId,$integrante) {
                if(!empty($lotacao) && $lotacao->id != $unidadeId) {
                    $vinculoAntigo = UnidadeUsuario::where(['unidade_id' => $lotacao->id, 'usuario_id' => $integrante["usuario_id"]])->first();
                    Atribuicao::where('unidade_usuario_id',$vinculoAntigo->id)->where('atribuicao', 'LOTADO')->first()->delete();
                }
                if(empty($lotacao) || $lotacao->id != $unidadeId) Atribuicao::create(["atribuicao" => "LOTADO","unidade_usuario_id" => $vinculoNovo->id]);
            };
            $vinculoNovo = UnidadeUsuario::firstOrCreate(['unidade_id' => $unidadeId, 'usuario_id' => $integrante["usuario_id"]]);
            /* Lotação */
            $lotado = in_array("LOTADO", $atribuicoes);
            if($lotado) $lotar($vinculoNovo);
            /* Gerência titular */
            $gestor = in_array("GESTOR", $atribuicoes);
            if($gestor){
                $gerenciaTitular = $usuario->gerenciaTitular;
                if(!empty($gerenciaTitular) && $gerenciaTitular->id != $unidadeId) {
                    $vinculoAntigo = UnidadeUsuario::where(['unidade_id' => $gerenciaTitular->id, 'usuario_id' => $integrante["usuario_id"]])->first();
                    Atribuicao::where('unidade_usuario_id',$vinculoAntigo->id)->where('atribuicao', 'GESTOR')->first()->delete();
                }
                if(empty($gerenciaTitular) || $gerenciaTitular->id != $unidadeId) {
                    $this->atribuicaoService->store([
                        "atribuicao" => "GESTOR",
                        "unidade_usuario_id" => $vinculoNovo->id
                    ], $unidade);
                }
                if(!$lotado) $lotar($vinculoNovo);
            }
            /* Outras atribuições */
            $outrasAtribuicoes = array_diff($atribuicoes, ['LOTADO','GESTOR']);
            foreach($outrasAtribuicoes as $x) { Atribuicao::updateOrCreate(['atribuicao' => $x, 'unidade_usuario_id' => $vinculoNovo->id],[]); }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }
}

