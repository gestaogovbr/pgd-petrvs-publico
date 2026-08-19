<?php

declare(strict_types=1);

namespace App\Repository\Feriado\Contracts;

interface FeriadoReadRepositoryContract
{
    /**
     * Busca feriados aplicáveis a uma unidade, separando por tipo (datas e dias da semana).
     *
     * @param string $entidadeId
     * @param string|null $cidadeId
     * @param string|null $uf
     * @return array{datas: array<string, string>, diasSemana: array<int, string>}
     */
    public function buscarFeriadosPorUnidade(string $entidadeId, ?string $cidadeId, ?string $uf): array;
}
