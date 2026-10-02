<?php

declare(strict_types=1);

namespace App\V2\RelatorioEntrega\Support;

final class RelatorioEntregaSituacaoHelper
{
    public const INCLUIDA = 'Incluída';

    public const EM_ANDAMENTO = 'Em andamento';

    public const FINALIZADA = 'Finalizada';

    /**
     * Classifica a situação da entrega em função das datas de início/fim e da data da consulta.
     *
     * DC < DI → Incluída | DI <= DC <= DF → Em andamento | DC > DF → Finalizada
     */
    public static function calcular(?string $dataInicio, ?string $dataFim, string $dataConsulta): string
    {
        if ($dataInicio === null || $dataInicio === '') {
            return self::INCLUIDA;
        }

        $inicio = self::toDateString($dataInicio);
        $fim = self::toDateString($dataFim ?? $dataInicio);
        $consulta = self::toDateString($dataConsulta);

        if ($consulta < $inicio) {
            return self::INCLUIDA;
        }

        if ($consulta > $fim) {
            return self::FINALIZADA;
        }

        return self::EM_ANDAMENTO;
    }

    private static function toDateString(string $value): string
    {
        return substr($value, 0, 10);
    }
}
