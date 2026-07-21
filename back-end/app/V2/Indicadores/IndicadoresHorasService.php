<?php

declare(strict_types=1);

namespace App\V2\Indicadores;

use App\Repository\Afastamento\AfastamentoRepository;
use App\Repository\Feriado\FeriadoRepository;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Services\CalendarioService;
use App\V2\Indicadores\DTOs\IndicadoresHorasFilterDTO;
use Illuminate\Support\Collection;

class IndicadoresHorasService
{
    private const CATEGORIA_PROPRIA_UNIDADE = 'Própria Unidade';
    private const CATEGORIA_OUTRAS_UNIDADES = 'Outras Unidades';
    private const CATEGORIA_NAO_VINCULADAS = 'Não vinculadas a entregas';

    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly PlanoTrabalhoEntregaRepository $entregaRepository,
        private readonly AfastamentoRepository $afastamentoRepository,
        private readonly FeriadoRepository $feriadoRepository,
        private readonly UnidadeRepository $unidadeRepository,
        private readonly CalendarioService $calendarioService,
    ) {}

    /**
     * @return array<object>
     */
    public function horas(IndicadoresHorasFilterDTO $filtro): array
    {
        $unidadeIds = $this->resolverUnidadeIds($filtro);

        $planos = $this->planoTrabalhoRepository->buscarPlanosParaIndicadores($unidadeIds, [
            'data_inicial' => $filtro->dataInicial,
            'data_final' => $filtro->dataFinal,
            'somente_vigentes' => $filtro->somenteVigentes,
        ]);

        if ($planos->isEmpty()) {
            return $this->resultadoVazio();
        }

        $usuarioIds = $planos->pluck('usuario_id')->unique()->values()->all();
        $planoIds = $planos->pluck('id')->all();

        $entregas = $this->entregaRepository->buscarEntregasParaIndicadores($planoIds);
        $afastamentos = $this->afastamentoRepository->buscarAfastamentosPorUsuarios($usuarioIds);
        $feriadosPorUnidade = $this->carregarFeriadosPorUnidade($unidadeIds, $planos);

        $diasUteisPorPlano = $this->calcularDiasUteisPorPlano($planos, $feriadosPorUnidade, $afastamentos);

        return $this->calcularHorasPorCategoria($planos, $entregas, $diasUteisPorPlano);
    }

    /**
     * @return array<string>
     */
    private function resolverUnidadeIds(IndicadoresHorasFilterDTO $filtro): array
    {
        $unidadeIds = [$filtro->unidadeId];

        if ($filtro->incluirSubordinadas) {
            $subordinadas = $this->unidadeRepository->getSubordinadasRecursivas([$filtro->unidadeId]);
            $unidadeIds = array_merge($unidadeIds, $subordinadas->pluck('id')->all());
        }

        return $unidadeIds;
    }

    /**
     * @param array<string> $unidadeIds
     * @return array<string, array{cadastrados: array, religiosos: array, diasSemana: array}>
     */
    private function carregarFeriadosPorUnidade(array $unidadeIds, Collection $planos): array
    {
        $unidades = $this->unidadeRepository->buscarComLocalidade($unidadeIds);

        $dataMin = strtotime($planos->min('data_inicio'));
        $dataMax = strtotime($planos->max('data_fim'));
        $feriadosReligiosos = $this->calendarioService->listaFeriadosReligiosos($dataMin, $dataMax);

        $feriadosPorUnidade = [];
        foreach ($unidades as $unidadeId => $unidade) {
            $feriados = $this->feriadoRepository->buscarFeriadosPorUnidade(
                $unidade->entidade_id,
                $unidade->cidade_id,
                $unidade->uf
            );
            $feriadosPorUnidade[$unidadeId] = [
                'cadastrados' => $feriados['datas'],
                'religiosos' => $feriadosReligiosos,
                'diasSemana' => $feriados['diasSemana'],
            ];
        }

        return $feriadosPorUnidade;
    }

    /**
     * @param array<string, array{cadastrados: array, religiosos: array, diasSemana: array}> $feriadosPorUnidade
     * @param array<string, array<array{data_inicio: string, data_fim: string}>> $afastamentos
     * @return array<string, int>
     */
    private function calcularDiasUteisPorPlano(Collection $planos, array $feriadosPorUnidade, array $afastamentos): array
    {
        $diasUteis = [];

        foreach ($planos as $plano) {
            $feriados = $feriadosPorUnidade[$plano->unidade_id] ?? ['cadastrados' => [], 'religiosos' => [], 'diasSemana' => []];
            $afastamentosUsuario = $afastamentos[$plano->usuario_id] ?? [];

            $diasUteis[$plano->id] = $this->calendarioService->qtdDiasUteisComAfastamentos(
                $plano->data_inicio,
                $plano->data_fim,
                $feriados['cadastrados'],
                $feriados['religiosos'],
                $afastamentosUsuario,
                $feriados['diasSemana']
            );
        }

        return $diasUteis;
    }

    /**
     * @param array<string, int> $diasUteisPorPlano
     * @return array<object>
     */
    private function calcularHorasPorCategoria(Collection $planos, Collection $entregas, array $diasUteisPorPlano): array
    {
        $planosIndexados = $planos->keyBy('id');
        $horasPorCategoria = [
            self::CATEGORIA_PROPRIA_UNIDADE => 0.0,
            self::CATEGORIA_OUTRAS_UNIDADES => 0.0,
            self::CATEGORIA_NAO_VINCULADAS => 0.0,
        ];

        foreach ($entregas as $entrega) {
            $plano = $planosIndexados[$entrega->plano_trabalho_id] ?? null;
            if ($plano === null) {
                continue;
            }

            $diasUteis = $diasUteisPorPlano[$plano->id] ?? 0;
            if ($diasUteis === 0) {
                continue;
            }

            $horas = round($entrega->forca_trabalho * $diasUteis * $plano->carga_horaria / 100, 2);
            $categoria = $this->determinarCategoria($entrega, $plano);
            $horasPorCategoria[$categoria] += $horas;
        }

        return $this->formatarResultado($horasPorCategoria);
    }

    private function determinarCategoria(object $entrega, object $plano): string
    {
        if ($entrega->plano_entrega_entrega_id === null) {
            return self::CATEGORIA_NAO_VINCULADAS;
        }
        if ($entrega->pe_unidade_id === $plano->unidade_id) {
            return self::CATEGORIA_PROPRIA_UNIDADE;
        }
        return self::CATEGORIA_OUTRAS_UNIDADES;
    }

    /**
     * @param array<string, float> $horasPorCategoria
     * @return array<object>
     */
    private function formatarResultado(array $horasPorCategoria): array
    {
        return [
            (object) ['categoria' => self::CATEGORIA_PROPRIA_UNIDADE, 'horas' => $horasPorCategoria[self::CATEGORIA_PROPRIA_UNIDADE]],
            (object) ['categoria' => self::CATEGORIA_OUTRAS_UNIDADES, 'horas' => $horasPorCategoria[self::CATEGORIA_OUTRAS_UNIDADES]],
            (object) ['categoria' => self::CATEGORIA_NAO_VINCULADAS, 'horas' => $horasPorCategoria[self::CATEGORIA_NAO_VINCULADAS]],
        ];
    }

    /**
     * @return array<object>
     */
    private function resultadoVazio(): array
    {
        return $this->formatarResultado([
            self::CATEGORIA_PROPRIA_UNIDADE => 0.0,
            self::CATEGORIA_OUTRAS_UNIDADES => 0.0,
            self::CATEGORIA_NAO_VINCULADAS => 0.0,
        ]);
    }
}
