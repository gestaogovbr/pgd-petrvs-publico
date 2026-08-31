<?php

declare(strict_types=1);

namespace App\Repository\MuralAvisoLeitura\Eloquent;

use App\Models\MuralAvisoLeitura;
use App\Repository\MuralAvisoLeitura\Contracts\MuralAvisoLeituraReadRepositoryContract;

class EloquentMuralAvisoLeituraReadRepository implements MuralAvisoLeituraReadRepositoryContract
{
    public function __construct(
        private readonly MuralAvisoLeitura $model,
    ) {}

    public function findByUsuarioId(string $usuarioId): ?MuralAvisoLeitura
    {
        return $this->model->newQuery()
            ->where('usuario_id', $usuarioId)
            ->first();
    }
}
