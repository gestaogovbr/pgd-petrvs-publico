<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega\Support;

final class RelatorioEntregaTipoMetaHelper
{
    public static function label(?string $tipoIndicador): string
    {
        return match ($tipoIndicador) {
            'QUANTIDADE' => 'Quantidade',
            'VALOR' => 'Valor',
            'PORCENTAGEM' => 'Porcentagem',
            'QUALITATIVO' => 'Qualitativo',
            default => '-',
        };
    }
}
