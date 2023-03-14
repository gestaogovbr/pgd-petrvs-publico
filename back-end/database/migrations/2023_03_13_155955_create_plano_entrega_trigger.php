<?php

use App\Services\ServiceBase;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreatePlanoEntregaTrigger extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $database = new ServiceBase();
        if(!$database->hasStoredProcedure("sequence_plano_entrega_numero")) {
            DB::unprepared('
                CREATE PROCEDURE sequence_plano_entrega_numero() BEGIN
                    UPDATE sequence SET plano_entrega_numero = plano_entrega_numero + 1;
                    SELECT plano_entrega_numero AS number FROM sequence;
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
        DB::unprepared('DROP PROCEDURE IF EXISTS sequence_plano_entrega_numero');
    }
}
