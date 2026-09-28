<?php

declare(strict_types=1);

namespace App\Repository\PlanoEntrega\Contracts;

use App\Models\PlanoEntrega;
use App\V2\PlanoEntrega\DTOs\AvaliacaoPendentePEBuscaDTO;
use App\V2\PlanoEntrega\DTOs\HomologacaoPendentePEBuscaDTO;
use App\V2\PlanoEntrega\DTOs\RegistroExecucaoAtrasoPEBuscaDTO;
use App\V2\PlanoEntrega\DTOs\VigentesPEBuscaDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface PlanoEntregaReadRepositoryContract
{
    public function findById(string|int $id): ?PlanoEntrega;

    public function findOneParaEnvio(string|int $id): ?PlanoEntrega;

    public function findAllParaEnvio(int $chunkSize, callable $onChunk): void;

    public function getPlanosEntregaAvaliacao(array $unidadesIds, ?string $criadosApos = null): Collection;

    public function paginatePlanosEntregaAvaliacao(AvaliacaoPendentePEBuscaDTO $busca): LengthAwarePaginator;

    public function getPlanosEntregaHomologacao(array $unidadesIds): Collection;

    public function paginatePlanosEntregaHomologacao(HomologacaoPendentePEBuscaDTO $busca): LengthAwarePaginator;

    public function getEntregasPlanoEntregaHomologacao(array $unidadesIds): Collection;

    public function getEntregasPlanoEntregaExecucao(array $unidadesIds, ?string $planoEntregaCriadoApos = null): Collection;

    public function findAllByUnidadeId(string $unidadeId, ?string $dataInicio = null, ?string $dataFim = null): Collection;

    public function countPlanosEntregaHomologacao(array $unidadesIds): int;

    public function countPlanosEntregaAvaliacao(array $unidadesIds, ?string $criadosApos = null): int;

    public function countEntregasSemProgresso(array $unidadesIds, ?string $planoEntregaCriadoApos = null): int;

    public function paginatePlanosEntregaComRegistroAtraso(RegistroExecucaoAtrasoPEBuscaDTO $busca): LengthAwarePaginator;

    public function paginatePlanosEntregaVigentes(VigentesPEBuscaDTO $busca): LengthAwarePaginator;

    public function findAllEntregasByPlanoId(string $planoEntregaId): Collection;

    /** @return \App\Models\PlanoEntregaEntrega|null */
    public function findEntregaById(string $entregaId): ?\App\Models\PlanoEntregaEntrega;
}
