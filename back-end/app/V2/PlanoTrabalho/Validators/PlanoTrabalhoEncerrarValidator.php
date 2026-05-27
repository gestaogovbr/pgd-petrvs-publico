<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Enums\PerfilEnum;
use App\Enums\StatusEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\Traits\ValidaAutorizacaoTrait;

class PlanoTrabalhoEncerrarValidator
{
    use ValidaAutorizacaoTrait;

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly UnidadeRepository $unidadeRepository,
        private readonly UsuarioRepository $usuarioRepository,
    ) {}


    public function validar(string $planoId, string $usuarioLogadoId): PlanoTrabalho
    {
        $plano = $this->planoTrabalhoRepository->findById($planoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        if ($plano->status !== StatusEnum::ATIVO->value) {
            throw new ValidateException('Apenas planos com status ATIVO podem ser encerrados.');
        }

        if ($plano->data_inicio > now()->format('Y-m-d')) {
            throw new ValidateException('Não é possível encerrar um plano cuja vigência ainda não iniciou.');
        }

        if ($plano->data_fim < now()->format('Y-m-d')) {
            throw new ValidateException('Não é possível encerrar antecipadamente um plano cuja vigência já expirou.');
        }

        $this->validarAutorizacao($plano, $usuarioLogadoId);

        return $plano;
    }

    // TODO: spec 4.23-b exige que "representante da unidade instituidora superior ou igual à unidade
    //       onde o plano foi feito" também possa encerrar. Verificar se validarAutorizacao cobre esse caso.
    private function validarAutorizacao(PlanoTrabalho $plano, string $usuarioLogadoId): void
    {
        if ($this->isDonoOuChefia($plano, $usuarioLogadoId, $plano->unidade_id)) {
            return;
        }

        $usuario = $this->usuarioRepository->findById($usuarioLogadoId);

        if ($usuario->perfil->nivel <= PerfilEnum::ADMINISTRADOR_NEGOCIAL->value) {
            return;
        }

        throw new ForbiddenException('Usuário não tem permissão para encerrar este Plano de Trabalho.');
    }
}
