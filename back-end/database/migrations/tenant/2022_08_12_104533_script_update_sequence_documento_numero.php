<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class ScriptUpdateSequenceDocumentoNumero extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("UPDATE sequence SET documento_numero = IFNULL((SELECT MAX(numero) FROM documentos), 1)");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("UPDATE sequence SET documento_numero = IFNULL((SELECT MAX(numero) FROM documentos), 1)");
    }
}
