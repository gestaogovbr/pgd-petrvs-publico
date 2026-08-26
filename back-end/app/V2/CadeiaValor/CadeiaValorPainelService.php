<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor;

use App\Repository\CadeiaValor\Contracts\CadeiaValorReadRepositoryContract;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalAbrangencia;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalAbrangenciaPolicy;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalPainelAssembler;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalPainelDataProvider;
use App\V2\ArvoreInstitucional\DTOs\EntregaPlanoItemDTO;
use App\V2\ArvoreInstitucional\DTOs\EntregasListagemDTO;
use App\V2\ArvoreInstitucional\DTOs\EquipesListagemDTO;
use App\V2\ArvoreInstitucional\DTOs\EsforcoPorUnidadeDTO;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelEntregasDetalhamentoDTO;
use App\V2\CadeiaValor\DTOs\CadeiaValorPainelResumoDTO;
use App\V2\CadeiaValor\Validators\CadeiaValorProcessoValidator;

class CadeiaValorPainelService
{
    public function __construct(
        private readonly CadeiaValorReadRepositoryContract $repository,
        private readonly ArvoreInstitucionalPainelAssembler $painelAssembler,
        private readonly ArvoreInstitucionalPainelDataProvider $painelDataProvider,
        private readonly CadeiaValorProcessoValidator $validator,
        private readonly ArvoreInstitucionalAbrangenciaPolicy $abrangenciaPolicy,
    ) {}

    public function getResumo(string $cadeiaValorId, string $processoId, ?string $unidadeId = null): CadeiaValorPainelResumoDTO
    {
        $this->validator->validar($cadeiaValorId, $processoId);

        $geral = $this->repository->buscarDadosGeraisPainel($processoId, $cadeiaValorId);

        $aggItem = $this->painelDataProvider->agregarEsforcoPessoasEntregas(CadeiaValorNoConfig::get(), [$processoId], $unidadeId);

        $idsConsolidado = $this->repository->coletarIdsFilhosRecursivo($processoId);
        $aggConsolidado = $this->painelDataProvider->agregarEsforcoPessoasEntregas(CadeiaValorNoConfig::get(), $idsConsolidado, $unidadeId);

        $filtroUnidades = $this->painelDataProvider->listarFiltroUnidades(CadeiaValorNoConfig::get(), [$processoId]);

        return new CadeiaValorPainelResumoDTO(
            processo_id: (string) $geral->processo_id,
            processo_nome: (string) $geral->processo_nome,
            nivel: (int) $geral->nivel,
            item: $this->painelAssembler->montarSecao($aggItem),
            consolidado: $this->painelAssembler->montarSecao($aggConsolidado),
            filtro_unidades: $filtroUnidades,
        );
    }

    /**
     * Detalhamento de entregas com filtros e abrangência.
     *
     * @param array{unidade_id?: string|null, plano_entrega_entrega_id?: string|null, data_inicio?: string|null, data_fim?: string|null, abrangencia?: string|null} $filtros
     */
    public function getEntregasDetalhamento(string $cadeiaValorId, string $processoId, array $filtros = []): CadeiaValorPainelEntregasDetalhamentoDTO
    {
        $this->validator->validar($cadeiaValorId, $processoId);

        [$processoIds, $unidadeIds] = $this->abrangenciaPolicy->resolver(
            $processoId,
            $filtros['unidade_id'] ?? null,
            ArvoreInstitucionalAbrangencia::tryFrom($filtros['abrangencia'] ?? ''),
            fn (string $id) => $this->repository->coletarIdsFilhosRecursivo($id),
        );

        $filtrosQuery = [
            'plano_entrega_entrega_id' => $filtros['plano_entrega_entrega_id'] ?? null,
            'data_inicio' => $filtros['data_inicio'] ?? null,
            'data_fim' => $filtros['data_fim'] ?? null,
        ];

        if ($unidadeIds !== null) {
            $filtrosQuery['unidade_ids'] = $unidadeIds;
        } elseif (!empty($filtros['unidade_id'])) {
            $filtrosQuery['unidade_id'] = $filtros['unidade_id'];
        }

        $rows = $this->painelDataProvider->listarDetalhamentoEntregas(CadeiaValorNoConfig::get(), $processoIds, $filtrosQuery);
        $detalhamento = $this->painelAssembler->montarDetalhamento($rows);

        return new CadeiaValorPainelEntregasDetalhamentoDTO(
            processo_id: $processoId,
            itens: $detalhamento['itens'],
            filtro_entregas: $detalhamento['filtro_entregas'],
            filtro_unidades: $detalhamento['filtro_unidades'],
        );
    }

    /**
     * Entregas vinculadas ao processo com progresso e esforço.
     */
    public function getEntregasPorNo(string $cadeiaValorId, string $processoId): EntregasListagemDTO
    {
        $this->validator->validar($cadeiaValorId, $processoId);

        $rowsEntregas = $this->painelDataProvider->listarEntregasPorNo(CadeiaValorNoConfig::get(), [$processoId]);
        $rowsUnidades = $this->painelDataProvider->listarEsforcoPorUnidade(CadeiaValorNoConfig::get(), [$processoId]);

        $itens = array_map(
            static fn (\stdClass $row) => EntregaPlanoItemDTO::fromRow($row),
            $rowsEntregas,
        );
        $porUnidade = array_map(
            static fn (\stdClass $row) => EsforcoPorUnidadeDTO::fromRow($row),
            $rowsUnidades,
        );

        return new EntregasListagemDTO(
            node_id: $processoId,
            total_entregas: count($itens),
            itens: $itens,
            esforco_por_unidade: $porUnidade,
        );
    }

    /**
     * Esforço por unidade (equipes) vinculadas ao processo.
     */
    public function getEquipesPorNo(string $cadeiaValorId, string $processoId): EquipesListagemDTO
    {
        $this->validator->validar($cadeiaValorId, $processoId);

        $rowsUnidades = $this->painelDataProvider->listarEsforcoPorUnidade(CadeiaValorNoConfig::get(), [$processoId]);
        $itens = array_map(
            static fn (\stdClass $row) => EsforcoPorUnidadeDTO::fromRow($row),
            $rowsUnidades,
        );

        return new EquipesListagemDTO(
            node_id: $processoId,
            itens: $itens,
        );
    }
}
