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
        Schema::create('tipos_processos', function (Blueprint $table) {
            // Configurações
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();   
            $table->softDeletes();
            // Campos:
            $table->text('nome')->comment("Nome do Tipo de Processo");
            $table->string('codigo', 50)->nullable()->comment("Código do tipo de Processo");
            $table->json('etiquetas')->comment("Nome das etiquetas predefinidas");
            $table->json('checklist')->comment("Nome dos checklist predefinidas");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipos_processos');
    }
};
