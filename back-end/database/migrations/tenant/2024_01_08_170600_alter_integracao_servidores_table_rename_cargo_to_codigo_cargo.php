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
        Schema::table('integracao_servidores', function (Blueprint $table) {
            $table->renameColumn('cargo', 'codigo_cargo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('integracao_servidores', function (Blueprint $table) {
            $table->renameColumn('codigo_cargo', 'cargo');
        });
    }
};
