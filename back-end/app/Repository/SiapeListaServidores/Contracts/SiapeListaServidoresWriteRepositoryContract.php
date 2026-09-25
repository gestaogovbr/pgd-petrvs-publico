<?php

declare(strict_types=1);

namespace App\Repository\SiapeListaServidores\Contracts;

interface SiapeListaServidoresWriteRepositoryContract
{
    /** @param list<string> $ids */
    public function markProcessados(array $ids): int;

    /** @param array<int, array<string, mixed>> $rows */
    public function replaceSnapshot(array $rows, int $chunkSize): void;
}
