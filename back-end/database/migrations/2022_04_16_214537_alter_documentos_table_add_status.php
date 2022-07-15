<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterDocumentosTableAddStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('documentos', function (Blueprint $table) {
            $table->enum('status', ["GERADO", "AGUARDANDO_SEI"])->default("GERADO")->comment("Status do documento: GERADO (documento gerado); AGUARDANDO_SEI (Aguardando abrir o documento no sei para colar o conteúdo dentro)");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('documentos', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
}
