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
        Schema::create('capacidades', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            // Chaves estrangeiras:
            $table->foreignUuid('perfil_id')->nullable()->constrained('perfis')->onDelete('restrict')->onUpdate('cascade')->comment("Perfis");
            $table->foreignUuid('tipo_capacidade_id')->constrained('tipos_capacidades')->onDelete('restrict')->onUpdate('cascade')->comment("Tipos capacidades");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('capacidades');
    }
};
