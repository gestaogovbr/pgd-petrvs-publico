<?php

declare(strict_types=1);

namespace App\Repository\IntegracaoServidor\Eloquent;

use App\Models\IntegracaoServidor;
use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorWriteRepositoryContract;

final class EloquentIntegracaoServidorWriteRepository implements IntegracaoServidorWriteRepositoryContract
{
    public function __construct(
        private readonly IntegracaoServidor $model,
    ) {
    }

    public function save(IntegracaoServidor $entidade): bool
    {
        return $entidade->save();
    }

    /**
     * @param array<string, mixed> $data
     */
    public function update(string $cpf, string $matricula, array $data): bool
    {
        return (bool) $this->model
            ->where('cpf', $cpf)
            ->where('matriculasiape', $matricula)
            ->update($data);
    }
}

