<?php

declare(strict_types=1);

namespace App\V2\PlanoEntrega\DataProviders;

use App\Cache\GestorHierarquiaCache;
use App\Repository\UnidadeRepository;

/**
 * Resolve as unidades FILHAS diretas das unidades que o usuário chefia — base de
 * responsabilidade da chefia para homologação/avaliação de PE.
 *
 * A resolução é cacheada em três níveis:
 *   - memoização por instância (mesma request: count() + buscar() reaproveitam);
 *   - GestorHierarquiaCache::getUnidadesGeridas para as unidades geridas (entre requests);
 *   - GestorHierarquiaCache::getSubordinadasDiretas para as filhas diretas de cada unidade
 *     gerida (chave própria, distinta das subordinadas recursivas, evitando colisão).
 */
trait ResolveUnidadesFilhasGeridas
{
    /** @var array<string, string[]> memoização por usuário dentro da mesma instância/request */
    private array $unidadesFilhasGeridasMemo = [];

    abstract protected function getUnidadeRepository(): UnidadeRepository;

    /**
     * @return string[]
     */
    protected function resolverUnidadesFilhasGeridas(string $usuarioId): array
    {
        if (isset($this->unidadesFilhasGeridasMemo[$usuarioId])) {
            return $this->unidadesFilhasGeridasMemo[$usuarioId];
        }

        $gerenciadasIds = GestorHierarquiaCache::getUnidadesGeridas(
            $usuarioId,
            fn () => $this->getUnidadeRepository()->getUnidadesGerenciadas($usuarioId)->pluck('id')->toArray(),
        );

        if ($gerenciadasIds === []) {
            return $this->unidadesFilhasGeridasMemo[$usuarioId] = [];
        }

        $filhasIds = [];
        foreach ($gerenciadasIds as $unidadeGeridaId) {
            $filhasIds = array_merge(
                $filhasIds,
                GestorHierarquiaCache::getSubordinadasDiretas(
                    $unidadeGeridaId,
                    fn () => $this->getUnidadeRepository()->getSubordinadas([$unidadeGeridaId])->pluck('id')->toArray(),
                ),
            );
        }

        return $this->unidadesFilhasGeridasMemo[$usuarioId] = array_values(array_unique($filhasIds));
    }
}
