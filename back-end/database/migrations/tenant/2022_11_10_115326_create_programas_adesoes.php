<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramasAdesoes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programas_adesoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->dateTime('data_inicio_vigencia')->comment("Inicio no programa");
            $table->dateTime('data_fim_vigencia')->nullable()->comment("Fim no programa");
            $table->dateTime('data_inicio')->comment("Data de criação");
            $table->dateTime('data_fim')->nullable()->comment("Data final do registro");
            $table->enum('status', ['SOLICITADO', 'HOMOLOGADO', 'CANCELADO'])->comment("Status da adesão");
            // Chaves estrangeiras:
            $table->foreignUuid('usuario_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('unidade_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('programa_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tipo_modalidade_id')->constrained('tipos_modalidades')->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('programas_adesoes');
    }
}
