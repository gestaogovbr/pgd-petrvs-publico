<?php

namespace App\Jobs;

use App\Jobs\Contratos\ContratoJobSchedule;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class LogJob implements ShouldQueue, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $message;
    protected $calledDirectly;


    public function __construct($parameters = null)
    {
        $this->message = 'Log padrão';
        $this->calledDirectly = false;
        if($parameters) {
            $this->message = $parameters['message'] ?? 'Log padrão';
            $this->calledDirectly = $parameters['calledDirectly'] ?? false;
        }

    }

    public static function getDescricao(): string
    {
        return "Log Job";
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
