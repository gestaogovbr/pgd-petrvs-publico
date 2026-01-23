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
        DB::statement("ALTER TABLE questionarios_perguntas MODIFY COLUMN tipo ENUM('EMOJI', 'SELECT', 'MULTI_SELECT', 'TEXT', 'TEXT_AREA', 'TIMER', 'DATE_TIME', 'NUMBER', 'RATE', 'SWITCH', 'RADIO', 'RADIO_INLINE','RADIO_BUTTON','CHECK', 'SEARCH')");
        //Schema::table('questionarios_perguntas', function (Blueprint $table) {

            //$table->enum('tipo', ["EMOJI", "SELECT", "MULTI_SELECT", "TEXT", "TEXT_AREA", "TIMER", "DATE_TIME", "NUMBER", "RATE", "SWITCH", "RADIO", "RADIO_INLINE","RADIO_BUTTON","CHECK", "SEARCH"])->change();

        //});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE questionarios_perguntas MODIFY COLUMN tipo ENUM('EMOJI', 'SELECT', 'MULTI_SELECT', 'TEXT', 'TEXT_AREA', 'TIMER', 'DATE_TIME', 'NUMBER', 'RATE', 'SWITCH', 'RADIO','CHECK')");
    }
};
