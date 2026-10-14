<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao;

use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoEntrega;
use App\Repository\PlanoTrabalhoConsolidacaoContribuicaoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoEntregaRepository;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Ramsey\Uuid\Uuid;

/**
 * Materializa (snapshot) as contribuições de execução de cada período avaliativo
 * a partir das entregas planejadas, no momento da ativação do Plano de Trabalho.
 *
 * A cópia é idempotente: períodos que já possuem contribuições são ignorados.
 */
class CopiadorContribuicoesExecucao
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
        private readonly PlanoTrabalhoEntregaRepository $entregaRepository,
        private readonly PlanoTrabalhoConsolidacaoContribuicaoRepository $contribuicaoRepository,
    ) {}

    public function copiar(PlanoTrabalho $plano): void
    {
        $consolidacoes = $this->consolidacaoRepository->findAllByPlanoTrabalhoId($plano->id);

        if ($consolidacoes->isEmpty()) {
            return;
        }

        $entregas = $this->entregaRepository->findByPlanoTrabalho($plano->id);

        if ($entregas->isEmpty()) {
            return;
        }

        $agora = Carbon::now();

        foreach ($consolidacoes as $consolidacao) {
            $this->copiarParaConsolidacao($consolidacao, $entregas, $agora);
        }
    }

    /**
     * @param Collection<int, PlanoTrabalhoEntrega> $entregas
     */
    private function copiarParaConsolidacao(
        PlanoTrabalhoConsolidacao $consolidacao,
        Collection $entregas,
        Carbon $agora,
    ): void {
        if ($this->contribuicaoRepository->findByConsolidacao($consolidacao->id)->isNotEmpty()) {
            return;
        }

        $linhas = $entregas
            ->map(fn (PlanoTrabalhoEntrega $entrega): array => $this->montarLinha($consolidacao, $entrega, $agora))
            ->all();

        $this->contribuicaoRepository->inserirEmLote($linhas);
    }

    /**
     * @return array<string, mixed>
     */
    private function montarLinha(
        PlanoTrabalhoConsolidacao $consolidacao,
        PlanoTrabalhoEntrega $entrega,
        Carbon $agora,
    ): array {
        return [
            'id' => (string) Uuid::uuid4(),
            'plano_trabalho_consolidacao_id' => $consolidacao->id,
            'plano_trabalho_entrega_id' => $entrega->id,
            'plano_entrega_entrega_id' => $entrega->plano_entrega_entrega_id,
            'orgao' => $entrega->orgao,
            'descricao' => null,
            'esforco_executado' => $entrega->forca_trabalho,
            'registrado_at' => null,
            'created_at' => $agora,
            'updated_at' => $agora,
        ];
    }
}
