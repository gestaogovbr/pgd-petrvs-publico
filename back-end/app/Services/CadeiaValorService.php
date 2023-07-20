<?php

namespace App\Services;

use App\Models\CadeiaValorProcesso;
use App\Models\Planejamento;

class CadeiaValorService extends ServiceBase
{
    public function buildSequencia($id) {
        $recursivo = function($processos) use ($id, &$recursivo) {
            $sequencia = 1;
            foreach ($processos as $processo) {
                if($processo->sequencia != $sequencia) {
                    $processo->sequencia = $sequencia;
                    $processo->save();
                }
                $lista = CadeiaValorProcesso::where("cadeia_valor_id", $id)->where("processo_pai_id", $processo->id)
                    ->orderBy("sequencia")->orderBy("updated_at", "desc")->get();
                $recursivo($lista);
                $sequencia++;
            }
        };
        $raiz = CadeiaValorProcesso::where("cadeia_valor_id", $id)->whereNull("processo_pai_id")
            ->orderBy("sequencia")->orderBy("updated_at", "desc")->get();
        $recursivo($raiz);
    }

    public function extraStore($cadeia, $unidade, $action) {
        $this->buildSequencia($cadeia->id);
    }

    public function extraUpdate($cadeia, $unidade) {
        $this->buildSequencia($cadeia->id);
    }

}
