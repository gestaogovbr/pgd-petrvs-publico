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
     * RN02/RN11: Valida se o usuário autenticado tem acesso aos Painéis Gerenciais.
     */
    public function validarAcesso(): void
    {
        /** @var Usuario $usuario */
        $usuario = Auth::user();
        $this->authValidator->validar($usuario);
    }

    /**
     * Constrói o DTO de filtros a partir dos dados da requisição.
     */
    public function buildFiltros(array $data): FiltrosPainelDTO
    {
        return FiltrosPainelDTO::fromArray($data);
    }

    /**
     * RN12: Retorna a unidade de maior nível hierárquico em que o usuário possui atribuição.
     * Unidade com menos ancestrais (menor profundidade) = maior nível hierárquico.
     */
    public function getUnidadeInicial(): array
    {
        /** @var Usuario $usuario */
        $usuario = Auth::user();

        $areasTrabalho = $usuario->areasTrabalho ?? [];
        $unidadeInicial = null;
        $menorNivel = PHP_INT_MAX;

        foreach ($areasTrabalho as $area) {
            $unidade = $area->unidade;
            if (!$unidade) {
                continue;
            }

            $nivel = $this->calcularNivelHierarquico($unidade);

            if ($nivel < $menorNivel) {
                $menorNivel = $nivel;
                $unidadeInicial = $unidade;
            }
        }

        if (!$unidadeInicial) {
            return ['unidade_id' => null, 'unidade_sigla' => null, 'unidade_nome' => null, 'unidade_raiz_id' => null, 'unidade_raiz_sigla' => null];
        }

        $unidadeRaiz = $this->unidadeRepository->findRaiz();

        return [
            'unidade_id' => $unidadeInicial->id,
            'unidade_sigla' => $unidadeInicial->sigla,
            'unidade_nome' => $unidadeInicial->nome,
            'unidade_raiz_id' => $unidadeRaiz?->id,
            'unidade_raiz_sigla' => $unidadeRaiz?->sigla,
        ];
    }

    /**
     * Calcula o nível hierárquico navegando via unidade_pai_id.
     * Raiz (sem pai) = nível 1, cada ancestral adiciona 1.
     */
    private function calcularNivelHierarquico(\App\Models\Unidade $unidade): int
    {
        $nivel = 1;
        $atual = $unidade;

        while ($atual->unidade_pai_id !== null) {
            $nivel++;
            $atual = $atual->unidadePai;

            if (!$atual) {
                break;
            }
        }

        return $nivel;
    }
}
