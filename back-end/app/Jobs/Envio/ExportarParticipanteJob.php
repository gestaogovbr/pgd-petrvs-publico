<?php
namespace App\Jobs\Envio;

use App\Exceptions\ExportPgdException;
use App\Jobs\Envio\ExportarItemJob;
use App\Jobs\Envio\Resources\ParticipanteResource;
use App\Models\Usuario;
use App\Services\API_PGD\PgdService;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class ExportarParticipanteJob extends ExportarItemJob
{
    public static function getDescricao(): string
    {
        return 'Enviar Participante para API';
    }

    public function getModel() {
        return  Usuario::where('id', $this->id);
    }

    public function getResource(): ParticipanteResource {
         $model = Usuario::with([
                'unidadesIntegrantes' => function($query) {
                    $query->whereHas('atribuicoes', function ($query) {
                        $query
                            ->where('atribuicao', 'LOTADO')
                            ->whereNull('deleted_at');
                    });
                }
            ])
            ->find($this->id);

        if (!$model){
            throw new ExportPgdException("Usuário inválido ou sem lotação", $this->id);
        }

        return new ParticipanteResource($model);
    }

    public function enviar(PgdService $pgdService,
                JsonResource $resource): bool {
        return $pgdService->enviarParticipante(
                $this->tenantId,
                $this->api_cod_unidade_autorizadora,
                $resource
        );
    }

    public function tag() {
        return 'Participante';
    }

    protected function logInfo($message) {
        Log::info("ENVIO [{$this->tenantId}] Usuário #{$this->id} - {$message}");
    }

    protected function logError($message) {
        Log::error("ENVIO [{$this->tenantId}] Usuário #{$this->id} - {$message}");
    }
}

