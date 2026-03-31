<?php

declare(strict_types=1);

namespace App\Repository\DocumentoAssinatura\Contracts;

use Illuminate\Database\Eloquent\Model;

interface DocumentoAssinaturaWriteRepositoryContract
{
    /** @return \App\Models\DocumentoAssinatura */
    public function create(array $attributes): Model;
}
