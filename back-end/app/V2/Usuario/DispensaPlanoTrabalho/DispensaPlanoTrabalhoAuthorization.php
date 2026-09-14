<?php

declare(strict_types=1);

namespace App\V2\Usuario\DispensaPlanoTrabalho;

use App\Enums\PerfilEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\Usuario;
use App\Repository\Unidade\Contracts\UnidadeReadRepositoryContract;
use App\Repository\UnidadeIntegrante\Contracts\UnidadeIntegranteReadRepositoryContract;

class DispensaPlanoTrabalhoAuthorization
{
    public const MSG_ELEGIBILIDADE = 'Não é possível formalizar a dispensa de Plano de Trabalho. O agente público não atende aos critérios estabelecidos no §3º do art. 19 da IN Conjunta SEGES-SGPRT/MGI nº 24/2023.';

    public const MSG_PERMISSAO = 'Você não possui permissão para formalizar ou alterar a dispensa de Plano de Trabalho.';

    public const MSG_ESCOPO = 'Você só pode formalizar ou alterar a dispensa de agentes públicos vinculados às unidades do seu âmbito de atribuição ou subordinadas.';

    public function __construct(
        private readonly UnidadeReadRepositoryContract $unidadeRepository,
        private readonly UnidadeIntegranteReadRepositoryContract $unidadeIntegranteRepository,
    ) {}

    public function findAgenteOrFail(string $usuarioId): Usuario
    {
        $agente = Usuario::query()->find($usuarioId);
        if (!$agente instanceof Usuario) {
            throw new NotFoundException("Usuário com id '{$usuarioId}' não foi encontrado ou foi removido.");
        }

        return $agente;
    }

    public function assertPerfilPodeFormalizar(Usuario $ator): void
    {
        $nivel = (int) ($ator->perfil?->nivel ?? -1);
        if ($nivel < 0 || $nivel > PerfilEnum::ADMINISTRADOR_NEGOCIAL->value) {
            throw new ForbiddenException(self::MSG_PERMISSAO);
        }
    }

    public function podeFormalizar(Usuario $ator): bool
    {
        $nivel = (int) ($ator->perfil?->nivel ?? -1);

        return $nivel >= 0 && $nivel <= PerfilEnum::ADMINISTRADOR_NEGOCIAL->value;
    }

    public function assertEscopoUnidade(Usuario $ator, Usuario $agente): void
    {
        $nivel = (int) ($ator->perfil?->nivel ?? -1);
        if ($nivel === PerfilEnum::DESENVOLVEDOR->value) {
            return;
        }

        $escopoIds = $this->resolverUnidadesEscopoCadastrante((string) $ator->id);
        if ($escopoIds === []) {
            throw new ForbiddenException(self::MSG_ESCOPO);
        }

        $vinculosAgente = $this->unidadeIntegranteRepository
            ->findAllComAtribuicoesAtivasByUsuario((string) $agente->id)
            ->pluck('unidade_id')
            ->all();

        if ($agente->lotacao?->unidade_id) {
            $vinculosAgente[] = $agente->lotacao->unidade_id;
        }

        $vinculosAgente = array_values(array_unique(array_filter($vinculosAgente)));
        if ($vinculosAgente === [] || array_intersect($vinculosAgente, $escopoIds) === []) {
            throw new ForbiddenException(self::MSG_ESCOPO);
        }
    }

    public function isElegivel(string $usuarioId): bool
    {
        return $this->unidadeIntegranteRepository->usuarioEhChefiaDeUnidadeExecutora($usuarioId);
    }

    public function assertElegivel(string $usuarioId): void
    {
        if (!$this->isElegivel($usuarioId)) {
            throw new ValidateException(self::MSG_ELEGIBILIDADE);
        }
    }

    /** @return list<string> */
    public function resolverUnidadesEscopoCadastrante(string $cadastranteId): array
    {
        $unidadesDiretas = $this->unidadeIntegranteRepository
            ->findAllComAtribuicoesAtivasByUsuario($cadastranteId)
            ->pluck('unidade_id')
            ->toArray();

        $subordinadasIds = $this->unidadeRepository
            ->getSubordinadasRecursivas($unidadesDiretas)
            ->pluck('id')
            ->toArray();

        return array_values(array_unique(array_merge($unidadesDiretas, $subordinadasIds)));
    }
}
