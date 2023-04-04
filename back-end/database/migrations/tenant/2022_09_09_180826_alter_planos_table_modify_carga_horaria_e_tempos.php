<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AlterPlanosTableModifyCargaHorariaETempos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE planos MODIFY carga_horaria DOUBLE DEFAULT 0.00 COMMENT 'Carga horária diária do usuário'");
        DB::statement("ALTER TABLE planos MODIFY tempo_total DOUBLE DEFAULT 0.00 COMMENT 'Horas úteis de trabalho no período de data_inicio_vigencia à data_fim_vigencia considerando carga_horaria, feriados, fins de semana'");
        DB::statement("ALTER TABLE planos MODIFY tempo_proporcional DOUBLE DEFAULT 0.00 COMMENT 'tempo_total menos os afastamentos'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE planos MODIFY carga_horaria INT DEFAULT 0 COMMENT 'Carga horária diária do usuário'");
        DB::statement("ALTER TABLE planos MODIFY tempo_total INT DEFAULT 0 COMMENT 'Horas úteis de trabalho no período de data_inicio_vigencia à data_fim_vigencia considerando carga_horaria, feriados, fins de semana'");
        DB::statement("ALTER TABLE planos MODIFY tempo_proporcional INT DEFAULT 0 COMMENT 'tempo_total menos os afastamentos'");
    }
}
