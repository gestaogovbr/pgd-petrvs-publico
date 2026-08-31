<?php

declare(strict_types=1);

namespace App\Repository\MuralAvisoLeitura\Eloquent;

use App\Models\MuralAvisoLeitura;
use App\Repository\MuralAvisoLeitura\Contracts\MuralAvisoLeituraWriteRepositoryContract;

class EloquentMuralAvisoLeituraWriteRepository implements MuralAvisoLeituraWriteRepositoryContract
{
    public function __construct(
        private readonly MuralAvisoLeitura $model,
    ) {}

    public function upsert(string $usuarioId, \DateTimeInterface $dataConfirmacao): void
    {
        $this->model->newQuery()->updateOrCreate(
            ['usuario_id' => $usuarioId],
            ['data_confirmacao' => $dataConfirmacao, 'created_at' => now()],
        );
    }
}
