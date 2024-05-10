<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class LogJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $message;
    protected $calledDirectly;


    public function __construct(array $parameters)
    {
        $this->message = $parameters['message'] ?? 'Log padrão';
        $this->calledDirectly = $parameters['calledDirectly'] ?? false;
    }


    public function handle()
    {
        try {
            $logMessage = $this->message;
            if ($this->calledDirectly) {
                Log::info("Diretamente: " . $logMessage);
            } else {
                Log::info("Agendado: " . $logMessage);
            }
        } catch (\Exception $e) {
            Log::error("Erro ao processar LogJob: " . $e->getMessage());
            return false;
        }
    }
}
