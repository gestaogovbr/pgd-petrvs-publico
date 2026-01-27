<?php
namespace App\Jobs\Envio;

use App\Exceptions\ExportPgdException;
use App\Models\Usuario;
use App\Services\API_PGD\DataSources\DataSource;
use App\Services\API_PGD\DataSources\ParticipanteDataSource;
use App\Services\API_PGD\Resources\ParticipanteResource;
use Illuminate\Support\Facades\Log;

class ExportarParticipanteJob extends ExportarItemJob
{
    public static function getDescricao(): string
    {
        return 'Exportar Dados de Participante para PGD';
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
            throw new ExportPgdException("Usuário {$this->id} inválido ou sem lotação");
        }

        return new ParticipanteResource($model);
    }

    public function tag() {
        return 'Usuário';
    }

    protected function logInfo($message) {
        Log::info("[{$this->tenantId}] Usuário #{$this->id} - {$message}");
    }

    protected function logError($message) {
        Log::error("[{$this->tenantId}] Usuário #{$this->id} - {$message}");
    }

    public function getEndpoint($resource): string {
        return "/organizacao/SIAPE/{$this->api_cod_unidade_autorizadora}/{$resource->cod_unidade_lotacao}/participante/{$resource->matricula_siape}";
    }

    public function displayName() {
        return "Exportar Participante #{$this->id}";
    }
}

