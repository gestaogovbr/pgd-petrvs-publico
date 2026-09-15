<?php

declare(strict_types=1);

namespace App\V2\PlanoEntrega\DataProviders;

use App\Models\PlanoEntrega;
use App\Repository\PlanoEntregaRepository;
use App\Repository\UnidadeRepository;
use App\V2\PlanoEntrega\DTOs\AvaliacaoPendentePEBuscaDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * Planos de Entrega em avaliação pendente para o usuário.
 *
 * A avaliação de um PE compete à chefia da unidade-pai, portanto considera os PEs das
 * unidades FILHAS diretas das unidades que o usuário chefia, com status CONCLUIDO e
 * criados após a mudança de regra (PlanoEntrega::DATA_MUDANCA_REGRA_PE).
 *
 * Expõe duas finalidades sobre o mesmo critério (contador do card e listagem do hiperlink):
 *   - count(): quantidade;
 *   - buscar(): os PEs correspondentes, paginados.
 */
class AvaliacaoPendentePEDataProvider
{
    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly PlanoEntregaRepository $planoEntregaRepository,
    ) {}

    public function count(string $usuarioId): int
    {
        return $this->planoEntregaRepository->countPlanosEntregaAvaliacao(
            $this->unidadesAvaliaveis($usuarioId),
            PlanoEntrega::DATA_MUDANCA_REGRA_PE,
        );
    }

    /**
     * @return LengthAwarePaginator<PlanoEntrega>
     */
    public function buscar(string $usuarioId, int $page = 1, int $perPage = 15): LengthAwarePaginator
    {
        $busca = new AvaliacaoPendentePEBuscaDTO(
            unidadesIds: $this->unidadesAvaliaveis($usuarioId),
            criadosApos: PlanoEntrega::DATA_MUDANCA_REGRA_PE,
            page: $page,
            perPage: $perPage,
        );

        return $this->planoEntregaRepository->paginatePlanosEntregaAvaliacao($busca);
    }

    /**
     * Unidades filhas diretas das unidades que o usuário chefia.
     *
     * @return string[]
     */
    private function unidadesAvaliaveis(string $usuarioId): array
    {
        $gerenciadasIds = $this->unidadeRepository->getUnidadesGerenciadas($usuarioId)->pluck('id')->toArray();

        if ($gerenciadasIds === []) {
            return [];
        }

        return $this->unidadeRepository->getSubordinadas($gerenciadasIds)->pluck('id')->toArray();
    }
}
