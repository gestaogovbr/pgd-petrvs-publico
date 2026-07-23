<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('planos_trabalhos_entregas', function (Blueprint $table) {
            $table->decimal('esforco_executado', 5, 2)
                ->default(0)
                ->after('forca_trabalho')
                ->comment('Percentual de CHD executado na entrega (registro de execução)');
        });

        DB::table('planos_trabalhos_entregas')
            ->whereNull('deleted_at')
            ->update(['esforco_executado' => DB::raw('forca_trabalho')]);
    }

    public function down(): void
    {
        Schema::table('planos_trabalhos_entregas', function (Blueprint $table) {
            $table->dropColumn('esforco_executado');
        });
    }
};
