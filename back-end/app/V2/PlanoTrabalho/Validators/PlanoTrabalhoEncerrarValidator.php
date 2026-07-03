<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UsuarioRepository;
use App\V2\PlanoTrabalho\Authorization\PlanoTrabalhoAuthorization;

class PlanoTrabalhoEncerrarValidator
{
    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoAuthorization $authorization,
        private readonly UsuarioRepository $usuarioRepository,
    ) {}

    public function validar(string $planoId, string $usuarioLogadoId): PlanoTrabalho
    {
        $plano = $this->planoTrabalhoRepository->findById($planoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        if (!$this->authorization->isElegivelParaEncerramento($plano)) {
            throw new ValidateException('Este Plano de Trabalho não atende aos requisitos para encerramento.');
        }

        $usuario = $this->usuarioRepository->findByIdComAreasTrabalho($usuarioLogadoId);

        if ($usuario === null) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        $usuario->loadMissing('perfil');

        if (!$this->authorization->isAutorizadoEncerrar($plano, $usuario)) {
            throw new ForbiddenException('Usuário não tem permissão para encerrar este Plano de Trabalho.');
        }

        return $plano;
    }
}
