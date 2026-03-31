<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->text('justificativa')->nullable()->after('status')->comment("Justificativa para carga horária inferior a 100%");
        });
    }

    public function down(): void
    {
        Schema::table('planos_trabalhos', function (Blueprint $table) {
            $table->dropColumn('justificativa');
        });
    }
};
