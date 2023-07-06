<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateNotificacoesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notificacoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->integer('numero')->unique()->default(0)->comment("Número da mensagem (Gerado pelo sistema)");
            $table->string('codigo')->comment("Código da mensagem");
            $table->dateTime('data_registro')->comment("Data e hora da inclusão da mensagem");
            $table->longText('mensagem')->comment("Mensagem");
            $table->foreignUuid('remetente_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment("Rementente, caso a notificação permita");
        });
        // Cria sequencia notificacao_numero
        Schema::table('sequence', function (Blueprint $table) {
            $table->integer('notificacao_numero')->default(1)->comment("Sequencia numeria do número da notificação");
        });
        DB::unprepared('
            CREATE PROCEDURE sequence_notificacao_numero() BEGIN
                UPDATE sequence SET notificacao_numero = notificacao_numero + 1;
                SELECT notificacao_numero AS number FROM sequence;
            END
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS sequence_notificacao_numero');
        Schema::table('sequence', function (Blueprint $table) {
            $table->dropColumn('notificacao_numero');
        });
        Schema::dropIfExists('notificacoes');
    }
}
