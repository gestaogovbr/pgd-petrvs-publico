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
        DB::statement("ALTER TABLE planejamentos_objetivos MODIFY nome TEXT NOT NULL;");
    }

    public function down()
    {
        DB::statement("ALTER TABLE planejamentos_objetivos MODIFY nome VARCHAR(256) NOT NULL DEFAULT '';");
    }
};
