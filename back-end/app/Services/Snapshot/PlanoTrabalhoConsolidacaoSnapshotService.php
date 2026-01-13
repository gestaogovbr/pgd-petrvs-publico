<?php

namespace App\Services\Snapshot;

class PlanoTrabalhoConsolidacaoSnapshotService
{
    /** @var array<string, SnapshotCreatorInterface> */
    protected array $creators = [];

    public function __construct()
    {
        $this->creators = [
            'atividades' => new AtividadeSnapshotCreator(),
            'afastamentos' => new AfastamentoSnapshotCreator(),
            'ocorrencias' => new OcorrenciaSnapshotCreator(),
        ];
    }

    public function createSnapshots(array $dados, string $consolidacaoId, \DateTime $dataConclusao): void
    {
        /** @var SnapshotCreatorInterface $creator */
        foreach ($this->creators as $key => $creator) {
            assert($creator instanceof SnapshotCreatorInterface);
            if (isset($dados[$key])) {
                $ids = array_map(fn($item) => $item["id"], $dados[$key]);
                foreach ($ids as $id) {
                    $creator->create($id, $consolidacaoId, $dataConclusao);
                }
            }
        }
    }
}