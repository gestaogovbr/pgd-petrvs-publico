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
            $table->string('participa_pgd', 50)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('integracao_servidores', function (Blueprint $table) {
            $table->boolean('participa_pgd')->nullable(false)->change();
        });
    }
};