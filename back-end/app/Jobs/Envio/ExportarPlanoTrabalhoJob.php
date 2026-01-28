<?php
namespace App\Jobs\Envio;

use App\Exceptions\ExportPgdException;
use App\Jobs\Envio\ExportarItemJob;
use App\Jobs\Envio\Resources\PlanoTrabalhoResource;
use App\Models\PlanoTrabalho;
use App\Services\API_PGD\PgdService;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class ExportarPlanoTrabalhoJob extends ExportarItemJob
{
    public static function getDescricao(): string
    {
        return 'Enviar Plano de Trabalho para API';
    }

    public function getModel() {
        return  PlanoTrabalho::where('id', $this->id);
    }

    public function getResource(): PlanoTrabalhoResource {
         $planoTrabalho = PlanoTrabalho::with([
            'programa',
            'usuario',
            'entregas' => function ($query) {
                $query
                    ->whereDoesntHave('planoEntregaEntrega')
                    ->orWhereHas('planoEntregaEntrega.planoEntrega', function($query) {
                        $query->whereIn('status', ['ATIVO', 'CONCLUIDO', 'AVALIADO']);
                    });
            },
            'entregas.planoTrabalho',
            'consolidacoes' => function ($query) {
                $query->whereIn('status', ['AVALIADO']);
            },
            'consolidacoes.avaliacao'
        ])
        ->find($this->id);

        if (!$planoTrabalho->usuario->lotacao){
            throw new ExportPgdException("Usuário do Plano de Trabalho não possui Lotação", $this->id);
        }

        if (!$planoTrabalho->entregas) {
            throw new ExportPgdException("Plano de Trabalho não possui contribuições", $this->id);
        }

        return new PlanoTrabalhoResource($planoTrabalho);
    }

    public function enviar(PgdService $pgdService,
                JsonResource $resource): bool {
        return $pgdService->enviarPlanoTrabalho(
                $this->tenantId,
                $this->api_cod_unidade_autorizadora,
                $resource
        );
    }

    public function tag() {
        return 'Plano de Trabalho';
    }

    protected function logInfo($message) {
        Log::info("ENVIO [{$this->tenantId}] Plano de Trabalho #{$this->id} - {$message}");
    }

    protected function logError($message) {
        Log::error("ENVIO [{$this->tenantId}] Plano de Trabalho #{$this->id} - {$message}");
    }
}

