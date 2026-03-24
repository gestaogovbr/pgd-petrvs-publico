<?php

namespace App\Services;

use App\Enums\Atribuicao;
use App\Models\Usuario;
use App\Repository\RelatorioAgenteRepository;
use App\Services\ServiceBase;
use App\Services\UnidadeService;

class RelatorioAgenteService extends ServiceBase
{
    private RelatorioAgenteRepository $relatorioAgenteRepository;

    public function __construct()
    {
        parent::__construct();
        $this->relatorioAgenteRepository = app(RelatorioAgenteRepository::class);
    }

    public function query($data)
    {
        $result = $this->relatorioAgenteRepository->query($data);
        $rows = $result['rows'];

        $this->proxyRows($rows);

        return $result;
    }

    public function proxyQuery($query, &$data)
    {
        $where = $data["where"] ?? [];

        // remove a condições especificadas, pois tem tratamento diferenciado no proxyQuery
        $where = array_values(array_filter($where, function ($item) {
            return ($item[0] !== 'somente_vigentes')
                && ($item[0] !== 'incluir_unidades_subordinadas')
                && ($item[0] !== 'unidade_id');
        }));

        $somenteVigentes = $this->extractWhere($data, "somente_vigentes");
        $subordinadas = $this->extractWhere($data, "incluir_unidades_subordinadas");
        $unidadeId = $this->extractWhere($data, "unidade_id");
        $atribuicao = $this->extractWhere($data, "atribuicao");

        $unidadeIds = [];
        if (isset($unidadeId[2])) {
            $unidadeIds = [$unidadeId[2]];
        }

        if (isset($unidadeId[2]) && isset($subordinadas[2])) {
            $unidadeService = app(UnidadeService::class);
            $subordinadasIds = $unidadeService->subordinadas($unidadeId[2])->pluck('id')->toArray();
            $unidadeIds = array_merge($unidadeIds, $subordinadasIds);
        }

        if (!isset($atribuicao[2])) {
            $where[] = ['atribuicao', '==', Atribuicao::LOTADO->value];
        } else {
            $where[] = ['atribuicao', '==', $atribuicao[2]];
        }

        if (count($unidadeIds) > 0) {
            if (isset($atribuicao[2])) {
                $where[] = ['unidade_id', 'in', $unidadeIds];
            } else {
                $where[] = ['unidadeLotacao', 'in', $unidadeIds];
            }
        }

        $data["where"] = $where;
    }

    public function proxyRows(&$rows) {

        $tipos = Usuario::getTiposIndisponibilidades();

        foreach($rows as $row) {
            $row->tipoPedagio = $tipos[$row->tipo_pedagio] ?? '-';
            $row->perfil = str_replace('Perfil ', '', $row->perfil);
        }

        return $rows;
    }

}
