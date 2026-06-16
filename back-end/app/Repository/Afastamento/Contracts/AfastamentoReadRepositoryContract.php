<?php

declare(strict_types=1);

namespace App\Repository\Afastamento\Contracts;

use App\DTOs\ListResult;
use App\Models\Afastamento;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Collection;

interface AfastamentoReadRepositoryContract
{
    public function findById(string $id): ?Afastamento;

    /**
     * @param list<string> $unidadeIds
     */
    public function usuarioPossuiVinculoEmUnidades(string $usuarioId, array $unidadeIds): bool;

    /**
     * @return ListResult
     */
    public function findAll($data): ListResult;

    /**
     * @param string[] $codigosExcluidos
     */
    public function findAfastamentosParaDispensa(string $usuarioId, CarbonPeriod $vigencia, array $codigosExcluidos): Collection;


    public function buscarOcorrenciasListagem(\App\V2\Ocorrencia\DTOs\OcorrenciaIndexDTO $dto): \Illuminate\Contracts\Pagination\LengthAwarePaginator;
}
