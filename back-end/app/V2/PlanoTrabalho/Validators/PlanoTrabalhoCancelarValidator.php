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

class PlanoTrabalhoCancelarValidator
{
    private const STATUSES_CONSOLIDACAO_BLOQUEIAM = [
        StatusEnum::CONCLUIDO,
        StatusEnum::AVALIADO,
    ];

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
            throw new ValidateException('Apenas planos com status ATIVO podem ser cancelados.');
        }

        $this->validarSemConsolidacaoFinalizada($plano);
        $this->validarAutorizacao($plano, $usuarioLogadoId);

        return $plano;
    }

    private function validarSemConsolidacaoFinalizada(PlanoTrabalho $plano): void
    {
        $statusBloqueiam = array_map(fn (StatusEnum $s) => $s->value, self::STATUSES_CONSOLIDACAO_BLOQUEIAM);

        $possuiFinalizada = $plano->consolidacoes()
            ->whereIn('status', $statusBloqueiam)
            ->exists();

        if ($possuiFinalizada) {
            throw new ValidateException('O plano não pode ser cancelado pois possui período avaliativo com registro finalizado.');
        }
    }

    private function validarAutorizacao(PlanoTrabalho $plano, string $usuarioLogadoId): void
    {
        if ($plano->usuario_id === $usuarioLogadoId) {
            return;
        }

        if ($this->unidadeRepository->isUsuarioGestorRecursivo($plano->unidade_id, $usuarioLogadoId)) {
            return;
        }

        $usuario = $this->usuarioRepository->findById($usuarioLogadoId);
        $nivel = $usuario->perfil->nivel;

        if ($nivel <= PerfilEnum::ADMINISTRADOR_NEGOCIAL->value) {
            return;
        }

        throw new ForbiddenException('Usuário não tem permissão para cancelar este Plano de Trabalho.');
    }
}
