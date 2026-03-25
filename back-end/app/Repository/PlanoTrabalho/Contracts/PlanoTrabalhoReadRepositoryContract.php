<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalho\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface PlanoTrabalhoReadRepositoryContract
{
    public function getPlanosTrabalhoAssinatura(array $unidadesGerenciadasIds, array $unidadesSubordinadasIds, string $usuarioId): Collection;

    public function planosAtivos(string $usuarioId): Collection;

    public function planosAtivosPorData(string $dataInicial, string $dataFinal, string $usuarioId): Collection;

    public function buscarPlanosPendentes(string $usuarioId, string $planoTrabalhoId, string $dataLimite): Collection;

    public function buscarPlanosListagem(
        ?string $dataInicio = null,
        ?string $dataFim = null,
        bool $vigentes = false,
        bool $arquivados = false,
        ?string $usuarioId = null,
        int $page = 1,
        int $perPage = 15
    ): LengthAwarePaginator;
}
