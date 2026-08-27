<?php

namespace App\Services;

use App\Repository\RelatorioLacunaPlanoTrabalho\Contracts\RelatorioLacunaPlanoTrabalhoReadRepositoryContract;

class RelatorioLacunaPlanoTrabalhoService
{
    private RelatorioLacunaPlanoTrabalhoReadRepositoryContract $repository;

    public function __construct()
    {
        $this->repository = app(RelatorioLacunaPlanoTrabalhoReadRepositoryContract::class);
    }

    /**
     * @param  array{where?: array, page?: int|string|null, limit?: int|string|null, orderBy?: array}  $data
     * @return array{count: int, rows: list<object|array>}
     */
    public function query(array $data): array
    {
        return $this->repository->query($data);
    }
}
