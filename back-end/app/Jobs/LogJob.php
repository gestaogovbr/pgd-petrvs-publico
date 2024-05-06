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

    protected $calledDirectly;

    /**
     * Create a new job instance.
     *
     * @param bool $calledDirectly Indica se o job foi chamado diretamente pela aplicação.
     */
    public function __construct($calledDirectly = false)
    {
        $this->calledDirectly = $calledDirectly;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            if ($this->calledDirectly) {
                Log::info('Este é um log de exemplo gerado pelo LogJob, chamado diretamente pela aplicação.');
            } else {
                Log::info('Este é um log de exemplo gerado pelo LogJob em execução agendada.');
            }
        } catch (\Exception $e) {
            Log::error("Erro ao processar LogJob: " . $e->getMessage());
            return false; // Para marcar o job como falhado
        }

    }
}
