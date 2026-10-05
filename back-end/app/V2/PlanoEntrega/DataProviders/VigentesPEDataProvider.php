<?php

declare(strict_types=1);

namespace App\V2\PlanoEntrega\DataProviders;

use App\Models\PlanoEntrega;
use App\Repository\PlanoEntregaRepository;
use App\Repository\UnidadeRepository;
use App\V2\PlanoEntrega\DTOs\VigentesPEBuscaDTO;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * Planos de Entrega VIGENTES do usuário.
 *
 * Considera os PEs com status ATIVO cujo período (data_inicio..data_fim) contém a data de
 * hoje, nas unidades onde o usuário possui atribuição DIRETA (LOTADO, COLABORADOR, GESTOR,
 * GESTOR_SUBSTITUTO, GESTOR_DELEGADO). Não inclui unidades subordinadas.
 */
class VigentesPEDataProvider
{
    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly PlanoEntregaRepository $planoEntregaRepository,
    ) {}

    /**
     * @return LengthAwarePaginator<PlanoEntrega>
     */
    public function buscar(string $usuarioId, int $page = 1, int $perPage = 15): LengthAwarePaginator
    {
        $busca = new VigentesPEBuscaDTO(
            unidadesIds: $this->unidadeRepository->getUnidadesComAtribuicaoIds($usuarioId),
            page: $page,
            perPage: $perPage,
        );

        return $this->planoEntregaRepository->paginatePlanosEntregaVigentes($busca);
    }
}
