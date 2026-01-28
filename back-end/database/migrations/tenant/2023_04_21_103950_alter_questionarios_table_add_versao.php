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
        if (Schema::hasColumn('questionarios', 'perguntas')) {
                Schema::table('questionarios', function ($table) {
                    $table->dropColumn('perguntas');
                });
        }

        Schema::table('questionarios', function (Blueprint $table) {
            $table->integer('versao')->default(1)->comment("Versao do questionario");
           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('questionarios', function (Blueprint $table){
            $table->dropColumn('versao');
        });
    }
};