<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\Validators;

use App\Exceptions\ValidateException;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoEntregaRepository;

class PlanoTrabalhoDocumentoStoreValidator
{
    public function __construct(
        private readonly PlanoTrabalhoEntregaRepository $entregaRepository,
    ) {}

    public function validar(PlanoTrabalho $plano, ?string $justificativa): ?string
    {
        $resumo = $this->entregaRepository->resumoForcaTrabalhoPorPlano($plano->id);

        if (!$resumo->possuiEntregas()) {
            throw new ValidateException('Plano de Trabalho deve possuir ao menos uma entrega para gerar o documento.');
        }

        if ($resumo->isCargaCompleta()) {
            return null;
        }

        if (empty($justificativa)) {
            throw new ValidateException(
                'A justificativa é obrigatória quando o percentual de carga horária é diferente de 100%.'
            );
        }

        return $justificativa;
    }
}
