<?php

namespace App\Services\Snapshot\Creator;

class PlanoTrabalhoConsolidacaoSnapshotCreatorService
{
    /** @var array<string, SnapshotCreatorInterface> */
    protected array $creators = [];

    public function __construct($creators = null)
    {
        foreach ($creators as $key => $creator) {
            if (!$creator instanceof SnapshotCreatorInterface) throw new \TypeError();
            $this->creators[$key] = $creator;
        }
    }

    public function createSnapshots(array $dados, string $consolidacaoId, $dataConclusao): void
    {
        /** @var SnapshotCreatorInterface $creator */
        foreach ($this->creators as $key => $creator) {
            if (!array_key_exists($key, $dados)) continue; # Será que não deveria ser disparado um erro ?
            if (!is_array($dados[$key])) throw new \TypeError();
            $ids = array_map(fn($item) => $item["id"], $dados[$key]);
            foreach ($ids as $id) {
                $creator->create($id, $consolidacaoId, $dataConclusao);
            }
        }
    }
}