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
        Schema::table('siape_blacklist_unidades', function (Blueprint $table) {
            $table->tinyInteger('inativado')
                      ->default(0)
                      ->after('response')
                      ->comment('Indica se a unidade foi inativada (0 = não, 1 = sim)');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('siape_blacklist_unidades', function (Blueprint $table) {
             $table->dropColumn('inativado');
        });
    }
};