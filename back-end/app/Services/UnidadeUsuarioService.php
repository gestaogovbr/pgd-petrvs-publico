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

class UnidadeUsuarioService extends ServiceBase {
    public function loadIntegrantes($unidadeId) {
        $result = [];
        $unidade = Unidade::with(["lotacoes" => function($query){
            $query->whereNull('data_fim');
        }])->where("id", $unidadeId)->first();
        if(empty($unidade)) throw new ServerException("ValidateUnidade", "Unidade não encontrada no banco");
        $adicionar = function($usuario, $atribuicao) use (&$result) {
            $consolidado = $result[$usuario->id] ?? [
                "id" => $usuario->id,
                "usuario" => $usuario,
                "usuario_id" => $usuario->id,
                "atribuicoes" => []
            ];
            $consolidado["atribuicoes"] = array_merge($consolidado["atribuicoes"] ?? [], [$atribuicao]);
            $result[$usuario->id] = $consolidado;
        };
        /* Integrantes do banco de dados */
        $integrantes = UnidadeUsuario::with("usuario")->where("unidade_id", $unidadeId)->get();
        foreach ($integrantes as $integrante) {
            $adicionar($integrante->usuario, $integrante->atribuicao);
        }
        /* Chefias */
        if(!empty($unidade->gestor)) $adicionar($unidade->gestor, "GESTOR");
        if(!empty($unidade->gestorSubstituto)) $adicionar($unidade->gestorSubstituto, "GESTOR_SUBSTITUTO");
        /* Lotações */
        foreach ($unidade->lotacoes as $lotacao) {
            $adicionar($lotacao->usuario, "LOTADO");
        }
        return ['rows' => array_values($result), 'unidade' => $unidade];
    }

    public function saveIntegrante($unidadeId, $integrante) {
        DB::beginTransaction();
        try {
/*             $lotacao = Lotacao::where("unidade_id", $unidadeId)->where("usuario_id", $integrante["usuario_id"])->first();
            $unidade = Unidade::find($unidadeId);
            $atribuicoes = $integrante["atribuicoes"];
            $lotado = in_array("LOTADO", $atribuicoes);
            // Lotacao
            if($lotado && empty($lotacao)) {
                $this->lotacaoService->store([
                    "usuario_id" => $integrante["usuario_id"],
                    "unidade_id" => $unidadeId,
                    "principal" => false
                ], $unidade);
            } else if(!$lotado && !empty($lotacao)) {
                $this->lotacaoService->destroy($lotacao->id);
            } */
            $usuario = Usuario::find($integrante["usuario_id"])->with("lotacao");
            $lotacao = $usuario->lotacao;
            $unidade = Unidade::find($unidadeId);
            $atribuicoes = $integrante["atribuicoes"];
            $vinculoNovo = UnidadeUsuario::firstOrCreate(['unidade_id' => $unidadeId, 'usuario_id' => $integrante["usuario_id"]]);
            //...........checar inconsistências entre as atribuições LOTADO/COLABORADOR, GESTOR/GESTOR_SUBSTITUTO
            /* Lotação */
            $lotado = in_array("LOTADO", $atribuicoes);
            if($lotado){
                if(!empty($lotacao) && $lotacao->id != $unidadeId) {
                    $vinculoAntigo = UnidadeUsuario::where(['unidade_id' => $lotacao->id, 'usuario_id' => $integrante["usuario_id"]])->first();
                    Atribuicao::where('unidade_usuario_id',$vinculoAntigo->id)->where('atribuicao', 'LOTADO')->first()->delete();
                }
                if(empty($lotacao) || $lotacao->id != $unidadeId) {
                    $this->atribuicaoService->store([
                        "atribuicao" => "LOTADO",
                        "unidade_usuario_id" => $vinculoNovo->id
                    ], $unidade);
                }
            }
/*             // Chefias 
            $unidade->gestor_id = in_array("GESTOR", $atribuicoes) ? $integrante["usuario_id"] : ($unidade->gestor_id == $integrante["usuario_id"] ? null : $unidade->gestor_id);
            $unidade->gestor_substituto_id = in_array("GESTOR_SUBSTITUTO", $atribuicoes) ? $integrante["usuario_id"] : ($unidade->gestor_substituto_id == $integrante["usuario_id"] ? null : $unidade->gestor_substituto_id);
            $unidade->save(); */
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
            }
            /* Gerência substituta */
            $gestorSubstituto = in_array("GESTOR_SUBSTITUTO", $atribuicoes);
            if($gestorSubstituto && !in_array($unidadeId, array_map(fn($u) => $u->id, $usuario->gerenciasSubstitutas))) {
                $this->atribuicaoService->store([
                    "atribuicao" => "GESTOR_SUBSTITUTO",
                    "unidade_usuario_id" => $vinculoNovo->id
                ], $unidade);
            }
/*             // Integrantes
            $integrantes = UnidadeUsuario::where("unidade_id", $unidadeId)->where("usuario_id", $integrante["usuario_id"])->get(); 
            $atribuicoesDb = [];
            foreach($integrantes as $atribuicao) {
                if(!in_array($atribuicao->atribuicao, $atribuicoes)) {
                    $atribuicao->delete();
                }
                $atribuicoesDb[] = $atribuicao->atribuicao;
            }
            foreach($atribuicoes as $atribuicao) {
                if(!in_array($atribuicao, array_merge(["LOTADO", "GESTOR", "GESTOR_SUBSTITUTO"], $atribuicoesDb))) {
                    $unidadeIntegrente = new UnidadeUsuario([
                        "usuario_id" => $integrante["usuario_id"],
                        "unidade_id" => $unidadeId,
                        "atribuicao" => $atribuicao
                    ]);
                    $unidadeIntegrente->save();
                }
            } */
            /* Demais atribuições */
            'AVALIADOR_PLANO_ENTREGA','AVALIADOR_PLANO_TRABALHO','HOMOLOGADOR_PLANO_ENTREGA','COLABORADOR'
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

}

