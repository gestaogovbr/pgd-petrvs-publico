<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterCurriculums extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('curriculums', function (Blueprint $table)) {
            
            $table->dropColumn("possui_filhos");
            
            $table->unique('usuario_id');
        }
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('curriculums', function (Blueprint $table)) {
           
            $table->tinyInteger('possui_filhos')->default(0)->comment("Possui filhos sim ou não");
            $table->dropUnique('usuario_id_unique');
            
        }
    }
}
