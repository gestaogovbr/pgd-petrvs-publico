<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
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
        Schema::table('unidades', function (Blueprint $table) {
            $table->dateTime('data_modificacao')->nullable()->comment("Data de modificação informada pelo SIAPE.");
        });
    }

    public function down()
    {
        Schema::table('unidades', function (Blueprint $table) {
            $table->dropColumn('data_modificacao');
        });
    }
};
