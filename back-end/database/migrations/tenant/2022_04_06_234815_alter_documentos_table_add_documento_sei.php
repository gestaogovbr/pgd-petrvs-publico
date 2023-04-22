<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterDocumentosTableAddDocumentoSei extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('documentos', function (Blueprint $table) {
            $table->integer('id_processo')->nullable()->comment("ID do processo de entrega, caso seja Sei será o ID do procedimento");
            $table->string('numero_processo', 50)->nullable()->comment("Número do processo de entrega, com a formatação de origem");
            $table->integer('id_documento')->nullable()->comment("ID da entrega, caso seja o Sei será o ID_Documento");
            $table->string('numero_documento', 11)->nullable()->comment("Numero do documento de entrega, caso seja o Sei é o numero Sei");
            $table->text('titulo_documento')->nullable()->comment("Numeração do tipo de documento no sistema integrado");
            // Chaves estrangeiras:
            $table->foreignUuid('tipo_documento_id')->nullable()->constrained('tipos_documentos')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tipo_processo_id')->nullable()->constrained('tipos_processos')->onDelete('restrict')->onUpdate('cascade');
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
            $table->dropColumn('id_processo');
            $table->dropColumn('numero_processo');
            $table->dropColumn('id_documento');
            $table->dropColumn('numero_documento');
            $table->dropColumn('titulo_documento');
            // Chaves estrangeiras:
            $table->dropForeign('tipo_documento_id');
            $table->dropColumn('tipo_documento_id');
            $table->dropForeign('tipo_processo_id');
            $table->dropColumn('tipo_processo_id');
        });
    }
}
