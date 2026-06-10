<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Authorization;

use App\Enums\PerfilEnum;
use App\Enums\StatusEnum;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\UnidadeRepository;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoAcoesDTO;
use App\V2\Traits\ValidaAutorizacaoTrait;
use Carbon\Carbon;

class PlanoTrabalhoAuthorization
{
    use ValidaAutorizacaoTrait;

    private const PRAZO_RECURSO_DIAS = 30;

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
    ) {}

    public function acoes(PlanoTrabalho $plano, Usuario $usuario): PlanoTrabalhoAcoesDTO
    {
        return new PlanoTrabalhoAcoesDTO(
            editar: $this->podeEditar($plano, $usuario),
            arquivar: $this->podeArquivar($plano, $usuario),
        );
    }

    public function podeArquivar(PlanoTrabalho $plano, Usuario $usuario): bool
    {
        if ($plano->data_arquivamento !== null) {
            return false;
        }

        if (!$this->isElegivelParaArquivamento($plano)) {
            return false;
        }

        return $this->isAutorizadoArquivar($plano, $usuario);
    }

    public function podeEditar(PlanoTrabalho $plano, Usuario $usuario): bool
    {
        if (!$this->statusPermiteEdicao($plano)) {
            return false;
        }

        return $this->usuarioPodeEditarPlano($plano, $usuario);
    }

    private function statusPermiteEdicao(PlanoTrabalho $plano): bool
    {
        return in_array($plano->status, [
            StatusEnum::INCLUIDO->value,
            StatusEnum::AGUARDANDO_ASSINATURA->value,
        ], true);
    }

    private function usuarioPodeEditarPlano(PlanoTrabalho $plano, Usuario $usuario): bool
    {
        $perfil = $usuario->perfil;
        if ($perfil !== null && $perfil->nivel <= PerfilEnum::ADMINISTRADOR_MASTER->value) {
            return true;
        }

        if ($this->isDonoOuChefia($plano, $usuario->id, $plano->unidade_id, ['usuario_id', 'criacao_usuario_id'])) {
            return true;
        }

        return $this->admNegocialNoEscopoInstituidora($usuario, $plano->unidade_id);
    }

    private function admNegocialNoEscopoInstituidora(Usuario $usuario, string $unidadePlanoId): bool
    {
        $perfil = $usuario->perfil;
        if ($perfil === null || $perfil->nivel !== PerfilEnum::ADMINISTRADOR_NEGOCIAL->value) {
            return false;
        }

        $linhaAscendente = $this->unidadeRepository->linhaAscendente($unidadePlanoId);
        if ($linhaAscendente === []) {
            return false;
        }

        $usuario->loadMissing('areasTrabalho.unidade');

        foreach ($usuario->areasTrabalho as $area) {
            $unidade = $area->unidade;
            if ($unidade === null || (int) $unidade->instituidora !== 1) {
                continue;
            }

            if (in_array($unidade->id, $linhaAscendente, true)) {
                return true;
            }
        }

        return false;
    }

    private function isElegivelParaArquivamento(PlanoTrabalho $plano): bool
    {
        if ($plano->status === StatusEnum::CANCELADO->value) {
            return true;
        }

        $resumo = $this->consolidacaoRepository->resumoParaArquivamento(
            $plano->id,
            Carbon::now()->subDays(self::PRAZO_RECURSO_DIAS),
        );

        if ($plano->encerrado_at !== null && !$resumo->possuiPendencias) {
            return true;
        }

        if ($plano->status === StatusEnum::CONCLUIDO->value && $resumo->todosAvaliados && !$resumo->avaliacaoRecente) {
            return true;
        }

        return false;
    }

    private function isAutorizadoArquivar(PlanoTrabalho $plano, Usuario $usuario): bool
    {
        if ($this->isDonoOuChefia($plano, $usuario->id, $plano->unidade_id)) {
            return true;
        }

        if ($usuario->perfil?->nivel === PerfilEnum::COLABORADOR->value
            && $this->unidadeRepository->hasUsuarioLotacao($plano->unidade_id, $usuario->id, true)) {
            return true;
        }

        return false;
    }
}
