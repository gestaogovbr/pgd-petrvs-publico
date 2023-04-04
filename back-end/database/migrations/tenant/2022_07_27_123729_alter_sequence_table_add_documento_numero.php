<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterSequenceTableAddDocumentoNumero extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sequence', function (Blueprint $table) {
            $table->integer('documento_numero')->default(1)->comment("Sequencia numeria do número do documento");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sequence', function (Blueprint $table) {
            $table->dropColumn('documento_numero');
        });
    }
}
