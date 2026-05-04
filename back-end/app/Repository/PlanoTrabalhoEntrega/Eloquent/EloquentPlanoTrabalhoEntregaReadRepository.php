<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalhoEntrega\Eloquent;

use App\Models\PlanoTrabalhoEntrega;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\PlanoTrabalhoEntrega\Contracts\PlanoTrabalhoEntregaReadRepositoryContract;
use App\V2\PlanoTrabalho\Entrega\DTOs\ResumoForcaTrabalhoDTO;
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

    public function existeVinculo(string $planoTrabalhoId, string $planoEntregaEntregaId): bool
    {
        return $this->query()
            ->where('plano_trabalho_id', $planoTrabalhoId)
            ->where('plano_entrega_entrega_id', $planoEntregaEntregaId)
            ->exists();
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
}