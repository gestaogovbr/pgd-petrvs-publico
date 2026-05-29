<?php

namespace App\V2\Unidade;

use App\Repository\UnidadeRepository;
use App\V2\Unidade\DTOs\UnidadeBuscaDTO;
use Illuminate\Database\Eloquent\Collection;

class UnidadeService
{
    protected UnidadeRepository $unidadeRepository;

    public function __construct(UnidadeRepository $unidadeRepository)
    {
        $this->unidadeRepository = $unidadeRepository;
    }

    public function buscarPorNomeOuCodigo(UnidadeBuscaDTO $dto): Collection
    {
        return $this->unidadeRepository->buscarPorNomeOuCodigo($dto);
    }
}
