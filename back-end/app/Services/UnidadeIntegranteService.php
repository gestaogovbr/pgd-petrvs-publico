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
    public function loadIntegrantes($unidadeId) {
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

    public function saveIntegrante($unidadeId, $integrante) {
        DB::beginTransaction();
        try {
            $usuario = Usuario::find($integrante["usuario_id"]);
            $lotacao = $usuario->lotacao;
            $unidade = Unidade::find($unidadeId);
            if(empty($unidade) || empty($usuario)) throw new ServerException("ValidateUnidade", "Unidade/Usuário não existe no banco");
            $atribuicoes = $integrante["atribuicoes"];
            if($usuario && !$atribuicoes) {     // excluir o vínculo unidade-integrante
                UnidadeIntegrante::where('usuario_id',$usuario->id)->where('unidade_id',$unidade->id)->first()->deleteCascade();
            } else {
                $this->validateIntegrante($unidadeId, $integrante);
                $lotar = function($vinculoNovo) use ($lotacao,$unidadeId,$integrante) {
                    if(!empty($lotacao) && $lotacao->id != $unidadeId) {
                        $vinculoAntigo = UnidadeIntegrante::where(['unidade_id' => $lotacao->id, 'usuario_id' => $integrante["usuario_id"]])->first();
                        UnidadeIntegranteAtribuicao::where('unidade_integrante_id',$vinculoAntigo->id)->where('atribuicao', 'LOTADO')->first()->delete();
                    }
                    if(empty($lotacao) || $lotacao->id != $unidadeId) UnidadeIntegranteAtribuicao::create(["atribuicao" => "LOTADO","unidade_integrante_id" => $vinculoNovo->id]);
                };
                $vinculoNovo = UnidadeIntegrante::firstOrCreate(['unidade_id' => $unidadeId, 'usuario_id' => $integrante["usuario_id"]]);
                /* Lotação */
                $lotado = in_array("LOTADO", $atribuicoes);
                if($lotado) $lotar($vinculoNovo);
                /* Gerência titular */
                $gestor = in_array("GESTOR", $atribuicoes);
                if($gestor){
                    $gerenciaTitular = $usuario->gerenciaTitular;
                    if(!empty($gerenciaTitular) && $gerenciaTitular->id != $unidadeId) {
                        $vinculoAntigo = UnidadeIntegrante::where(['unidade_id' => $gerenciaTitular->id, 'usuario_id' => $integrante["usuario_id"]])->first();
                        UnidadeIntegranteAtribuicao::where('unidade_integrante_id',$vinculoAntigo->id)->where('atribuicao', 'GESTOR')->first()->delete();
                    }
                    if(empty($gerenciaTitular) || $gerenciaTitular->id != $unidadeId) {
                        $this->atribuicaoService->store([
                            "atribuicao" => "GESTOR",
                            "unidade_integrante_id" => $vinculoNovo->id
                        ], $unidade);
                    }
                    if(!$lotado) $lotar($vinculoNovo);
                }
                /* Outras atribuições */
                $outrasAtribuicoes = array_diff($atribuicoes, ['LOTADO','GESTOR']);
                foreach($outrasAtribuicoes as $x) { UnidadeIntegranteAtribuicao::updateOrCreate(['atribuicao' => $x, 'unidade_integrante_id' => $vinculoNovo->id],[]); }
                }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function validateIntegrante($unidadeId, $integrante){
        if(count(array_intersect(['GESTOR','GESTOR_SUBSTITUTO'],$integrante["atribuicoes"])) == 2 || count(array_intersect(['LOTADO','COLABORADOR'],$integrante["atribuicoes"])) == 2) throw new ServerException("ValidateAtribuicao", "Há inconsistência nas atribuições: GESTOR/GESTOR_SUBSTITUTO ou LOTADO/COLABORADOR");
    }
}

