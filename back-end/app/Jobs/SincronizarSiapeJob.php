<?php

namespace App\Jobs;

use App\Jobs\Contratos\ContratoJobSchedule;
use App\Models\Entidade;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use App\Services\IntegracaoService;


class SincronizarSiapeJob implements ShouldQueue, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $data;
    protected $usuario_id;
    protected $request;

    public $timeout = 0;

    public function __construct(private readonly ?string $tenantId = null)
    {
        $this->queue = 'siape_queue';
    }

    public static function getDescricao(): string
    {
        return "Sincronizar SIAPE";
    }

    public function handle(IntegracaoService $integracaoService)
    {
        ini_set('memory_limit', '-1');
        
        try {
            $integracaoService = new IntegracaoService([], $this->tenantId);
            Log::info("Job SincronizarPetrvs START ");
            $entidades = Entidade::all();
            $inputs = [
                'unidades' => true,
                'servidores' => true,
                'gestores' => true,
            ];
            ob_start(); // Inicia o buffer de saída.
            ob_implicit_flush(true); // Libera a chamada explícita para o output buffer.
            foreach ($entidades as $entidade) {
                $inputs['entidade'] = $entidade->id;
                Log::alert("Job SincronizarPetrvs: " . json_encode($inputs));
                $integracaoService->sincronizar($inputs);
            }
            Log::info("Job SincronizarPetrvs END ");
        } catch (\Exception $e) {
            Log::error("Erro ao processar Job SincronizarPetrvs " . $e->getMessage());
            return false;
        }
    }
}
