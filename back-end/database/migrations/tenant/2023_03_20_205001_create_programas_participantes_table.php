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
        Schema::create('programas_participantes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // campos
            $table->tinyInteger('habilitado')->default(1)->comment("Se o participante está habilitado ou não para o programa");
            // Chaves estrangeiras:
            $table->foreignUuid('programa_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Programa relacionado ao participante");
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Participante relacionado ao programa");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('programas_participantes');
    }
};
