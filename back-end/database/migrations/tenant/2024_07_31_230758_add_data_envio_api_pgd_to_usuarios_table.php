<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->timestamp('data_envio_api_pgd')->nullable()->after('cod_jornada');
        });
    }

    public function down()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropColumn('data_envio_api_pgd');
        });
    }
};
