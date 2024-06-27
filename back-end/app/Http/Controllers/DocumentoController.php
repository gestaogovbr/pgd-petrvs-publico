<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Models\Documento;
use App\Exceptions\ServerException;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Services\PlanoTrabalhoService;
use Illuminate\Support\Facades\Log;
use Throwable;

class DocumentoController extends ControllerBase 
{
    public $updatable = ["status", "numero_documento", "usuario_id"];
    public $planoTrabalhoService = null;

    public function __construct() {
        parent::__construct();
        $this->planoTrabalhoService = new PlanoTrabalhoService();
    }

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'ASSINAR':
                $data = $request->validate(['documentos_ids' => ['array']]);
                foreach ($data["documentos_ids"] as $documentoId) {
                    $especie = Documento::find($data['documentos_ids'][0])->especie;
                    switch ($especie) {
                        case 'TCR': $this->planoTrabalhoService->checkAssinarTcr($documentoId); break;
                    }
                }
                break;
        }
    }

    public function pendenteSei(Request $request) {
        try {
            $data = $request->validate([
                'id_documento' => ['required']
            ]);
            return response()->json([
                'success' => true,
                'data' => $this->service->pendenteSei($data["id_documento"])
            ]); 
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado ao tentar salvar o registro"]);
        }
    }

    public function assinar(Request $request) {
        $this->checkPermissions("ASSINAR", $request, $this->service, $this->getUnidade($request), $this->getUsuario($request));            
        try {
            $data = $request->validate([
                'documentos_ids' => ['array']
            ]);
            return response()->json([
                'success' => true,
                'rows' => $this->service->assinar($data,$request)
            ]); 
        }  catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado ao tentar salvar o registro"]);
        }
    }

    public function gerarPDF(Request $request) {
        try {
            $data = $request->validate([
                'documento_id' => ['required']
            ]);
            
            $pdfContent = $this->service->gerarPDF($data);
    
            return response($pdfContent)
                ->header('Content-Type', 'application/pdf')
                ->header('Content-Disposition', 'inline; filename="document.pdf"');
        } catch (IBaseException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
        catch (Throwable $e) {
            $dataError = throwableToArrayLog($e);
            Log::error($dataError);
            return response()->json(['error' => "Codigo ".$dataError['code'].": Ocorreu um erro inesperado ao tentar salvar o registro"]);
        }
    }

}
