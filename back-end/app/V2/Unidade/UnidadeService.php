<?php

declare(strict_types=1);

namespace App\V2\Unidade;

use App\Repository\UnidadeRepository;
use App\V2\Unidade\DTOs\UnidadeBuscaDTO;
use App\V2\Unidade\DTOs\UnidadeIndexDTO;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class UnidadeService
{
    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    public function index(UnidadeIndexDTO $dto): LengthAwarePaginator
    {
        return $this->unidadeRepository->index($dto);
    }

    public function buscarPorNomeOuCodigo(UnidadeBuscaDTO $dto): Collection
    {
        return $this->unidadeRepository->buscarPorNomeOuCodigo($dto);
    }

    public function isGestorHierarquia(string $unidadeId): bool
    {
        return $this->unidadeRepository->isUsuarioGestorRecursivo($unidadeId, Auth::id());
    }
}
