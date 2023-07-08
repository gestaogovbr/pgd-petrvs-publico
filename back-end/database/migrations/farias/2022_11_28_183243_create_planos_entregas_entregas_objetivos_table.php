<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanosEntregasEntregasObjetivosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos_entregas_entregas_objetivos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            // Chaves estrangeiras:
            $table->foreignUuid('objetivo_id')->constrained("planejamentos_objetivos")->onDelete('restrict')->onUpdate('cascade')->comment("Objetivo do Planejamento institucional ao qual está vinculado este objetivo");
            $table->foreignUuid('plano_entrega_entrega_id')->constrained("planos_entregas_entregas")->onDelete('restrict')->onUpdate('cascade')->comment("Entrega do Plano de Entregas à qual está vinculado este objetivo");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('planos_entregas_entregas_objetivos');
        Schema::enableForeignKeyConstraints();
    }
}
