<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Enums\PerfilEnum;
use App\Enums\StatusEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\Traits\ValidaAutorizacaoTrait;

class PlanoTrabalhoDestroyValidator
{
    use ValidaAutorizacaoTrait;

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly UnidadeRepository $unidadeRepository,
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

        if ($this->isDonoOuChefia($plano, $usuarioLogadoId, $plano->unidade_id, ['criacao_usuario_id', 'usuario_id'])) {
            return;
        }

        $usuario = $this->usuarioRepository->findById($usuarioLogadoId);

        if ($usuario->perfil->nivel <= PerfilEnum::ADMINISTRADOR_MASTER->value) {
            return;
        }

        throw new ForbiddenException('Usuário não tem permissão para excluir este plano de trabalho.');
    }
}
