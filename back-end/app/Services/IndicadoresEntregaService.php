<?php

namespace App\Services;

use App\Services\ServiceBase;

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

        $indicadoresEntregaDesempenhoPEService = new IndicadoresEntregaDesempenhoPEService();
        $mediaAvaliacoesPE = $indicadoresEntregaDesempenhoPEService->query($data);

        $indicadoresEntregaDesempenhoPTService = new IndicadoresEntregaDesempenhoPTService();
        $mediaAvaliacoesPT = $indicadoresEntregaDesempenhoPTService->query($data);

        return [
            'count' => 0,
            'rows' => [
                [
                    'entregas' => $entregas,
                    'avaliacoes' => $avaliacoes,
                    'desempenho' => [
                        'entregas'  => $mediaAvaliacoesPE[0]->media ?? 0,
                        'trabalhos' => $mediaAvaliacoesPT[0]->media ?? 0
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
