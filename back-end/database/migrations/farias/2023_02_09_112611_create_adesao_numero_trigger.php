<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Services\ServiceBase;

class CreateAdesaoNumeroTrigger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $database = new ServiceBase();
        if(!$database->hasStoredProcedure("sequence_adesao_numero")) {
            DB::unprepared('
                CREATE PROCEDURE sequence_adesao_numero() BEGIN
                    UPDATE sequence SET adesao_numero = adesao_numero + 1;
                    SELECT adesao_numero AS number FROM sequence;
                END
            ');
        }
        /* Solução para reolver programa com a migration (rollback excluindo sequence_demanda_numero ao invés do correto) */
        if(!$database->hasStoredProcedure("sequence_demanda_numero")) {
            DB::unprepared('
                CREATE PROCEDURE sequence_demanda_numero() BEGIN
                    UPDATE sequence SET demanda_numero = demanda_numero + 1;     
                    SELECT demanda_numero AS number FROM sequence;     
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
        DB::unprepared('DROP PROCEDURE IF EXISTS sequence_adesao_numero');
    }
}
