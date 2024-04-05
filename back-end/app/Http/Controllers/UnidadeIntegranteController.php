<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
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
    } catch (Throwable $e) {
      return response()->json(['error' => $e->getMessage()]);
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

      return response()->json([
        'success' => true,
        'data' => $this->service->salvarIntegrantes($data["integrantesConsolidados"])
      ]);
    } catch (Throwable $e) {
      return response()->json(['error' => $e->getMessage()]);
    }
  }
}
