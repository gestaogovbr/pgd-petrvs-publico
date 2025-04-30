<?php

namespace App\Services;

use DB;

class CadeiaValorProcessoService extends ServiceBase
{
    public function extraStore($processo, $unidade, $action) {
        $this->cadeiaValorService->buildSequencia($processo->cadeia_valor_id);
    }

    public function extraUpdate($processo, $unidade) {
        $this->cadeiaValorService->buildSequencia($processo->cadeia_valor_id);
    }

    public function proxyRows($rows)
    {
        foreach ($rows as $row) {
            $resultado = DB::select(
                "SELECT fn_obter_processo_sequencia(?) AS sequencia",
                [$row->id]
            );

            $row->sequencia_completa = $resultado[0]->sequencia;

        }
        return $rows;
    }
}
