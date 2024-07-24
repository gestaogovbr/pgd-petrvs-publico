<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        DB::statement("
            CREATE OR REPLACE
            ALGORITHM = UNDEFINED VIEW `view_api_pgd` AS
            SELECT
                `t1`.`id` AS `id`,
                `t1`.`tipo` AS `tipo`,
                `t1`.`json_audit` AS `json_audit`
            FROM
            (
                SELECT
                    `planos_entregas`.`id` AS `id`,
                    'entrega' AS `tipo`,
                    '{}' AS `json_audit`
                FROM
                    `planos_entregas`
                ORDER BY
                    RAND()
                LIMIT 10
            ) `t1`
            UNION ALL
            SELECT
                `t2`.`id` AS `id`,
                `t2`.`tipo` AS `tipo`,
                `t2`.`json_audit` AS `json_audit`
            FROM
            (
                SELECT
                    `planos_trabalhos`.`id` AS `id`,
                    'trabalho' AS `tipo`,
                    '{}' AS `json_audit`
                FROM
                    `planos_trabalhos`
                ORDER BY
                    RAND()
                LIMIT 10
            ) `t2`
            UNION ALL
            SELECT
                `t3`.`id` AS `id`,
                `t3`.`tipo` AS `tipo`,
                `t3`.`json_audit` AS `json_audit`
            FROM
            (
                SELECT
                    `usuarios`.`id` AS `id`,
                    'participante' AS `tipo`,
                    '{}' AS `json_audit`
                FROM
                    `usuarios`
                ORDER BY
                    RAND()
                LIMIT 10
            ) `t3`;
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS `view_api_pgd`');
    }
};
