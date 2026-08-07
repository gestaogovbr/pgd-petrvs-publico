<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoEntrega\Eloquent;

use App\Models\PlanoTrabalhoEntrega;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanoTrabalhoEntrega\Contracts\PlanoTrabalhoEntregaReadRepositoryContract;
use App\V2\PlanoTrabalho\Entrega\DTOs\ResumoForcaTrabalhoDTO;
use App\V2\PlanoTrabalho\Entrega\DTOs\SomatoriosEsforcoDTO;
use Illuminate\Support\Facades\DB;

/**
 * @extends AbstractEloquentReadRepository<PlanoTrabalhoEntrega>
 */
class EloquentPlanoTrabalhoEntregaReadRepository extends AbstractEloquentReadRepository implements PlanoTrabalhoEntregaReadRepositoryContract
{
    public function __construct(PlanoTrabalhoEntrega $model)
    {
        $this->model = $model;
    }

    public function existeVinculo(string $planoTrabalhoId, string $planoEntregaEntregaId, ?string $excludeId = null): bool
    {
        $query = $this->query()
            ->where('plano_trabalho_id', $planoTrabalhoId)
            ->where('plano_entrega_entrega_id', $planoEntregaEntregaId);

        if ($excludeId !== null) {
            $query->where('id', '!=', $excludeId);
        }

        return $query->exists();
    }

    /**
     * @return list<string>
     */
    public function idsPlanosTrabalhoPorPlanoEntregaEntrega(string $planoEntregaEntregaId): array
    {
        return $this->query()
            ->where('plano_entrega_entrega_id', $planoEntregaEntregaId)
            ->distinct()
            ->pluck('plano_trabalho_id')
            ->all();
    }

    public function resumoForcaTrabalhoPorPlano(string $planoTrabalhoId): ResumoForcaTrabalhoDTO
    {
        $result = DB::selectOne(
            'SELECT COUNT(*) as count, COALESCE(SUM(forca_trabalho), 0) as somatorio FROM planos_trabalhos_entregas WHERE plano_trabalho_id = ? AND deleted_at IS NULL',
            [$planoTrabalhoId]
        );

        return new ResumoForcaTrabalhoDTO(
            quantidadeEntregas: (int) $result->count,
            somatorioForcaTrabalho: (float) $result->somatorio,
        );
    }

    public function somatoriosEsforcoProjetados(
        string $planoTrabalhoId,
        ?string $entregaIdEmEdicao,
        float $forcaTrabalhoProjeto,
        float $esforcoExecutadoProjeto,
    ): SomatoriosEsforcoDTO {
        if ($entregaIdEmEdicao === null) {
            $result = DB::selectOne(
                'SELECT
                    COALESCE(SUM(forca_trabalho), 0) + ? AS somatorio_planejado,
                    COALESCE(SUM(esforco_executado), 0) + ? AS somatorio_executado
                 FROM planos_trabalhos_entregas
                 WHERE plano_trabalho_id = ? AND deleted_at IS NULL',
                [$forcaTrabalhoProjeto, $esforcoExecutadoProjeto, $planoTrabalhoId]
            );
        } else {
            $result = DB::selectOne(
                'SELECT
                    COALESCE(SUM(CASE WHEN id = ? THEN ? ELSE forca_trabalho END), 0) AS somatorio_planejado,
                    COALESCE(SUM(CASE WHEN id = ? THEN ? ELSE esforco_executado END), 0) AS somatorio_executado
                 FROM planos_trabalhos_entregas
                 WHERE plano_trabalho_id = ? AND deleted_at IS NULL',
                [$entregaIdEmEdicao, $forcaTrabalhoProjeto, $entregaIdEmEdicao, $esforcoExecutadoProjeto, $planoTrabalhoId]
            );
        }

        return new SomatoriosEsforcoDTO(
            somatorioPlanejado: (float) ($result->somatorio_planejado ?? 0),
            somatorioExecutado: (float) ($result->somatorio_executado ?? 0),
        );
    }
}