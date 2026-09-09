<?php

declare(strict_types=1);

namespace App\Repository\MuralAvisoLeitura\Contracts;

use App\Models\MuralAvisoLeitura;

interface MuralAvisoLeituraReadRepositoryContract
{
    public function findByUsuarioId(string $usuarioId): ?MuralAvisoLeitura;
}
