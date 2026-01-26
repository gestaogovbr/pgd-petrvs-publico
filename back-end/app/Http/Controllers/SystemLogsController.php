<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Services\SystemLogsService;
use App\Exceptions\ServerException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

/**
 * @property SystemLogsService $service
 */
class SystemLogsController extends ControllerBase
{
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
    }

    public function index(Request $request)
    {
        return response()->json($this->service->index($request->all()));
    }

    public function download(Request $request, string $tenantId, string $file)
    {
        try {
            $result = $this->service->downloadLog($file);

            if ($result['type'] === 'file') {
                 return response()->download($result['data'], $result['filename']);
            }

            return response()->make($result['data'], Response::HTTP_OK, [
                'Content-Type' => 'text/plain',
                'Content-Disposition' => 'attachment; filename="' . $result['filename'] . '"'
            ]);
        } catch (ServerException $e) {
            return response()->json(['error' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        } catch (\Throwable $e) {
            Log::error('Erro no download de log: ' . $e->getMessage());
            return response()->json(['error' => 'Ocorreu um erro inesperado.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
