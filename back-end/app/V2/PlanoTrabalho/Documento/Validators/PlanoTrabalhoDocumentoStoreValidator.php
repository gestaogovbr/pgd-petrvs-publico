<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\Validators;

use App\Exceptions\ValidateException;
use App\Models\PlanoTrabalho;

class PlanoTrabalhoDocumentoStoreValidator
{
    public function validar(PlanoTrabalho $plano): void
    {
        if ($plano->entregas()->exists() === false) {
            throw new ValidateException('Plano de Trabalho deve possuir ao menos uma entrega para gerar o documento.');
        }
    }
}
