<?php

namespace App\Services\Snapshot\Creator;

use App\Models\Afastamento;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;

class AfastamentoSnapshotCreator implements SnapshotCreatorInterface
{
    public function create(string $entityId, string $consolidacaoId, $dataConclusao): void
    {
        $afastamento = Afastamento::find($entityId);
        if (!$afastamento) throw new \Exception("Afastamento não encontrado");
        $consolidacao = new PlanoTrabalhoConsolidacaoAfastamento([
            "data_conclusao" => $dataConclusao,
            "snapshot" => $afastamento->toArray(),
            "plano_trabalho_consolidacao_id" => $consolidacaoId,
            "afastamento_id" => $afastamento->id
        ]);
        $consolidacao->save();
    }
}