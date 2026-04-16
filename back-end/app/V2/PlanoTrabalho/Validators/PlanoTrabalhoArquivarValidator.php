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
use Carbon\Carbon;

class PlanoTrabalhoArquivarValidator
{
    use ValidaAutorizacaoTrait;

    private const PRAZO_RECURSO_DIAS = 30;

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

        if ($plano->data_arquivamento !== null) {
            throw new ValidateException('Este Plano de Trabalho já está arquivado.');
        }

        $this->validarElegibilidade($plano);
        $this->validarAutorizacao($plano, $usuarioLogadoId);

        return $plano;
    }

    private function validarElegibilidade(PlanoTrabalho $plano): void
    {
        if ($plano->status === StatusEnum::CANCELADO->value) {
            return;
        }

        if ($plano->encerrado_at !== null && !$this->possuiPendencias($plano)) {
            return;
        }

        if ($plano->status === StatusEnum::CONCLUIDO->value && $this->todosAvaliados($plano) && !$this->dentroPrazoRecurso($plano)) {
            return;
        }

        throw new ValidateException('Este Plano de Trabalho não atende aos requisitos para arquivamento.');
    }

    private function todosAvaliados(PlanoTrabalho $plano): bool
    {
        return $plano->consolidacoes()
            ->where('status', '!=', StatusEnum::AVALIADO->value)
            ->doesntExist();
    }

    private function dentroPrazoRecurso(PlanoTrabalho $plano): bool
    {
        $limite = Carbon::now()->subDays(self::PRAZO_RECURSO_DIAS);

        return $plano->consolidacoes()
            ->whereHas('avaliacoes', fn ($q) => $q->where('data_avaliacao', '>', $limite))
            ->exists();
    }

    private function possuiPendencias(PlanoTrabalho $plano): bool
    {
        return $plano->consolidacoes()
            ->whereIn('status', [StatusEnum::INCLUIDO->value, StatusEnum::CONCLUIDO->value])
            ->exists();
    }

    private function validarAutorizacao(PlanoTrabalho $plano, string $usuarioLogadoId): void
    {
        if ($this->isDonoOuChefia($plano, $usuarioLogadoId, $plano->unidade_id)) {
            return;
        }

        $usuario = $this->usuarioRepository->findById($usuarioLogadoId);

        if ($usuario->perfil->nivel <= PerfilEnum::COLABORADOR->value) {
            return;
        }

        throw new ForbiddenException('Usuário não tem permissão para arquivar este Plano de Trabalho.');
    }
}
