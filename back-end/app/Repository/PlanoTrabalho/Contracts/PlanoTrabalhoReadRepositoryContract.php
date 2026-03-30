<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalho\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface PlanoTrabalhoReadRepositoryContract
{
    public function getPlanosTrabalhoAssinatura(array $unidadesGerenciadasIds, array $unidadesSubordinadasIds, string $usuarioId): Collection;

    public function planosAtivos(string $usuarioId): Collection;

    public function planosAtivosPorData(string $dataInicial, string $dataFinal, string $usuarioId): Collection;

    public function buscarPlanosPendentes(string $usuarioId, string $planoTrabalhoId, string $dataLimite): Collection;
}
