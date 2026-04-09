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
        if (Schema::hasColumn('planos_trabalhos', 'encerrado_at')) {
            return;
        }

        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->date('encerrado_at')->nullable()->after('avaliado_at')
                ->comment('Data de encerramento antecipado do plano de trabalho');
        });
    }

    public function down(): void
    {
        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->dropColumn('encerrado_at');
        });
    }
};
