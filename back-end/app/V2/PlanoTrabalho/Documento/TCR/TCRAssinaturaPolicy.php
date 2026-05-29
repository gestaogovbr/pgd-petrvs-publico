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
        $isParticipanteGestorDaUnidade = $this->unidadeRepository->isUsuarioGestorDaUnidade($unidadePt->id, $plano->usuario_id);
        $isParticipanteGestorTitular = $isParticipanteGestorDaUnidade
            && $this->unidadeRepository->isUsuarioGestorTitularDaUnidade($unidadePt->id, $plano->usuario_id);

        // Participante é gestor de unidade raiz — não há superior, considera satisfeito
        if ($isParticipanteGestorDaUnidade && $unidadePt->unidade_pai_id === null) {
            return true;
        }

        // Participante é gestor titular da unidade E da unidade pai — sua assinatura basta
        if ($isParticipanteGestorTitular && $unidadePt->unidade_pai_id
            && $this->unidadeRepository->isUsuarioGestorDaUnidade($unidadePt->unidade_pai_id, $plano->usuario_id)) {
            return true;
        }

        // Participante é GESTOR_SUBSTITUTO/DELEGADO — GESTOR titular da mesma unidade satisfaz
        if ($isParticipanteGestorDaUnidade && !$isParticipanteGestorTitular) {
            if ($this->assinaturaRepository->gestorTitularDiferenteDoParticipanteAssinou($documentoId, $unidadePt->id, $plano->usuario_id)) {
                return true;
            }
        }

        // Participante é gestor titular — busca assinatura de gestor da unidade pai
        $unidade = ($isParticipanteGestorTitular && $unidadePt->unidade_pai_id)
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
