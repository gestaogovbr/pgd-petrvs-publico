<?php

namespace App\Services\Snapshot\Rebuilder;

use Illuminate\Database\Eloquent\Collection;

interface SnapshotRebuilderInterface
{
    public function rebuildFromSnapshot($model, string $consolidacaoId, $consolidacaoDataConclusao);
    public function rebuildCollection(Collection $collection, string $consolidacaoId, $consolidacaoDataConclusao);
}