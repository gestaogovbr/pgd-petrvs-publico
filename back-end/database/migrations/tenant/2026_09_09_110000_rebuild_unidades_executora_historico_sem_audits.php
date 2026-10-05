<?php

use App\Support\UnidadeExecutoraHistoricoBackfill;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('unidades_executora_historico')) {
            return;
        }

        DB::table('unidades_executora_historico')->delete();
        (new UnidadeExecutoraHistoricoBackfill())->popular();
    }

    public function down(): void
    {
    }
};
