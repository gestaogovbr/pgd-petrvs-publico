<?php

declare(strict_types=1);

namespace App\V2\Home\DataProviders;

use App\Enums\StatusEnum;
use App\Models\Usuario;
use App\Repository\UnidadeRepository;
use App\Services\CalendarioService;
use App\V2\Home\DTOs\HomeRequestDTO;
use App\V2\Home\Traits\ResolveUnidades;
use Illuminate\Support\Facades\DB;

class ResumoEquipe
{
    use ResolveUnidades;

    private const PARTICIPA_PGD = 'sim';
    private const ATRIBUICOES_PARTICIPANTE = ['LOTADO', 'COLABORADOR'];

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    protected function getUnidadeRepository(): UnidadeRepository
    {
        return $this->unidadeRepository;
    }

    public function getData(HomeRequestDTO $dto): array
    {
        $unidadeIds = $this->resolverUnidades($dto);

        return [
            'participantes_pgd' => $this->participantesPGD($unidadeIds),
            'capacidade_equipe_horas_mensais' => $this->capacidadeEquipe($unidadeIds),
        ];
    }

    private function participantesPGD(array $unidadeIds): array
    {
        $result = Usuario::query()
            ->whereHas('unidadesIntegrantes', fn ($q) => $q
                ->whereIn('unidade_id', $unidadeIds)
                ->whereHas('atribuicoes', fn ($a) => $a->whereIn('atribuicao', self::ATRIBUICOES_PARTICIPANTE))
            )
            ->get();

        $participantes = $result->filter(fn ($u) => $u->participa_pgd === self::PARTICIPA_PGD)->count();
        $total = $result->count();

        return [
            'quantidade' => $participantes,
            'total' => $total,
            'percentual' => $total > 0 ? round(($participantes / $total) * 100, 1) : 0,
        ];
    }

    private function capacidadeEquipe(array $unidadeIds): float
    {
        $inicioMes = now()->startOfMonth();
        $fimMes = now()->endOfMonth();

        $planos = DB::select(<<<SQL
            SELECT pt.id, pt.carga_horaria, DATE(pt.data_inicio) AS data_inicio, DATE(pt.data_fim) AS data_fim, pt.unidade_id
            FROM planos_trabalhos pt
            WHERE pt.deleted_at IS NULL
              AND pt.status = ?
              AND DATE(pt.data_inicio) <= ?
              AND DATE(pt.data_fim) >= ?
              AND pt.unidade_id IN ({$this->placeholders($unidadeIds)})
            ORDER BY pt.unidade_id
        SQL, [StatusEnum::ATIVO->value, $fimMes->toDateString(), $inicioMes->toDateString(), ...$unidadeIds]);

        if (empty($planos)) {
            return 0;
        }

        $horasTotal = 0.0;
        $unidadeAtual = null;
        $feriadosUnidade = [];

        foreach ($planos as $pt) {
            if ($pt->unidade_id !== $unidadeAtual) {
                $unidadeAtual = $pt->unidade_id;
                $feriadosUnidade = CalendarioService::feriadosCadastrados($unidadeAtual);
            }

            $ptInicio = max($inicioMes->toDateString(), $pt->data_inicio);
            $ptFim = min($fimMes->toDateString(), $pt->data_fim);

            $diasUteis = $this->contarDiasUteis($ptInicio, $ptFim, $feriadosUnidade);

            $horasTotal += (float) $pt->carga_horaria * $diasUteis;
        }

        return round($horasTotal, 1);
    }

    private function contarDiasUteis(string $inicio, string $fim, array $feriadosCadastrados): int
    {
        $inicioTs = strtotime($inicio);
        $fimTs = strtotime($fim);
        $diasUteis = 0;

        for ($ts = $inicioTs; $ts <= $fimTs; $ts += 86400) {
            if (!CalendarioService::isFinalSemana($ts) && !$this->isFeriadoCadastrado($ts, $feriadosCadastrados)) {
                $diasUteis++;
            }
        }

        return $diasUteis;
    }

    private function isFeriadoCadastrado(int $timestamp, array $feriadosCadastrados): bool
    {
        $chaveFixa = date('Y-m-d', $timestamp);
        $chaveRecorrente = '-' . date('m-d', $timestamp);

        return isset($feriadosCadastrados[$chaveFixa]) || isset($feriadosCadastrados[$chaveRecorrente]);
    }

    private function placeholders(array $items): string
    {
        return implode(',', array_fill(0, count($items), '?'));
    }
}
