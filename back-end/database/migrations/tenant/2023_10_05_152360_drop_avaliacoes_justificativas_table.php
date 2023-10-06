<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropAvaliacoesJustificativasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('avaliacoes_justificativas');
        Schema::table('avaliacoes', function (Blueprint $table) {
            $table->json('justificativas')->default(new Expression('(JSON_ARRAY())'))->comment("Justificativas");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('avaliacoes', function (Blueprint $table) {
            $table->dropColumn('justificativas');
        });
        Schema::create('avaliacoes_justificativas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            // Chaves estrangeiras:
            $table->foreignUuid('avaliacao_id')->constrained("avaliacoes")->onDelete('restrict')->onUpdate('cascade')->comment('Avaliação');
            $table->foreignUuid('tipo_justificativa_id')->constrained('tipos_justificativas')->onDelete('restrict')->onUpdate('cascade')->comment("Tipos justificativas");
        });
    }
}
