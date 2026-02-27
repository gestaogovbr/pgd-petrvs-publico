<?php

declare(strict_types=1);

namespace App\Repository\IntegracaoServidor\Contracts;

use App\Models\IntegracaoServidor;

interface IntegracaoServidorReadRepositoryContract
{
    public function getServidor(string $cpf, string $matricula): ?IntegracaoServidor;
}

