<?php

declare(strict_types=1);

namespace App\V2\Home\Traits;

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
            $subordinadas = $this->getUnidadeRepository()
                ->getSubordinadasRecursivas([$dto->unidadeId])
                ->pluck('id')
                ->toArray();

            $unidadeIds = array_merge($unidadeIds, $subordinadas);
        }

        return $unidadeIds;
    }
}
