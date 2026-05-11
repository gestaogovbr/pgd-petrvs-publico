<?php

declare(strict_types=1);

namespace App\Repository\CargaIndividualSiapeRelatorio\Contracts;

use App\Models\CargaIndividualSiapeRelatorio;
use Carbon\CarbonInterface;

interface CargaIndividualSiapeRelatorioWriteRepositoryContract
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function create(array $attributes): CargaIndividualSiapeRelatorio;

    public function deleteExpired(CarbonInterface $now): int;
}
