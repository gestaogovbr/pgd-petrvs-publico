<?php

declare(strict_types=1);

namespace App\Repository\Interfaces;

use Illuminate\Database\Eloquent\Model;

/**
 * @template TModel of Model
 */
interface AbstractEnvioReadRepository
{
    /**
     * @return TModel|null
     */
    public function findById(string|int $id, $deleteTrashed = false): ?Model;

    /**
     * @return TModel|null
     */
    public function findOneParaEnvio(string $id): ?Model;
}
