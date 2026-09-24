<?php

declare(strict_types=1);

namespace App\Repository\CadeiaValor\Eloquent;

use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalEsforcoSupport;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class EloquentCadeiaValorReadRepository implements CadeiaValorReadRepositoryContract
{
    public function findCadeiaValor(string $id): ?CadeiaValor
    {
        return CadeiaValor::find($id);
    }

    public function findProcesso(string $processoId, string $cadeiaValorId): ?CadeiaValorProcesso
    {
        return CadeiaValorProcesso::where('id', $processoId)
            ->where('cadeia_valor_id', $cadeiaValorId)
            ->first();
    }

    public function listarProcessosPorCadeia(string $cadeiaValorId): Collection
    {
        return CadeiaValorProcesso::where('cadeia_valor_id', $cadeiaValorId)
            ->whereNull('deleted_at')
            ->with('tipoElemento')
            ->get();
    }

    public function buscarVinculosCrossCadeia(array $processoIds, string $cadeiaValorIdAtual): array
    {
        if (empty($processoIds)) {
            return [];
        }

        return DB::table('planos_entregas_entregas_processos as peep1')
            ->join('planos_entregas_entregas_processos as peep2', 'peep2.entrega_id', '=', 'peep1.entrega_id')
            ->join('cadeias_valores_processos as cvp', 'cvp.id', '=', 'peep2.cadeia_processo_id')
            ->join('cadeias_valores as cv', 'cv.id', '=', 'cvp.cadeia_valor_id')
            ->whereIn('peep1.cadeia_processo_id', $processoIds)
            ->where('cvp.cadeia_valor_id', '!=', $cadeiaValorIdAtual)
            ->whereNull('peep1.deleted_at')
            ->whereNull('peep2.deleted_at')
            ->whereNull('cvp.deleted_at')
            ->whereNull('cv.deleted_at')
            ->select([
                'peep1.cadeia_processo_id as processo_origem_id',
                'cvp.id as processo_id',
                'cvp.nome as processo_nome',
                'cv.id as cadeia_valor_id',
                'cv.nome as cadeia_valor_nome',
            ])
            ->distinct()
            ->get()
            ->all();
    }

    public function contarVinculosPorProcesso(array $processoIds): array
    {
        if (empty($processoIds)) {
            return [];
        }

        return DB::table('planos_entregas_entregas_processos')
            ->whereIn('cadeia_processo_id', $processoIds)
            ->whereNull('deleted_at')
            ->groupBy('cadeia_processo_id')
            ->pluck(DB::raw('COUNT(*)'), 'cadeia_processo_id')
            ->all();
    }

    public function buscarDadosGeraisPainel(string $processoId, string $cadeiaValorId): \stdClass
    {
        $processo = $this->findProcesso($processoId, $cadeiaValorId);

        $nivel = 1;
        $atual = $processo;
        while ($atual !== null && $atual->processo_pai_id !== null) {
            $pai = $atual->processoPai;
            if (!$pai instanceof CadeiaValorProcesso) {
                break;
            }
            $nivel++;
            $atual = $pai;
        }

        return (object) [
            'processo_id' => $processoId,
            'processo_nome' => $processo?->nome ?? '',
            'tipo_elemento_nome' => $processo?->tipoElemento?->nome ?? '',
            'nivel' => $nivel,
        ];
    }

    public function coletarIdsFilhosRecursivo(string $processoId): array
    {
        $rows = DB::select(<<<SQL
            WITH RECURSIVE arvore AS (
                SELECT id
                FROM cadeias_valores_processos
                WHERE id = ?
                  AND deleted_at IS NULL

                UNION ALL

                SELECT cvp.id
                FROM cadeias_valores_processos cvp
                INNER JOIN arvore a ON cvp.processo_pai_id = a.id
                WHERE cvp.deleted_at IS NULL
            )
            SELECT id FROM arvore
        SQL, [$processoId]);

        return array_map(static fn (\stdClass $row): string => (string) $row->id, $rows);
    }
}
