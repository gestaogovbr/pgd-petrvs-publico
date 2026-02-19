<?php

namespace App\Services\Snapshot\Rebuilder;

use App\Services\Snapshot\Rebuilder\SnapshotRebuilderInterface;
use Illuminate\Database\Eloquent\Collection;

class BaseRebuilder implements SnapshotRebuilderInterface
{
    public function rebuildFromSnapshot($model, $consolidacaoId, $consolidacaoDataConclusao)
    {
        throw new \Exception('Not implemented');
    }
    
    public function rebuildCollection(Collection $collection, $consolidacaoId, $consolidacaoDataConclusao)
    {
        return array_map(
            fn($item) =>
            $this->rebuildFromSnapshot($item, $consolidacaoId, $consolidacaoDataConclusao),
            $collection->all()
        );
    }
}
