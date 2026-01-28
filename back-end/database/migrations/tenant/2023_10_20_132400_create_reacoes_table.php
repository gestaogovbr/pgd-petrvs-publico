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
        Schema::create('reacoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->enum('tipo', ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'])->default("like")->comment("Tipo do react");
            // Chaves estrangeiras:
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Usuário do react");
            $table->foreignUuid('atividade_id')->nullable()->constrained("atividades")->onDelete('restrict')->onUpdate('cascade')->comment("Atividade onde estão os reacts");
            $table->foreignUuid('plano_trabalho_entrega_id')->nullable()->constrained("planos_trabalhos_entregas")->onDelete('restrict')->onUpdate('cascade')->comment("Reacts das entregas do plano de trabalho");
            $table->foreignUuid('plano_entrega_entrega_id')->nullable()->constrained("planos_entregas_entregas")->onDelete('restrict')->onUpdate('cascade')->comment("Reacts das entregas do plano de entrega");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reacoes');
    }
};
