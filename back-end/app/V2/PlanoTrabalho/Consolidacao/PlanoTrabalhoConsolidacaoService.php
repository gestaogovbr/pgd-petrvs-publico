<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao;

use App\Exceptions\NotFoundException;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use Illuminate\Database\Eloquent\Collection;

class PlanoTrabalhoConsolidacaoService
{
    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
    ) {}

    public function index(string $planoTrabalhoId): Collection
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        return $this->consolidacaoRepository->findByPlanoTrabalhoId($planoTrabalhoId);
    }
}
