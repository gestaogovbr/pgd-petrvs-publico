<?php

declare(strict_types=1);

namespace App\Repository\MuralAvisoLeitura\Contracts;

interface MuralAvisoLeituraWriteRepositoryContract
{
    public function upsert(string $usuarioId, \DateTimeInterface $dataConfirmacao): void;
}
