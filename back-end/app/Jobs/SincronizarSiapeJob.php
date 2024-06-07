<?php

namespace App\Jobs;

use App\Jobs\Contratos\ContratoJobSchedule;
use App\Models\Entidade;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
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

    public function __construct($usuario_id = null)
    {
        Log::info("Job SincronizarPetrvs __construct ");
        $this->data = [];
        $this->usuario_id = $usuario_id ?: '08246b0c-e5ff-11ee-a54a-0242ac130002'; // Usuário padrão, se não for fornecido
    }

    public static function getDescricao(): string
    {
        return "Sincronizar SIAPE";
    }

    public function handle(IntegracaoService $integracaoService)
    {
        try {
            Log::info("Job SincronizarPetrvs START ");
            $entidades = Entidade::all();
            $inputs = [
                'unidades' => true,
                'servidores' => true,
                'gestores' => true,  
            ];
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
