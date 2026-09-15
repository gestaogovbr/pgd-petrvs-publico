<?php

declare(strict_types=1);

namespace App\V2\PlanoEntrega\DataProviders;

use App\Cache\GestorHierarquiaCache;
use App\Repository\UnidadeRepository;

/**
 * Resolve as unidades que o usuário chefia (próprias) — base de responsabilidade da
 * chefia para os Registros de Execução de PE.
 *
 * Cacheado em dois níveis: memoização por instância (mesma request) e
 * GestorHierarquiaCache::getUnidadesGeridas (entre requests).
 */
trait ResolveUnidadesGeridas
{
    /** @var array<string, string[]> memoização por usuário dentro da mesma instância/request */
    private array $unidadesGeridasMemo = [];

    abstract protected function getUnidadeRepository(): UnidadeRepository;

    /**
     * @return string[]
     */
    protected function resolverUnidadesGeridas(string $usuarioId): array
    {
        if (isset($this->unidadesGeridasMemo[$usuarioId])) {
            return $this->unidadesGeridasMemo[$usuarioId];
        }

        return $this->unidadesGeridasMemo[$usuarioId] = GestorHierarquiaCache::getUnidadesGeridas(
            $usuarioId,
            fn () => $this->getUnidadeRepository()->getUnidadesGerenciadas($usuarioId)->pluck('id')->toArray(),
        );
    }
}
