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
        Schema::create('eixos_tematicos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('nome', 256)->comment("Nome do eixo temático");
            $table->string('icone', 100)->comment("Classe CSS do icone relacionado ao eixo temático");
            $table->string('cor', 100)->comment("Código HEX da cor relacionada ao eixo temático");
            $table->string('descricao', 256)->comment("Descrição do eixo temático");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eixos_tematicos');
    }
};
