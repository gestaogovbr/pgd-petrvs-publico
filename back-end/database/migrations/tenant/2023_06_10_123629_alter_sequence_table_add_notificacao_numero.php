<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterSequenceTableAddNotificacaoNumero extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sequence', function (Blueprint $table) {
            $table->integer('notificacao_numero')->default(1)->comment("Sequencia numerica da notificacao");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sequence', function (Blueprint $table) {
            $table->dropColumn('notificacao_numero');
        });
    }
}
