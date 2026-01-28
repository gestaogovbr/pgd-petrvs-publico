<?php
namespace App\Jobs\Envio;

use App\Exceptions\ExportPgdException;
use App\Jobs\Envio\ExportarItemJob;
use App\Jobs\Envio\Resources\PlanoEntregaResource;
use App\Models\PlanoEntrega;
use App\Services\API_PGD\PgdService;
use Illuminate\Http\Resources\Json\JsonResource;
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
            throw new ExportPgdException("Plano de Entrega removido ou inválido", $this->id);
        }

        if (!$planoEntrega->programa){
            throw new ExportPgdException("Plano de Entrega não possui Programa", $this->id);
        }

        if (!$planoEntrega->unidade){
            throw new ExportPgdException("Plano de Entrega não possui Unidade Executora", $this->id);
        }

        if (!$planoEntrega->programa->unidade){
            throw new ExportPgdException("Plano de Entrega não possui Unidade Instituidora", $this->id);
        }

        return new PlanoEntregaResource($planoEntrega);
    }

    public function enviar(PgdService $pgdService,
                JsonResource $resource): bool {
        return $pgdService->enviarPlanoEntrega(
                $this->tenantId,
                $this->api_cod_unidade_autorizadora,
                $resource
        );
    }

    public function tag() {
        return 'Plano de Entrega';
    }

    protected function logInfo($message) {
        Log::info("ENVIO [{$this->tenantId}] Plano de Entrega #{$this->id} - {$message}");
    }

    protected function logError($message) {
        Log::error("ENVIO [{$this->tenantId}] Plano de Entrega #{$this->id} - {$message}");
    }
}

