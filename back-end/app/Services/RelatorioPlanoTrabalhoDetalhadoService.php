<?php

declare(strict_types=1);

namespace App\Services;

use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Repository\UnidadeRepository;

class RelatorioPlanoTrabalhoDetalhadoService extends RelatorioPlanoTrabalhoService
{
    public function __construct(
        UnidadeRepository $unidadeRepository,
        PlanoTrabalhoEntregaRepository $planoTrabalhoEntregaRepository,
    ) {
        parent::__construct($unidadeRepository, $planoTrabalhoEntregaRepository, detalhado: true);
    }
}
