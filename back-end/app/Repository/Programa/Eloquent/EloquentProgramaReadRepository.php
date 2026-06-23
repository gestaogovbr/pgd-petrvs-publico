<?php

declare(strict_types=1);

namespace App\Repository\Programa\Eloquent;

use App\Models\Programa;
use App\Models\TipoAvaliacaoNota;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Programa\Contracts\ProgramaReadRepositoryContract;
use App\Repository\Unidade\Contracts\UnidadeReadRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

/**
 * @extends AbstractEloquentReadRepository<Programa>
 */
class EloquentProgramaReadRepository extends AbstractEloquentReadRepository implements ProgramaReadRepositoryContract
{
    public function __construct(
        Programa $model,
        private readonly UnidadeReadRepositoryContract $unidadeReadRepository,
    ) {
        $this->model = $model;
    }

    public function findAllNotasAvaliacao(string $tipoAvaliacaoId): Collection
    {
        return TipoAvaliacaoNota::where('tipo_avaliacao_id', $tipoAvaliacaoId)
            ->orderBy('sequencia')
            ->get(['id', 'sequencia', 'nota', 'descricao', 'justifica']);
    }

    public function isVigenteParaUnidade(string $programaId, string $unidadeId): bool
    {
        $unidadesAscendentes = $this->unidadeReadRepository->linhaAscendente($unidadeId);

        return $this->query()
            ->where('id', $programaId)
            ->whereIn('unidade_id', $unidadesAscendentes)
            ->where('data_fim', '>=', now())
            ->exists();
    }
}