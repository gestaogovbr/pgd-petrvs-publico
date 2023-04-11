<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterCadeiasValoresTableAddDataArquivamento extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("cadeias_valores", function(Blueprint $table) {
            $table->dateTime('data_arquivamento')->nullable()->comment("Data de arquivamento da demanda");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("cadeias_valores", function(Blueprint $table) {
            $table->dropColumn('data_arquivamento');
        });
    }
}
