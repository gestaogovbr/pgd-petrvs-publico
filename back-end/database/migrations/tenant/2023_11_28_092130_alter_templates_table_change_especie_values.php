<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      DB::statement("ALTER TABLE templates CHANGE especie especie ENUM('SEI', 'TCR', 'OUTRO', 'NOTIFICACAO', 'RELATORIO')");
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      DB::statement("ALTER TABLE templates CHANGE especie especie ENUM('SEI', 'TCR', 'OUTRO', 'NOTIFICACAO')");
    }
};
