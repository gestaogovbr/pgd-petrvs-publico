<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Avaliacao\Validators;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;

class AvaliacaoAuthorizationValidator
{
    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    public function validar(string $planoTrabalhoId, string $usuarioLogadoId): PlanoTrabalho
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        if (!$this->unidadeRepository->isUsuarioGestorRecursivo($plano->unidade_id, $usuarioLogadoId)) {
            throw new ForbiddenException('Apenas a chefia da unidade pode avaliar períodos avaliativos.');
        }

        return $plano;
    }
}
