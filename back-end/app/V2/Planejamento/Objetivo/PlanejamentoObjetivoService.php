<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

use App\Exceptions\NotFoundException;
use App\Models\PlanejamentoObjetivo;
use App\Repository\PlanejamentoObjetivo\Contracts\PlanejamentoObjetivoReadRepositoryContract;
use App\V2\Planejamento\Objetivo\DTOs\EsforcoNodeDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoEntregaPlanoItemDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoEntregasListagemDTO;
use App\V2\Planejamento\Objetivo\DTOs\ObjetivoEsforcoPorUnidadeDTO;

class PlanejamentoObjetivoService
{
    public function __construct(
        private readonly PlanejamentoObjetivoReadRepositoryContract $repository,
        private readonly EsforcoTotalGraphAssembler $esforcoGraphAssembler,
    ) {}

    /**
     * Retorna o fechamento bidirecional do objetivo (descendentes + ancestrais),
     * navegando pelas duas formas de vínculo (objetivo_pai_id e objetivo_superior_id),
     * com esforço acumulado em cada nó e nomes de pai/superior hidratados em todo o mapa.
     *
     * @return array<string, EsforcoNodeDTO>
     */
    public function getEsforcoTotal(string $objetivoId): array
    {
        $objetivo = $this->findObjetivoOrFail($objetivoId);

        $ids = $this->repository->coletarIdsFechamento($objetivo->id);
        if ($ids === []) {
            return [];
        }

        return $this->esforcoGraphAssembler->assemble(
            $this->repository->loadEsforcoPorIds($ids),
            fn (array $idsVinculo) => $this->repository->lookupNomes($idsVinculo),
        );
    }

    /**
     * Entregas do plano de entregas vinculadas ao objetivo (com progresso no PE) e esforço agregado
     * por entrega e por unidade (somente planos de trabalho concluídos), alinhado a {@see getEsforcoTotal}.
     */
    public function getEntregasComEsforco(string $objetivoId): ObjetivoEntregasListagemDTO
    {
        $this->findObjetivoOrFail($objetivoId);

        $rowsEntregas = $this->repository->listarEntregasPlanoEntregaPorObjetivoId($objetivoId);
        $rowsUnidades = $this->repository->listarEsforcoPorUnidadePlanoTrabalhoConcluidoPorObjetivoId($objetivoId);

        $itens = array_map(
            static fn (\stdClass $row) => ObjetivoEntregaPlanoItemDTO::fromRow($row),
            $rowsEntregas,
        );
        $porUnidade = array_map(
            static fn (\stdClass $row) => ObjetivoEsforcoPorUnidadeDTO::fromRow($row),
            $rowsUnidades,
        );

        return new ObjetivoEntregasListagemDTO(
            objetivo_id: $objetivoId,
            total_entregas: count($itens),
            itens: $itens,
            esforco_por_unidade: $porUnidade,
        );
    }

    private function findObjetivoOrFail(string $objetivoId): PlanejamentoObjetivo
    {
        $objetivo = $this->repository->find($objetivoId);
        if (!$objetivo instanceof PlanejamentoObjetivo) {
            throw new NotFoundException("Objetivo com id '{$objetivoId}' não foi encontrado ou foi removido.");
        }

        return $objetivo;
    }
}
