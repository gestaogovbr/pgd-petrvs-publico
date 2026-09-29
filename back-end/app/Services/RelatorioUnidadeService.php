<?php

namespace App\Services;

use App\Services\ServiceBase;
use Illuminate\Support\Collection;

class RelatorioUnidadeService extends ServiceBase
{
    public function __construct()
    {
        parent::__construct("App\Models\ViewRelatorioUnidade");
    }

    /**
     * Consulta paginada para a geração do Excel em segundo plano.
     *
     * @param array{page?: int, limit?: int, where?: array, orderBy?: array} $data
     * @return array{count: int, rows: Collection, extra: mixed}
     */
    public function queryForExport(array $data, ?int $knownCount = null): array
    {
        $result = $this->query([
            'page' => max(1, (int) ($data['page'] ?? 1)),
            'limit' => max(1, (int) ($data['limit'] ?? 1000)),
            'where' => $data['where'] ?? [],
            'orderBy' => $data['orderBy'] ?? [],
        ]);

        if ($knownCount !== null) {
            $result['count'] = $knownCount;
        }

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

        $unidadeIds = [$unidadeId[2]];

        if (isset($subordinadas[2])) {
            $unidadeService = app(UnidadeService::class);
            $subordinadasIds = $unidadeService->subordinadas($unidadeId[2])->pluck('id')->toArray();
            $unidadeIds = array_merge($unidadeIds, $subordinadasIds);
        }

        $where[] = ['unidade_id', 'in', $unidadeIds];

        $data["where"] = $where;
    }

    public function proxyRows(&$rows) {

        foreach($rows as $row) {
        }

        return $rows;
    }
}
