<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUsuarioTableAddFotos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->text('foto_perfil')->nullable()->comment("Foto padrão do perfil");
            $table->text('foto_google')->nullable()->comment("Foto do G-Suit (Google)");
            $table->text('foto_microsoft')->nullable()->comment("Foto do Azure (Microsoft)");
            $table->text('foto_firebase')->nullable()->comment("Foto do Firebase (Google, Facebook, Instagram, Twiter, etc...)");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropColumn('foto_perfil');
            $table->dropColumn('foto_google');
            $table->dropColumn('foto_microsoft');
            $table->dropColumn('foto_firebase');
        });
    }
}
