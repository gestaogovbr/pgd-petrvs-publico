<?php

declare(strict_types=1);

namespace App\V2\Home\Validators;

use App\Exceptions\ForbiddenException;
use App\Repository\UnidadeRepository;

class HomeAuthorizationValidator
{
    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    public function validar(string $unidadeId, string $usuarioId): void
    {
        if (!$this->unidadeRepository->isUsuarioGestorRecursivo($unidadeId, $usuarioId)) {
            throw new ForbiddenException('Acesso restrito a gestores de unidade.');
        }
    }
}
