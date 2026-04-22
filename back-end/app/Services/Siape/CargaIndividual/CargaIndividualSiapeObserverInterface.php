<?php

declare(strict_types=1);

namespace App\Services\Siape\CargaIndividual;

use App\DTOs\Siape\CargaIndividualSiapeProcessamentoDTO;
use App\Models\CargaIndividualSiapeRelatorio;

interface CargaIndividualSiapeObserverInterface
{
    public function atualizar(CargaIndividualSiapeProcessamentoDTO $contexto): ?CargaIndividualSiapeRelatorio;
}
