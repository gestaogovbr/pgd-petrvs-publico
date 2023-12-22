<?php
namespace App\Services\PGD;

use Illuminate\Support\Facades\Http;
use App\Models\OrgaoCentralExportacao;


class ExportacaoService
{

    public function registrarExportacao($tipo, $dados, $corpo)
    {
        $exportacao = new OrgaoCentralExportacao([
            'data_exportacao' => now(),
            'tipo' => $tipo,
            'parametros' => $dados,
            'versao' => '1.0.0',
            'corpo' => $corpo
        ]);

        $exportacao->save();
        return $exportacao;
    }

    public function atualizarRetorno(OrgaoCentralExportacao $exportacao, $retorno)
    {
        $exportacao->retorno = $retorno;
        $exportacao->save();
    }
}

