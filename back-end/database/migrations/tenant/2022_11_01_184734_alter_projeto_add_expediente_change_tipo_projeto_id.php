<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterProjetoAddExpedienteChangeTipoProjetoId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projetos', function (Blueprint $table) {
            $table->dropForeign(['tipo_projeto_id']);
            $table->dropColumn(['tipo_projeto_id']);
        });
        Schema::table('projetos', function (Blueprint $table) {
            $table->json('expediente')->nullable()->comment("Configuração de expediente");
            $table->foreignUuid('tipo_projeto_id')->nullable()->constrained("tipos_projetos")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projetos', function (Blueprint $table) {
            $table->dropForeign(['tipo_projeto_id']);
            $table->dropColumn(['tipo_projeto_id']);
        });
        Schema::table('projetos', function (Blueprint $table) {
            $table->dropColumn('expediente');
            $table->foreignUuid('tipo_projeto_id')->constrained("tipos_projetos")->onDelete('restrict')->onUpdate('cascade');
        });
    }
}
