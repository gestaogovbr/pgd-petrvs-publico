<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Enums\PerfilEnum;
use App\Enums\StatusEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UsuarioRepository;

class PlanoTrabalhoDestroyValidator
{
    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly UsuarioRepository $usuarioRepository,
    ) {}

    public function validar(string $planoId, string $usuarioLogadoId): void
    {
        $plano = $this->planoTrabalhoRepository->findById($planoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        if ($plano->status !== StatusEnum::INCLUIDO->value) {
            throw new ValidateException('Plano de Trabalho não pode ser excluído pois não é mais um rascunho.');
        }

        if ($this->planoTrabalhoRepository->possuiAssinatura($planoId)) {
            throw new ValidateException('Plano de Trabalho não pode ser excluído pois já possui assinatura.');
        }

        $this->validarAutorizacao($plano, $usuarioLogadoId);
    }

    private function validarAutorizacao($plano, string $usuarioLogadoId): void
    {
        if ($usuarioLogadoId === $plano->criacao_usuario_id) {
            return;
        }

        if ($usuarioLogadoId === $plano->usuario_id) {
            return;
        }

        $usuario = $this->usuarioRepository->findById($usuarioLogadoId);
        $nivel = $usuario->perfil->nivel;

        if ($nivel <= PerfilEnum::ADMINISTRADOR_MASTER->value) {
            return;
        }

        throw new ForbiddenException('Usuário não tem permissão para excluir este plano de trabalho.');
    }
}
