<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AlterTemplateTableChangeTipoToEspecie extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('especie', function (Blueprint $table) {
            DB::statement("ALTER TABLE templates RENAME COLUMN tipo TO especie;");
            DB::statement("ALTER TABLE templates MODIFY especie ENUM('TERMO_ADESAO', 'SEI', 'TCR', 'TCR_CANCELAMENTO') COMMENT 'Especificação da espécie do template (interno do sistema)'");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('especie', function (Blueprint $table) {
            DB::statement("ALTER TABLE templates MODIFY especie ENUM('TCR') COMMENT 'Especificação da espécie do template (interno do sistema)'");
            DB::statement("ALTER TABLE templates RENAME COLUMN especie TO tipo;");
        });
    }
}
