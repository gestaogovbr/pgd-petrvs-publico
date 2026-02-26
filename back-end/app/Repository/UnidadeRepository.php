<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Unidade;
use App\Repository\Unidade\Contracts\UnidadeReadRepositoryContract;
use App\Repository\Unidade\Contracts\UnidadeWriteRepositoryContract;

class UnidadeRepository
{
    public function __construct(
        private readonly UnidadeReadRepositoryContract $readRepository,
        private readonly UnidadeWriteRepositoryContract $writeRepository,
    ) {
    }
}