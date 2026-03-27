<?php

declare(strict_types=1);

namespace App\Repository\TipoModalidade\Contracts;

use Illuminate\Support\Collection;

interface TipoModalidadeReadRepositoryContract
{
    public function getDefaultId(): ?string;
    public function findOneBy(array $criteria): ?object;
    public function getAll(): Collection;
}
