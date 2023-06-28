<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AlterNotificacoesDestinatariosTableChangeTipos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE notificacoes_destinatarios MODIFY tipo ENUM('PETRVS', 'EMAIL', 'WHATSAPP') DEFAULT 'PETRVS' COMMENT 'Tipo do envio'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE notificacoes_destinatarios MODIFY tipo ENUM('petrvs', 'email', 'whatsapp') DEFAULT 'petrvs' COMMENT 'Tipo do envio'");
    }
}
