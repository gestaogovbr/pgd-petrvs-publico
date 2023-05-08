<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->string('nome')->comment("Nome do programa de gestão");
            $table->json('config')->nullable();
            $table->dateTime('data_inicio_vigencia')->comment("Inicio do programa");
            $table->dateTime('data_fim_vigencia')->comment("Fim do programa");
            $table->dateTime('data_inicio')->comment("Data inicio da vigência");
            $table->dateTime('data_fim')->nullable()->comment("Data fim da vigência");
            // Chaves estrangeiras:
            $table->foreignUuid('unidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            /* OBS:
            - documento_id será criado em 2021_10_19_211130_create_documentos_table
            */            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('programas');
    }
}
