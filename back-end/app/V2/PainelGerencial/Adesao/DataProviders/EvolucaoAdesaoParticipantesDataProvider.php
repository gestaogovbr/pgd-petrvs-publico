<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Adesao\DataProviders;

use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use App\V2\PainelGerencial\DTOs\FiltrosPainelDTO;
use App\V2\PainelGerencial\Traits\ResolveHierarquiaPainel;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class EvolucaoAdesaoParticipantesDataProvider
{
    use ResolveHierarquiaPainel;

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    protected function getUnidadeRepository(): UnidadeRepository
    {
        return $this->unidadeRepository;
    }

    public function getData(FiltrosPainelDTO $filtros): array
    {
        $hierarquia = $this->resolverHierarquia($filtros->unidadeId);
        /** @var Unidade $unidade */
        $unidade = $hierarquia['unidade'];

        $unidadeIds = $this->idsComTodasSubordinadas($unidade);
        $periodos = $this->gerarPeriodos($filtros);

        $serie = DB::table('serie_participantes_pgd')
            ->whereIn('unidade_id', $unidadeIds)
            ->whereIn('periodo', $periodos)
            ->selectRaw('periodo, SUM(participantes_qtd) as participantes, SUM(nao_participantes_qtd) as nao_participantes')
            ->groupBy('periodo')
            ->get()
            ->keyBy('periodo');

        $resultado = [];

        foreach ($periodos as $periodo) {
            $dados = $serie->get($periodo);
            $resultado[] = [
                'periodo' => $periodo,
                'participantes' => (int) ($dados->participantes ?? 0),
                'nao_participantes' => (int) ($dados->nao_participantes ?? 0),
            ];
        }

        return [
            'serie' => $resultado,
        ];
    }

    /** @return string[] */
    private function gerarPeriodos(FiltrosPainelDTO $filtros): array
    {
        if ($filtros->isSituacaoAtual()) {
            $inicio = Carbon::now()->startOfYear();
            $fim = Carbon::now()->startOfMonth();
        } else {
            $inicio = Carbon::parse($filtros->dataInicio)->startOfYear();
            $fim = Carbon::parse($filtros->dataFim)->startOfMonth();
        }

        $periodos = [];
        $atual = $inicio->copy();

        while ($atual->lte($fim)) {
            $periodos[] = $atual->format('Y-m');
            $atual->addMonth();
        }

        return $periodos;
    }
}
