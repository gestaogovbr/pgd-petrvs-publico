<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateSequenceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sequence', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('demanda_numero')->default(1)->comment("Sequencia numeria do número da demanda");
        });
        DB::table('sequence')->insert([
            'demanda_numero' => 0
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sequence');
    }
}
