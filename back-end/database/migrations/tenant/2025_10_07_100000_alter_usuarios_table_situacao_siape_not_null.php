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
        DB::table('usuarios')
            ->whereNull('situacao_siape')
            ->update(['situacao_siape' => 'ATIVO']);

        DB::statement('ALTER TABLE usuarios MODIFY COLUMN situacao_siape ENUM("ATIVO", "INATIVO", "ATIVO_TEMPORARIO") NOT NULL DEFAULT "ATIVO" COMMENT "Situação no SIAPE (Ativo, Inativo ou Ativo Temporário) - NOT NULL, DEFAULT: ATIVO"');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('ALTER TABLE usuarios MODIFY COLUMN situacao_siape ENUM("ATIVO", "INATIVO", "ATIVO_TEMPORARIO") NULL DEFAULT "ATIVO" COMMENT "Situação no SIAPE (Ativo, Inativo ou Ativo Temporário)"');
    }
};