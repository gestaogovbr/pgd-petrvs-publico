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
        Schema::create('tipos_modalidades', function (Blueprint $table) {
            // Configurações
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('nome', 256)->comment("Nome da modalidade");
            $table->tinyInteger('plano_trabalho_calcula_horas')->default(0)->comment("Se o plano de trabalho calcula horas (considerando a carga horária e os dias)");
            $table->tinyInteger('atividade_tempo_despendido')->default(0)->comment("Se calcula tempo despendido na atividade");
            $table->tinyInteger('atividade_esforco')->default(0)->comment("Se utiliza esforço (tempo para execução) na atividade");
            // Chaves estrangeiras:
            /* OBS:
            - document_id criado em 2021_10_19_211130_create_documentos_table
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
        Schema::dropIfExists('tipos_modalidades');
    }
};
