<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        try {
            $invalidos = DB::table('usuarios')
                ->whereNotNull('cpf')
                ->where(function ($query): void {
                    $query
                        ->whereRaw("cpf REGEXP '[^0-9]'")
                        ->orWhereRaw('CHAR_LENGTH(cpf) <> 11');
                })
                ->count();

            if ($invalidos > 0) {
                throw new \RuntimeException("Não é seguro reduzir cpf para 11: existem {$invalidos} registros inválidos.");
            }

            Schema::table('usuarios', function (Blueprint $table): void {
                $table->string('cpf', 11)->change();
            });
        } catch (\Throwable $e) {
            Log::warning('Falha ao reduzir tamanho do campo cpf em usuarios.', [
                'migration' => static::class,
                'exception' => $e,
            ]);
            throw $e;
        }
    }

    public function down(): void
    {
        try {
            Schema::table('usuarios', function (Blueprint $table): void {
                $table->string('cpf', 14)->change();
            });
        } catch (\Throwable $e) {
            Log::warning('Falha ao reverter tamanho do campo cpf em usuarios.', [
                'migration' => static::class,
                'exception' => $e,
            ]);
            throw $e;
        }
    }
};
