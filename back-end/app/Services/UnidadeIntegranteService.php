<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\IntegracaoServidor;
use App\Models\Usuario;
use App\Services\ServiceBase;
use App\Services\Siape\Unidade\Integracao;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class UnidadeIntegranteService extends ServiceBase
{
  public function carregarIntegrantes($unidadeId, $usuarioId)
  {
    $result = [];
    $unidade = empty($unidadeId) ? null : Unidade::find($unidadeId);
    $usuario = empty($usuarioId) ? null : Usuario::find($usuarioId);

    $dataModificacao = $usuario ? ($usuario->integracaoServidor instanceof IntegracaoServidor ? $usuario->integracaoServidor->data_modificacao : '') : '';

    if (!empty($unidadeId) && empty($unidade)) throw new ServerException("ValidateIntegrante", "Unidade não encontrada no banco");
    if (!empty($usuarioId) && empty($usuario)) throw new ServerException("ValidateIntegrante", "Usuário não encontrado no banco");
    foreach (($unidade ? $unidade->integrantes ?? [] : $usuario->unidadesIntegrantes ?? []) as $vinculo) {

      $unidadeOuUsuarioDoVinculo = $unidade ? $vinculo->usuario : $vinculo->unidade;

      if(empty($unidadeOuUsuarioDoVinculo)){
        Log::alert("Usuario ou unidade com vinculo inválido no banco de dados",[$vinculo]);
        continue;
      }

      $result[$unidadeOuUsuarioDoVinculo->id] = [
        "id" => $unidade ? $vinculo->usuario->id : $vinculo->unidade->id,
        "usuario_nome" => $unidade ? $vinculo->usuario->nome : null,
        "usuario_apelido" => $unidade ? $vinculo->usuario->apelido : null,
        "usuario_url_foto" => $unidade ? $vinculo->usuario->url_foto : null,
        "unidade_nome" => $usuario ? $vinculo->unidade->nome : null,
        "unidade_sigla" => $usuario ? $vinculo->unidade->sigla : null,
        "unidade_codigo" => $usuario ? $vinculo->unidade->codigo : null,
        "atribuicoes" => $vinculo->usuario->unidadeIntegranteAtribuicoes($vinculo->unidade->id)->map(fn ($a) => $a->atribuicao),
        'data_modificacao' => $dataModificacao,
        'usuario_externo' => $unidade ? $vinculo->usuario->usuario_externo : false,
      ];
    }
    return ['rows' => array_values(array_filter($result, fn ($vinculo) => count($vinculo["atribuicoes"]) > 0))];
  }

  
  public function salvarIntegrantes(array $vinculos, $transaction = true): array
  {
    $result = [];
    foreach ($vinculos as $vinculo) {
      try {
        $usuario = Usuario::find($vinculo["usuario_id"]);
        $unidade = Unidade::find($vinculo["unidade_id"]);
        if (empty($unidade) || empty($usuario)) throw new ServerException("ValidateIntegrante", "Unidade/Usuário não existe no banco: ".json_encode($vinculo));
        //FIXME Isso aqui não deveria estar aqui.
        if (!empty($vinculo['_metadata']['perfil_id'])) $this->usuarioService->update(['id' => $usuario->id, 'perfil_id' => $vinculo['_metadata']['perfil_id']], $unidade);

        $integracao = new Integracao($vinculos);
        $integracao->setTransaction($transaction); 
        $integracao->processar();
        $alteracoesFinais = $integracao->getAtribuicoesFinais();
        array_merge($result, $alteracoesFinais);
        
      } catch (Throwable $e) {
        report($e);
        throw $e;
      }
    }
    return $result;
  }

  /**
   * @deprecated não utilizar essa função, será descontinuada.
   *
   * @param [array] $atribuicoes
   * @param string|null $nome
   * @return void
   */
  public function validarAtribuicoes($atribuicoes, string $nome = null)
  {
    if (count(array_intersect(['GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO'], $atribuicoes)) > 1) throw new ServerException("ValidateIntegrante", "A um mesmo servidor $nome só pode ser atribuída uma função de gestor, para uma mesma Unidade!");
  }
}
