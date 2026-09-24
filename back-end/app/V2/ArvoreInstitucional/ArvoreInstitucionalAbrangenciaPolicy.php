<?php

declare(strict_types=1);

namespace App\V2\ArvoreInstitucional;

use App\Repository\UnidadeRepository;

/**
 * Resolve IDs de nós e unidades conforme o escopo de abrangência.
 * Injeta o UnidadeRepository para busca de unidades subordinadas (comum a todos os domínios).
 * Recebe via callable a lógica de buscar nós subordinados (específica de cada domínio).
 */
class ArvoreInstitucionalAbrangenciaPolicy
{
    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    /**
     * @param callable(string): list<string> $coletarNosSubordinados Retorna IDs do nó + subordinados (específico do domínio)
     * @return array{0: list<string>, 1: list<string>|null}
     */
    public function resolver(
        string $nodeId,
        ?string $unidadeId,
        ?ArvoreInstitucionalAbrangencia $abrangencia,
        callable $coletarNosSubordinados,
    ): array {
        $nodeIds = [$nodeId];
        $unidadeIds = $unidadeId ? [$unidadeId] : null;

        return match ($abrangencia) {
            ArvoreInstitucionalAbrangencia::ITEM_SELECIONADO => [$nodeIds, $unidadeIds],
            ArvoreInstitucionalAbrangencia::ITENS_SUBORDINADOS => [
                array_values(array_filter(
                    $coletarNosSubordinados($nodeId),
                    static fn (string $id): bool => $id !== $nodeId,
                )),
                $unidadeIds,
            ],
            ArvoreInstitucionalAbrangencia::ITEM_E_SUBORDINADOS => [
                $coletarNosSubordinados($nodeId),
                $unidadeIds,
            ],
            ArvoreInstitucionalAbrangencia::UNIDADE_SELECIONADA => [
                $nodeIds,
                $unidadeId ? [$unidadeId] : [],
            ],
            ArvoreInstitucionalAbrangencia::UNIDADE_E_SUBORDINADAS => [
                $nodeIds,
                $unidadeId
                    ? $this->coletarUnidadesComSubordinadas($unidadeId)
                    : [],
            ],
            default => [$nodeIds, $unidadeIds],
        };
    }

    /**
     * @return list<string>
     */
    private function coletarUnidadesComSubordinadas(string $unidadeId): array
    {
        $subordinadas = $this->unidadeRepository
            ->getSubordinadasRecursivas([$unidadeId])
            ->pluck('id')
            ->all();

        return array_values(array_unique(array_merge([$unidadeId], $subordinadas)));
    }
}
