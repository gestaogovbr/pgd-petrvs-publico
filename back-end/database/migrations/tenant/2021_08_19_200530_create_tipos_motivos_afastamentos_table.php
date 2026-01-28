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
        Schema::create('tipos_motivos_afastamentos', function (Blueprint $table) {
            // COnfigurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();

            // Campos:
            $table->string('codigo', 50)->nullable()->comment("Código SIAPE do afastamento.");
            $table->string('sigla', 256)->comment("Sigla do afastamento.");
            $table->string('nome', 256)->comment("Descrição sucinta do afastamento.");
            
            $table->dateTime('data_inicio')
                ->comment("Data inicial de ativação do afastamento nos ". 
                    "sistemas estruturantes.");
            $table->dateTime('data_fim')->nullable()
                ->comment("Data que especifica encerramento do uso do ". 
                    "afastamento nos sistemas estruturantes.");
            
            $table->string('situacao', 100)->comment("Confirma situação no SIAPE registrada no Sigepe Afastamentos.");
            
            $table->string('icone', 100)->comment("Class do ícone relacionado ao afastamento"); // class="fa fa-icone"
            $table->string('cor', 100)->comment("Código da cor em formato hex"); // style="color: #AABBCC00"
            $table->tinyInteger('horas')->comment("Se o afastamento é medido em horas");
            $table->tinyInteger('integracao')
                ->comment("Se o tipo de motivo de afastamento é integrado a outro sistema");
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
};
