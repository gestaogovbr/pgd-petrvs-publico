<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Modalidades\DataProviders;

use App\Enums\ParticipaPgd;
use App\Models\Usuario;

class TeletrabalhoExteriorDataProvider
{
    private const LIMITE_SUBSTITUICAO = 0.10;
    private const LIMITE_DISCRICIONARIO = 0.02;

    /**
     * RN35/RN44: Sempre consolidado de toda a entidade, independente da unidade selecionada.
     *
     * @return array{taxa: float, limite: float, participantes_modalidade: int, total_participantes: int}
     */
    public function getDataSubstituicao(): array
    {
        return $this->calcular('no exterior substituicao', self::LIMITE_SUBSTITUICAO);
    }

    /**
     * @return array{taxa: float, limite: float, participantes_modalidade: int, total_participantes: int}
     */
    public function getDataDiscricionario(): array
    {
        return $this->calcular('no exterior', self::LIMITE_DISCRICIONARIO);
    }

    /**
     * @return array{taxa: float, limite: float, participantes_modalidade: int, total_participantes: int}
     */
    private function calcular(string $modalidade, float $limiteLegal): array
    {
        $totalParticipantes = $this->contarParticipantesPgd();

        if ($totalParticipantes === 0) {
            return ['taxa' => 0.0, 'limite' => $limiteLegal * 100, 'participantes_modalidade' => 0, 'total_participantes' => 0];
        }

        $participantesModalidade = $this->contarParticipantesNaModalidade($modalidade);
        $taxa = round(($participantesModalidade / $totalParticipantes) * 100, 2);

        return [
            'taxa' => $taxa,
            'limite' => $limiteLegal * 100,
            'participantes_modalidade' => $participantesModalidade,
            'total_participantes' => $totalParticipantes,
        ];
    }

    private function contarParticipantesPgd(): int
    {
        return Usuario::query()
            ->where('participa_pgd', ParticipaPgd::SIM->value)
            ->whereNull('deleted_at')
            ->count();
    }

    private function contarParticipantesNaModalidade(string $modalidade): int
    {
        return Usuario::query()
            ->where('modalidade_pgd', $modalidade)
            ->where('participa_pgd', ParticipaPgd::SIM->value)
            ->whereNull('deleted_at')
            ->count();
    }
}
