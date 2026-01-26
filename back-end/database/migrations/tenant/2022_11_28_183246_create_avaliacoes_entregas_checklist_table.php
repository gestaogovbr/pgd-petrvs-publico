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
        Schema::create('avaliacoes_entregas_checklist', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->json('checklist')->comment("Checklist");
            // Chaves estrangeiras:
            $table->foreignUuid('avaliacao_id')->constrained("avaliacoes")->onDelete('restrict')->onUpdate('cascade')->comment('Avaliação');
            $table->foreignUuid('plano_trabalho_entrega_id')->nullable()->constrained("planos_trabalhos_entregas")->onDelete('restrict')->onUpdate('cascade')->comment('Entrega do Plano de Trabalho');
            $table->foreignUuid('plano_entrega_entrega_id')->nullable()->constrained("planos_entregas_entregas")->onDelete('restrict')->onUpdate('cascade')->comment('Entrega do Plano de Entrega');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('avaliacoes_entregas_checklist');
    }
};
