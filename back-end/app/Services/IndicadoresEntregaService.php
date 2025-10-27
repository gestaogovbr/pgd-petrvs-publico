<?php

namespace App\Services;

use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

class IndicadoresEntregaService extends ServiceBase
{
    private $unidadeId;
    private $unidadeIds;
    private $subordinadas;
    private $unidadeService;

    public function __construct() {}

    public function query($data)
    {
        $indicadoresEntregaEntregaService = new IndicadoresEntregaEntregaService();
        $entregas = $indicadoresEntregaEntregaService->query($data);

        $indicadoresEntregaAvaliacaoService = new IndicadoresEntregaAvaliacaoService();
        $avaliacoes = $indicadoresEntregaAvaliacaoService->query($data);

        return [
            'count' => 0,
            'rows' => [
                [
                    'entregas' => $entregas,
                    'avaliacoes' => $avaliacoes
                ]
            ]
        ];
    }
}
