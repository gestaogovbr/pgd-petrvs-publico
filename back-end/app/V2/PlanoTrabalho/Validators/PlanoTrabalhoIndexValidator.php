<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Enums\PerfilEnum;
use App\Exceptions\ServerException;
use App\Repository\UsuarioRepository;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;

class PlanoTrabalhoIndexValidator
{
    public function __construct(
        private readonly UsuarioRepository $usuarioRepository,
    ) {}

    public function validar(PlanoTrabalhoIndexDTO $filtro): void
    {
        if ($filtro->usuarioLogadoId === null) {
            return;
        }

        $usuario = $this->usuarioRepository->findById($filtro->usuarioLogadoId);

        if ($usuario->perfil->nivel >= PerfilEnum::PARTICIPANTE->value
            && $filtro->usuarioId !== null
            && $filtro->usuarioId !== $filtro->usuarioLogadoId
        ) {
            throw new ServerException("ValidatePlanoTrabalho", "Usuário de perfil participante só pode consultar seus próprios planos de trabalho.");
        }
    }
}
