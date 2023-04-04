<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUnidadeTableAddGestorAndNotificacao extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('unidades', function (Blueprint $table) {
            $table->json('notificacoes')->nullable()->comment("Configurações das notificações (Se envia email, whatsapp, tipos, templates)");
            $table->foreignUuid('gestor_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment('Usuário gestor da unidade');
            $table->dropColumn('distribuicao_notificacao');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('unidades', function (Blueprint $table) {
            $table->dropColumn('notificacoes');
            $table->dropColumn('gestor_id');
            $table->json("distribuicao_notificacao")->nullable()->comment("Mensagem das notificações geradas pela demanda. (texto_criacao, texto_conclusao)");
        });
    }
}
