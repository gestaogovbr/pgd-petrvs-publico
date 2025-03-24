<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use Illuminate\Support\Facades\Log;
use App\Models\Unidade;
use Exception;
use Throwable;

class UnidadeIntegranteController extends ControllerBase
{

  public function checkPermissions($action, $request, $service, $unidade, $usuario)
  {
  }

  public function carregarIntegrantes(Request $request)
  {
    try {
      $data = $request->validate([
        'unidade_id' => ['present', 'required_if:usuario_id,null'],
        'usuario_id' => ['present', 'required_if:unidade_id,null']
      ]);
      $result = $this->service->carregarIntegrantes($data["unidade_id"], $data["usuario_id"]);
      return response()->json([
        'success' => true,
        'rows' => $result['rows']
      ]);
    }  catch (IBaseException $e) {
      return response()->json(['error' => $e->getMessage()]);
  }
  catch (Throwable $e) {
      $dataError = throwableToArrayLog($e);
      Log::error($dataError);
      return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
  }
  }

  public function salvarIntegrantes(Request $request)
  {
    try {
      $data = $request->validate([
        'integrantesConsolidados' => ['array', 'required'],
        'integrantesConsolidados.*.unidade_id' => ['string', 'required'],
        'integrantesConsolidados.*.usuario_id' => ['string', 'required'],
        'integrantesConsolidados.*.atribuicoes' => ['array', 'nullable'],
        'integrantesConsolidados.*._metadata' => ['array', 'nullable'],
      ]);

      foreach($data['integrantesConsolidados'] as $integrante) {
        $unidade = Unidade::findOrFail($integrante['unidade_id']);

        if (!$unidade->instituidora && in_array("CURADOR", $integrante['atribuicoes'], true)) {
          return response()->json(['error' => "Atribuição de CURADOR não pode ser designada a Unidade que não é Instituidora."]);
        }
      }

      return response()->json([
        'success' => true,
        'data' => $this->service->salvarIntegrantes($data["integrantesConsolidados"])
      ]);
    }  catch (IBaseException $e) {
      return response()->json(['error' => $e->getMessage()]);
    } catch (Throwable $e) {
      $dataError = throwableToArrayLog($e);
      Log::error($dataError);
      return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
    }
  }
}
