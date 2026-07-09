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
        /** @var SipecUnidade|null */
        return $this->query()->where('codigo', $codigo)->first();
    }

    public function chunkNaoProcessados(int $chunkSize, callable $callback): void
    {
        $this->query()
            ->where('processado', false)
            ->whereNull('deleted_at')
            ->chunkById($chunkSize, $callback);
    }

    public function getAllCodigos(): array
    {
        return $this->query()
            ->whereNull('deleted_at')
            ->pluck('codigo')
            ->all();
    }
}
