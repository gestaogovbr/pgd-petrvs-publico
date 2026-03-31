<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\Validators;

use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Repository\PlanoTrabalhoRepository;

class PlanoTrabalhoDocumentoStoreValidator
{
    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
    ) {}

    public function validar(string $planoTrabalhoId): void
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        if (!$this->planoTrabalhoRepository->possuiEntregas($planoTrabalhoId)) {
            throw new ValidateException('Plano de Trabalho deve possuir ao menos uma entrega para gerar o documento.');
        }
    }
}
