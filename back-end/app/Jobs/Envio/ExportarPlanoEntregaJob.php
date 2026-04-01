<?php
namespace App\Jobs\Envio;

use App\Exceptions\ExportPgdException;
use App\Jobs\Envio\ExportarItemJob;
use App\Jobs\Envio\Resources\PlanoEntregaResource;
use App\Models\PlanoEntrega;
use App\Repository\Interfaces\AbstractEnvioRepository;
use App\Repository\PlanoEntregaRepository;
use App\Services\API_PGD\PgdService;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class ExportarPlanoEntregaJob extends ExportarItemJob
{
    public static function getDescricao(): string
    {
        return 'Enviar Plano de Entrega para API';
    }

    public function getRepository(): AbstractEnvioRepository
    {
        return app(PlanoEntregaRepository::class);
    }

    public function getResource(): PlanoEntregaResource {
        $planoEntregaRepository = app(PlanoEntregaRepository::class);
        $planoEntrega = $planoEntregaRepository->findOneParaEnvio($this->id);

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

    public function enviar(JsonResource $resource): bool {
        return $this->pgdService->enviarPlanoEntrega(
                $this->tenantId,
                $resource
        );
    }

    public function tag() {
        return 'Plano de Entrega';
    }
}

