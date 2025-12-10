<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
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

