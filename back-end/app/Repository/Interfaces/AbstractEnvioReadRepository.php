<?php

declare(strict_types=1);

namespace App\Repository\Interfaces;

use Illuminate\Database\Eloquent\Model;

interface AbstractEnvioReadRepository
{
    public function findOneParaEnvio(string $id): ?Model;
}
