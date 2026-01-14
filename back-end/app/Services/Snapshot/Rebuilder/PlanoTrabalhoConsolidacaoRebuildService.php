<?php

namespace App\Services\Snapshot;

use App\Models\PlanoTrabalhoConsolidacao;
use App\Services\AtividadeService;

class PlanoTrabalhoConsolidacaoRebuildService {
    /** @var array<string, SnapshotRebuilderInterface> */
    private $rebuilders;

    private AtividadeService $atividadeService;

    public function __construct() {
        $this->atividadeService = new AtividadeService();

        $this->rebuilders = [
            'atividades' => new AtividadeSnapshotRebuilder(),
            'afastamento' => new AfastamentoSnapshotRebuilder(),
            'ocorrencia' => new OcorrenciaSnapshotRebuilder(),
        ];
    }

    public function rebuildCollection($collection, PlanoTrabalhoConsolidacao $consolidacao, string $type): array
    {
        $rebuilder = $this->rebuilders[$type] ?? null;    
    
        if (!isset($this->rebuilders[$type])) {
            throw new \InvalidArgumentException("Rebuilder não implementado: {$type}");
        }

        $rebuilt = array_map(fn($item) => 
            $rebuilder->rebuildFromSnapshot($item->toArray(), $consolidacao->id, $consolidacao->data_c), 
            $collection->all()
        );

        if ($type === 'atividade') { // Será que há como deixar isso só dentro dentro da classe de AtividadeSnapshotRebuilder?
            $rebuilt = array_map(fn($atividade) => 
                array_merge($atividade, ["metadados" => $this->atividadeService->metadados($atividade)]), 
                $rebuilt
            );
        }

        return $rebuilt;
    }
}