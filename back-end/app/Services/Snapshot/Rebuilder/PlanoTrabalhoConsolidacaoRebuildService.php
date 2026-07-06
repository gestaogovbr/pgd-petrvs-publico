<?php

namespace App\Services\Snapshot\Rebuilder;

use App\Models\PlanoTrabalhoConsolidacao;
use Illuminate\Database\Eloquent\Collection;

/**
 * @deprecated #2270 - Será eliminado com a remoção da tabela pivot
 */
class PlanoTrabalhoConsolidacaoRebuildService
{
    /** @var array<string, SnapshotRebuilderInterface> */
    private $rebuilders;

    public function __construct($rebuilders = null)
    {
        foreach ($rebuilders as $key => $rebuilder) {
            if (!$rebuilder instanceof BaseRebuilder) throw new \TypeError();
            $this->rebuilders[$key] = $rebuilder;
        }
    }

    public function rebuildCollections(Collection $collection, PlanoTrabalhoConsolidacao $consolidacao, string $type): array
    {
        $rebuilder = $this->rebuilders[$type] ?? null;

        if (!$rebuilder instanceof BaseRebuilder) throw new \TypeError("Rebuilder não listado: {$type}");

        return $rebuilder->rebuildCollection($collection, $consolidacao->id, $consolidacao->data_conclusao);
    }
}
