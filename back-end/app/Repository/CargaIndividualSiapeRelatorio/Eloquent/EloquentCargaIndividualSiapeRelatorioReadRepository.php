<?php

declare(strict_types=1);

namespace App\Repository\CargaIndividualSiapeRelatorio\Eloquent;

use App\Models\CargaIndividualSiapeRelatorio;
use App\Repository\CargaIndividualSiapeRelatorio\Contracts\CargaIndividualSiapeRelatorioReadRepositoryContract;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use Illuminate\Database\Eloquent\Collection;

/**
 * @extends AbstractEloquentReadRepository<CargaIndividualSiapeRelatorio>
 */
class EloquentCargaIndividualSiapeRelatorioReadRepository extends AbstractEloquentReadRepository implements CargaIndividualSiapeRelatorioReadRepositoryContract
{
    public function __construct(CargaIndividualSiapeRelatorio $model)
    {
        $this->model = $model;
    }

    public function findById(string|int $id): ?CargaIndividualSiapeRelatorio
    {
        $relatorio = $this->query()->find($id);

        return $relatorio instanceof CargaIndividualSiapeRelatorio ? $relatorio : null;
    }

    public function findByProcessamentoId(string $processamentoId): ?CargaIndividualSiapeRelatorio
    {
        $relatorio = $this->query()
            ->where('processamento_id', $processamentoId)
            ->first();

        return $relatorio instanceof CargaIndividualSiapeRelatorio ? $relatorio : null;
    }

    public function findRecent(?string $tipo = null, ?string $chave = null, int $limit = 20): Collection
    {
        $query = $this->query()->orderByDesc('processado_em');

        if ($tipo !== null && $tipo !== '') {
            $query->where('tipo', $tipo);
        }

        if ($chave !== null && $chave !== '') {
            $query->where('chave', $chave);
        }

        return $query->limit($limit)->get();
    }
}
