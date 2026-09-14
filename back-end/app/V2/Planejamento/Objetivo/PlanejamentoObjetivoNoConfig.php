<?php

declare(strict_types=1);

namespace App\V2\Planejamento\Objetivo;

use App\V2\ArvoreInstitucional\NoOrigemQueryConfig;

/**
 * Singleton com a configuração estrutural do Planejamento Institucional para o DataProvider genérico.
 */
final class PlanejamentoObjetivoNoConfig
{
    private static ?NoOrigemQueryConfig $instance = null;

    public static function get(): NoOrigemQueryConfig
    {
        return self::$instance ??= new NoOrigemQueryConfig(
            tabelaVinculo: 'planos_entregas_entregas_objetivos',
            colunaFkNo: 'planejamento_objetivo_id',
            tabelaNo: 'planejamentos_objetivos',
            colunaPaiId: 'objetivo_pai_id',
            colunaPaiSecundarioId: 'objetivo_superior_id',
            containerTabela: 'planejamentos',
            containerFk: 'planejamento_id',
            tipoTabela: 'planejamentos_tipos_objetivos',
            tipoFk: 'tipo_objetivo_id',
            orderBy: 'no_tbl.nome',
        );
    }
}
