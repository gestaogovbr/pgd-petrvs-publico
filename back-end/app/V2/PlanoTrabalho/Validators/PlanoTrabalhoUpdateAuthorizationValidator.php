<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\PlanoTrabalho;
use App\Repository\UsuarioRepository;
use App\V2\PlanoTrabalho\Authorization\PlanoTrabalhoAuthorization;

class PlanoTrabalhoUpdateAuthorizationValidator
{
    public function __construct(
        private readonly PlanoTrabalhoAuthorization $authorization,
        private readonly UsuarioRepository $usuarioRepository,
    ) {}

    public function validar(PlanoTrabalho $plano, string $usuarioLogadoId): void
    {
        $usuario = $this->usuarioRepository->findByIdComAreasTrabalho($usuarioLogadoId);

        if ($usuario === null) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        $usuario->loadMissing('perfil');

        if (!$this->authorization->podeEditar($plano, $usuario)) {
            throw new ForbiddenException('Usuário não tem permissão para editar este Plano de Trabalho.');
        }
    }
}
