<?php

declare(strict_types=1);

namespace App\V2\Unidade;

use App\Cache\GestorHierarquiaCache;
use App\Repository\UnidadeRepository;
use App\V2\Unidade\DTOs\UnidadeBuscaDTO;
use App\V2\Unidade\DTOs\UnidadeIndexDTO;
use App\V2\Unidade\DTOs\UnidadeResumoDTO;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class UnidadeService
{
    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    public function index(UnidadeIndexDTO $dto): LengthAwarePaginator
    {
        return $this->unidadeRepository->index($dto);
    }

    public function buscarPorNomeOuCodigo(UnidadeBuscaDTO $dto): Collection
    {
        return $this->unidadeRepository->buscarPorNomeOuCodigo($dto);
    }

    public function isGestorHierarquia(string $unidadeId): bool
    {
        return $this->unidadeRepository->isUsuarioGestorRecursivo($unidadeId, Auth::id());
    }

    /**
     * #2360 RN10/RN12: Retorna as unidades onde o usuário logado possui atribuição
     * ativa e, opcionalmente, todas as suas subordinadas na cadeia hierárquica.
     *
     * @return UnidadeResumoDTO[]
     */
    public function buscarMinhasUnidades(bool $subordinadas): array
    {
        $usuarioId = Auth::id();

        $unidadeIds = GestorHierarquiaCache::getUnidadesComAtribuicao(
            $usuarioId,
            fn () => $this->unidadeRepository->getUnidadesComAtribuicaoIds($usuarioId),
        );

        if (empty($unidadeIds)) {
            return [];
        }

        if ($subordinadas) {
            $unidadeIds = array_merge($unidadeIds, $this->resolverSubordinadas($unidadeIds));
        }

        $unidadeIds = array_values(array_unique($unidadeIds));

        return $this->unidadeRepository->buscarResumoPorIds($unidadeIds)
            ->map(fn ($unidade) => UnidadeResumoDTO::fromModel($unidade))
            ->all();
    }

    /**
     * @param string[] $unidadeIds
     * @return string[]
     */
    private function resolverSubordinadas(array $unidadeIds): array
    {
        $subordinadas = [];

        foreach ($unidadeIds as $unidadeId) {
            $subordinadas = array_merge(
                $subordinadas,
                GestorHierarquiaCache::getSubordinadas(
                    $unidadeId,
                    fn () => $this->unidadeRepository->getSubordinadasRecursivasIds([$unidadeId]),
                ),
            );
        }

        return $subordinadas;
    }
}
