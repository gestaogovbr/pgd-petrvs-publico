<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Log;
use Throwable;

class UnidadeController extends ControllerBase
{

  public $updatable = ["texto_complementar_plano"];

  public function checkPermissions($action, $request, $service, $unidade, $usuario)
  {
    switch ($action) {
      case 'STORE':
        if (!$usuario->hasPermissionTo('MOD_UND_INCL')) throw new ServerException("CapacidadeStore", "Inserção não realizada");
        break;
      case 'EDIT':
        if (!$usuario->hasPermissionTo('MOD_UND_EDT')) throw new ServerException("CapacidadeStore", "Edição não realizada");
        break;
      case 'DESTROY':
        if (!$usuario->hasPermissionTo('MOD_UND_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não realizada");
        break;
    }
  }

  public function hierarquia(Request $request)
  {
    try {
      $data = $request->validate([
        'unidade_id' => ['nullable']
      ]);
      $unidadeId = $data["unidade_id"] ?? null;
      return response()->json([
        'success' => true,
        'unidades' => $this->service->hierarquia($unidadeId)
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

  public function filhas(Request $request)
  {
    try {
      $data = $request->validate([
        'unidade_id' => ['required']
      ]);
      return response()->json([
        'success' => true,
        'unidades' => $this->service->filhas($data["unidade_id"])
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


  public function linhaAscendente(Request $request)
  {
    try {
      $data = $request->validate([
        'unidade_id' => ['required']
      ]);
      return response()->json([
        'success' => true,
        'linhaAscendente' => $this->service->linhaAscendente($data["unidade_id"])
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

  public function metadadosUnidade(Request $request)
  {
    try {
      $data = $request->validate([
        'unidade_id' => ['required']
      ]);
      return response()->json([
        'success' => true,
        'metadadosUnidade' => $this->service->metadadosUnidade($data["plano_id"])
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

  public function lotados(Request $request)
  {
    try {
      $data = $request->validate([
        'unidade_id' => ['required']
      ]);
      return response()->json([
        'success' => true,
        'usuarios' => $this->service->lotados($data["unidade_id"])
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

  public function metadadosArea(Request $request)
  {
    try {
      $data = $request->validate([
        'unidade_id' => ['required'],
        'programa_id' => ['required'],
      ]);
      return response()->json([
        'success' => true,
        'metadadosArea' => $this->service->metadadosArea($data["unidade_id"], $data["programa_id"])
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

  public function mesmaSigla(Request $request)
  {
    try {
      if (!parent::loggedUser()->hasPermissionTo('MOD_UND_UNIR')) throw new ServerException("ValidateUnidade", "Usuário precisa ter capacidade MOD_UND_UNIR");
      //$data = $request->validate([]);
      return response()->json([
        'success' => true,
        'rows' => $this->service->mesmaSigla($this->getUnidade($request)->entidade_id)
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

  public function unificar(Request $request)
  {
    try {
      if (!parent::loggedUser()->hasPermissionTo('MOD_UND_UNIR')) throw new ServerException("ValidateUnidade", "Usuário precisa ter capacidade MOD_UND_UNIR");
      $data = $request->validate([
        'correspondencias' => ['array'],
        'exclui' => ['required']
      ]);
      return response()->json([
        'success' => $this->service->unificar($data["correspondencias"], $data["exclui"])
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

  public function inativar(Request $request)
  {
    try {
      if (!parent::loggedUser()->hasPermissionTo('MOD_UND_INATV')) throw new ServerException("ValidateUnidade", "Usuário precisa ter capacidade MOD_UND_INATV");
      $data = $request->validate([
        'id' => ['required'],
        'inativo' => ['required']
      ]);
      return response()->json([
        'success' => $this->service->inativar($data["id"], $data["inativo"])
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

  public function dashboards(Request $request)
  {
    try {
      $data = $request->validate([
        'idsUnidades' => ['required'],
        'programa_id' => ['required'],
        'unidadesSubordinadas' => ['required']
      ]);
      $result = response()->json([
        'success' => true,
        'dashboards' => $this->service->dashboards($data["idsUnidades"], $data["programa_id"], $data["unidadesSubordinadas"])
      ]);
      return $result;
    }  catch (IBaseException $e) {
      return response()->json(['error' => $e->getMessage()]);
  }
  catch (Throwable $e) {
      $dataError = throwableToArrayLog($e);
      Log::error($dataError);
      return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
  }
  }

  public function lookupTodasUnidades(Request $request)
  {
    try {
      // $data = $request->validate([]);
      $result = response()->json([
        'success' => true,
        'unidades' => $this->service->lookupTodasUnidades()
      ]);
      return $result;
    }  catch (IBaseException $e) {
      return response()->json(['error' => $e->getMessage()]);
  }
  catch (Throwable $e) {
      $dataError = throwableToArrayLog($e);
      Log::error($dataError);
      return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
  }
  }

  public function consultaUnidadeSiape(Request $request){
    $data = $request->validate([
      'unidade' => [],
    ]);
    $nomeArquivo = 'dados_unidade_' . $data['unidade'] . '.xml';
    try{
      $retorno = $this->service->consultaUnidadeSiape($data['unidade']);

       $tempFile = tempnam(sys_get_temp_dir(), 'xml');
       file_put_contents($tempFile, $retorno->asXML());

       return response()->download($tempFile, $nomeArquivo,
       [
        'Content-Type' => 'application/xml',
        'Content-Disposition' => sprintf('attachment; filename="%s"',$nomeArquivo),
    ])->deleteFileAfterSend(true);

  } catch (\Throwable $th) {
        $tempFile = tempnam(sys_get_temp_dir(), 'txt');
        $mensagemErro = date('Y-m-d H:i:s') . " - " . $th->getMessage() . PHP_EOL;

        file_put_contents($tempFile, $mensagemErro, FILE_APPEND);

        return response()->download($tempFile, $nomeArquivo)->deleteFileAfterSend(true);
   }
  }

  public function obterInstitudora(Request $request)
  {
    try {
      $data = $request->validate([
        'unidade_id' => ['required']
      ]);

      $unidadeId = $data['unidade_id'];

      while ($unidadeId) {
        $unidade = $this->service->getById(['id' => $unidadeId]);

        if ($unidade->instituidora) {
          return response()->json([
            'success' => true,
            'unidade' => $unidade
          ]);
        }

        $unidadeId = $unidade->unidade_pai_id;
      }
  
    } catch (IBaseException $e) {
      return response()->json(['error' => $e->getMessage()]);
    } catch (Throwable $e) {
      $dataError = throwableToArrayLog($e);
      Log::error($dataError);
      return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado."]);
    }
    
    return response()->json(['error' => "Não foi possível identificar a instituidora da unidade."]);
  }
}
