<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

use App\Repository\PlanejamentoObjetivo\Contracts\PlanejamentoObjetivoReadRepositoryContract;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalAbrangencia;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalAbrangenciaPolicy;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalPainelDataProvider;
use App\V2\ArvoreInstitucional\DTOs\EntregaPlanoItemDTO;
use App\V2\ArvoreInstitucional\DTOs\EntregasListagemDTO;
use App\V2\ArvoreInstitucional\DTOs\EquipesListagemDTO;
use App\V2\ArvoreInstitucional\DTOs\EsforcoPorUnidadeDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelEntregasDetalhamentoDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoPainelResumoDTO;
use App\V2\Planejamento\Objetivo\Validators\PlanejamentoObjetivoValidator;

class PlanejamentoObjetivoPainelService
{
    public function __construct(
        private readonly PlanejamentoObjetivoReadRepositoryContract $repository,
        private readonly ObjetivoPainelAssembler $painelAssembler,
        private readonly ArvoreInstitucionalPainelDataProvider $painelDataProvider,
        private readonly ArvoreInstitucionalAbrangenciaPolicy $abrangenciaPolicy,
        private readonly PlanejamentoObjetivoValidator $validator,
    ) {}

    public function getResumo(string $objetivoId, ?string $unidadeId = null): ObjetivoPainelResumoDTO
    {
        $this->validator->validar($objetivoId);

        $geral = $this->repository->buscarDadosGeraisPainel($objetivoId);

        $aggItem = $this->painelDataProvider->agregarEsforcoPessoasEntregas(PlanejamentoObjetivoNoConfig::get(), [$objetivoId], $unidadeId);

        $idsConsolidado = $this->repository->coletarIdsSubordinados($objetivoId);
        $aggConsolidado = $this->painelDataProvider->agregarEsforcoPessoasEntregas(PlanejamentoObjetivoNoConfig::get(), $idsConsolidado, $unidadeId);

        $filtroUnidades = $this->painelDataProvider->listarFiltroUnidades(PlanejamentoObjetivoNoConfig::get(), [$objetivoId]);

        return $this->painelAssembler->montarResumo($geral, $aggItem, $aggConsolidado, $filtroUnidades);
    }

    /**
     * Entregas vinculadas ao objetivo com progresso e esforço.
     */
    public function getEntregasPorNo(string $objetivoId): EntregasListagemDTO
    {
        $this->validator->validar($objetivoId);

        $rowsEntregas = $this->painelDataProvider->listarEntregasPorNo(PlanejamentoObjetivoNoConfig::get(), [$objetivoId]);
        $rowsUnidades = $this->painelDataProvider->listarEsforcoPorUnidade(PlanejamentoObjetivoNoConfig::get(), [$objetivoId]);

        $itens = array_map(
            static fn (\stdClass $row) => EntregaPlanoItemDTO::fromRow($row),
            $rowsEntregas,
        );
        $porUnidade = array_map(
            static fn (\stdClass $row) => EsforcoPorUnidadeDTO::fromRow($row),
            $rowsUnidades,
        );

        return new EntregasListagemDTO(
            node_id: $objetivoId,
            total_entregas: count($itens),
            itens: $itens,
            esforco_por_unidade: $porUnidade,
        );
    }

    /**
     * Unidades (equipes) vinculadas ao objetivo com esforço.
     */
    public function getEquipesPorNo(string $objetivoId): EquipesListagemDTO
    {
        $this->validator->validar($objetivoId);

        $rowsUnidades = $this->painelDataProvider->listarEsforcoPorUnidade(PlanejamentoObjetivoNoConfig::get(), [$objetivoId]);
        $itens = array_map(
            static fn (\stdClass $row) => EsforcoPorUnidadeDTO::fromRow($row),
            $rowsUnidades,
        );

        return new EquipesListagemDTO(
            node_id: $objetivoId,
            itens: $itens,
        );
    }

    /**
     * Detalhamento de entregas do painel lateral com filtros e abrangência.
     */
    public function getEntregasDetalhamento(
        string $objetivoId,
        ?string $planoEntregaEntregaId = null,
        ?string $unidadeId = null,
        ?string $dataInicio = null,
        ?string $dataFim = null,
        ?string $abrangencia = null,
    ): ObjetivoPainelEntregasDetalhamentoDTO {
        $this->validator->validar($objetivoId);

        [$objetivoIds, $unidadeIds] = $this->abrangenciaPolicy->resolver(
            $objetivoId,
            $unidadeId,
            ArvoreInstitucionalAbrangencia::tryFrom($abrangencia ?? ''),
            fn (string $id) => $this->repository->coletarIdsSubordinados($id),
        );

        $filtros = [
            'plano_entrega_entrega_id' => $planoEntregaEntregaId,
            'data_inicio' => $dataInicio,
            'data_fim' => $dataFim,
        ];

        if ($unidadeIds !== null) {
            $filtros['unidade_ids'] = $unidadeIds;
        }

        $rows = $this->painelDataProvider->listarDetalhamentoEntregas(PlanejamentoObjetivoNoConfig::get(), $objetivoIds, $filtros);

        return $this->painelAssembler->montarDetalhamento($objetivoId, $rows);
    }
}
