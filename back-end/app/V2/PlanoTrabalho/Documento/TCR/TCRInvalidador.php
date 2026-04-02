<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\TCR;

use App\Enums\StatusEnum;
use App\Repository\DocumentoAssinaturaRepository;
use App\Repository\DocumentoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\V2\StatusService;

class TCRInvalidador
{
    public function __construct(
        private readonly DocumentoRepository $documentoRepository,
        private readonly DocumentoAssinaturaRepository $assinaturaRepository,
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly StatusService $statusService,
    ) {}

    public function invalidar(string $planoTrabalhoId): void
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            return;
        }

        $this->invalidarDocumento($planoTrabalhoId);
        $this->reverterStatus($plano);
    }

    private function invalidarDocumento(string $planoTrabalhoId): void
    {
        $documento = $this->documentoRepository->findTcrByPlanoTrabalhoId($planoTrabalhoId);

        if ($documento === null) {
            return;
        }

        $this->assinaturaRepository->deleteAssinaturasDocumento($documento->id);
        $this->documentoRepository->delete($documento->id);
        $this->planoTrabalhoRepository->update($planoTrabalhoId, ['documento_id' => null]);
    }

    private function reverterStatus($plano): void
    {
        if ($plano->status === StatusEnum::INCLUIDO->value) {
            return;
        }

        $this->statusService->atualizaStatus(
            $plano,
            StatusEnum::INCLUIDO->value,
            'Plano de Trabalho revertido para rascunho após modificação.'
        );
    }
}
