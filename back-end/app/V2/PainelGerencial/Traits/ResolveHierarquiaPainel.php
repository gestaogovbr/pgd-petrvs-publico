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
     * Resolve a unidade selecionada e suas filhas diretas.
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
     * Retorna os IDs de uma unidade + todas as suas subordinadas recursivas.
     *
     * @return string[]
     */
    protected function idsComTodasSubordinadas(Unidade $unidade): array
    {
        $subordinadas = $this->getUnidadeRepository()->getSubordinadasRecursivas([$unidade->id]);

        return [$unidade->id, ...$subordinadas->pluck('id')->toArray()];
    }
}
