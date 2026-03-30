<?php

namespace App\V2\PlanoEntrega;

use App\Repository\PlanoEntregaRepository;
use App\V2\PlanoEntrega\DTOs\PlanoEntregaBuscaDTO;
use Illuminate\Database\Eloquent\Collection;

class PlanoEntregaService
{
    protected PlanoEntregaRepository $planoEntregaRepository;

    public function __construct(PlanoEntregaRepository $planoEntregaRepository)
    {
        $this->planoEntregaRepository = $planoEntregaRepository;
    }

    public function buscarPorUnidade(PlanoEntregaBuscaDTO $dto): Collection
    {
        return $this->planoEntregaRepository->findByUnidadeId($dto->unidadeId);
    }
}
