<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTiposModalidadesTable extends Migration
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
            $table->json('config')->nullable();
            $table->tinyInteger('atividades_homologadas')->default(0)->comment("Permitir apenas atividades homologadas");
            $table->tinyInteger('dispensa_avaliacao')->default(0)->comment("Dispensa a avaliação");
            $table->tinyInteger('exige_assinatura')->default(0)->comment("Exigir assinatura");
           
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
}
