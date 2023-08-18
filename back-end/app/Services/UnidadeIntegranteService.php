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
              if ($usuario && !$vinculo["atribuicoes"]) {     // excluir o vínculo e suas atribuições
                  $integrante = UnidadeIntegrante::where('usuario_id', $usuario->id)->where('unidade_id', $unidade->id)->first();
                  if (!empty($usuario->lotacao) && $usuario->lotacao->id == $integrante->id) {     // o vínculo de lotação não pode ser excluído, apenas através da definição da lotação em outra unidade
                      $integrante->atribuicoes->each(function ($a) {
                          if ($a->atribuicao != 'LOTADO') $a->delete();
                          //Enviar mensagem de retorno para o front-end informando que a lotação não pôde ser apagada
                      });
                      array_push($atribuicoesFinais, "LOTADO");
                  } else {
                      $integrante->deleteCascade();
                  };
              } else {
                  $integranteNovoOuExistente = UnidadeIntegrante::firstOrCreate(['unidade_id' => $unidade->id, 'usuario_id' => $usuario->id]);
                  $this->validateIntegrante($vinculo["atribuicoes"]);
                  $unidadeLotacao = $usuario->lotacao ? $usuario->lotacao->unidade : null;
                  $unidadeGerenciaTitular = $usuario->gerenciaTitular ? $usuario->gerenciaTitular->unidade : null;
                  $atualGestorSubstitutoUnidade = $unidade->gestorSubstituto ? $unidade->gestorSubstituto->usuario : null;

                  $definirLotacao = function ($integranteNovoOuExistente) use ($unidadeLotacao, $unidade, $usuario, &$atribuicoesFinais) {
                      if(!empty($unidadeLotacao->id) && $unidadeLotacao->id != $unidade->id) $usuario->lotacao->lotado->delete();
                      if(empty($unidadeLotacao->id) || $unidadeLotacao->id != $unidade->id) UnidadeIntegranteAtribuicao::create(["atribuicao" => "LOTADO", "unidade_integrante_id" => $integranteNovoOuExistente->id])->save();
                      array_push($atribuicoesFinais, "LOTADO");
                  };

                  $definirGerenciaTitular = function ($integranteNovoOuExistente) use ($unidadeGerenciaTitular, $unidade, $usuario, $definirLotacao, &$atribuicoesFinais) {
                      $definirLotacao($integranteNovoOuExistente);
                      if(!empty($unidadeGerenciaTitular->id) && $unidadeGerenciaTitular->id != $unidade->id) $usuario->gerenciaTitular->gestor->delete();
                      if(empty($unidadeGerenciaTitular->id) || $unidadeGerenciaTitular->id != $unidade->id) UnidadeIntegranteAtribuicao::create(["atribuicao" => "GESTOR", "unidade_integrante_id" => $integranteNovoOuExistente->id])->save();
                      array_push($atribuicoesFinais, "GESTOR");
                  };

                  $definirGerenciaSubstituta = function ($integranteNovoOuExistente) use ($atualGestorSubstitutoUnidade, $usuario, $unidade, &$atribuicoesFinais) {
                      if(!empty($atualGestorSubstitutoUnidade->id) && $atualGestorSubstitutoUnidade->id != $usuario->id) $unidade->gestorSubstituto->gestorSubstituto->delete();
                      if(empty($atualGestorSubstitutoUnidade->id) || $atualGestorSubstitutoUnidade->id != $usuario->id) UnidadeIntegranteAtribuicao::create(["atribuicao" => "GESTOR_SUBSTITUTO", "unidade_integrante_id" => $integranteNovoOuExistente->id])->save();
                      array_push($atribuicoesFinais, "GESTOR_SUBSTITUTO");
                  };

                  if (in_array("LOTADO", $vinculo["atribuicoes"])) $definirLotacao($integranteNovoOuExistente);
                  if (in_array("GESTOR", $vinculo["atribuicoes"])) $definirGerenciaTitular($integranteNovoOuExistente);
                  if (in_array("GESTOR_SUBSTITUTO", $vinculo["atribuicoes"])) $definirGerenciaSubstituta($integranteNovoOuExistente);
                  
                  // Só salvar atribuições diferentes das comuns (Lotado, Gestor, Gestor_substituto) e se ainda não existir
                  foreach (array_diff($vinculo["atribuicoes"], ['LOTADO', 'GESTOR', 'GESTOR_SUBSTITUTO']) as $x) {
                      if(empty(UnidadeIntegranteAtribuicao::where('atribuicao', $x)->where('unidade_integrante_id', $integranteNovoOuExistente->id)->first())) {
                          $db_result = UnidadeIntegranteAtribuicao::create(['atribuicao' => $x, 'unidade_integrante_id' => $integranteNovoOuExistente->id], [])->save();
                      }
                      array_push($atribuicoesFinais, $x);
                  }
              }
              /* Excluir as atribuições remanescentes */
              foreach($integranteNovoOuExistente->atribuicoes as $atribuicao) { 
                  if(!in_array($atribuicao->atribuicao, $atribuicoesFinais)) $atribuicao->delete(); 
              }
              DB::commit();
              array_push($result,[
                  'unidade_id' => $unidade->id,
                  'usuario_id' => $usuario->id,
                  'atribuicoes' => $atribuicoesFinais
              ]);
          } catch (Throwable $e) {
              DB::rollback();
              throw $e;
          }
      }
      return $result;
    }

    public function validateIntegrante($atribuicoes)
    {
        if (count(array_intersect(['GESTOR', 'GESTOR_SUBSTITUTO'], $atribuicoes)) == 2 || count(array_intersect(['LOTADO', 'COLABORADOR'], $atribuicoes)) == 2) throw new ServerException("ValidateIntegrante", "Há inconsistência nas atribuições: GESTOR/GESTOR_SUBSTITUTO ou LOTADO/COLABORADOR");
    }
}
