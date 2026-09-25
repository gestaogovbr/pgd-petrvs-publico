<?php

declare(strict_types=1);

namespace App\Repository\SiapeListaServidores\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface SiapeListaServidoresReadRepositoryContract
{
    /** @return Collection<int, \App\Models\SiapeListaServidores> */
    public function pendentes(): Collection;
}
