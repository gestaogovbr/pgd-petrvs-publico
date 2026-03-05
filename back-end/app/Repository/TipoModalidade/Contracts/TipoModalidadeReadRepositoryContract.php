<?php

declare(strict_types=1);

namespace App\Repository\TipoModalidade\Contracts;

interface TipoModalidadeReadRepositoryContract
{
    public function getDefaultId(): ?string;
    public function findByName(string $name): ?object;
}
