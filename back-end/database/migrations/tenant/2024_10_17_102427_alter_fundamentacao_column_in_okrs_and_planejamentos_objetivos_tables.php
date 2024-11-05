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
        Schema::table('okrs_objetivos', function (Blueprint $table) {
            $table->text('fundamentacao')->change()->comment("Fundamentação do objetivo, agora como tipo TEXT");
        });

        Schema::table('planejamentos_objetivos', function (Blueprint $table) {
            $table->text('fundamentacao')->change()->comment("Fundamentação do objetivo, agora como tipo TEXT");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('okrs_objetivos', function (Blueprint $table) {
            $table->string('fundamentacao', 256)->change()->comment("Fundamentação do objetivo, revertido para tipo STRING");
        });

        Schema::table('planejamentos_objetivos', function (Blueprint $table) {
            $table->string('fundamentacao', 256)->change()->comment("Fundamentação do objetivo, revertido para tipo STRING");
        });
    }
};
