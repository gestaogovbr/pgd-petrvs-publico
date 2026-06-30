<?php

declare(strict_types=1);

namespace App\Repository\SipecServidor\Contracts;

use Illuminate\Database\Eloquent\Model;

interface SipecServidorReadRepositoryContract
{
    /**
     * @return Model|null
     */
    public function findByCpfAndMatricula(string $cpf, ?string $matricula): ?Model;
}
