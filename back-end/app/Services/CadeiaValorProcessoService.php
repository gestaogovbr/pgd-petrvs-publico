<?php

namespace App\Services;

use App\Models\CadeiaValorProcesso;
use Illuminate\Support\Facades\DB;
use App\Services\CadeiaValorService;
/**
 * @property CadeiaValorService $cadeiaValorService
 */
class CadeiaValorProcessoService extends ServiceBase
{
    public function ordenar($processos) {
        $cadeiaValorId = null;
        usort($processos, function($a, $b) {
            return strcmp($a['id'], $b['id']);
        });
        DB::transaction(function () use ($processos, &$cadeiaValorId) {
            foreach ($processos as $proc) {
                $processo = CadeiaValorProcesso::lockForUpdate()->find($proc['id']);
                if ($processo) {
                    if (!$cadeiaValorId) $cadeiaValorId = $processo->cadeia_valor_id;
                    $processo->sequencia = $proc['sequencia'];
                    $processo->processo_pai_id = $proc['processo_pai_id'] ?? null;
                    $processo->save();
                }
            }

            if ($cadeiaValorId) {
                $this->cadeiaValorService->buildSequencia($cadeiaValorId);
            }
        });

        if ($cadeiaValorId) {
            return CadeiaValorProcesso::where('cadeia_valor_id', $cadeiaValorId)->get();
        }
        return [];
    }

    public function extraDestroy($processo, $unidade = null) {
        $cadeiaValorId = $processo->cadeia_valor_id;
        
        $this->removerFilhosRecursivo($processo->id);
        
        $this->cadeiaValorService->buildSequencia($cadeiaValorId);
    }

    private function removerFilhosRecursivo($processoId) {
        $filhos = CadeiaValorProcesso::where('processo_pai_id', $processoId)->get();
        foreach ($filhos as $filho) {
            $this->removerFilhosRecursivo($filho->id);
            $filho->delete();
        }
    }

    public function proxyRows($rows)
    {
        foreach ($rows as $row) {
            $row->sequencia_completa = $row->getSequenciaCompleta();
        }

        return $rows;
    }
}
