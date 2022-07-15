<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTiposMotivosAfastamentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipos_motivos_afastamentos', function (Blueprint $table) {
            // COnfigurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->string('codigo', 50)->nullable()->comment("Código do afastamento");
            $table->string('nome', 256)->comment("Nome do motivo de afastamento");
            $table->string('icone', 100)->comment("Class do icone relacionado ao afastamento"); // class="fa fa-icone"
            $table->string('cor', 100)->comment("Código da cor em formato hex"); // style="color: #AABBCC00"
            $table->tinyInteger('horas')->comment("Se o afastamento é medido em horas");
            $table->tinyInteger('integracao')->comment("Se o tipo de motivo de afastamento é integrado a outro sistema");
            $table->dateTime('data_inicio')->comment("Data inicio da vigência");
            $table->dateTime('data_fim')->nullable()->comment("Data final da vigência");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipos_motivos_afastamentos');
    }
}
