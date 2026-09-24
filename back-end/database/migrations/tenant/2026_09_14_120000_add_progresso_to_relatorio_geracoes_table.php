<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('relatorio_geracoes')) {
            return;
        }

        if (Schema::hasColumn('relatorio_geracoes', 'progresso_pagina')) {
            return;
        }

        Schema::table('relatorio_geracoes', function (Blueprint $table) {
            $table->unsignedInteger('progresso_pagina')->default(0);
            $table->unsignedInteger('progresso_total')->nullable();
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('relatorio_geracoes')) {
            return;
        }

        if (! Schema::hasColumn('relatorio_geracoes', 'progresso_pagina')) {
            return;
        }

        Schema::table('relatorio_geracoes', function (Blueprint $table) {
            $table->dropColumn(['progresso_pagina', 'progresso_total']);
        });
    }
};
