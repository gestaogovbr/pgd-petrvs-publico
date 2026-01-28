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
        Schema::create('notificacoes_destinatarios', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->enum('tipo', ['PETRVS', 'EMAIL', 'WHATSAPP'])->default("PETRVS")->comment("Tipo do envio");
            $table->dateTime('data_leitura')->nullable()->comment("Data e hora da leitura");
            $table->dateTime('data_envio')->nullable()->comment("Data e hora do envio, utilizado quando realmente a mensagem foi despachada");
            $table->json("opcoes")->nullable()->comment("Opções");
            // Chaves estrangeiras:
            $table->foreignUuid('notificacao_id')->constrained('notificacoes')->onDelete('restrict')->onUpdate('cascade')->comment("Notificação");
            $table->foreignUuid('usuario_id')->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment("Usuário");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notificacoes_destinatarios');
    }
};
