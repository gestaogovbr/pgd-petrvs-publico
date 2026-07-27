<?php

declare(strict_types=1);

namespace App\V2\Home\Validators;

use App\Exceptions\ValidateException;
use App\Repository\UnidadeRepository;
use App\V2\Home\DTOs\HomeRequestDTO;

class HomeAuthorizationValidator
{
    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    public function validar(HomeRequestDTO $dto): void
    {
        if ($dto->subordinadas) {
            $isGestor = $this->unidadeRepository->isUsuarioGestorDaUnidade($dto->unidadeId, $dto->usuarioId);

            if (!$isGestor) {
                throw new ValidateException('Apenas gestores da unidade podem visualizar dados das unidades subordinadas.');
            }
        }
    }
}
