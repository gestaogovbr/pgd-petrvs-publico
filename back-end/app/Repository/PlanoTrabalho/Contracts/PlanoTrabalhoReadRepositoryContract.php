<?php

declare(strict_types=1);

namespace App\Repository\PlanoTrabalho\Contracts;

use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\PlanoTrabalho;
use Illuminate\Database\Eloquent\Collection;

interface PlanoTrabalhoReadRepositoryContract
{
    public function findOneParaEnvio(string|int $id): ?PlanoTrabalho;

    public function findWithAtividades(string|int $id): ?PlanoTrabalho;

    public function getPlanosTrabalhoAssinatura(array $unidadesGerenciadasIds, array $unidadesSubordinadasIds, string $usuarioId): Collection;

    public function planosAtivos(string $usuarioId): Collection;

    public function planosAtivosPorData(string $dataInicial, string $dataFinal, string $usuarioId): Collection;

    public function buscarPlanosPendentes(string $usuarioId, string $planoTrabalhoId, string $dataLimite): Collection;

    public function findAllParaEnvio(int $chunkSize, callable $onChunk): void;

    public function chunkEnviosPendentes(int $size, callable $callback): void;
    public function buscarPlanosListagem(PlanoTrabalhoIndexDTO $filtro): LengthAwarePaginator;

    public function existeConflitoPeriodo(string $usuarioId, string $dataInicio, string $dataFim): bool;
    public function existeConflitoPeriodoExcluindo(string $usuarioId, string $dataInicio, string $dataFim, string $excluirPlanoId): bool;

    public function findByIdComRelacoes(string $id): ?PlanoTrabalho;

    public function findById(string|int $id): ?PlanoTrabalho;

    public function possuiAssinatura(string $planoId): bool;
}
