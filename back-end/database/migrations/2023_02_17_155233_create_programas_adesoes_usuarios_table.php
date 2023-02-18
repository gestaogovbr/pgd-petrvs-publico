<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramasAdesoesUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programas_adesoes_usuarios', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Chaves estrangeiras:
            $table->foreignUuid('programa_adesao_id')->constrained("programas_adesoes")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('usuario_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('programas_adesoes_usuarios');
    }
}
