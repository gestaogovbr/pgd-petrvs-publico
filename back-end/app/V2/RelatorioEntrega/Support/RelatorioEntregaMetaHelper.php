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

    /**
     * RN18 — Planejado = Meta * Parcela da entrega no plano / 100.
     */
    public static function valorPlanejado(mixed $metaJson, ?string $tipoIndicador, mixed $parcela): float
    {
        $meta = self::valorNumericoAbsoluto($metaJson, $tipoIndicador);
        $parcelaPercentual = is_numeric($parcela) ? (float) $parcela : 0.0;

        return $meta * $parcelaPercentual / 100.0;
    }

    /**
     * RN19.1 — Alcançado = 0 quando não houver registro de execução da entrega.
     */
    public static function valorAlcancado(mixed $realizadoJson, ?string $tipoIndicador, bool $temRegistroExecucao): float
    {
        if (! $temRegistroExecucao) {
            return 0.0;
        }

        return self::valorNumericoAbsoluto($realizadoJson, $tipoIndicador);
    }

    /**
     * RN19.2 — Percentual de Alcance = (Valor Planejado / Valor Realizado) x 100.
     */
    public static function valorPercentualAlcance(float $planejado, float $realizado): float
    {
        if ($realizado <= 0.0) {
            return 0.0;
        }

        return round($planejado / $realizado * 100.0, 2);
    }
}
