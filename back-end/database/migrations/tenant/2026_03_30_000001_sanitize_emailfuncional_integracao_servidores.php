<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

return new class extends Migration
{
    public function up(): void
    {
        try {
            DB::table('integracao_servidores')
                ->whereNotNull('emailfuncional')
                ->where(function ($query): void {
                    $query
                        ->whereRaw('LOWER(TRIM(emailfuncional)) LIKE ?', ['%@petrvs.gov.br'])
                        ->orWhereRaw('LOWER(TRIM(emailfuncional)) LIKE ?', ['%@petrvs.gob.br']);
                })
                ->update(['emailfuncional' => null]);
        } catch (\Throwable $e) {
            Log::warning('Falha ao sanitizar emailfuncional na tabela integracao_servidores.', [
                'migration' => static::class,
                'exception' => $e,
            ]);
            throw $e;
        }
    }

    public function down(): void
    {
        try {
        } catch (\Throwable $e) {
            Log::warning('Falha ao reverter sanitizacao de emailfuncional na tabela integracao_servidores.', [
                'migration' => static::class,
                'exception' => $e,
            ]);
            throw $e;
        }
    }
};
