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
        Schema::table('siape_blacklist_servidores', function (Blueprint $table) {
            $table->tinyInteger('inativado')
                      ->default(0)
                      ->after('response');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('siape_blacklist_servidores', function (Blueprint $table) {
             $table->dropColumn('inativado');
        });
    }
};
