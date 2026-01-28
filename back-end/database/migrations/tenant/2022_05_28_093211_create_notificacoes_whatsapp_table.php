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
        Schema::create('notificacoes_whatsapp', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->dateTime('data_inicio_sessao')->useCurrent()->comment("Data hora do início da sessão");
            $table->dateTime('data_fim_sessao')->nullable()->comment("Data hora do final da sessão (utilizado posteriormente para alertar o usuário que seu atendimento acabou)");
            $table->dateTime('data_ultima_interacao')->useCurrent()->comment("Data hora utilizada para fazer o controle do tempo de sessão");
            $table->json('interacoes')->default(new Expression('(JSON_ARRAY())'))->comment("Interações (histórico do campo atual)");
            $table->tinyInteger('atual')->default(0)->comment("Informações da posição atual no menu");
            // Chaves estrangeiras:
            $table->foreignUuid('usuario_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Usuário");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notificacoes_whatsapp');
    }
};
