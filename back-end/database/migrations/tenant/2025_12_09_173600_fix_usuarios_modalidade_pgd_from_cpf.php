<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Remove a restrição de chave estrangeira para permitir inserir IDs de tipos_modalidades (UUIDs do sistema)
        // que podem não existir na tabela tipos_modalidades_siape (que é a referência atual).
        // A próxima migração irá renomear a coluna e redefinir a chave estrangeira corretamente.
        try {
            Schema::table('usuarios', function (Blueprint $table) {
                $table->dropForeign('usuarios_modalidade_pgd_foreign');
            });
        } catch (\Throwable $e) {
            // Ignora se a chave não existir
        }

        // 1. Tenta recuperar a modalidade a partir do último plano de trabalho do usuário
        DB::table('usuarios')
            ->whereNull('modalidade_pgd')
            ->chunkById(100, function ($users) {
                foreach ($users as $user) {
                    $lastPlan = DB::table('planos_trabalhos')
                        ->where('usuario_id', $user->id)
                        ->whereNull('deleted_at')
                        ->orderBy('data_inicio', 'desc')
                        ->select('tipo_modalidade_id')
                        ->first();

                    if ($lastPlan && !empty($lastPlan->tipo_modalidade_id)) {
                        DB::table('usuarios')
                            ->where('id', $user->id)
                            ->update(['modalidade_pgd' => $lastPlan->tipo_modalidade_id]);
                    }
                }
            });

        $rows = DB::select(<<<SQL
            SELECT u2.id, u2.cpf, u2.modalidade_pgd
            FROM usuarios AS u2
            WHERE u2.cpf IN (
                SELECT u.cpf
                FROM usuarios AS u
                INNER JOIN integracao_servidores AS `is` ON u.cpf = `is`.cpf
                WHERE u.modalidade_pgd IS NULL
            )
            AND u2.modalidade_pgd IS NOT NULL
        SQL);

        foreach ($rows as $row) {
            DB::table('usuarios')
                ->where('cpf', $row->cpf)
                ->where('id', '!=', $row->id)
                ->whereNull('modalidade_pgd')
                ->update(['modalidade_pgd' => $row->modalidade_pgd]);
        }
    }

    public function down(): void
    {
        // Intencionalmente vazio: esta migração apenas sincroniza valores nulos
        // com uma modalidade existente do mesmo CPF.
    }
};

