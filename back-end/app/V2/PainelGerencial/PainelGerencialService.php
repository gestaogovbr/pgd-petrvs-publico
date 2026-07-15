<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial;

use App\Models\Usuario;
use App\Repository\UnidadeRepository;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\Validators\PainelAuthorizationValidator;
use Illuminate\Support\Facades\Auth;

class PainelGerencialService
{
    public function __construct(
        private readonly PainelAuthorizationValidator $authValidator,
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    /**
     * Constrói o DTO de filtros validando autorização.
     */
    public function buildFiltros(array $data): FiltrosPainelDTO
    {
        /** @var Usuario $usuario */
        $usuario = Auth::user();
        $this->authValidator->validar($usuario);

        return FiltrosPainelDTO::fromArray($data);
    }

    /**
     * RN12: Retorna a unidade de maior nível hierárquico em que o usuário possui atribuição.
     * Unidade com path mais curto (ou null) = maior nível hierárquico.
     */
    public function getUnidadeInicial(): array
    {
        /** @var Usuario $usuario */
        $usuario = Auth::user();
        $this->authValidator->validar($usuario);

        $areasTrabalho = $usuario->areasTrabalho ?? [];
        $unidadeInicial = null;
        $menorNivel = PHP_INT_MAX;

        foreach ($areasTrabalho as $area) {
            $unidade = $area->unidade;
            if (!$unidade) {
                continue;
            }

            $nivel = $this->calcularNivelHierarquico($unidade->path);

            if ($nivel < $menorNivel) {
                $menorNivel = $nivel;
                $unidadeInicial = $unidade;
            }
        }

        if (!$unidadeInicial) {
            return ['unidade_id' => null, 'unidade_sigla' => null, 'unidade_nome' => null];
        }

        return [
            'unidade_id' => $unidadeInicial->id,
            'unidade_sigla' => $unidadeInicial->sigla,
            'unidade_nome' => $unidadeInicial->nome,
        ];
    }

    /**
     * Calcula o nível hierárquico a partir do path.
     * Path null/vazio = nível 1 (raiz), path com N segmentos = nível N+1.
     */
    private function calcularNivelHierarquico(?string $path): int
    {
        if ($path === null || $path === '') {
            return 1;
        }

        $segmentos = array_filter(explode('/', $path));

        return count($segmentos) + 1;
    }
}
