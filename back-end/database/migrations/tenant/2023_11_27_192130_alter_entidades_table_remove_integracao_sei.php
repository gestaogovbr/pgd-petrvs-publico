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
        Schema::table('entidades', function (Blueprint $table) {
            $table->dropColumn('url_sei');
            $table->dropColumn('api_public_key');
            $table->dropColumn('api_private_key');
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
            $table->string("url_sei", 100)->nullable()->comment("URL base do SEI da entidade");
            $table->text('api_public_key')->nullable()->comment("Chave pública de API");
            $table->text('api_private_key')->nullable()->comment("Chave privada de API");
        });
    }
};
