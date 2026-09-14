<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecServidor\Contracts;

use App\Models\SipecServidor;
use Illuminate\Database\Eloquent\Model;

interface SipecServidorWriteRepositoryContract
{
    /**
     * @return Model
     */
    public function updateOrCreateByCpfAndMatricula(string $cpf, ?string $matricula, string $response, bool $processado, ?string $dataModificacao): Model;

    public function marcarComoProcessado(SipecServidor $registro): bool;
}
