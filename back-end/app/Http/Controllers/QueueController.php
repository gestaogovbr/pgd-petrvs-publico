<?php

namespace App\Http\Controllers;

use App\Exceptions\Contracts\IBaseException;
use App\Http\Controllers\ControllerBase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Redis;
use Throwable;

class QueueController extends ControllerBase {

    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
    }

    public function resetQueues(Request $request) {
        try {

            exec('php /var/www/artisan horizon:pause');
            Log::info('Horizon pausado.');

            exec('php /var/www/artisan horizon:purge');
            Log::info('Processos zumbis purgados.');

            Artisan::call('queue:flush');
            Log::info('Filas pendentes foram limpas.');

            Redis::connection()->flushall();
            Log::info('Redis completamente limpo (FLUSHALL).');

            exec('php /var/www/artisan horizon:terminate', $outputTerminate, $returnTerminate);
            Log::info('Horizon terminado.', ['output' => $outputTerminate, 'status' => $returnTerminate]);

            exec('php /var/www/artisan horizon  > /dev/null 2>&1 &', $outputRestart, $returnRestart);
            Log::info('Horizon reiniciado.', ['output' => $outputRestart, 'status' => $returnRestart]);

            return response()->json([
                'success' => true,
                'data' => true
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
}
