<?php
namespace App\Jobs\Envio;

use App\Exceptions\ExportPgdException;
use App\Jobs\Envio\ExportarItemJob;
use App\Jobs\Envio\Resources\ParticipanteResource;
use App\Models\Usuario;
use App\Repository\Interfaces\EnvioRepositoryInterface;
use App\Repository\UsuarioRepository;
use App\Services\API_PGD\PgdService;
use Illuminate\Http\Resources\Json\JsonResource;

class ExportarParticipanteJob extends ExportarItemJob
{
    protected ?string $matriculaParticipante = null;

    public function __construct(
        string $tenantId,
        string $id,
        string $origem = '',
        ?string $matriculaParticipante = null,
    ) {
        $this->matriculaParticipante = $matriculaParticipante !== null && $matriculaParticipante !== ''
            ? $matriculaParticipante
            : null;
        parent::__construct($tenantId, $id, $origem);
    }

    public static function getDescricao(): string
    {
        return 'Enviar Participante para API';
    }

    public function getRepository(): EnvioRepositoryInterface
    {
        return app(UsuarioRepository::class);
    }

    public function getResource(): ParticipanteResource
    {
        $usuarioRepository = app(UsuarioRepository::class);
        $model = $usuarioRepository->findOneParaEnvio($this->id);

        if (!$model) {
            throw new ExportPgdException("Usuário inválido ou sem lotação", $this->id);
        }

        return new ParticipanteResource($model);
    }

    public function enviar(JsonResource $resource): bool {
        return $this->pgdService->enviarParticipante(
                $this->tenantId,
                $resource
        );
    }

    public function tag() {
        return 'Participante';
    }

    protected function logItemLabel(): string
    {
        if ($this->matriculaParticipante !== null) {
            return 'Participante #'.$this->matriculaParticipante.' ('.$this->id.')';
        }

        if (tenancy()->initialized) {
            $usuario = $this->getRepository()->findById($this->id);
            if ($usuario instanceof Usuario) {
                return $usuario->identificacaoEnvio();
            }
        }

        return 'Participante ('.$this->id.')';
    }
}

