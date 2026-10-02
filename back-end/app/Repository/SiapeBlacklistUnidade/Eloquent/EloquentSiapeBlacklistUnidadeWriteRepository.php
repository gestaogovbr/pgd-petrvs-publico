<?php

declare(strict_types=1);

namespace App\Repository\SiapeBlacklistUnidade\Eloquent;

use App\Models\SiapeBlacklistUnidade;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\SiapeBlacklistUnidade\Contracts\SiapeBlacklistUnidadeWriteRepositoryContract;
use Illuminate\Support\Str;

/**
 * @extends AbstractEloquentWriteRepository<SiapeBlacklistUnidade>
 */
class EloquentSiapeBlacklistUnidadeWriteRepository extends AbstractEloquentWriteRepository implements SiapeBlacklistUnidadeWriteRepositoryContract
{
    public function __construct(SiapeBlacklistUnidade $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes): SiapeBlacklistUnidade
    {
        /** @var SiapeBlacklistUnidade $model */
        $model = parent::create($attributes);

        return $model;
    }

    public function update(string|int $id, array $attributes): ?SiapeBlacklistUnidade
    {
        /** @var SiapeBlacklistUnidade|null $model */
        $model = parent::update($id, $attributes);

        return $model;
    }

    public function restoreAsNovaPendencia(SiapeBlacklistUnidade $blacklist, string $response): SiapeBlacklistUnidade
    {
        $blacklist->restore();
        $blacklist->inativado = 0;
        $blacklist->response = $response;
        $blacklist->created_at = now();
        $blacklist->updated_at = now();
        $blacklist->save();

        return $blacklist;
    }

    public function firstOrCreate(string $codigoOrgao, string $codigo, string $response): SiapeBlacklistUnidade
    {
        return $this->model->newQuery()->firstOrCreate(
            ['codigo_orgao' => $codigoOrgao, 'codigo' => $codigo],
            ['id' => (string) Str::uuid(), 'response' => $response]
        );
    }
}
