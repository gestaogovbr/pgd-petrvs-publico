<?php
namespace App\Jobs\Envio;

use App\Exceptions\ExportPgdException;
use App\Models\PlanoEntrega;
use App\Jobs\Envio\Resources\PlanoEntregaResource;
use Illuminate\Support\Facades\Log;

class ExportarPlanoEntregaJob extends ExportarItemJob
{
    public static function getDescricao(): string
    {
        return 'Enviar Plano de Entrega para API';
    }

    public function getModel() {
        return  PlanoEntrega::where('id', $this->id);
    }

    public function getResource(): PlanoEntregaResource {
         $planoEntrega = PlanoEntrega::with([
            'programa',
            'programa.unidade',
            'unidade',
            'entregas',
            'entregas.unidade'
        ])
        ->find($this->id);

        if (!$planoEntrega){
            throw new ExportPgdException("Plano de Entrega {$this->id} removido ou inválido");
        }

        if (!$planoEntrega->programa){
            throw new ExportPgdException("Plano de Entrega {$this->id} não possui Programa");
        }

        if (!$planoEntrega->unidade){
            throw new ExportPgdException("Plano de Entrega {$this->id} não possui Unidade Executora");
        }

        if (!$planoEntrega->programa->unidade){
            throw new ExportPgdException("Plano de Entrega {$this->id} não possui Unidade Instituidora");
        }

        return new PlanoEntregaResource($planoEntrega);
    }

    public function tag() {
        return 'Plano de Entrega';
    }

    protected function logInfo($message) {
        Log::info("[{$this->tenantId}] Plano de Entrega #{$this->id} - {$message}");
    }

    protected function logError($message) {
        Log::error("[{$this->tenantId}] Plano de Entrega #{$this->id} - {$message}");
    }

    public function getEndpoint($resource): string {
        return "/organizacao/SIAPE/{$this->api_cod_unidade_autorizadora}/plano_entregas/{$resource->id_plano_entregas}";
    }

    public function displayName() {
        return "Exportar Plano de Entrega #{$this->id}";
    }
}

