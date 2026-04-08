<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Programa;
use App\Models\TipoAvaliacaoNota;
use App\Repository\Programa\Contracts\ProgramaReadRepositoryContract;
use App\Repository\Programa\Contracts\ProgramaWriteRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

class ProgramaRepository
{
    public function __construct(
        private readonly ProgramaReadRepositoryContract $readRepository,
        private readonly ProgramaWriteRepositoryContract $writeRepository,
    ) {}

    public function findById(string $id): ?Programa
    {
        /** @var Programa|null */
        return $this->readRepository->findById($id);
    }

    public function findNotasAvaliacao(string $tipoAvaliacaoId): Collection
    {
        return TipoAvaliacaoNota::where('tipo_avaliacao_id', $tipoAvaliacaoId)
            ->orderBy('sequencia')
            ->get(['id', 'sequencia', 'nota', 'descricao', 'justifica']);
    }
}