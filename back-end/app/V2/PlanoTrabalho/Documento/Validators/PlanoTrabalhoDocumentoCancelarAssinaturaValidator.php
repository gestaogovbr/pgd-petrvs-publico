<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\Validators;

use App\Enums\StatusEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\Documento;
use App\Models\PlanoTrabalho;
use App\Repository\DocumentoAssinaturaRepository;
use App\Repository\DocumentoRepository;

class PlanoTrabalhoDocumentoCancelarAssinaturaValidator
{
    public function __construct(
        private readonly DocumentoRepository $documentoRepository,
        private readonly DocumentoAssinaturaRepository $assinaturaRepository,
    ) {}

    public function validar(PlanoTrabalho $plano, string $usuarioId): Documento
    {
        if ($plano->usuario_id !== $usuarioId) {
            throw new ForbiddenException('Apenas o participante do Plano de Trabalho pode cancelar a assinatura.');
        }

        if ($plano->status !== StatusEnum::AGUARDANDO_ASSINATURA->value) {
            throw new ValidateException('Plano de Trabalho deve estar com status Aguardando Assinatura para cancelar.');
        }

        $documento = $this->documentoRepository->findTcrByPlanoTrabalhoId($plano->id);

        if ($documento === null) {
            throw new NotFoundException('Documento TCR não encontrado para este Plano de Trabalho.');
        }

        if (!$this->assinaturaRepository->usuarioJaAssinou($documento->id, $usuarioId)) {
            throw new ValidateException('Usuário não possui assinatura neste documento.');
        }

        return $documento;
    }
}
