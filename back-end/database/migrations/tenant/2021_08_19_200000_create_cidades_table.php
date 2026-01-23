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
        Schema::create('cidades', function (Blueprint $table) {
            // Configurações
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('codigo_ibge', 20)->unique()->comment("Código IBGE");
            $table->string('nome', 256)->comment("Nome");
            $table->set('tipo', ["MUNICIPIO", "DISTRITO", "CAPITAL"])->comment("Tipo da cidade");
            $table->string('uf', 2)->comment("Unidade Federativa");
            $table->integer('timezone')->comment("Timezone UTC da cidade");
            // Chaves estrangeiras:
            // Indices
            $table->index('codigo_ibge');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cidades');
    }
};
