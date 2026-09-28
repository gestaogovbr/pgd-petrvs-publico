<?php

declare(strict_types=1);

namespace App\V2\PlanoEntrega\DataProviders;

use App\Models\PlanoEntrega;
use App\Repository\PlanoEntregaRepository;
use App\Repository\UnidadeRepository;
use App\V2\PlanoEntrega\DTOs\HomologacaoPendentePEBuscaDTO;
use App\V2\PlanoEntrega\Traits\ResolveUnidadesFilhasGeridasTrait;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * Planos de Entrega aguardando homologação para o usuário.
 *
 * A homologação de um PE compete à chefia da unidade-pai, portanto considera os PEs das
 * unidades FILHAS diretas das unidades que o usuário chefia, com status HOMOLOGANDO.
 *
 * Expõe duas finalidades sobre o mesmo critério (contador do card e listagem do hiperlink):
 *   - count(): quantidade;
 *   - buscar(): os PEs correspondentes, paginados.
 */
class HomologacaoPendentePEDataProvider
{
    use ResolveUnidadesFilhasGeridasTrait;

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly PlanoEntregaRepository $planoEntregaRepository,
    ) {}

    protected function getUnidadeRepository(): UnidadeRepository
    {
        return $this->unidadeRepository;
    }

    public function count(string $usuarioId): int
    {
        return $this->planoEntregaRepository->countPlanosEntregaHomologacao(
            $this->resolverUnidadesFilhasGeridas($usuarioId),
        );
    }

    /**
     * @return LengthAwarePaginator<PlanoEntrega>
     */
    public function buscar(string $usuarioId, int $page = 1, int $perPage = 15): LengthAwarePaginator
    {
        $busca = new HomologacaoPendentePEBuscaDTO(
            unidadesIds: $this->resolverUnidadesFilhasGeridas($usuarioId),
            page: $page,
            perPage: $perPage,
        );

        return $this->planoEntregaRepository->paginatePlanosEntregaHomologacao($busca);
    }
}
