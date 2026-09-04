<?php

namespace App\Observers;

use App\Cache\GestorHierarquiaCache;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Services\Siape\Unidade\Enum\Atribuicao as AtribuicaoEnum;

class UnidadeIntegranteAtribuicaoObserver
{
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
        $usuarioId = $model->vinculo?->usuario_id;

        if ($usuarioId === null) {
            return;
        }

        if (AtribuicaoEnum::isGestor($model->atribuicao)) {
            GestorHierarquiaCache::forgetUsuario($usuarioId);
            return;
        }

        GestorHierarquiaCache::forgetAtribuicoesUsuario($usuarioId);
    }
}
