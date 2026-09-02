<?php

declare(strict_types=1);

namespace App\V2\Home\DataProviders;

use App\Enums\PerfilEnum;
use App\Enums\StatusEnum;
use App\Models\Usuario;
use App\Repository\UnidadeRepository;
use App\Services\CalendarioService;
use App\V2\Home\DTOs\HomeRequestDTO;
use App\V2\Home\Traits\ResolveUnidades;
use App\Traits\SqlPlaceholders;
use Illuminate\Support\Facades\DB;

class ResumoEquipe
{
    use ResolveUnidades;
    use SqlPlaceholders;

    private const PARTICIPA_PGD = 'sim';

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly CalendarioService $calendarioService,
    ) {}

    protected function getUnidadeRepository(): UnidadeRepository
    {
        return $this->unidadeRepository;
    }

    public function getData(HomeRequestDTO $dto): array
    {
        $unidadeIds = $this->resolverUnidades($dto);

        return [
            'unidades' => $this->unidades($unidadeIds),
            'participantes_pgd' => $this->participantesPGD($unidadeIds),
            'capacidade_equipe_horas_mensais' => $this->capacidadeEquipe($unidadeIds),
        ];
    }

    private function unidades(array $unidadeIds): array
    {
        $unidades = DB::table('unidades')
            ->whereIn('id', $unidadeIds)
            ->whereNull('deleted_at')
            ->get(['executora']);

        $total = $unidades->count();
        $executoras = $unidades->filter(fn ($u) => (bool) $u->executora)->count();

        return [
            'quantidade' => $executoras,
            'total' => $total,
            'percentual' => $total > 0 ? round(($executoras / $total) * 100, 1) : 0,
        ];
    }

    /**
     * Indicadores de Agentes Públicos e Participantes.
     *
     * UNIVERSO: todos os usuários com qualquer relação (atribuição) na unidade.
     * AGENTES PÚBLICOS (total): do universo, desconsidera usuários com perfil Consulta.
     * PARTICIPANTES (quantidade): dos agentes públicos, desconsidera:
     *   - usuários sem indicação de participante no SIAPE (participa_pgd != 'sim');
     *   - TODO(#2476): usuários com indicação de participante no SIAPE mas com
     *     marcação de dispensa de PT. Essa marcação será adicionada após o merge
     *     da branch #2476; enquanto isso, esses usuários ainda são contados como
     *     participantes.
     *
     * @return array{quantidade: int, total: int, percentual: float}
     */
    private function participantesPGD(array $unidadeIds): array
    {
        $universo = Usuario::query()
            ->with('perfil')
            ->whereHas('unidadesIntegrantes', fn ($q) => $q
                ->whereIn('unidade_id', $unidadeIds)
                ->whereHas('atribuicoes')
            )
            ->get();

        $agentesPublicos = $universo->filter(fn ($u) => !$this->isPerfilConsulta($u));

        // TODO(#2476): também desconsiderar participantes com dispensa de PT
        // (marcação a ser adicionada após o merge da branch #2476).
        $participantes = $agentesPublicos
            ->filter(fn ($u) => $u->participa_pgd === self::PARTICIPA_PGD)
            ->count();

        $total = $agentesPublicos->count();

        return [
            'quantidade' => $participantes,
            'total' => $total,
            'percentual' => $total > 0 ? round(($participantes / $total) * 100, 1) : 0,
        ];
    }

    private function isPerfilConsulta(Usuario $usuario): bool
    {
        return $usuario->perfil?->nivel === PerfilEnum::CONSULTA->value;
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
              AND pt.unidade_id IN ({$this->sqlPlaceholders($unidadeIds)})
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

            $diasUteis = $this->calendarioService->contarDiasUteis($ptInicio, $ptFim, $feriadosUnidade);

            $horasTotal += (float) $pt->carga_horaria * $diasUteis;
        }

        return round($horasTotal, 1);
    }
}
