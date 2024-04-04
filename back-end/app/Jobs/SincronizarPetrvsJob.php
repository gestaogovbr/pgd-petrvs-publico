<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use App\Services\IntegracaoService;


class SincronizarPetrvsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $data;
    protected $usuario_id;
    protected $request; 

    public function __construct($usuario_id = null)
    {
        // Dados predefinidos
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
                "usuario_id" => $usuario_id ?: "08246b0c-e5ff-11ee-a54a-0242ac130002", // Valor padrão, se não for fornecido
                "entidade_id" => "52d78c7d-e0c1-422b-b094-2ca5958d5ac1"
            ],
            "with" => [
                "entidade",
                "usuario"
            ]
        ];
        $this->usuario_id = $usuario_id ?: '08246b0c-e5ff-11ee-a54a-0242ac130002'; // Usuário padrão, se não for fornecido
    }

    public function handle(IntegracaoService $integracaoService)
    {
        $integracaoService->sincronizarPetrvs($this->data,$this->usuario_id, null);
        Log::info('Este é um log de exemplo gerado pelo LogJob.');
    }
}
