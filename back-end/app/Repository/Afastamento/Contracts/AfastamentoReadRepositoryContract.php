<?php

declare(strict_types=1);

namespace App\Repository\Afastamento\Contracts;

use App\DTOs\ListResult;
use App\Models\Afastamento;
use App\V2\Ocorrencia\DTOs\OcorrenciaIndexDTO;
use Carbon\CarbonPeriod;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
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

    public function findAfastamentosParaDispensa(string $usuarioId, CarbonPeriod $vigencia): Collection;


    public function buscarOcorrenciasListagem(OcorrenciaIndexDTO $dto): LengthAwarePaginator;

    /**
     * Busca afastamentos agrupados por usuário para uma lista de usuários.
     *
     * @param array<string> $usuarioIds
     * @return array<string, array<array{data_inicio: string, data_fim: string}>>
     */
    public function buscarAfastamentosPorUsuarios(array $usuarioIds): array;
}
