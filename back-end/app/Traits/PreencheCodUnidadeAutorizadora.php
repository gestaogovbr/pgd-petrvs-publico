<?php

declare(strict_types=1);

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;

trait PreencheCodUnidadeAutorizadora
{
    protected static function bootPreencheCodUnidadeAutorizadora(): void
    {
        static::creating(function (Model $model): void {
            if (filled($model->getAttribute('cod_unidade_autorizadora'))) {
                return;
            }

            $codUnidadeAutorizadora = tenant()?->api_cod_unidade_autorizadora;
            if (!filled($codUnidadeAutorizadora)) {
                return;
            }

            $model->setAttribute('cod_unidade_autorizadora', $codUnidadeAutorizadora);
        });
    }
}
