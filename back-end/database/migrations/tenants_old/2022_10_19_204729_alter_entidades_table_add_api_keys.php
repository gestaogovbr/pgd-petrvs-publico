<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterEntidadesTableAddApiKeys extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('entidades', function (Blueprint $table) {
            $table->text('api_public_key')->nullable()->comment("Chave pública de API");
            $table->text('api_private_key')->nullable()->comment("Chave privada de API");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('entidades', function (Blueprint $table) {
            $table->dropColumn('api_public_key');
            $table->dropColumn('api_private_key');
        });
    }
}
