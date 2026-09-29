<?php

namespace App\Services;

use App\Enums\Atribuicao;
use App\Enums\PerfilEnum;
use App\Enums\StatusEnum;
use App\Models\Usuario;
use App\Repository\RelatorioAgenteRepository;
use App\Services\ServiceBase;
use Illuminate\Support\Collection;

class RelatorioAgenteService extends ServiceBase
{

    private RelatorioAgenteRepository $relatorioAgenteRepository;

    public function __construct()
    {
        parent::__construct();
        $this->relatorioAgenteRepository = app(RelatorioAgenteRepository::class);
    }

    /**
     * Consulta paginada para a geração do Excel em segundo plano.
     *
     * @param array{page?: int, limit?: int, where?: array, orderBy?: array} $data
     * @return array{count: int, rows: Collection, extra?: mixed}
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

    public function query($data)
    {
        $result = $this->relatorioAgenteRepository->query($data);
        $rows = $result['rows'];

        $this->proxyRows($rows);

        return $result;
    }

    /**
     * Perfil participante vê apenas seus próprios dados.
     *
     * @param array<int, mixed> $where
     * @return array<int, mixed>
     */
    public function aplicarFiltroParticipanteWhere(array $where, Usuario $usuario): array
    {
        $nivelPerfil = (int) ($usuario->perfil->nivel ?? PerfilEnum::PARTICIPANTE->value);

        if ($nivelPerfil >= PerfilEnum::PARTICIPANTE->value) {
            $where = array_values(array_filter($where, function ($condition) {
                return ! is_array($condition) || ! in_array($condition[0], ['unidade_id', 'incluir_unidades_subordinadas'], true);
            }));
            $where[] = ['usuario_id', '==', $usuario->id];
        }

        return $where;
    }

    public function proxyQuery($query, &$data)
    {
        $where = $data["where"] ?? [];

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

    public function proxyRows(&$rows)
    {
        $tipos = Usuario::getTiposIndisponibilidades();

        foreach ($rows as $row) {
            $row->tipoPedagio = $tipos[$row->tipo_pedagio] ?? '-';
            $row->perfil = str_replace('Perfil ', '', $row->perfil ?? '');
            $row->plano_trabalho_status_label = StatusEnum::tryFrom($row->plano_trabalho_status ?? '')?->label() ?? '-';
        }

        return $rows;
    }
}
