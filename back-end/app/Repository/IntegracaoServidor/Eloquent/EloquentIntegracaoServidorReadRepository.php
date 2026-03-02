<?php

declare(strict_types=1);

namespace App\Repository\IntegracaoServidor\Eloquent;

use App\Models\IntegracaoServidor;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorReadRepositoryContract;

final class EloquentIntegracaoServidorReadRepository extends AbstractEloquentReadRepository implements IntegracaoServidorReadRepositoryContract
{
    public function __construct(IntegracaoServidor $model)
    {
        $this->model = $model;
    }

    public function getServidor(string $cpf, string $matricula): ?IntegracaoServidor
    {
        return $this->query()
            ->where('cpf', $cpf)
            ->where('matriculasiape', $matricula)
            ->orderBy('created_at', 'desc')
            ->first();
    }
}
