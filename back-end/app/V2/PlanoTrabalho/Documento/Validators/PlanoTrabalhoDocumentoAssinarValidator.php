<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\Documento;
use App\Models\PlanoTrabalho;
use App\Repository\DocumentoAssinaturaRepository;
use App\Repository\DocumentoRepository;

class PlanoTrabalhoDocumentoAssinarValidator
{
    private const STATUSES_PERMITIDOS = [
        StatusEnum::INCLUIDO,
        StatusEnum::AGUARDANDO_ASSINATURA,
    ];

    public function __construct(
        private readonly DocumentoRepository $documentoRepository,
        private readonly DocumentoAssinaturaRepository $assinaturaRepository,
    ) {}

    public function validar(PlanoTrabalho $plano, string $usuarioId): Documento
    {
        $this->validarStatus($plano);
        $this->validarEntregas($plano);

        $documento = $this->documentoRepository->findTcrByPlanoTrabalhoId($plano->id);

        if ($documento === null) {
            throw new NotFoundException('Plano de Trabalho não possui documento TCR gerado.');
        }

        if ($this->assinaturaRepository->usuarioJaAssinou($documento->id, $usuarioId)) {
            throw new ValidateException('Usuário já assinou este documento.');
        }

        return $documento;
    }

    private function validarStatus(PlanoTrabalho $plano): void
    {
        $permitidos = array_map(fn (StatusEnum $s) => $s->value, self::STATUSES_PERMITIDOS);

        if (!in_array($plano->status, $permitidos, true)) {
            throw new ValidateException('Plano de Trabalho deve estar com status Incluído ou Aguardando Assinatura para ser assinado.');
        }
    }

    private function validarEntregas(PlanoTrabalho $plano): void
    {
        if ($plano->entregas()->exists() === false) {
            throw new ValidateException('Plano de Trabalho deve possuir ao menos uma entrega para ser assinado.');
        }
    }
}
