<?php

declare(strict_types=1);

namespace App\Repository\CargaIndividualSiapeRelatorio\Contracts;

use App\Models\CargaIndividualSiapeRelatorio;
use Illuminate\Database\Eloquent\Collection;

interface CargaIndividualSiapeRelatorioReadRepositoryContract
{
    public function findById(string|int $id): ?CargaIndividualSiapeRelatorio;

    public function findByProcessamentoId(string $processamentoId): ?CargaIndividualSiapeRelatorio;

    public function findRecent(?string $tipo = null, ?string $chave = null, int $limit = 20): Collection;
}
