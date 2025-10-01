<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('integracao_servidores', function (Blueprint $table) {
            $table->string('ident_unica', 50)->nullable()->comment('Identificador único do servidor');
        });

        Schema::table('usuarios', function (Blueprint $table) {
            $table->string('ident_unica', 50)->nullable()->comment('Identificador único do usuário');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('integracao_servidores', function (Blueprint $table) {
            $table->dropColumn('ident_unica');
        });

        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropColumn('ident_unica');
        });
    }
};