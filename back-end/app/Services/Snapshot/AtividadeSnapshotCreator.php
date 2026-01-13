<?

namespace App\Services\Snapshot;

use App\Models\Atividade;
use App\Models\PlanoTrabalhoConsolidacaoAtividade;

class AtividadeSnapshotCreator implements SnapshotCreatorInterface
{
    public function create(string $entityId, string $consolidacaoId, \DateTime $dataConclusao): void
    {
        $atividade = Atividade::find($entityId);
        $consolidacao = new PlanoTrabalhoConsolidacaoAtividade([
            "data_conclusao" => $dataConclusao,
            "snapshot" => $atividade->toArray(),
            "plano_trabalho_consolidacao_id" => $consolidacaoId,
            "atividade_id" => $atividade->id
        ]);
        $consolidacao->save();
    }
}