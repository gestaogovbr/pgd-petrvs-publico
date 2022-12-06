<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AlterDemandaTableAddTipoProcesso extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE `demandas` ADD COLUMN `tipo_processo_id` char(36) DEFAULT NULL");
        DB::statement("ALTER TABLE `demandas` ADD CONSTRAINT `demandas_tipo_processo_id_foreign` FOREIGN KEY (`tipo_processo_id`) REFERENCES `tipos_processos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE `demandas` DROP FOREIGN KEY `demandas_tipo_processo_id_foreign`");
        DB::statement("ALTER TABLE `demandas` DROP COLUMN `tipo_processo_id`");
    }
}
