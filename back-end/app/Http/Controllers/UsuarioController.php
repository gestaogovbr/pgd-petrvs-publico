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
use App\Services\Siape\BuscarDados\BuscarDadosSiapeServidor;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Response;

class UsuarioController extends ControllerBase
{
    public $updatable = ["config", "notificacoes", "texto_complementar_plano", "perfil_id"];

    public function checkPermissions($action, $request, $service, $unidade, $usuario)
    {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_USER_EDT'))
                    throw new ServerException("CapacidadeStore", "Inserção não realizada");
                break;
            case 'EDIT':
                if (!$usuario->hasPermissionTo('MOD_USER_EDT'))
                    throw new ServerException("CapacidadeStore", "Edição não realizada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_USER_EXCL'))
                    throw new ServerException("CapacidadeStore", "Exclusão não realizada");
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
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        } catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo " . $dataError['code'] . ": Ocorreu um erro inesperado."]);
        }
    }

    public function consultarCPFSiape(Request $request)
    {
        $request->validate([
            'cpf' => [],
        ]);

        try {
            $retorno = $this->service->consultaCPFSiape($request->cpf);

            return response()->json([
                'success' => true,
                'funcionais' => $retorno['funcionais'],
                'pessoais' => $retorno['pessoais']
            ]);
        } catch (Throwable $e) {
            report($e);
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function exportarCPFSiape(Request $request)
    {
        $data = $request->validate([
            'cpf' => [],
        ]);

        $nomeArquivo = 'dados_cpf_' . $data['cpf'] . '.zip';

        try {
            $retornos = $this->service->consultaCpfSiapeXml($request->cpf);

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
                'Content-Disposition' => sprintf('attachment; filename="%s"', $nomeArquivo),
            ])->deleteFileAfterSend(true);

        } catch (\Throwable $th) {
            report($th);

            $tempFile = tempnam(sys_get_temp_dir(), 'txt');
            $mensagemErro = date('Y-m-d H:i:s') . " - " . $th->getMessage() . PHP_EOL;

            file_put_contents($tempFile, $mensagemErro, FILE_APPEND);

            return response()->download($tempFile, $nomeArquivo)->deleteFileAfterSend(true);
        }
    }

    public function downloadLogSiape(Request $request)
    {
        $logPath = storage_path('logs/siape.log');

        if (!file_exists($logPath)) {
            return response()->json(['error' => 'Arquivo de log não encontrado.'], 404);
        }

        return response()->download(
            $logPath,
            'siape.log',
            [
                'Content-Type' => File::mimeType($logPath),
                'Content-Disposition' => 'attachment; filename="siape.log"',
            ]
        );
    }
    public function atualizaPedagio(Request $request)
    {
        try {
            if (!parent::loggedUser()->hasPermissionTo('MOD_PART_PEDAGIO'))
                throw new ServerException("ValidateUsuario", "Usuário precisa ter capacidade MOD_PART_PEDAGIO");

            $data = $request->input('data');
            $validated = validator($data, [
                'usuario_id' => ['required', 'uuid'],
                'data_inicial_pedagio' => ['required', 'date', 'before_or_equal:data_final_pedagio'],
                'data_final_pedagio' => ['required', 'date', 'after_or_equal:data_inicial_pedagio'],
                'tipo_pedagio' => ['required', 'integer', 'in:1,2'],
            ])->validate();
            return response()->json([
                'success' => true,
                'data' => $this->service->atualizaPedagio($validated)
            ]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);

        } catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo " . $dataError['code'] . ": Ocorreu um erro inesperado."]);
        }
    }

    public function removerPedagio(Request $request)
    {
        try {
            if (!parent::loggedUser()->hasPermissionTo('MOD_PART_PEDAGIO'))
                throw new ServerException("ValidateUsuario", "Usuário precisa ter capacidade MOD_PART_PEDAGIO");

            $data = $request->input('data');
            $validated = validator($data, [
                'usuario_id' => ['required', 'uuid'],
            ])->validate();
            return response()->json([
                'success' => true,
                'data' => $this->service->removePedagio($validated)
            ]);
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);

        } catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo " . $dataError['code'] . ": Ocorreu um erro inesperado."]);
        }
    }
}
