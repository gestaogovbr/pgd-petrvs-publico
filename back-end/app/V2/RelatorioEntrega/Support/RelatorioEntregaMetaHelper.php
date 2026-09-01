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
     * Valor absoluto da meta/realizado do registro de execução mais recente.
     */
    public static function valorAbsolutoRegistroExecucao(
        mixed $jsonValue,
        ?string $tipoIndicador,
        bool $temRegistroExecucao,
    ): float {
        if (! $temRegistroExecucao) {
            return 0.0;
        }

        return self::valorNumericoAbsoluto($jsonValue, $tipoIndicador);
    }

    /**
     * Alcançado = valor absoluto do realizado no registro de execução; 0 sem registro.
     */
    public static function valorAlcancado(mixed $realizadoJson, ?string $tipoIndicador, bool $temRegistroExecucao): float
    {
        return self::valorAbsolutoRegistroExecucao($realizadoJson, $tipoIndicador, $temRegistroExecucao);
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
