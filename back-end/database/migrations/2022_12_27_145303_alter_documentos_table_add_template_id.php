<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterDocumentosTableAddTemplateId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('documentos', function (Blueprint $table) {
            $table->text('template')->nullable()->comment("Campo de Template");
            $table->json("data_source")->nullable()->comment("Conjunto de dados do template");
            $table->foreignUuid('template_id')->nullable()->constrained("templates")->onDelete('restrict')->onUpdate('cascade');
            
            // já estava adicionado na migrate AlterDocumentosTableAddProgramaAdesao
            //$table->foreignUuid('programa_adesao_id')->nullable()->constrained("programas_adesoes")->onDelete('restrict')->onUpdate('cascade');
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
            $table->dropForeign(['template_id']);
            $table->dropColumn('template_id');
            $table->dropForeign(['programa_adesao_id']);
            $table->dropColumn('programa_adesao_id');
            $table->dropColumn('data_source');
            $table->dropColumn('template');
        });
    }
}
