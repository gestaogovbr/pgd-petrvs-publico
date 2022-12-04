<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanosPontosControlesEntregasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos_pontos_controles_entregas', function (Blueprint $table) {
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
             *  fk_planos_p_contr_entr_plano_p_contr_id : restrição entre as tabelas planos_pontos_controles_entregas e planos_pontos_controle
             *  fk_planos_p_contr_entr_planej_entr_id : restrição entre as tabelas planos_pontos_controles_entregas e planejamentos_entregas
             */
            $table->uuid('plano_ponto_controle_id');
            $table->foreign('plano_ponto_controle_id', 'fk_planos_p_contr_entr_plano_p_contr_id')->references('id')->on('planos_pontos_controles')->onDelete('restrict')->onUpdate('cascade');
            $table->uuid('planejamento_entrega_id');
            $table->foreign('planejamento_entrega_id', 'fk_planos_p_contr_entr_planej_entr_id')->references('id')->on('planejamentos_entregas')->onDelete('restrict')->onUpdate('cascade');
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
        Schema::dropIfExists('planos_pontos_controles_entregas');
        Schema::enableForeignKeyConstraints();
    }
}
