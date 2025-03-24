<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        DB::unprepared("
            CREATE FUNCTION fn_obter_processo_sequencia(processo_id CHAR(36))
            RETURNS VARCHAR(255)
            DETERMINISTIC
            BEGIN
                DECLARE seq_result VARCHAR(255) DEFAULT '';
                DECLARE seq_atual VARCHAR(255);
                DECLARE pai_atual CHAR(36);

                SELECT sequencia, processo_pai_id INTO seq_atual, pai_atual
                FROM cadeias_valores_processos
                WHERE id = processo_id;

                WHILE pai_atual IS NOT NULL DO
                    SET seq_result = CONCAT(seq_atual, '.', seq_result);

                    SELECT sequencia, processo_pai_id INTO seq_atual, pai_atual
                    FROM cadeias_valores_processos
                    WHERE id = pai_atual;
                END WHILE;

                SET seq_result = CONCAT(seq_atual, '.', seq_result);
                RETURN TRIM(TRAILING '.' FROM seq_result);
            END;
        ");
    }

    public function down(): void
    {
        DB::unprepared("DROP FUNCTION IF EXISTS fn_obter_processo_sequencia;");
    }
};
