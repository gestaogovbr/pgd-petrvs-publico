<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Enums\PerfilEnum;
use App\Exceptions\ServerException;
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
            throw new ServerException("ValidatePlanoTrabalho", "Plano de Trabalho não encontrado.");
        }

        if ($plano->status !== 'INCLUIDO') { # Talvez fosse bom procurar documento_assinaturas ao invés de buscar estritamente via status
            throw new ServerException("ValidatePlanoTrabalho", "Plano de Trabalho não pode ser excluído pois já possui assinatura.");
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

        throw new ServerException("ValidatePlanoTrabalho", "Usuário não tem permissão para excluir este plano de trabalho.");
    }
}
