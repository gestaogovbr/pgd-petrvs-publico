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
        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->string('justificativa_modalidade', 500)->nullable()->after('status')
                ->comment('Justificativa para modalidade divergente do SIAPE');
        });
    }

    public function down(): void
    {
        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->dropColumn('justificativa_modalidade');
        });
    }
};
