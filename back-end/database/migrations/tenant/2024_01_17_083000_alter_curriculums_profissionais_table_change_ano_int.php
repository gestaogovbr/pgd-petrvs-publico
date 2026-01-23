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
        Schema::table('curriculums_profissionais', function (Blueprint $table) {
            $table->integer('ano_ingresso')->default(0)->comment("Ano de ingresso")->change();  
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('curriculums_profissionais', function (Blueprint $table) {
            $table->tinyInteger('ano_ingresso')->default(0)->comment("Ano de ingresso")->change();
        });
    }
   
};
