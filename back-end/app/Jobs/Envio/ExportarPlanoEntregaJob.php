<?php
namespace App\Jobs\Envio;

use App\Exceptions\ExportPgdException;
use App\Jobs\Envio\ExportarItemJob;
use App\Jobs\Envio\Resources\PlanoEntregaResource;
use App\Models\PlanoEntrega;
use App\Repository\Interfaces\EnvioRepositoryInterface;
use App\Repository\PlanoEntregaRepository;
use App\Services\API_PGD\PgdService;
use Illuminate\Http\Resources\Json\JsonResource;

class ExportarPlanoEntregaJob extends ExportarItemJob
{
    protected ?int $peNumero = null;

    public function __construct(
        string $tenantId,
        string $id,
        string $origem = '',
        ?int $peNumero = null,
    ) {
        $this->peNumero = $peNumero;
        parent::__construct($tenantId, $id, $origem);
    }

    public static function getDescricao(): string
    {
        return 'Enviar Plano de Entrega para API';
    }

    public function getRepository(): EnvioRepositoryInterface
    {
        return app(PlanoEntregaRepository::class);
    }

    public function getModelParaEnvio(): ?PlanoEntrega
    {
        $planoEntrega = parent::getModelParaEnvio();

        if (!$planoEntrega instanceof PlanoEntrega) {
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

        return $planoEntrega;
    }

    public function getResource($model): PlanoEntregaResource {
        return new PlanoEntregaResource($model);
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

    protected function logItemLabel(): string
    {
        if ($this->peNumero !== null) {
            return 'PE #'.$this->peNumero;
        }

        if (tenancy()->initialized) {
            $planoEntrega = $this->getRepository()->findById($this->id);
            if ($planoEntrega instanceof PlanoEntrega) {
                return $planoEntrega->identificacaoEnvio();
            }
        }

        return 'PE';
    }

    public function tags()
    {
        $tags = [$this->tenantId];

        if ($this->peNumero !== null) {
            $tags[] = (string) $this->peNumero;
        } else {
            $tags[] = $this->id;
        }

        return $tags;
    }
}
