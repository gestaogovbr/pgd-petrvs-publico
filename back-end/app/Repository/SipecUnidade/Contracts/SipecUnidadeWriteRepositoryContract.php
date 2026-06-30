<?php

declare(strict_types=1);

namespace App\Repository\SipecUnidade\Contracts;

use Illuminate\Database\Eloquent\Model;

interface SipecUnidadeWriteRepositoryContract
{
    /**
     * @return Model
     */
    public function updateOrCreateByCodigo(string $codigo, string $response, bool $processado, ?string $dataModificacao): Model;
}
