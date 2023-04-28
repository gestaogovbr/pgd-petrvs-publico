<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\Lotacao;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\Usuario;
use App\Services\ServiceBase;
use App\Traits\UseDataFim;
use Illuminate\Support\Facades\DB;
use Throwable;

class UnidadeIntegranteService extends ServiceBase {
    use UseDataFim;

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
        $integrantes = UnidadeIntegrante::with("usuario")->where("unidade_id", $unidadeId)->whereNull("data_fim")->get();
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
            $lotacao = Lotacao::where("unidade_id", $unidadeId)->where("usuario_id", $integrante["usuario_id"])->whereNull("data_fim")->first();
            $unidade = Unidade::find($unidadeId);
            //$usuario = Usuario::find($integrante["usuario_id"]);
            $atribuicoes = $integrante["atribuicoes"];
            $lotado = in_array("LOTADO", $atribuicoes);
            /* Lotacao */
            if($lotado && empty($lotacao)) {
                $this->lotacaoService->store([
                    "usuario_id" => $integrante["usuario_id"],
                    "unidade_id" => $unidadeId,
                    "principal" => false
                ], $unidade);
            } else if(!$lotado && !empty($lotacao)) {
                $this->lotacaoService->destroy($lotacao->id);
            }
            /* Chefias */
            $unidade->gestor_id = in_array("GESTOR", $atribuicoes) ? $integrante["usuario_id"] : ($unidade->gestor_id == $integrante["usuario_id"] ? null : $unidade->gestor_id);
            $unidade->gestor_substituto_id = in_array("GESTOR_SUBSTITUTO", $atribuicoes) ? $integrante["usuario_id"] : ($unidade->gestor_substituto_id == $integrante["usuario_id"] ? null : $unidade->gestor_substituto_id);
            $unidade->save();
            /* Integrantes */
            $integrantes = UnidadeIntegrante::where("unidade_id", $unidadeId)->where("usuario_id", $integrante["usuario_id"])->whereNull("data_fim")->get(); 
            $atribuicoesDb = [];
            foreach($integrantes as $atribuicao) {
                if(!in_array($atribuicao->atribuicao, $atribuicoes)) {
                    $atribuicao->delete();
                }
                $atribuicoesDb[] = $atribuicao->atribuicao;
            }
            foreach($atribuicoes as $atribuicao) {
                if(!in_array($atribuicao, array_merge(["LOTADO", "GESTOR", "GESTOR_SUBSTITUTO"], $atribuicoesDb))) {
                    $unidadeIntegrente = new UnidadeIntegrante([
                        "usuario_id" => $integrante["usuario_id"],
                        "unidade_id" => $unidadeId,
                        "atribuicao" => $atribuicao
                    ]);
                    $unidadeIntegrente->save();
                }
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

}

