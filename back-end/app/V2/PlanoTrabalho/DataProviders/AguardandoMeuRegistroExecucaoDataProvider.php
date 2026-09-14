<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\DataProviders;

use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * Registros de execução (consolidações) em atraso do próprio usuário.
 *
 * Expõe duas finalidades sobre o MESMO critério (garante consistência entre o contador
 * do card e a listagem do hiperlink):
 *   - count(): quantidade de consolidações em atraso;
 *   - buscar(): os Planos de Trabalho correspondentes, paginados.
 */
class AguardandoMeuRegistroExecucaoDataProvider
{
    public function __construct(
        private readonly PlanoTrabalhoConsolidacaoRepository $consolidacaoRepository,
    ) {}

    /**
     * @param string[] $unidadesIds
     */
    public function count(string $usuarioId, array $unidadesIds = []): int
    {
        return $this->consolidacaoRepository->countConsolidacoesAtrasadas($usuarioId, $unidadesIds);
    }

    /**
     * @param string[] $unidadesIds
     * @return LengthAwarePaginator<\App\Models\PlanoTrabalho>
     */
    public function buscar(string $usuarioId, int $page = 1, int $perPage = 15, array $unidadesIds = []): LengthAwarePaginator
    {
        return $this->consolidacaoRepository->buscarPlanosComConsolidacoesAtrasadas($usuarioId, $unidadesIds, $page, $perPage);
    }
}
