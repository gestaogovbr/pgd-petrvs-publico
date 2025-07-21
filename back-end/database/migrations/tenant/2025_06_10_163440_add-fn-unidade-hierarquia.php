<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement(<<<EOD
            CREATE FUNCTION `fn_obter_unidade_hierarquia`(p_unidade_id CHAR(36))
            RETURNS TEXT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci
            DETERMINISTIC
            BEGIN
                DECLARE V_PATH TEXT;

                WITH RECURSIVE ancestrais AS (
                    SELECT
                        id,
                        sigla,
                        unidade_pai_id,
                        1 AS nivel
                    FROM unidades
                    WHERE id = p_unidade_id

                    UNION ALL

                    SELECT
                        u.id,
                        u.sigla,
                        u.unidade_pai_id,
                        a.nivel + 1
                    FROM unidades u
                    JOIN ancestrais a ON u.id = a.unidade_pai_id
                    and u.unidade_pai_id IS NOT NULL
                )
                SELECT GROUP_CONCAT(sigla ORDER BY nivel DESC SEPARATOR '/') INTO V_PATH
                FROM ancestrais;

                RETURN V_PATH;
            END;
        EOD);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP FUNCTION `fn_obter_unidade_hierarquia`');
    }
};
