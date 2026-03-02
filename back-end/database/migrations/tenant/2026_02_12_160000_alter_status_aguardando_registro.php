<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('planos_trabalhos_consolidacoes')
            ->where('status', 'AGUARDANDO_REGISTRO')
            ->update(['status' => 'INCLUIDO']);
        DB::statement('ALTER TABLE planos_trabalhos_consolidacoes MODIFY COLUMN status enum("INCLUIDO","CONCLUIDO","AVALIADO") NOT NULL DEFAULT "INCLUIDO" COMMENT "Status atual da consolidação"');
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE planos_trabalhos_consolidacoes MODIFY COLUMN status ENUM("AGUARDANDO_REGISTRO","INCLUIDO","CONCLUIDO","AVALIADO") NOT NULL DEFAULT "AGUARDANDO_REGISTRO" COMMENT "Status atual da consolidação"');
    }
};
