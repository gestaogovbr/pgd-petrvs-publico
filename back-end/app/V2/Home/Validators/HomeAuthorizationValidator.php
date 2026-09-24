<?php

declare(strict_types=1);

namespace App\V2\Home\Validators;

use App\Enums\PerfilEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\ValidateException;
use App\Repository\UnidadeRepository;
use App\V2\Home\DTOs\HomeRequestDTO;
use Illuminate\Support\Facades\Auth;

class HomeAuthorizationValidator
{
    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    public function validar(HomeRequestDTO $dto): void
    {
        if (!$dto->subordinadas) {
            return;
        }

        /** @var \App\Models\Usuario $usuario */
        $usuario = Auth::user();
        $nivel = $usuario->perfil?->nivel;

        $perfisRestritos = [PerfilEnum::PARTICIPANTE->value, PerfilEnum::CONSULTA->value];

        if (in_array($nivel, $perfisRestritos, true)) {
            throw new ValidateException('Perfis Participante e Consulta não podem visualizar dados das unidades subordinadas.');
        }

        $isGestor = $this->unidadeRepository->isUsuarioGestorDaUnidade($dto->unidadeId, $dto->usuarioId);

        if (!$isGestor) {
            throw new ForbiddenException('Apenas gestores da unidade podem visualizar dados das unidades subordinadas.');
        }
    }
}
