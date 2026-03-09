<?php

declare(strict_types=1);

namespace App\Repository\IntegracaoServidor\Eloquent;

use App\Models\IntegracaoServidor;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\IntegracaoServidor\Contracts\IntegracaoServidorWriteRepositoryContract;

final class EloquentIntegracaoServidorWriteRepository extends AbstractEloquentWriteRepository implements IntegracaoServidorWriteRepositoryContract
{
    public function __construct(IntegracaoServidor $model)
    {
        $this->model = $model;
    }

    public function save(IntegracaoServidor $entidade): bool
    {
        return $entidade->save();
    }

    /**
     * @param array<string, mixed> $data
     */
    public function updateByCpfAndMatricula(string $cpf, string $matricula, array $data): bool
    {
        return (bool) $this->model
            ->where('cpf', $cpf)
            ->where('matriculasiape', $matricula)
            ->update($data);
    }
}
