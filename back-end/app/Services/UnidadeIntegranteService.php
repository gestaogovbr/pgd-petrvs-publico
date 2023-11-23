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
    public function loadIntegrantes($unidadeId, $usuarioId)
    {
        $result = [];
        $unidade = empty($unidadeId) ? null : Unidade::find($unidadeId);
        $usuario = empty($usuarioId) ? null : Usuario::find($usuarioId);
        if (!empty($unidadeId) && empty($unidade)) throw new ServerException("ValidateIntegrante", "Unidade não encontrada no banco");
        if (!empty($usuarioId) && empty($usuario)) throw new ServerException("ValidateIntegrante", "Usuário não encontrado no banco");
        foreach (($unidade ? $unidade->integrantes : $usuario->unidadesIntegrante) as $vinculo) {
            $result[$unidade ? $vinculo->usuario->id : $vinculo->unidade->id] = [
                "id" => $unidade ? $vinculo->usuario->id : $vinculo->unidade->id,
                "usuario_nome" => $unidade ? $vinculo->usuario->nome : null,
                "usuario_apelido" => $unidade ? $vinculo->usuario->apelido : null,
                "usuario_url_foto" => $unidade ? $vinculo->usuario->url_foto : null,
                "unidade_nome" => $usuario ? $vinculo->unidade->nome : null,
                "unidade_sigla" => $usuario ? $vinculo->unidade->sigla : null,
                "unidade_codigo" => $usuario ? $vinculo->unidade->codigo : null,
                "atribuicoes" => $vinculo->atribuicoes->map(fn ($a) => $a->atribuicao)
            ];
        }
        return ['rows' => array_values($result), 'unidade' => $unidade, 'usuario' => $usuario];
    }

    public function saveIntegrante(array $vinculos, $transaction = true): array
    {
      $result = [];
      foreach ($vinculos as $vinculo) {
          if($transaction) DB::beginTransaction();
          try {
              $usuario = Usuario::find($vinculo["usuario_id"]);
              $unidade = Unidade::find($vinculo["unidade_id"]);
              if (empty($unidade) || empty($usuario)) throw new ServerException("ValidateIntegrante", "Unidade/Usuário não existe no banco");
              $atribuicoesFinais = [];
              $integranteNovoOuExistente = UnidadeIntegrante::firstOrCreate(['unidade_id' => $unidade->id, 'usuario_id' => $usuario->id]);
              if ($usuario && !$vinculo["atribuicoes"]) {     // excluir o vínculo e suas atribuições
                  if (!empty($usuario->lotacao) && $usuario->lotacao->id == $integranteNovoOuExistente->id) {     // o vínculo de lotação não pode ser excluído, apenas através da definição da lotação em outra unidade
                      $integranteNovoOuExistente->atribuicoes->each(function ($a) { if ($a->atribuicao != 'LOTADO') $a->delete(); });
                      $msg = "O vínculo de LOTADO não pode ser apagado, apenas transferido através da atribuição de lotação em outra unidade.";
                      array_push($atribuicoesFinais, "LOTADO");
                  } else {
                      $integranteNovoOuExistente->deleteCascade();
                      if($transaction) DB::commit();
                      return $result;
                  };
              } else {
                  $this->validateIntegrante($vinculo["atribuicoes"]);
                  $unidadeLotacao = $usuario->lotacao ? $usuario->lotacao->unidade : null;
                  $unidadeGerenciaTitular = $usuario->gerenciaTitular ? $usuario->gerenciaTitular->unidade : null;
                  $atualGestorUnidade = $unidade->gestor ? $unidade->gestor->usuario : null;
                  $atualGestorDelegadoUnidade = $unidade->gestorDelegado ? $unidade->gestorDelegado->usuario : null;
                  $atualGestorSubstitutoUnidade = $unidade->gestorSubstituto ? $unidade->gestorSubstituto->usuario : null;

                  $definirLotacao = function ($integranteNovoOuExistente) use ($unidadeLotacao, $unidade, $usuario, &$atribuicoesFinais) {
                      if(!empty($unidadeLotacao->id) && $unidadeLotacao->id != $unidade->id) { 
                        $usuario->lotacao->lotado->delete();
                        $unidadeLotacao = null;
                      }
                      if(empty($unidadeLotacao->id)) UnidadeIntegranteAtribuicao::create(["atribuicao" => "LOTADO", "unidade_integrante_id" => $integranteNovoOuExistente->id])->save();
                      array_push($atribuicoesFinais, "LOTADO");
                  };

                  $definirGerenciaTitular = function ($integranteNovoOuExistente) use ($unidadeGerenciaTitular, $atualGestorUnidade, $unidade, $usuario, $definirLotacao, &$atribuicoesFinais) {
                      $definirLotacao($integranteNovoOuExistente);
                      if(!empty($atualGestorUnidade->id) && $atualGestorUnidade->id != $usuario->id) { 
                        $unidade->gestor->gestor->delete();
                        $atualGestorUnidade = null;
                      }
                      if(!empty($unidadeGerenciaTitular->id) && $unidadeGerenciaTitular->id != $unidade->id) {
                        $usuario->gerenciaTitular->gestor->delete();
                        $unidadeGerenciaTitular = null;
                      }
                      if(empty($unidadeGerenciaTitular->id) && empty($atualGestorUnidade->id)) UnidadeIntegranteAtribuicao::create(["atribuicao" => "GESTOR", "unidade_integrante_id" => $integranteNovoOuExistente->id])->save();
                      array_push($atribuicoesFinais, "GESTOR");
                  };

                  $definirGerenciaDelegada = function ($integranteNovoOuExistente) use ($atualGestorDelegadoUnidade, $usuario, $unidade, &$atribuicoesFinais) {
                      if(!empty($atualGestorDelegadoUnidade->id) && $atualGestorDelegadoUnidade->id != $usuario->id) { 
                        $unidade->gestorDelegado->gestorDelegado->delete();
                        $atualGestorDelegadoUnidade = null;
                      }
                      if(empty($atualGestorDelegadoUnidade->id)) UnidadeIntegranteAtribuicao::create(["atribuicao" => "GESTOR_DELEGADO", "unidade_integrante_id" => $integranteNovoOuExistente->id])->save();
                      array_push($atribuicoesFinais, "GESTOR_DELEGADO");
                  };

                  $definirGerenciaSubstituta = function ($integranteNovoOuExistente) use ($atualGestorSubstitutoUnidade, $usuario, $unidade, &$atribuicoesFinais) {
                    if(!empty($atualGestorSubstitutoUnidade->id) && $atualGestorSubstitutoUnidade->id != $usuario->id) {
                        $unidade->gestorSubstituto->gestorSubstituto->delete();
                        $atualGestorSubstitutoUnidade = null;
                    }
                    if(empty($atualGestorSubstitutoUnidade->id)) UnidadeIntegranteAtribuicao::create(["atribuicao" => "GESTOR_SUBSTITUTO", "unidade_integrante_id" => $integranteNovoOuExistente->id])->save();
                    array_push($atribuicoesFinais, "GESTOR_SUBSTITUTO");
                };

                  if (in_array("LOTADO", $vinculo["atribuicoes"])) $definirLotacao($integranteNovoOuExistente); //else if(!empty($unidadeLotacao->id) && $unidadeLotacao->id == $unidade->id) array_push($atribuicoesFinais, "LOTADO");
                  if (in_array("GESTOR", $vinculo["atribuicoes"])) $definirGerenciaTitular($integranteNovoOuExistente); //else if(!empty($atualGestorUnidade->id) && $atualGestorUnidade->id == $usuario->id) array_push($atribuicoesFinais, "GESTOR");
                  if (in_array("GESTOR_DELEGADO", $vinculo["atribuicoes"])) $definirGerenciaDelegada($integranteNovoOuExistente); //else if(!empty($atualGestorDelegadoUnidade->id) && $atualGestorDelegadoUnidade->id == $usuario->id) array_push($atribuicoesFinais, "GESTOR_DELEGADO");
                  if (in_array("GESTOR_SUBSTITUTO", $vinculo["atribuicoes"])) $definirGerenciaSubstituta($integranteNovoOuExistente); //else if(!empty($atualGestorSubstitutoUnidade->id) && $atualGestorSubstitutoUnidade->id == $usuario->id) array_push($atribuicoesFinais, "GESTOR_SUBSTITUTO");
                  
                  // Só salvar atribuições diferentes de lotação e gerência (Lotado, Gestor, Gestor_delegado, Gestor_substituto) e se ainda não existir
                  foreach (array_diff($vinculo["atribuicoes"], ['LOTADO', 'GESTOR', 'GESTOR_DELEGADO', 'GESTOR_SUBSTITUTO']) as $x) {
                      if(empty(UnidadeIntegranteAtribuicao::where('atribuicao', $x)->where('unidade_integrante_id', $integranteNovoOuExistente->id)->first())) {
                          UnidadeIntegranteAtribuicao::create(['atribuicao' => $x, 'unidade_integrante_id' => $integranteNovoOuExistente->id], [])->save();
                      }
                      array_push($atribuicoesFinais, $x);
                  }
              }
              $atribuicoesFinais = array_values(array_unique($atribuicoesFinais));
              /* Excluir as atribuições remanescentes */
              foreach($integranteNovoOuExistente->atribuicoes as $atribuicao) { 
                  if(!in_array($atribuicao->atribuicao, $atribuicoesFinais)) $atribuicao->delete(); 
              }
              if($transaction) DB::commit();
              array_push($result,[
                  'unidade_id' => $unidade->id,
                  'usuario_id' => $usuario->id,
                  'atribuicoes' => $atribuicoesFinais,
                  'msg' => $msg ?? ''
              ]);
          } catch (Throwable $e) {
            if($transaction) DB::rollback();
              throw $e;
          }
      }
      return $result;
    }

    public function validateIntegrante($atribuicoes)
    {
        if (count(array_intersect(['GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO'], $atribuicoes)) > 1) throw new ServerException("ValidateIntegrante", "A um mesmo servidor só pode ser atribuída uma função de gestor, para uma mesma Unidade!");
    }
}
