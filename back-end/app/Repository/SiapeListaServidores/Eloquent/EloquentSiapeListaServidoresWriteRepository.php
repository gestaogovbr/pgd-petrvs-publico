<?php

declare(strict_types=1);

namespace App\Repository\SiapeListaServidores\Eloquent;

use App\Models\SiapeListaServidores;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\SiapeListaServidores\Contracts\SiapeListaServidoresWriteRepositoryContract;
use Illuminate\Support\Facades\DB;

/** @extends AbstractEloquentWriteRepository<SiapeListaServidores> */
final class EloquentSiapeListaServidoresWriteRepository extends AbstractEloquentWriteRepository implements SiapeListaServidoresWriteRepositoryContract
{
    public function __construct(SiapeListaServidores $model)
    {
        $this->model = $model;
    }

    public function markProcessados(array $ids): int
    {
        return $this->model->newQuery()->whereIn('id', $ids)->update([
            'processado' => true,
            'updated_at' => now(),
        ]);
    }

    public function replaceSnapshot(array $rows, int $chunkSize): void
    {
        DB::transaction(function () use ($rows, $chunkSize): void {
            $this->model->newQuery()->forceDelete();

            foreach (array_chunk($rows, $chunkSize) as $chunk) {
                $this->model->newQuery()->insert($chunk);
            }
        });
    }
}
