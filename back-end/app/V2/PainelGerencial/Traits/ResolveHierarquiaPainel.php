<?php

declare(strict_types=1);

namespace App\V2\PainelGerencial\Traits;

use App\Exceptions\NotFoundException;
use App\Models\Unidade;
use App\Repository\UnidadeRepository;
use Illuminate\Database\Eloquent\Collection;

trait ResolveHierarquiaPainel
{
    abstract protected function getUnidadeRepository(): UnidadeRepository;

    /**
     * Resolve a unidade selecionada e suas filhas diretas (RN17-20).
     *
     * @return array{unidade: Unidade, filhas: Collection<int, Unidade>}
     */
    protected function resolverHierarquia(string $unidadeId): array
    {
        $unidade = $this->getUnidadeRepository()->findById($unidadeId);

        if (!$unidade) {
            throw new NotFoundException('Unidade não encontrada.');
        }

        /** @var Collection<int, Unidade> $filhas */
        $filhas = $this->getUnidadeRepository()->getSubordinadas([$unidadeId]);

        return [
            'unidade' => $unidade,
            'filhas' => $filhas,
        ];
    }

    /**
     * Retorna todos os IDs relevantes (unidade selecionada + filhas diretas).
     *
     * @param Collection<int, Unidade> $filhas
     * @return string[]
     */
    protected function todosIdsHierarquia(Unidade $unidade, Collection $filhas): array
    {
        return [$unidade->id, ...$filhas->pluck('id')->toArray()];
    }
}
