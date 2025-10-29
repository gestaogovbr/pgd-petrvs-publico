<?php

namespace App\Services;

use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;

class IndicadoresEntregaService extends ServiceBase
{
    protected $unidadeId;
    protected $unidadeIds;
    protected $subordinadas;
    protected $unidadeService;

    public function __construct() {
        $this->unidadeService = new UnidadeService();
    }

    public function query($data)
    {
        $indicadoresEntregaEntregaService = new IndicadoresEntregaEntregaService();
        $entregas = $indicadoresEntregaEntregaService->query($data);

        $indicadoresEntregaAvaliacaoService = new IndicadoresEntregaAvaliacaoService();
        $avaliacoes = $indicadoresEntregaAvaliacaoService->query($data);

        $indicadoresHorasPEAvaliacaoService = new IndicadoresEntregaHorasPEService();
        $mediaHorasPE = $indicadoresHorasPEAvaliacaoService->query($data);

        $indicadoresHorasPTAvaliacaoService = new IndicadoresEntregaHorasPTService();
        $mediaHorasPT = $indicadoresHorasPTAvaliacaoService->query($data);

        return [
            'count' => 0,
            'rows' => [
                [
                    'entregas' => $entregas,
                    'avaliacoes' => $avaliacoes,
                    'horas' => [
                        'entregas'  => $mediaHorasPE[0]->media ?? 0,
                        'trabalhos' => $mediaHorasPT[0]->media ?? 0
                    ],
                ]
            ]
        ];
    }

    protected function prepareQuery($data) {
        $this->unidadeId = $this->extractWhere($data, "unidade_id");
        $this->subordinadas = $this->extractWhere($data, "incluir_unidades_subordinadas");

        if (isset($this->unidadeId[2])) {
            $unidadeIds = [$this->unidadeId[2]];

            if (isset($this->subordinadas[2])) {
                $subordinadasIds = $this->unidadeService->subordinadas(
                    $this->unidadeId[2]
                )->pluck('id')->toArray();
                $unidadeIds = array_merge($unidadeIds, $subordinadasIds);
            }

            $this->unidadeIds = implode(",",
                array_map(function($item) {
                    return "'".$item."'";
                }, $unidadeIds)
            );
        }
    }
}
