<?php

namespace App\Observers;

use App\Cache\GestorHierarquiaCache;
use App\Models\UnidadeIntegranteAtribuicao;

class UnidadeIntegranteAtribuicaoObserver
{
    private const ATRIBUICOES_GESTOR = ['GESTOR', 'GESTOR_SUBSTITUTO', 'GESTOR_DELEGADO'];

    public function created(UnidadeIntegranteAtribuicao $model): void
    {
        $this->invalidarCacheUsuario($model);
    }

    public function updated(UnidadeIntegranteAtribuicao $model): void
    {
        $this->invalidarCacheUsuario($model);
    }

    public function deleted(UnidadeIntegranteAtribuicao $model): void
    {
        $this->invalidarCacheUsuario($model);
    }

    private function invalidarCacheUsuario(UnidadeIntegranteAtribuicao $model): void
    {
        if (!in_array($model->atribuicao, self::ATRIBUICOES_GESTOR, true)) {
            return;
        }

        $usuarioId = $model->vinculo?->usuario_id;

        if ($usuarioId === null) {
            return;
        }

        GestorHierarquiaCache::forgetUsuario($usuarioId);
    }
}
