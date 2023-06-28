<?php

use App\Services\ServiceBase;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateDemandaNumeroTrigger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $database = new ServiceBase();
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
        DB::unprepared('DROP PROCEDURE IF EXISTS sequence_demanda_numero');
    }
}
