<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AlterEntidadesTableModifyTipoModalidadeId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE entidades MODIFY tipo_modalidade_id CHAR(36) DEFAULT NULL COMMENT 'Tipo de modalidade utilizada ao criar plano de trabalho'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE entidades MODIFY tipo_modalidade_id CHAR(36) NOT NULL COMMENT 'Tipo de modalidade utilizada ao criar plano de trabalho'");
    }
}
