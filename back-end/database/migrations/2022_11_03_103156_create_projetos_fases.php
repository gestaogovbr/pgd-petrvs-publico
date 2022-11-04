<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetosFases extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projetos_fases', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->dateTime('inicio')->nullable()->comment("Inicio (opcional)");
            $table->dateTime('termino')->nullable()->comment("Termino (opcional)");
            $table->string('cor', 100)->comment("Código da cor em formato hex"); // style="color: #AABBCC00"
            $table->string('Nome', 100)->comment("Nome");
            $table->string('descricao', 256)->comment("Descrição");
            // Chaves estrangeiras:
            $table->foreignUuid('projeto_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projetos_fases');
    }
}
