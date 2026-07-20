<?php
namespace App\Jobs\Envio;

use App\Exceptions\ExportPgdException;
use App\Jobs\Envio\ExportarItemJob;
use App\Jobs\Envio\Resources\PlanoTrabalhoResource;
use App\Models\PlanoTrabalho;
use App\Repository\Interfaces\EnvioRepositoryInterface;
use App\Repository\PlanoTrabalhoRepository;
use App\Services\API_PGD\PgdService;
use Illuminate\Http\Resources\Json\JsonResource;

class ExportarPlanoTrabalhoJob extends ExportarItemJob
{
    protected ?int $ptNumero = null;

    public function __construct(
        string $tenantId,
        string $id,
        string $origem = '',
        ?int $ptNumero = null,
    ) {
        $this->ptNumero = $ptNumero;
        parent::__construct($tenantId, $id, $origem);
    }

    public static function getDescricao(): string
    {
        return 'Enviar Plano de Trabalho para API';
    }

    public function getRepository(): EnvioRepositoryInterface
    {
        return app(PlanoTrabalhoRepository::class);
    }

    public function getModel(): ?PlanoTrabalho
    {
        $planoTrabalho = parent::getModel();

        if (!$planoTrabalho instanceof PlanoTrabalho) {
            throw new ExportPgdException("Plano de Trabalho inválido ou sem dados suficientes para envio", $this->id);
        }

        if (!$planoTrabalho->isEmStatusParaEnvio()) {
            throw new ExportPgdException("Plano de Trabalho não está em status para envio", $this->id);
        }

        return $planoTrabalho;
    }

    public function getResource($model): PlanoTrabalhoResource {
        $planoTrabalho = $this->getRepository()->findOneParaEnvio($this->id);

        if (!$model) {
            throw new ExportPgdException("Plano de Trabalho removido ou inválido", $this->id);
        }

        if (!$model->usuario->lotacao){
            throw new ExportPgdException("Usuário do Plano de Trabalho não possui Lotação", $this->id);
        }

        if (!$model->entregas) {
            throw new ExportPgdException("Plano de Trabalho não possui contribuições", $this->id);
        }

        return new PlanoTrabalhoResource($model);
    }

    public function enviar(JsonResource $resource): bool {
        return $this->pgdService->enviarPlanoTrabalho(
                $this->tenantId,
                $resource
        );
    }

    public function tag() {
        return 'Plano de Trabalho';
    }

    protected function logItemLabel(): string
    {
        if ($this->ptNumero !== null) {
            return 'PT #'.$this->ptNumero;
        }

        if (tenancy()->initialized) {
            $planoTrabalho = $this->getRepository()->findById($this->id);
            if ($planoTrabalho instanceof PlanoTrabalho) {
                return $planoTrabalho->identificacaoEnvio();
            }
        }

        return 'PT';
    }

    public function tags()
    {
        $tags = [$this->tenantId];

        if ($this->ptNumero !== null) {
            $tags[] = (string) $this->ptNumero;
        } else {
            $tags[] = $this->id;
        }

        return $tags;
    }
}
