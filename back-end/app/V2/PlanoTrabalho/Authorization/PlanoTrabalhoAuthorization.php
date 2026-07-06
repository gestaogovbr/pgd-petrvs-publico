<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Authorization;

use App\Enums\PerfilEnum;
use App\Enums\StatusEnum;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Repository\UnidadeRepository;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoAcoesDTO;
use App\V2\Traits\ValidaAutorizacaoTrait;

class PlanoTrabalhoAuthorization
{
    use ValidaAutorizacaoTrait;

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    public function acoes(PlanoTrabalho $plano, Usuario $usuario, bool $isElegivelParaArquivamento): PlanoTrabalhoAcoesDTO
    {
        return new PlanoTrabalhoAcoesDTO(
            editar: $this->podeEditar($plano, $usuario),
            arquivar: $this->podeArquivar($plano, $usuario, $isElegivelParaArquivamento),
            encerrar: $this->podeEncerrar($plano, $usuario),
        );
    }

    public function podeEncerrar(PlanoTrabalho $plano, Usuario $usuario): bool
    {
        if (!$this->isElegivelParaEncerramento($plano)) {
            return false;
        }

        return $this->isAutorizadoEncerrar($plano, $usuario);
    }

    public function isElegivelParaEncerramento(PlanoTrabalho $plano): bool
    {
        if ($plano->status !== StatusEnum::ATIVO->value) {
            return false;
        }

        $hoje = now()->format('Y-m-d');

        return $plano->data_inicio <= $hoje && $plano->data_fim >= $hoje;
    }

    // TODO: spec 4.23-b exige que o adm negocial seja de uma unidade instituidora na linha
    //       ascendente do PT. Atualmente permite qualquer adm negocial. Avaliar uso de admNegocialNoEscopoInstituidora.
    public function isAutorizadoEncerrar(PlanoTrabalho $plano, Usuario $usuario): bool
    {
        return $this->isDonoOuChefiaOuAdm($plano, $usuario);
    }

    public function podeArquivar(PlanoTrabalho $plano, Usuario $usuario, bool $isElegivelParaArquivamento): bool
    {
        if ($plano->data_arquivamento !== null) {
            return false;
        }

        if (!$isElegivelParaArquivamento) {
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

    public function isAutorizadoArquivar(PlanoTrabalho $plano, Usuario $usuario): bool
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

    private function isDonoOuChefiaOuAdm(PlanoTrabalho $plano, Usuario $usuario): bool
    {
        if ($this->isDonoOuChefia($plano, $usuario->id, $plano->unidade_id)) {
            return true;
        }

        return $usuario->perfil !== null && $usuario->perfil->nivel <= PerfilEnum::ADMINISTRADOR_NEGOCIAL->value;
    }
}
