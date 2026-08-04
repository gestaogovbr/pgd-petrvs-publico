<?php

declare(strict_types=1);

namespace App\Repository\Feriado;

use App\Repository\Feriado\Contracts\FeriadoReadRepositoryContract;

class FeriadoRepository
{
    public function __construct(
        private readonly FeriadoReadRepositoryContract $readRepository,
    ) {}

    /**
     * @param string $entidadeId
     * @param string|null $cidadeId
     * @param string|null $uf
     * @return array{datas: array<string, string>, diasSemana: array<int, string>}
     */
    public function buscarFeriadosPorUnidade(string $entidadeId, ?string $cidadeId, ?string $uf): array
    {
        return $this->readRepository->buscarFeriadosPorUnidade($entidadeId, $cidadeId, $uf);
    }
}
