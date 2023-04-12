<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDemandasAvaliacoesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('demandas_avaliacoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data inicio da vigência");
            $table->dateTime('data_fim')->nullable()->comment("Data fim da vigência");
            $table->integer('nota_atribuida')->comment("Nota da avaliação 0 - 10");
            //$table->text('comentarios')->nullable()->comment("Comentário referente a nota");
            // Chaves estrangeiras:
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('demanda_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tipo_avaliacao_id')->nullable()->constrained('tipos_avaliacoes')->onDelete('restrict')->onUpdate('cascade');
        });
        // Cria o campo avaliacao_id devido a referência cruzada
        Schema::table('demandas', function (Blueprint $table) {
            $table->foreignUuid('avaliacao_id')->nullable()->constrained('demandas_avaliacoes')->onDelete('set null')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('demandas_avaliacaos');
    }
}
