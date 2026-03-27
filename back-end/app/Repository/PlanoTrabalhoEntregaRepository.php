<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\PlanoTrabalhoEntrega;
use App\Repository\PlanoTrabalhoEntrega\Contracts\PlanoTrabalhoEntregaReadRepositoryContract;
use App\Repository\PlanoTrabalhoEntrega\Contracts\PlanoTrabalhoEntregaWriteRepositoryContract;

class PlanoTrabalhoEntregaRepository
{
    public function __construct(
        private readonly PlanoTrabalhoEntregaReadRepositoryContract $readRepository,
        private readonly PlanoTrabalhoEntregaWriteRepositoryContract $writeRepository,
    ) {}

    public function create(array $attributes): PlanoTrabalhoEntrega
    {
        /** @var PlanoTrabalhoEntrega */
        $entrega = $this->writeRepository->create($attributes);

        $entrega->load([
            'planoEntregaEntrega:id,descricao,unidade_id',
            'planoEntregaEntrega.unidade:id,sigla,nome',
        ]);

        return $entrega;
    }
}
