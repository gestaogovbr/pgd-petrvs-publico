<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Corrige duplicata em documentos.numero ao regenerar TCR.
 *
 * A procedure antiga só incrementava sequences.documento_numero. Após soft delete
 * de um documento, o MAX(numero) na tabela pode ser maior que a sequência e o
 * próximo número colide com documentos_numero_unique.
 */
return new class extends Migration
{
    public function up(): void
    {
        DB::statement(
            'UPDATE sequences SET documento_numero = IFNULL((SELECT MAX(numero) FROM documentos), 0)'
        );

        DB::unprepared('DROP PROCEDURE IF EXISTS sequence_documento_numero');
        DB::unprepared('
            CREATE PROCEDURE sequence_documento_numero() BEGIN
                UPDATE sequences SET documento_numero = GREATEST(
                    IFNULL((SELECT MAX(numero) FROM documentos), 0),
                    documento_numero
                ) + 1;
                SELECT documento_numero AS number FROM sequences LIMIT 1;
            END
        ');
    }

    public function down(): void
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS sequence_documento_numero');
        DB::unprepared('
            CREATE PROCEDURE sequence_documento_numero() BEGIN
                UPDATE sequences SET documento_numero = documento_numero + 1;
                SELECT documento_numero AS number FROM sequences;
            END
        ');
    }
};
