<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Modalidades\DataProviders;

use App\Enums\Atribuicao;
use App\Enums\ParticipaPgd;
use App\Enums\StatusEnum;
use App\Models\PlanoTrabalho;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\UnidadeRepository;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;

class TeletrabalhoExteriorDataProvider
{
    private const LIMITE_SUBSTITUICAO = 0.10;
    private const LIMITE_DISCRICIONARIO = 0.02;

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    /**
     * RN35/RN44: Sempre consolidado da unidade raiz (MGI), independente da unidade selecionada.
     *
     * @return array{taxa: float, limite: float, participantes_modalidade: int, total_participantes: int}
     */
    public function getDataSubstituicao(FiltrosPainelDTO $filtros): array
    {
        return $this->calcular('no exterior substituicao', self::LIMITE_SUBSTITUICAO, $filtros);
    }

    /**
     * @return array{taxa: float, limite: float, participantes_modalidade: int, total_participantes: int}
     */
    public function getDataDiscricionario(FiltrosPainelDTO $filtros): array
    {
        return $this->calcular('no exterior', self::LIMITE_DISCRICIONARIO, $filtros);
    }

    /**
     * @return array{taxa: float, limite: float, participantes_modalidade: int, total_participantes: int}
     */
    private function calcular(string $modalidade, float $limiteLegal, FiltrosPainelDTO $filtros): array
    {
        $unidadeRaiz = $this->getUnidadeRaiz();

        if (!$unidadeRaiz) {
            return ['taxa' => 0.0, 'limite' => $limiteLegal * 100, 'participantes_modalidade' => 0, 'total_participantes' => 0];
        }

        $todasUnidadeIds = $this->getTodasUnidadeIds($unidadeRaiz->id);
        $totalParticipantes = $this->contarParticipantesPgd($todasUnidadeIds);

        if ($totalParticipantes === 0) {
            return ['taxa' => 0.0, 'limite' => $limiteLegal * 100, 'participantes_modalidade' => 0, 'total_participantes' => 0];
        }

        $participantesModalidade = $this->contarParticipantesNaModalidade($modalidade, $todasUnidadeIds, $filtros);
        $taxa = round(($participantesModalidade / $totalParticipantes) * 100, 2);

        return [
            'taxa' => $taxa,
            'limite' => $limiteLegal * 100,
            'participantes_modalidade' => $participantesModalidade,
            'total_participantes' => $totalParticipantes,
        ];
    }

    private function getUnidadeRaiz(): ?Unidade
    {
        return Unidade::query()
            ->whereNull('unidade_pai_id')
            ->whereNull('deleted_at')
            ->first();
    }

    /**
     * @return string[]
     */
    private function getTodasUnidadeIds(string $unidadeRaizId): array
    {
        $subordinadas = $this->unidadeRepository->getSubordinadasRecursivas([$unidadeRaizId]);

        return [$unidadeRaizId, ...$subordinadas->pluck('id')->toArray()];
    }

    private function contarParticipantesPgd(array $unidadeIds): int
    {
        return Usuario::query()
            ->where('participa_pgd', ParticipaPgd::SIM->value)
            ->whereNull('deleted_at')
            ->whereHas('unidadesIntegrantes', function ($q) use ($unidadeIds) {
                $q->whereIn('unidade_id', $unidadeIds)
                    ->whereHas('atribuicoes', fn ($a) => $a->where('atribuicao', Atribuicao::LOTADO->value));
            })
            ->count();
    }

    private function contarParticipantesNaModalidade(string $modalidade, array $unidadeIds, FiltrosPainelDTO $filtros): int
    {
        $hoje = now()->toDateString();

        $query = PlanoTrabalho::query()
            ->where('modalidade_pgd', $modalidade)
            ->whereIn('unidade_id', $unidadeIds)
            ->whereNull('deleted_at')
            ->whereIn('status', [StatusEnum::ATIVO->value, StatusEnum::CONCLUIDO->value, StatusEnum::AVALIADO->value]);

        if ($filtros->isSituacaoAtual()) {
            $query->where('data_inicio', '<=', $hoje)
                ->where('data_fim', '>=', $hoje);
        }

        if ($filtros->isHistorico()) {
            $query->where('data_inicio', '<=', $filtros->dataFim)
                ->where('data_fim', '>=', $filtros->dataInicio);
        }

        return $query->distinct('usuario_id')->count('usuario_id');
    }
}
