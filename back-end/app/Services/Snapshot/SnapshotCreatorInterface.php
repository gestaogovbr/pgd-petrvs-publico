<?php

namespace App\Services\Snapshot;

interface SnapshotCreatorInterface
{
    public function create(string $entityId, string $consolidacaoId, \DateTime $dataConclusao): void;
}