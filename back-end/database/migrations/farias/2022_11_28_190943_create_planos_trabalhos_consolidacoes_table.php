<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanosTrabalhosConsolidacoesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos_trabalhos_consolidacoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->dateTime('inicio')->comment("Data inicial da consolidacão");
            $table->dateTime('fim')->comment("Data final da consolidação");   
            $table->integer('nota_atribuida')->comment("Nota da avaliação: 0 - 10");
            $table->json('justificativas')->nullable()->comment("Justificativas da avaliação");
            $table->text('comentarios')->nullable()->comment("Comentário referente à avaliação");
            // Chaves estrangeiras:
            $table->foreignUuid('plano_trabalho_id')->constrained("planos_trabalhos")->onDelete('restrict')->onUpdate('cascade')->comment("Plano de Trabalho ao qual se refere a consolidação");
            $table->foreignUuid('avaliador_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment("Usuário que realizou a avaliação da consolidação");
            $table->foreignUuid('tipo_avaliacao_id')->nullable()->constrained("tipos_avaliacoes")->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de avaliação atribuído à consolidação");
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
        Schema::dropIfExists('planos_trabalhos_consolidacoes');
        Schema::enableForeignKeyConstraints();
    }
}
