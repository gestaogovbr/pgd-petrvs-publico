<?php

namespace App\Jobs;

use App\Jobs\Contratos\ContratoJobSchedule;
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
        $this->data = [
            "entity" => [
                "id" => "",
                "created_at" => "2024-03-25T17:00:39",
                "updated_at" => "2024-03-25T17:00:39",
                "deleted_at" => null,
                "data_execucao" => "",
                "atualizar_unidades" => true,
                "atualizar_servidores" => true,
                "atualizar_gestores" => true,
                "usar_arquivos_locais" => false,
                "gravar_arquivos_locais" => false,
                "usuario_id" => $usuario_id ?: "08246b0c-e5ff-11ee-a54a-0242ac130002",
                "entidade_id" => "52d78c7d-e0c1-422b-b094-2ca5958d5ac1"
            ],
            "with" => [
                "entidade",
                "usuario"
            ]
        ];
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
            $integracaoService->sincronizarPetrvs($this->data,$this->usuario_id, null);
            Log::info("Job SincronizarPetrvs END ");
        } catch (\Exception $e) {
            Log::error("Erro ao processar Job SincronizarPetrvs " . $e->getMessage());
            return false;
        }

    }
}
