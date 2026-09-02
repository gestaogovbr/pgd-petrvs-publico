<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega\Support;

use App\Models\Usuario;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeRepository;
use Illuminate\Support\Facades\Session;

/**
 * RN04 — unidade mais alta na hierarquia entre as unidades em que o usuário possui atribuição ativa.
 * Em empate no mesmo nível hierárquico, prioriza a unidade atual do usuário (se também possuir atribuição ativa).
 */
final class RelatorioEntregaUnidadeDefaultResolver
{
    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly UnidadeIntegranteRepository $integranteRepository,
    ) {
    }

    public function resolve(?Usuario $usuario): ?string
    {
        if ($usuario === null) {
            return null;
        }

        $unidadeIds = $this->collectUnidadeIdsComAtribuicaoAtiva($usuario);
        if ($unidadeIds === []) {
            return null;
        }

        $melhorProfundidade = PHP_INT_MAX;
        $candidatos = [];

        foreach ($unidadeIds as $unidadeId) {
            $linha = $this->unidadeRepository->linhaAscendente($unidadeId);
            if ($linha === []) {
                continue;
            }

            $profundidade = count($linha);
            if ($profundidade < $melhorProfundidade) {
                $melhorProfundidade = $profundidade;
                $candidatos = [$unidadeId];
                continue;
            }

            if ($profundidade === $melhorProfundidade) {
                $candidatos[] = $unidadeId;
            }
        }

        if ($candidatos === []) {
            return null;
        }

        if (count($candidatos) === 1) {
            return $candidatos[0];
        }

        $unidadeAtualId = $this->resolveUnidadeAtualId($usuario);
        if ($unidadeAtualId !== null && ! in_array($unidadeAtualId, $unidadeIds, true)) {
            $unidadeAtualId = null;
        }

        if ($unidadeAtualId !== null && in_array($unidadeAtualId, $candidatos, true)) {
            return $unidadeAtualId;
        }

        sort($candidatos);

        return $candidatos[0];
    }

    /** @return string[] */
    private function collectUnidadeIdsComAtribuicaoAtiva(Usuario $usuario): array
    {
        return $this->integranteRepository
            ->findAllComAtribuicoesAtivasByUsuario((string) $usuario->getKey())
            ->pluck('unidade_id')
            ->map(static fn ($id) => (string) $id)
            ->filter(static fn (string $id) => $id !== '')
            ->unique()
            ->values()
            ->all();
    }

    private function resolveUnidadeAtualId(Usuario $usuario): ?string
    {
        $sessionUnidadeId = Session::get('unidade_id');
        if (is_string($sessionUnidadeId) && $sessionUnidadeId !== '') {
            return $sessionUnidadeId;
        }

        $configUnidadeId = data_get($usuario->config, 'unidade_id');
        if (is_string($configUnidadeId) && $configUnidadeId !== '') {
            return $configUnidadeId;
        }

        if ($usuario->relationLoaded('lotacao')) {
            $lotacaoUnidadeId = $usuario->lotacao?->unidade_id;
        } elseif ($usuario->exists) {
            $usuario->load('lotacao');
            $lotacaoUnidadeId = $usuario->lotacao?->unidade_id;
        } else {
            $lotacaoUnidadeId = null;
        }

        return is_string($lotacaoUnidadeId) && $lotacaoUnidadeId !== ''
            ? $lotacaoUnidadeId
            : null;
    }
}
