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
        Schema::table('entregas_produtos', function (Blueprint $table) {
            $table->unique(['entrega_id', 'produto_id'], 'unique_entregas_produtos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('entregas_produtos', function (Blueprint $table) {
            $table->dropUnique('unique_entregas_produtos');
        });
    }
};
