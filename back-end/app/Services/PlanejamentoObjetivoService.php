<?php

namespace App\Services;

use App\Models\PlanejamentoObjetivo;
use Illuminate\Support\Facades\DB;

class PlanejamentoObjetivoService extends ServiceBase
{
    public function ordenar($objetivos) {
        $planejamentoId = null;
        usort($objetivos, function($a, $b) {
            return strcmp($a['id'], $b['id']);
        });
        DB::transaction(function () use ($objetivos, &$planejamentoId) {
            foreach ($objetivos as $obj) {
                $objetivo = PlanejamentoObjetivo::lockForUpdate()->find($obj['id']);
                if ($objetivo) {
                    if (!$planejamentoId) $planejamentoId = $objetivo->planejamento_id;
                    $objetivo->sequencia = $obj['sequencia'];
                    $objetivo->objetivo_pai_id = $obj['objetivo_pai_id'] ?? null;
                    $objetivo->objetivo_superior_id = $obj['objetivo_superior_id'] ?? null;
                    $objetivo->eixo_tematico_id = $obj['eixo_tematico_id'] ?? null;
                    $objetivo->save();
                }
            }

            if ($planejamentoId) {
                $this->planejamentoService->buildSequencia($planejamentoId);
            }
        });

        if ($planejamentoId) {
            return PlanejamentoObjetivo::with(['eixoTematico', 'objetivoPai', 'objetivoSuperior'])->where('planejamento_id', $planejamentoId)->get();
        }
        return [];
    }

}
