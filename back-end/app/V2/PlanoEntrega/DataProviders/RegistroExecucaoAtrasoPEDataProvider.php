<?php

declare(strict_types=1);

namespace App\V2\PlanoEntrega\DataProviders;

use App\Models\PlanoEntrega;
use App\Repository\PlanoEntregaRepository;
use App\Repository\UnidadeRepository;
use App\V2\PlanoEntrega\DTOs\RegistroExecucaoAtrasoPEBuscaDTO;
use App\V2\PlanoEntrega\Traits\ResolveUnidadesGeridasTrait;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * Planos de Entrega com Registros de Execução em atraso para o usuário.
 *
 * O registro de execução (progresso) de um PE compete ao gestor da PRÓPRIA unidade,
 * portanto considera os PEs das unidades que o usuário chefia, atrasados (data_fim
 * vencida há mais que o prazo de progresso), sem nenhum registro de progresso e criados
 * após a mudança de regra (PlanoEntrega::DATA_MUDANCA_REGRA_PE).
 *
 * Expõe duas finalidades sobre o mesmo critério (contador do card e listagem do hiperlink):
 *   - count(): quantidade de entregas em atraso (sem progresso);
 *   - buscar(): os PEs que contêm essas entregas, paginados.
 */
class RegistroExecucaoAtrasoPEDataProvider
{
    use ResolveUnidadesGeridasTrait;

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
        return $this->planoEntregaRepository->countEntregasSemProgresso(
            $this->resolverUnidadesGeridas($usuarioId),
            PlanoEntrega::DATA_MUDANCA_REGRA_PE,
        );
    }

    /**
     * @return LengthAwarePaginator<PlanoEntrega>
     */
    public function buscar(string $usuarioId, int $page = 1, int $perPage = 15): LengthAwarePaginator
    {
        return $this->planoEntregaRepository->paginatePlanosEntregaComRegistroAtraso($this->buscaDTO($usuarioId, $page, $perPage));
    }

    private function buscaDTO(string $usuarioId, int $page = 1, int $perPage = 15): RegistroExecucaoAtrasoPEBuscaDTO
    {
        return new RegistroExecucaoAtrasoPEBuscaDTO(
            unidadesIds: $this->resolverUnidadesGeridas($usuarioId),
            criadosApos: PlanoEntrega::DATA_MUDANCA_REGRA_PE,
            page: $page,
            perPage: $perPage,
        );
    }
}
