<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Consolidacao\Atividade\Validators;

use App\Exceptions\ValidateException;
use App\Repository\PlanoTrabalhoEntregaRepository;

class AtividadeEsforcoExecutadoValidator
{
    public function __construct(
        private readonly PlanoTrabalhoEntregaRepository $planoTrabalhoEntregaRepository,
    ) {}

    public function validarSomatorioPlano(string $planoTrabalhoId): void
    {
        $somatorios = $this->planoTrabalhoEntregaRepository->somatoriosEsforcoProjetados(
            $planoTrabalhoId,
            null,
            0,
            0,
        );

        if (!$somatorios->planejadoIgualExecutado()) {
            throw new ValidateException(
                'O somatório do esforço executado deve ser igual ao somatório do esforço planejado no Plano de Trabalho.'
            );
        }
    }
}
