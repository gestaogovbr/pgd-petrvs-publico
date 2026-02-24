<?php

declare(strict_types=1);

namespace App\Repository\IntegracaoServidor\Eloquent;

use App\Models\IntegracaoServidor;
use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorReadRepositoryContract;

final class EloquentIntegracaoServidorReadRepository implements IntegracaoServidorReadRepositoryContract
{
    public function __construct(
        private readonly IntegracaoServidor $model,
    ) {
    }

    public function getServidor(string $cpf, string $matricula): ?IntegracaoServidor
    {
        return $this->model
            ->where('cpf', $cpf)
            ->where('matriculasiape', $matricula)
            ->orderBy('created_at', 'desc')
            ->first();
    }
}

