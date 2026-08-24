<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UsuarioRepository;
use App\V2\PlanoTrabalho\Authorization\PlanoTrabalhoAuthorization;

class PlanoTrabalhoCancelarValidator
{
    private const STATUS_CANCELAVEIS_BASE = [
        StatusEnum::ATIVO,
        StatusEnum::SUSPENSO,
    ];

    private const STATUS_CANCELAVEIS_EXPANDIDOS = [
        StatusEnum::ATIVO,
        StatusEnum::SUSPENSO,
        StatusEnum::CONCLUIDO,
    ];

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly UsuarioRepository $usuarioRepository,
        private readonly PlanoTrabalhoAuthorization $authorization,
    ) {}

    public function validar(string $planoId, string $usuarioLogadoId): PlanoTrabalho
    {
        /** @var \App\Models\PlanoTrabalho|null $plano */
        $plano = $this->planoTrabalhoRepository->findById($planoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        $usuario = $this->usuarioRepository->findById($usuarioLogadoId);

        if (!$usuario->hasPermissionTo(PlanoTrabalhoAuthorization::CAPACIDADE_CANCELAR)) {
            throw new ForbiddenException('Usuário não tem permissão para cancelar planos de trabalho.');
        }

        $statusPermitidos = $this->resolverStatusPermitidos($usuario);

        if (!in_array($plano->status, array_map(fn (StatusEnum $s) => $s->value, $statusPermitidos), true)) {
            throw new ValidateException('O plano não pode ser cancelado neste status.');
        }

        if ($this->deveValidarConsolidacaoFinalizada($plano, $usuario)) {
            $this->validarSemConsolidacaoFinalizada($plano);
        }

        if (!$this->authorization->podeCancelar($plano, $usuario)) {
            throw new ForbiddenException('Usuário não tem permissão para cancelar este Plano de Trabalho.');
        }

        return $plano;
    }

    /** @return StatusEnum[] */
    private function resolverStatusPermitidos(Usuario $usuario): array
    {
        if ($usuario->hasPermissionTo(PlanoTrabalhoAuthorization::CAPACIDADE_CANCELAR_FORCADO)) {
            return self::STATUS_CANCELAVEIS_EXPANDIDOS;
        }

        return self::STATUS_CANCELAVEIS_BASE;
    }

    private function deveValidarConsolidacaoFinalizada(PlanoTrabalho $plano, Usuario $usuario): bool
    {
        if ($plano->status === StatusEnum::SUSPENSO->value) {
            return false;
        }

        if ($plano->status === StatusEnum::CONCLUIDO->value) {
            return false;
        }

        if ($usuario->hasPermissionTo(PlanoTrabalhoAuthorization::CAPACIDADE_CANCELAR_FORCADO)) {
            return false;
        }

        return true;
    }

    private function validarSemConsolidacaoFinalizada(PlanoTrabalho $plano): void
    {
        if ($this->consolidacaoRepository->possuiConsolidacaoFinalizadaPorPlano($plano->id)) {
            throw new ValidateException('O plano não pode ser cancelado pois possui período avaliativo com registro finalizado.');
        }
    }
}
