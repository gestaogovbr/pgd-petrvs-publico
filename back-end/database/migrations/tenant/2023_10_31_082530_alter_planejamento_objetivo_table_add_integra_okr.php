<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::table('planejamentos_objetivos', function (Blueprint $table) {
            $table->boolean('integra_okr')->default(1)->comment("Objetivos que serão visíveis no OKR");
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planejamentos_objetivos', function (Blueprint $table) {
            $table->dropColumn('integra_okr');
        });
    }
};
