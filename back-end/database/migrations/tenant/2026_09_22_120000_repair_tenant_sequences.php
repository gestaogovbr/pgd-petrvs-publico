<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private const SINGLETON_ID = 1;

    /** @var array<string, string> */
    private const SEQUENCE_COUNTERS = [
        'template_numero' => 'templates',
        'plano_entrega_numero' => 'planos_entregas',
        'plano_trabalho_numero' => 'planos_trabalhos',
        'projeto_numero' => 'projetos',
        'documento_numero' => 'documentos',
        'atividade_numero' => 'atividades',
        'notificacao_numero' => 'notificacoes',
    ];

    public function up(): void
    {
        DB::connection('tenant')->transaction(function (): void {
            $connection = DB::connection('tenant');
            $counters = [];

            foreach (self::SEQUENCE_COUNTERS as $column => $table) {
                $counters[$column] = (int) ($connection->table($table)->max('numero') ?? 0);
            }

            if (!$connection->table('sequences')->exists()) {
                $connection->table('sequences')->insert([
                    'id' => self::SINGLETON_ID,
                    'created_at' => now(),
                    'updated_at' => now(),
                    ...$counters,
                ]);

                return;
            }

            $updates = ['updated_at' => now()];
            foreach ($counters as $column => $maximum) {
                $updates[$column] = DB::raw("GREATEST(COALESCE({$column}, 0), {$maximum})");
            }

            $connection->table('sequences')->update($updates);
        });
    }

    public function down(): void
    {
        // A recuperação preserva contadores que já podem ter sido usados.
    }
};
