<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanosEntregasPontosControlesEntregasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos_entregas_pontos_controles_entregas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data inicio da vigência");
            $table->dateTime('data_fim')->nullable()->comment("Data fim da vigência");
            $table->json("meta")->comment("Meta para a entrega");
            $table->json("realizado")->nullable()->comment("Valor realizado");
            // Chaves estrangeiras:
            /**
             * fk_plano_entr_p_contr_entr_planej_p_contr_id : restrição entre as tabelas Planos_entregas_pontos_controle_entregas e Planos_entregas_pontos_controle
             * fk_plano_entr_p_contr_entr_planej_entr_id : restrição entre as tabelas Planos_entregas_pontos_controle_entregas e Planos_entregas_entregas
             */
            $table->uuid('plano_entrega_ponto_controle_id');
            $table->foreign('plano_entrega_ponto_controle_id', 'fk_plano_entr_p_contr_entr_planej_p_contr_id')->references('id')->on('planos_entregas_pontos_controles')->onDelete('restrict')->onUpdate('cascade');
            $table->uuid('plano_entrega_entrega_id');
            $table->foreign('plano_entrega_entrega_id', 'fk_plano_entr_p_contr_entr_planej_entr_id')->references('id')->on('planos_entregas_entregas')->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('planos_entregas_pontos_controles_entregas');
        Schema::enableForeignKeyConstraints();
        
    }
}
