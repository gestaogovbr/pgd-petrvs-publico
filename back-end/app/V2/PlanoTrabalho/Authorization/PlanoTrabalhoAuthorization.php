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

    public function acoes(PlanoTrabalho $plano, Usuario $usuario): PlanoTrabalhoAcoesDTO
    {
        return new PlanoTrabalhoAcoesDTO(
            editar: $this->podeEditar($plano, $usuario),
        );
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
        // TODO: verificar com Geisimar o contexto do commit 5c1b0ac97 que alterou <= para >=.
        // Com >=, todos os perfis (exceto DESENVOLVEDOR) passam. Com <=, apenas DEV e ADM_MASTER.
        // Os testes de PlanoTrabalhoAuthorizationTest esperam <=. Alinhar antes de alterar.
        if ($perfil !== null && $perfil->nivel >= PerfilEnum::ADMINISTRADOR_MASTER->value) {
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
}
