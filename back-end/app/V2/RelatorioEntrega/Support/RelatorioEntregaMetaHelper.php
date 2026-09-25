<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega\Support;

final class RelatorioEntregaMetaHelper
{
    /**
     * Extrai o valor numérico absoluto da meta/realizado conforme o tipo de indicador.
     * Retorna null para indicadores sem representação numérica (qualitativo/desconhecido).
     */
    public static function valorNumericoAbsoluto(mixed $jsonValue, ?string $tipoIndicador): ?float
    {
        $data = self::normalizarJsonMeta($jsonValue);
        if ($data === null) {
            return self::suportaValorNumerico($tipoIndicador) ? 0.0 : null;
        }

        return match ($tipoIndicador) {
            'PORCENTAGEM' => (float) ($data['porcentagem'] ?? 0),
            'QUANTIDADE' => (float) ($data['quantitativo'] ?? 0),
            'VALOR' => (float) ($data['valor'] ?? 0),
            default => null,
        };
    }

    /**
     * RN19.2 — Percentual de Alcance = (Valor Planejado / Valor Realizado) x 100.
     * Retorna null quando não há valores numéricos (ex.: qualitativo) ou realizado <= 0.
     */
    public static function valorPercentualAlcance(?float $planejado, ?float $realizado): ?float
    {
        if ($planejado === null || $realizado === null || $realizado <= 0.0) {
            return null;
        }

        return round($planejado / $realizado * 100.0, 2);
    }

    private static function suportaValorNumerico(?string $tipoIndicador): bool
    {
        return in_array($tipoIndicador, ['PORCENTAGEM', 'QUANTIDADE', 'VALOR'], true);
    }

    /** @return array<string, mixed>|null */
    private static function normalizarJsonMeta(mixed $jsonValue): ?array
    {
        if ($jsonValue === null || $jsonValue === '') {
            return null;
        }

        $data = is_string($jsonValue) ? json_decode($jsonValue, true) : $jsonValue;

        if (is_string($data)) {
            $data = json_decode($data, true);
        }

        if (is_object($data)) {
            $data = (array) $data;
        }

        return is_array($data) ? $data : null;
    }
}
