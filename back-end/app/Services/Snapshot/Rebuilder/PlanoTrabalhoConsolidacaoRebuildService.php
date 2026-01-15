<?php

namespace App\Services\Snapshot\Rebuilder;

use App\Models\PlanoTrabalhoConsolidacao;
use Illuminate\Database\Eloquent\Collection;

class PlanoTrabalhoConsolidacaoRebuildService
{
    /** @var array<string, SnapshotRebuilderInterface> */
    private $rebuilders;

    public function __construct()
    {

        $this->rebuilders = [
            'atividades' => new AtividadeSnapshotRebuilder(),
            'afastamento' => new AfastamentoSnapshotRebuilder(),
            'ocorrencia' => new OcorrenciaSnapshotRebuilder(),
        ];
    }

    public function rebuildCollections(Collection $collection, PlanoTrabalhoConsolidacao $consolidacao, string $type): array
    {
        $rebuilder = $this->rebuilders[$type] ?? null;

        if (!$rebuilder instanceof BaseRebuilder) {
            throw new \InvalidArgumentException("Rebuilder não listado: {$type}");
        }

        return $rebuilder->rebuildCollection($collection, $consolidacao->id, $consolidacao->data_conclusao);
    }
}