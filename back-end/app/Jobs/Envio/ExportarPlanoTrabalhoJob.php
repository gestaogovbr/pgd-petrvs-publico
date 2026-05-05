<?php
namespace App\Jobs\Envio;

use App\Exceptions\ExportPgdException;
use App\Jobs\Envio\ExportarItemJob;
use App\Jobs\Envio\Resources\PlanoTrabalhoResource;
use App\Models\PlanoTrabalho;
use App\Repository\Interfaces\EnvioRepositoryInterface;
use App\Repository\PlanoTrabalhoRepository;
use App\Services\API_PGD\PgdService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;

class ExportarPlanoTrabalhoJob extends ExportarItemJob
{
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

        if (!$planoTrabalho) {
            throw new ExportPgdException("Plano de Trabalho inválido ou sem dados suficientes para envio", $this->id);
        }

        if (!$planoTrabalho->isEmStatusParaEnvio()) {
            throw new ExportPgdException("Plano de Trabalho não está em status para envio", $this->id);
        }

        return $planoTrabalho;
    }

    public function getResource(): PlanoTrabalhoResource {
        $planoTrabalhoRepository = app(PlanoTrabalhoRepository::class);
        $planoTrabalho = $planoTrabalhoRepository->findOneParaEnvio($this->id);

        if (!$planoTrabalho) {
            throw new ExportPgdException("Plano de Trabalho removido ou inválido", $this->id);
        }

        if (!$planoTrabalho->usuario->lotacao){
            throw new ExportPgdException("Usuário do Plano de Trabalho não possui Lotação", $this->id);
        }

        if (!$planoTrabalho->entregas) {
            throw new ExportPgdException("Plano de Trabalho não possui contribuições", $this->id);
        }

        return new PlanoTrabalhoResource($planoTrabalho);
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
}

