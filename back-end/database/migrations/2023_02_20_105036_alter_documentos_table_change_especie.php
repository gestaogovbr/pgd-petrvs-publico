<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AlterDocumentosTableChangeEspecie extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE documentos MODIFY especie ENUM('TERMO_ADESAO', 'SEI', 'TCR', 'TCR_CANCELAMENTO') COMMENT 'Especificação da espécie do documento (interno do sistema)'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DELETE FROM documentos WHERE especie = 'TCR_CANCELAMENTO'");
        DB::statement("ALTER TABLE documentos MODIFY especie ENUM('TERMO_ADESAO', 'SEI', 'TCR') COMMENT 'Especificação da espécie do documento (interno do sistema)'");
    }
}
