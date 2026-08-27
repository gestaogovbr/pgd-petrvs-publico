<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega\Support;

final class RelatorioEntregaMetaHelper
{
    /**
     * Extrai valor numérico absoluto da meta ou realizado conforme tipo de indicador.
     */
    public static function valorNumericoAbsoluto(mixed $jsonValue, ?string $tipoIndicador): float
    {
        if ($jsonValue === null || $jsonValue === '') {
            return 0.0;
        }

        $data = is_string($jsonValue) ? json_decode($jsonValue, true) : $jsonValue;
        if (! is_array($data)) {
            return 0.0;
        }

        return match ($tipoIndicador) {
            'PORCENTAGEM' => (float) ($data['porcentagem'] ?? 0),
            'QUANTIDADE' => (float) ($data['quantitativo'] ?? 0),
            'VALOR' => (float) ($data['valor'] ?? 0),
            default => 0.0,
        };
    }
}
