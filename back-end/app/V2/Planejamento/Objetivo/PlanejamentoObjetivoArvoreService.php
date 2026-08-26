<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

use App\Repository\PlanejamentoObjetivo\Contracts\PlanejamentoObjetivoReadRepositoryContract;
use App\V2\ArvoreInstitucional\ArvoreInstitucionalEsforcoGraphDataProvider;
use App\V2\ArvoreInstitucional\DTOs\ArvoreResponseDTO;
use App\V2\Planejamento\Objetivo\DTOs\EsforcoNodeDTO;
use App\V2\Planejamento\Objetivo\Validators\PlanejamentoObjetivoValidator;

class PlanejamentoObjetivoArvoreService
{
    public function __construct(
        private readonly PlanejamentoObjetivoReadRepositoryContract $repository,
        private readonly PlanejamentoEsforcoGraphAssembler $esforcoGraphAssembler,
        private readonly ObjetivoArvoreVisualizacaoAssembler $arvoreVisualizacaoAssembler,
        private readonly ArvoreInstitucionalEsforcoGraphDataProvider $esforcoGraphDataProvider,
        private readonly PlanejamentoObjetivoValidator $validator,
    ) {}

    /**
     * Fechamento bidirecional do objetivo (descendentes + ancestrais),
     * com esforço acumulado em cada nó.
     *
     * @deprecated Usado pelo gráfico de força (objetivo-grafico). Preferir getArvoreVisualizacao.
     * @return array<string, EsforcoNodeDTO>
     */
    public function getEsforcoTotal(string $objetivoId): array
    {
        $objetivo = $this->validator->validar($objetivoId);

        $ids = $this->repository->coletarIdsFechamento($objetivo->id);
        if ($ids === []) {
            return [];
        }

        return $this->esforcoGraphAssembler->assemble(
            $this->esforcoGraphDataProvider->loadEsforcoPorNos(PlanejamentoObjetivoNoConfig::get(), $ids),
            fn (array $idsVinculo) => $this->repository->lookupNomes($idsVinculo),
        );
    }

    /**
     * Árvore de filhos (mesmo planejamento) com cadeia de superiores em resumo textual.
     */
    public function getArvoreVisualizacao(string $objetivoId): ArvoreResponseDTO
    {
        $objetivo = $this->validator->validar($objetivoId);

        $ids = $this->repository->coletarIdsFechamento($objetivo->id);
        if ($ids === []) {
            return ArvoreResponseDTO::fromMapa($objetivoId, [], ['cadeia_superior' => []]);
        }

        $mapa = $this->esforcoGraphDataProvider->carregarEsforcoAcumulado(PlanejamentoObjetivoNoConfig::get(), noIds: $ids);
        $cadeiaSuperior = $this->arvoreVisualizacaoAssembler->montarCadeiaSuperior($objetivoId, $mapa);

        return ArvoreResponseDTO::fromMapa($objetivoId, $mapa, ['cadeia_superior' => $cadeiaSuperior]);
    }
}
