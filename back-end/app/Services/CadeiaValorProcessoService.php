<?php

namespace App\Services;

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
            $row->sequencia_completa = $row->getSequenciaCompleta();
        }

        return $rows;
    }
}
