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
        Schema::table('siape_dadosUORG', function (Blueprint $table) {
            $table->dateTime('data_modificacao')->nullable()->after('processado');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('siape_dadosUORG', function (Blueprint $table) {
            $table->dropColumn('data_modificacao');
        });
    }
};
