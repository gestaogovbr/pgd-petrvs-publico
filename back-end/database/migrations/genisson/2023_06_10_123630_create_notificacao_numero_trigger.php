<?php

use App\Services\ServiceBase;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateNotificacaoNumeroTrigger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $database = new ServiceBase();
        if(!$database->hasStoredProcedure("sequence_notificacao_numero")) {
            DB::unprepared('
                CREATE PROCEDURE sequence_notificacao_numero() BEGIN
                    UPDATE sequence SET notificacao_numero = notificacao_numero + 1;
                    SELECT notificacao_numero AS number FROM sequence;
                END
            ');
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS sequence_notificacao_numero');
    }
}
