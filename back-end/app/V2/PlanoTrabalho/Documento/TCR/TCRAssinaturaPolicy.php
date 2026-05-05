<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Documento\TCR;

use App\Models\PlanoTrabalho;
use App\Repository\DocumentoAssinaturaRepository;
use App\Repository\UnidadeRepository;

class TCRAssinaturaPolicy
{
    public function __construct(
        private readonly DocumentoAssinaturaRepository $assinaturaRepository,
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    public function todasRealizadas(PlanoTrabalho $plano, string $documentoId): bool
    {
        $programa = $plano->programa;

        if ($programa->plano_trabalho_assinatura_participante) {
            if (!$this->assinaturaRepository->participanteAssinou($documentoId, $plano->usuario_id)) {
                return false;
            }
        }

        if ($programa->plano_trabalho_assinatura_gestor_unidade) {
            if (!$this->gestorHierarquicoAssinou($documentoId, $plano)) {
                return false;
            }
        }

        return true;
    }

    private function gestorHierarquicoAssinou(string $documentoId, PlanoTrabalho $plano): bool
    {
        $unidadePt = $this->unidadeRepository->findById($plano->unidade_id);
        $isParticipanteGestorDaUnidade = $this->assinaturaRepository->gestorUnidadeAssinou($documentoId, $unidadePt->id);

        if ($isParticipanteGestorDaUnidade && $unidadePt->unidade_pai_id === null) {
            return true;
        }

        $unidade = ($isParticipanteGestorDaUnidade && $unidadePt->unidade_pai_id)
            ? $this->unidadeRepository->findById($unidadePt->unidade_pai_id)
            : $unidadePt;

        while ($unidade !== null) {
            if ($this->assinaturaRepository->gestorDiferenteDoParticipanteAssinou($documentoId, $unidade->id, $plano->usuario_id)) {
                return true;
            }

            if ($unidade->unidade_pai_id) {
                $unidade = $this->unidadeRepository->findById($unidade->unidade_pai_id);
                continue;
            }

            break;
        }

        return false;
    }
}
