<?php

declare(strict_types=1);

namespace App\Repository\Documento\Eloquent;

use App\Models\Documento;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Documento\Contracts\DocumentoReadRepositoryContract;
use Illuminate\Database\Eloquent\Model;

/**
 * @extends AbstractEloquentReadRepository<Documento>
 */
class EloquentDocumentoReadRepository extends AbstractEloquentReadRepository implements DocumentoReadRepositoryContract
{
    public function __construct(Documento $model)
    {
        $this->model = $model;
    }

    public function findTcrByPlanoTrabalhoId(string $planoTrabalhoId): ?Model
    {
        return $this->model->newQuery()
            ->where('plano_trabalho_id', $planoTrabalhoId)
            ->where('especie', 'TCR')
            ->latest('created_at')
            ->first();
    }
}
