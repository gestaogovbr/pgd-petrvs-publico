<?php

declare(strict_types=1);

namespace App\Repository\SipecUnidade\Eloquent;

use App\Models\SipecUnidade;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\SipecUnidade\Contracts\SipecUnidadeReadRepositoryContract;
use Illuminate\Database\Eloquent\Model;

final class EloquentSipecUnidadeReadRepository extends AbstractEloquentReadRepository implements SipecUnidadeReadRepositoryContract
{
    public function __construct(SipecUnidade $model)
    {
        $this->model = $model;
    }

    /**
     * @return SipecUnidade|null
     */
    public function findByCodigo(string $codigo): ?Model
    {
        return $this->query()->where('codigo', $codigo)->first();
    }
}
