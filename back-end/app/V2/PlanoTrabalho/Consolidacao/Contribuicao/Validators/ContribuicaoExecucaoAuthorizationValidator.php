<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Contribuicao\Validators;

use App\Exceptions\NotFoundException;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\V2\Traits\ValidaAutorizacaoTrait;

class ContribuicaoExecucaoAuthorizationValidator
{
    use ValidaAutorizacaoTrait;

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    public function validar(string $planoTrabalhoId, string $usuarioLogadoId): PlanoTrabalho
    {
        /** @var PlanoTrabalho|null $plano */
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        $this->autorizarDonoOuChefia(
            $plano,
            $usuarioLogadoId,
            $plano->unidade_id,
            'Usuário não tem permissão para gerenciar contribuições de execução neste Plano de Trabalho.',
        );

        return $plano;
    }
}
