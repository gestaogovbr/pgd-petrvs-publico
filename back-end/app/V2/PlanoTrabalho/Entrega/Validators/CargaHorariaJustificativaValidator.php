<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Entrega\Validators;

use App\Exceptions\ValidateException;
use App\V2\PlanoTrabalho\Entrega\DTOs\SomatoriosEsforcoDTO;

class CargaHorariaJustificativaValidator
{
    public const MENSAGEM = 'A justificativa é obrigatória quando o percentual de carga horária é diferente de 100%.';

    public function validar(SomatoriosEsforcoDTO $somatorios, ?string $justificativa): void
    {
        if (!$somatorios->exigeJustificativaCargaHoraria()) {
            return;
        }

        if (trim((string) $justificativa) === '') {
            throw new ValidateException(self::MENSAGEM);
        }
    }
}
