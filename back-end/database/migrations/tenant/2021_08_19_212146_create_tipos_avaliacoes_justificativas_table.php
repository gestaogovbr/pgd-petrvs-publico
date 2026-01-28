<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipos_avaliacoes_justificativas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Chaves estrangeiras:
            $table->foreignUuid('tipo_avaliacao_nota_id')->constrained('tipos_avaliacoes_notas')->onDelete('restrict')->onUpdate('cascade')->comment("Nota do Tipo avaliação");
            $table->foreignUuid('tipo_justificativa_id')->constrained('tipos_justificativas')->onDelete('restrict')->onUpdate('cascade')->comment("Tipos justificativas");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipos_avaliacoes_justificativas');
    }
};
