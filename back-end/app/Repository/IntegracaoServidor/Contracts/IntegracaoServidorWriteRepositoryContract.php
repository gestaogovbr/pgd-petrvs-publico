<?php

declare(strict_types=1);

namespace App\Repository\IntegracaoServidor\Contracts;

use App\Models\IntegracaoServidor;

interface IntegracaoServidorWriteRepositoryContract
{
    public function save(IntegracaoServidor $entidade): bool;

    /**
     * @param array<string, mixed> $data
     */
    public function updateByCpfAndMatricula(string $cpf, string $matricula, array $data): bool;
}
