<?php

declare(strict_types=1);

namespace App\V2\CadeiaValor;

use App\V2\ArvoreInstitucional\NoOrigemQueryConfig;

/**
 * Singleton com a configuração estrutural da Cadeia de Valor para o DataProvider genérico.
 */
final class CadeiaValorNoConfig
{
    private static ?NoOrigemQueryConfig $instance = null;

    public static function get(): NoOrigemQueryConfig
    {
        return self::$instance ??= new NoOrigemQueryConfig(
            tabelaVinculo: 'planos_entregas_entregas_processos',
            colunaFkNo: 'cadeia_processo_id',
            tabelaNo: 'cadeias_valores_processos',
            colunaPaiId: 'processo_pai_id',
            containerTabela: 'cadeias_valores',
            containerFk: 'cadeia_valor_id',
            tipoTabela: 'planejamentos_tipos_objetivos',
            tipoFk: 'tipo_elemento_id',
            orderBy: 'no_tbl.sequencia',
        );
    }
}
