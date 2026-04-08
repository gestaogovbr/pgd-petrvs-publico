<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\Validators;

use App\Exceptions\ValidateException;
use App\Models\PlanoTrabalho;

class PlanoTrabalhoDocumentoStoreValidator
{
    private const PERCENTUAL_COMPLETO = 100.0;

    public function validar(PlanoTrabalho $plano, ?string $justificativa): ?string
    {
        if ($plano->entregas()->exists() === false) {
            throw new ValidateException('Plano de Trabalho deve possuir ao menos uma entrega para gerar o documento.');
        }

        $somatorio = (float) $plano->entregas()->sum('forca_trabalho');

        if ($somatorio === self::PERCENTUAL_COMPLETO) {
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
