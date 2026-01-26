<?php

namespace App\Services\Snapshot\Creator;

interface SnapshotCreatorInterface
{
    public function create(string $entityId, string $consolidacaoId, $dataConclusao): void;
}