<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('siape_dadosUORG')->truncate();
        
        Schema::table('siape_dadosUORG', function (Blueprint $table) {
            $table->string('codigo', 50)->nullable()->after('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('siape_dadosUORG', function (Blueprint $table) {
            $table->dropColumn('codigo');
        });
    }
};