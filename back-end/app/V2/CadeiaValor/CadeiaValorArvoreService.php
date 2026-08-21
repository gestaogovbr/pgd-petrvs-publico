<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor;

use App\Exceptions\NotFoundException;
use App\Models\CadeiaValor;
use App\Models\CadeiaValorProcesso;
use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalEsforcoGraphAssembler;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalEsforcoSupport;
use App\V2\CadeiaValor\DTOs\CadeiaValorArvoreDTO;
use App\V2\CadeiaValor\DTOs\CadeiaValorProcessoNodeDTO;
use App\V2\CadeiaValor\DTOs\CadeiaValorVinculoCrossCadeiaDTO;
use Illuminate\Support\Collection;

class CadeiaValorArvoreService
{
    public function __construct(
        private readonly CadeiaValorReadRepositoryContract $repository,
        private readonly ArvoreInstitucionalEsforcoGraphAssembler $graphAssembler,
    ) {}

    /**
     * Retorna todos os processos da cadeia de valor como mapa de nós,
     * com vínculos cross-cadeia e contagem de vínculos.
     * O front-end controla a janela de visualização (levelsAbove/Below).
     */
    public function getArvore(string $cadeiaValorId, string $processoId): CadeiaValorArvoreDTO
    {
        $cadeiaValor = $this->repository->findCadeiaValor($cadeiaValorId);
        if (!$cadeiaValor instanceof CadeiaValor) {
            throw new NotFoundException("Cadeia de valor com id '{$cadeiaValorId}' não encontrada.");
        }

        $processoFocal = $this->repository->findProcesso($processoId, $cadeiaValorId);
        if (!$processoFocal instanceof CadeiaValorProcesso) {
            throw new NotFoundException("Processo com id '{$processoId}' não encontrado na cadeia de valor.");
        }

        $todosProcessos = $this->repository->listarProcessosPorCadeia($cadeiaValorId);

        $todosIds = $todosProcessos->pluck('id')->all();

        $vinculosCrossCadeia = $this->mapearVinculosCrossCadeia(
            $this->repository->buscarVinculosCrossCadeia($todosIds, $cadeiaValorId)
        );

        $contagemVinculos = $this->repository->contarVinculosPorProcesso($todosIds);

        // Calcular esforço por processo usando o assembler genérico
        $esforcoMap = $this->calcularEsforcoProcessos($cadeiaValorId);

        $nos = $this->montarNos($todosProcessos, $todosProcessos, $cadeiaValor, $vinculosCrossCadeia, $contagemVinculos, $esforcoMap);

        $raizIds = $todosProcessos
            ->whereNull('processo_pai_id')
            ->sortBy('sequencia')
            ->pluck('id')
            ->values()
            ->all();

        $ancestraisIds = $this->coletarTodosAncestrais($processoFocal, $todosProcessos);
        $nivelMaximo = $this->calcularNivelMaximo($processoFocal, $todosProcessos);

        return new CadeiaValorArvoreDTO(
            processo_focal_id: $processoId,
            cadeia_valor_id: $cadeiaValorId,
            cadeia_valor_nome: $cadeiaValor->nome,
            nos: $nos,
            ancestrais_ids: $ancestraisIds,
            raiz_ids: $raizIds,
            nivel_maximo: $nivelMaximo,
        );
    }

    /**
     * Coleta todos os ancestrais do processo focal (do mais próximo ao mais distante).
     *
     * @return list<string>
     */
    private function coletarTodosAncestrais(CadeiaValorProcesso $processo, Collection $todosProcessos): array
    {
        $ancestrais = [];
        $atual = $processo;

        while ($atual->processo_pai_id !== null) {
            $pai = $todosProcessos->firstWhere('id', $atual->processo_pai_id);
            if (!$pai instanceof CadeiaValorProcesso) {
                break;
            }

            $ancestrais[] = $pai->id;
            $atual = $pai;
        }

        return $ancestrais;
    }

    /**
     * @param list<\stdClass> $rows
     * @return array<string, list<CadeiaValorVinculoCrossCadeiaDTO>>
     */
    private function mapearVinculosCrossCadeia(array $rows): array
    {
        $mapa = [];
        foreach ($rows as $row) {
            $mapa[$row->processo_origem_id][] = CadeiaValorVinculoCrossCadeiaDTO::fromArray([
                'processo_id' => $row->processo_id,
                'processo_nome' => $row->processo_nome,
                'cadeia_valor_id' => $row->cadeia_valor_id,
                'cadeia_valor_nome' => $row->cadeia_valor_nome,
            ]);
        }

        return $mapa;
    }

    /**
     * @return array<string, CadeiaValorProcessoNodeDTO>
     */
    private function montarNos(
        Collection $processos,
        Collection $todosProcessos,
        CadeiaValor $cadeiaValor,
        array $vinculosCrossCadeia,
        array $contagemVinculos,
        array $esforcoMap,
    ): array {
        $nos = [];
        foreach ($processos as $processo) {
            $filhosIds = $todosProcessos
                ->where('processo_pai_id', $processo->id)
                ->sortBy('sequencia')
                ->pluck('id')
                ->values()
                ->all();

            $nivel = $this->calcularNivel($processo, $todosProcessos);
            $esforco = $esforcoMap[$processo->id] ?? null;

            $nos[$processo->id] = CadeiaValorProcessoNodeDTO::fromArray([
                'processo_id' => $processo->id,
                'nome' => $processo->nome,
                'sequencia' => $processo->sequencia,
                'processo_pai_id' => $processo->processo_pai_id,
                'cadeia_valor_id' => $cadeiaValor->id,
                'cadeia_valor_nome' => $cadeiaValor->nome,
                'nivel' => $nivel,
                'total_vinculos' => $contagemVinculos[$processo->id] ?? 0,
                'etiquetas' => $processo->tipoElemento?->nome ? [$processo->tipoElemento->nome] : null,
                'filhos_ids' => $filhosIds,
                'vinculos_cross_cadeia' => $vinculosCrossCadeia[$processo->id] ?? [],
                'esforco_disponivel_horas' => (float) ($esforco['esforco_disponivel_horas'] ?? 0),
                'esforco_proprio' => (float) ($esforco['esforco_proprio'] ?? 0),
                'esforco_total_horas' => (float) ($esforco['esforco_total_horas'] ?? 0),
                'planejado_percentual_disponivel' => (float) ($esforco['planejado_percentual_disponivel'] ?? 0),
            ]);
        }

        return $nos;
    }

    /**
     * Calcula esforço próprio e total (acumulado) para todos os processos da cadeia.
     *
     * @return array<string, array{esforco_disponivel_horas: float, esforco_proprio: float, esforco_total_horas: float, planejado_percentual_disponivel: float}>
     */
    private function calcularEsforcoProcessos(string $cadeiaValorId): array
    {
        $rows = $this->repository->loadEsforcoPorProcessosDaCadeia($cadeiaValorId);

        if ($rows === []) {
            return [];
        }

        // Montar mapa para o assembler genérico
        $mapa = [];
        foreach ($rows as $row) {
            $disponivel = (float) ($row->esforco_disponivel_horas ?? 0);
            $planejado = (float) ($row->esforco_proprio ?? 0);

            $mapa[$row->processo_id] = [
                'processo_pai_id' => $row->processo_pai_id,
                'esforco_disponivel_horas' => $disponivel,
                'esforco_proprio' => $planejado,
                'esforco_total_horas' => $planejado,
                'planejado_percentual_disponivel' => ArvoreInstitucionalEsforcoSupport::percentual($planejado, $disponivel),
            ];
        }

        // Conectar filhos e acumular horas usando assembler genérico
        $this->graphAssembler->conectarFilhos($mapa, [
            ['field' => 'processo_pai_id', 'key' => 'filhos_processo_pai'],
        ]);
        $this->graphAssembler->acumularHoras($mapa);

        return $mapa;
    }

    private function calcularNivel(CadeiaValorProcesso $processo, Collection $todosProcessos): int
    {
        $nivel = 1;
        $atual = $processo;

        while ($atual->processo_pai_id !== null) {
            $pai = $todosProcessos->firstWhere('id', $atual->processo_pai_id);
            if (!$pai instanceof CadeiaValorProcesso) {
                break;
            }
            $nivel++;
            $atual = $pai;
        }

        return $nivel;
    }

    private function calcularNivelMaximo(CadeiaValorProcesso $processoFocal, Collection $todosProcessos): int
    {
        $maxNivel = 0;
        $this->calcularProfundidadeRecursiva($todosProcessos, null, 1, $maxNivel);

        return $maxNivel;
    }

    private function calcularProfundidadeRecursiva(Collection $todosProcessos, ?string $paiId, int $nivelAtual, int &$maxNivel): void
    {
        $filhos = $todosProcessos->where('processo_pai_id', $paiId);

        if ($filhos->isEmpty()) {
            $maxNivel = max($maxNivel, $nivelAtual - 1);
            return;
        }

        foreach ($filhos as $filho) {
            $this->calcularProfundidadeRecursiva($todosProcessos, $filho->id, $nivelAtual + 1, $maxNivel);
        }
    }
}
