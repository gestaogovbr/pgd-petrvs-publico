<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Services\CalendarioService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Log;
use Throwable;
use ZipArchive;

class UsuarioController extends ControllerBase
{
  public $updatable = ["config", "notificacoes", "texto_complementar_plano", "perfil_id"];

  public function checkPermissions($action, $request, $service, $unidade, $usuario)
  {
    switch ($action) {
      case 'STORE':
        if (!$usuario->hasPermissionTo('MOD_USER_EDT')) throw new ServerException("CapacidadeStore", "Inserção não realizada");
        break;
      case 'EDIT':
        if (!$usuario->hasPermissionTo('MOD_USER_EDT')) throw new ServerException("CapacidadeStore", "Edição não realizada");
        break;
      case 'DESTROY':
        if (!$usuario->hasPermissionTo('MOD_USER_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não realizada");
        break;
    }
  }

  public function calculaDataTempoUnidade(Request $request)
  {
    try {
      $data = $request->validate([
        'inicio' => ['required'],
        'fimOuTempo' => ['required'],
        'cargaHoraria' => ['required'],
        'unidade_id' => ['required'],
        'tipo' => ['required'],
        'pausas' => [],
        'afastamentos' => []
      ]);
      return response()->json([
        'success' => true,
        'data' => CalendarioService::preparaParametros($data)
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

  public function consultaCPFSiape(Request $request){
    $data = $request->validate([
      'cpf' => [],
    ]);
    $nomeArquivo = 'dados_cpf_' . $data['cpf'] . '.zip';
    try{
      $retornos = $this->service->consultaCPFSiape($request->cpf); 

      $zipFile = tempnam(sys_get_temp_dir(), 'zip');
      $zip = new ZipArchive();
      $zip->open($zipFile, ZipArchive::CREATE | ZipArchive::OVERWRITE);
  
      foreach ($retornos as $index => $retorno) {
          $tempFile = tempnam(sys_get_temp_dir(), 'xml');
          file_put_contents($tempFile, $retorno->asXML());
          $zip->addFile($tempFile, "arquivo_{$index}.xml");
      }
  
      $zip->close();
  
      return response()->download($zipFile, $nomeArquivo, [
          'Content-Type' => 'application/zip',
          'Content-Disposition' => 'attachment; filename="arquivos.zip"',
      ])->deleteFileAfterSend(true);
  } catch (\Throwable $th) {
        $tempFile = tempnam(sys_get_temp_dir(), 'txt');
        $mensagemErro = date('Y-m-d H:i:s') . " - " . $th->getMessage() . PHP_EOL;

        file_put_contents($tempFile, $mensagemErro, FILE_APPEND);

        return response()->download($tempFile, $nomeArquivo)->deleteFileAfterSend(true);
   }
  }
}
