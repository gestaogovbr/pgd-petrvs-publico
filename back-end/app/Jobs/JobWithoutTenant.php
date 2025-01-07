<?php

namespace App\Jobs;

use App\Exceptions\LogError;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Throwable;

class JobWithoutTenant implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private CONST BASE_NAMESPACE = 'App\\Jobs\\';

    public static function getJob($classe) {
        $fullClassName = self::BASE_NAMESPACE . $classe;
        if (!class_exists($fullClassName)) {
            LogError::newWarn("A classe do job '{$classe}' não existe.");
            return  false;
        }

        $jobClass = app($fullClassName);
        return new $jobClass();
    }

    public function failed(?Throwable $exception): void
    {
        Log::error("Falha ao executar Job: ".$exception->getMessage().'. Job abortado');
    }
}
