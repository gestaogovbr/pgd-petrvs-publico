<?php

declare(strict_types=1);

namespace App\V2\Home\Traits;

use App\Cache\GestorHierarquiaCache;
use App\Repository\UnidadeRepository;
use App\V2\Home\DTOs\HomeRequestDTO;

trait ResolveUnidades
{
    abstract protected function getUnidadeRepository(): UnidadeRepository;

    /** @return string[] */
    protected function resolverUnidades(HomeRequestDTO $dto): array
    {
        $unidadeIds = [$dto->unidadeId];

        if ($dto->subordinadas) {
            $subordinadas = GestorHierarquiaCache::getSubordinadasRecursivas(
                $dto->unidadeId,
                fn () => $this->getUnidadeRepository()
                    ->getSubordinadasRecursivasIds([$dto->unidadeId]),
            );

            $unidadeIds = array_merge($unidadeIds, $subordinadas);
        }

        return $unidadeIds;
    }
}
