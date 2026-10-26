<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;

/**
 * Migração de dados ADITIVA e idempotente: materializa as contribuições de execução
 * por período avaliativo a partir do planejamento existente.
 *
 * Para cada consolidação (período) de cada PT, cria uma linha-espelho por entrega
 * planejada, copiando:
 *  - esforco_executado: direto de planos_trabalhos_entregas.esforco_executado (fiel ao
 *    que a tela exibe hoje — mesmo valor em todos os períodos);
 *  - descricao / registrado_at: casados via atividades (consolidação + entrega), quando
 *    houver registro de execução; caso contrário, descricao null e registrado_at null.
 *
 * Não remove nada. Não reclassifica contribuições criadas pós-#2542 (ficam como
 * planejamento). Idempotente: pula pares (consolidação, entrega) já existentes.
 */
return new class extends Migration
{
    private const CHUNK = 500;

    public function up(): void
    {
        $agora = Carbon::now()->toDateTimeString();

        DB::table('planos_trabalhos_consolidacoes')
            ->whereNull('deleted_at')
            ->orderBy('id')
            ->chunkById(self::CHUNK, function ($consolidacoes) use ($agora): void {
                foreach ($consolidacoes as $consolidacao) {
                    $this->materializarConsolidacao($consolidacao, $agora);
                }
            });
    }

    private function materializarConsolidacao(object $consolidacao, string $agora): void
    {
        $entregas = DB::table('planos_trabalhos_entregas')
            ->where('plano_trabalho_id', $consolidacao->plano_trabalho_id)
            ->whereNull('deleted_at')
            ->get();

        if ($entregas->isEmpty()) {
            return;
        }

        $existentes = DB::table('planos_trabalhos_consolidacoes_contribuicoes')
            ->where('plano_trabalho_consolidacao_id', $consolidacao->id)
            ->pluck('plano_trabalho_entrega_id')
            ->filter()
            ->all();
        $jaMaterializadas = array_flip($existentes);

        $atividadesPorEntrega = $this->atividadesPorEntrega($consolidacao->id);

        $linhas = [];

        foreach ($entregas as $entrega) {
            if (isset($jaMaterializadas[$entrega->id])) {
                continue;
            }

            $atividade = $atividadesPorEntrega[$entrega->id] ?? null;

            $linhas[] = [
                'id' => (string) Uuid::uuid4(),
                'plano_trabalho_consolidacao_id' => $consolidacao->id,
                'plano_trabalho_entrega_id' => $entrega->id,
                'plano_entrega_entrega_id' => $entrega->plano_entrega_entrega_id,
                'orgao' => $entrega->orgao,
                'descricao' => $atividade->descricao ?? null,
                'esforco_executado' => $entrega->esforco_executado,
                'registrado_at' => $atividade->created_at ?? null,
                'created_at' => $agora,
                'updated_at' => $agora,
            ];
        }

        if ($linhas !== []) {
            DB::table('planos_trabalhos_consolidacoes_contribuicoes')->insert($linhas);
        }
    }

    /**
     * Carrega, em uma única consulta, a atividade mais antiga de cada entrega no período,
     * indexada por plano_trabalho_entrega_id. Evita N+1 (uma consulta por entrega).
     *
     * @return array<string, object>
     */
    private function atividadesPorEntrega(string $consolidacaoId): array
    {
        $atividades = DB::table('atividades')
            ->where('plano_trabalho_consolidacao_id', $consolidacaoId)
            ->whereNull('deleted_at')
            ->whereNotNull('plano_trabalho_entrega_id')
            ->orderBy('created_at')
            ->get(['plano_trabalho_entrega_id', 'descricao', 'created_at']);

        $porEntrega = [];
        foreach ($atividades as $atividade) {
            // orderBy created_at asc + primeira ocorrência preservada = a mais antiga
            if (!isset($porEntrega[$atividade->plano_trabalho_entrega_id])) {
                $porEntrega[$atividade->plano_trabalho_entrega_id] = $atividade;
            }
        }

        return $porEntrega;
    }

    public function down(): void
    {
        // Migração puramente aditiva de dados: sem reversão automática.
        // A reversão de esquema é feita pela migration da própria tabela.
    }
};
