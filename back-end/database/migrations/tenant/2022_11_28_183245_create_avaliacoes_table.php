<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('avaliacoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->dateTime('data_avaliacao')->comment("Data e hora da avaliação");
            $table->json('nota')->comment("Nota da avaliação");
            $table->text('justificativa')->nullable()->comment("Comentário referente à avaliação, pelo avaliador");
            $table->json('justificativas')->default(new Expression('(JSON_ARRAY())'))->comment("Justificativas");
            $table->text('recurso')->nullable()->comment("Recurso contra a nota atribuída, pelo avaliado");
            // Chaves estrangeiras:
            $table->foreignUuid('avaliador_id')->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment('Usuário avaliador');
            $table->foreignUuid('plano_trabalho_consolidacao_id')->nullable()->constrained("planos_trabalhos_consolidacoes")->onDelete('restrict')->onUpdate('cascade')->comment('Consolidação');
            $table->foreignUuid('plano_entrega_id')->nullable()->constrained("planos_entregas")->onDelete('restrict')->onUpdate('cascade')->comment('Plano de Entrega');
            $table->foreignUuid('tipo_avaliacao_id')->constrained('tipos_avaliacoes')->onDelete('restrict')->onUpdate('cascade')->comment('Tipo de avaliação');
        });
        Schema::table('planos_trabalhos_consolidacoes', function (Blueprint $table) {
            $table->foreignUuid('avaliacao_id')->nullable()->constrained("avaliacoes")->onDelete('restrict')->onUpdate('cascade')->comment("Avaliação vigente");
        });
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->foreignUuid('avaliacao_id')->nullable()->constrained("avaliacoes")->onDelete('restrict')->onUpdate('cascade')->comment("Avaliação vigente");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planos_trabalhos_consolidacoes', function (Blueprint $table) {
            $table->dropConstrainedForeignId('avaliacao_id');
        });
        Schema::dropIfExists('avaliacoes');
    }
};
