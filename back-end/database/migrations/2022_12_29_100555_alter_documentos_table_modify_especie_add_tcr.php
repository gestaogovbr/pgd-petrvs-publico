<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AlterDocumentosTableModifyEspecieAddTcr extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE documentos MODIFY especie ENUM('TERMO_ADESAO', 'SEI', 'TCR') COMMENT 'Especificação da espécie do documento (interno do sistema)'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE documentos MODIFY especie ENUM('TERMO_ADESAO', 'SEI') COMMENT 'Especificação da espécie do documento (interno do sistema)'");
    }
}
