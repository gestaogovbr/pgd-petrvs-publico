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
    public function loadIntegrantes($unidadeId, $usuarioId) {
        $result = [];
        $unidade = empty($unidadeId) ? null : Unidade::find($unidadeId);
        $usuario = empty($usuarioId) ? null : Usuario::find($usuarioId);
        if(!empty($unidadeId) && empty($unidade)) throw new ServerException("ValidateIntegrante", "Unidade não encontrada no banco");
        if(!empty($usuarioId) && empty($usuario)) throw new ServerException("ValidateIntegrante", "Usuário não encontrado no banco");
        foreach(($unidade ? $unidade->integrantes : $usuario->unidadesIntegrante) as $vinculo){
            $result[$unidade ? $vinculo->usuario->id : $vinculo->unidade->id] = [
                "id" => $unidade ? $vinculo->usuario->id : $vinculo->unidade->id,
                "usuario_nome" => $unidade ? $vinculo->usuario->nome : null,
                "usuario_apelido" => $unidade ? $vinculo->usuario->apelido : null,
                "usuario_url_foto" => $unidade ? $vinculo->usuario->url_foto : null,
                "unidade_nome" => $usuario ? $vinculo->unidade->nome : null,
                "unidade_sigla" => $usuario ? $vinculo->unidade->sigla : null,
                "unidade_codigo" => $usuario ? $vinculo->unidade->codigo : null,
                "atribuicoes" => $vinculo->atribuicoes->map(fn($a) => $a->atribuicao)
            ];                
        }
        return ['rows' => array_values($result), 'unidade' => $unidade, 'usuario' => $usuario];
    }

    public function saveIntegrante($unidadeId, $usuarioId, $atribuicoes) {
        DB::beginTransaction();
        try {
            $usuario = Usuario::find($usuarioId);
            $unidade = Unidade::find($unidadeId);
            if(empty($unidade) || empty($usuario)) throw new ServerException("ValidateIntegrante", "Unidade/Usuário não existe no banco");
            $novasAtribuicoes = $atribuicoes;
            $atribuicoesFinais = [];
            $vinculoNovo = UnidadeIntegrante::firstOrCreate(['unidade_id' => $unidadeId, 'usuario_id' => $usuarioId]);
            if($usuario && !$novasAtribuicoes) {     // excluir o vínculo e suas atribuições
                $vinculo = UnidadeIntegrante::where('usuario_id',$usuario->id)->where('unidade_id',$unidade->id)->first();
                if($usuario->lotacao->id == $vinculo->id) {     // o vínculo de lotação não pode ser excluído, apenas através da definição da lotação em outra unidade
                    $vinculo->atribuicoes->each(function($a) { if($a->atribuicao != 'LOTADO') $a->delete(); });
                    array_push($atribuicoesFinais,"LOTADO");
                } else {
                    $vinculo->deleteCascade();
                };
            } else {
                $this->validateIntegrante($atribuicoes);
                $unidadeLotacao = $usuario->lotacao ? $usuario->lotacao->unidade : null;
                $unidadeGerenciaTitular = $usuario->gerenciaTitular ? $usuario->gerenciaTitular->unidade : null;
                $definirLotacao = function($vinculoNovo) use ($unidadeLotacao,$unidadeId,$usuario,&$atribuicoesFinais) {
                    if(empty($unidadeLotacao)) {
                        UnidadeIntegranteAtribuicao::create(["atribuicao" => "LOTADO","unidade_integrante_id" => $vinculoNovo->id]);
                    } else {
                        if($unidadeLotacao->id != $unidadeId) {
                            $usuario->lotacao->lotado->delete();
                            UnidadeIntegranteAtribuicao::create(["atribuicao" => "LOTADO","unidade_integrante_id" => $vinculoNovo->id]);
                        }
                    } 
                    array_push($atribuicoesFinais,"LOTADO");
                };
                $definirGerenciaTitular = function($vinculoNovo) use ($unidadeGerenciaTitular,$unidadeId,$usuario,$definirLotacao,&$atribuicoesFinais) {
                    $definirLotacao($vinculoNovo);
                    if(empty($unidadeGerenciaTitular)) {
                            $x = new UnidadeIntegranteAtribuicao(["atribuicao" => "GESTOR","unidade_integrante_id" => $vinculoNovo->id]);
                            //$x->fill(["atribuicao" => "GESTOR","unidade_integrante_id" => $vinculoNovo->id]);
                            $x->save();
                     } else {
                        if($unidadeGerenciaTitular->id != $unidadeId) {
                            $usuario->gerenciaTitular->gestor->delete();
                            UnidadeIntegranteAtribuicao::create(["atribuicao" => "GESTOR","unidade_integrante_id" => $vinculoNovo->id]);
                        }
                    }
                    array_push($atribuicoesFinais,"GESTOR");
                };
                if(in_array("LOTADO", $novasAtribuicoes)) $definirLotacao($vinculoNovo);
                if(in_array("GESTOR", $novasAtribuicoes)) $definirGerenciaTitular($vinculoNovo);
                foreach(array_diff($novasAtribuicoes, ['LOTADO','GESTOR']) as $x) { 
                    UnidadeIntegranteAtribuicao::updateOrCreate(['atribuicao' => $x, 'unidade_integrante_id' => $vinculoNovo->id],[]); 
                    array_push($atribuicoesFinais,$x);
                }
            }
            /* Excluir as atribuições remanescentes */
            foreach($vinculoNovo->atribuicoes as $atribuicao) { 
                if(!in_array($atribuicao->atribuicao, $atribuicoesFinais)) $atribuicao->delete(); 
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function validateIntegrante($atribuicoes){
        if(count(array_intersect(['GESTOR','GESTOR_SUBSTITUTO'],$atribuicoes)) == 2 || count(array_intersect(['LOTADO','COLABORADOR'],$atribuicoes)) == 2) throw new ServerException("ValidateIntegrante", "Há inconsistência nas atribuições: GESTOR/GESTOR_SUBSTITUTO ou LOTADO/COLABORADOR");
    }
}

