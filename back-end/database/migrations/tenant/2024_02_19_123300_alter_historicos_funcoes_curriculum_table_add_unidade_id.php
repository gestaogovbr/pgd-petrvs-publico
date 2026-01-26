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
        //DB::statement('ALTER TABLE curriculums_profissionais CHANGE ano_ingresso integer null;');
        Schema::table('historicos_funcoes_curriculum', function (Blueprint $table) {

            $table->text('unidade_id')->nullable()->comment("Unidade em que foi chefe");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('historicos_funcoes_curriculum', function (Blueprint $table) {
         
            $table->dropColumn('unidade_id');

        });
    }
};
