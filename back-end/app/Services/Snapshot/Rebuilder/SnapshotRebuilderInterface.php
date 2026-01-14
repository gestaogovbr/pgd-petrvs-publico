<?php

namespace App\Services\Snapshot;

interface SnapshotRebuilderInterface
{
    public function rebuildFromSnapshot($model, $consolidacaoId, $consolidacaoDataConclusao);
}