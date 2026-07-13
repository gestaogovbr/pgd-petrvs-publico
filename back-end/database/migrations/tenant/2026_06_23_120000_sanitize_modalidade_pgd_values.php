<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->sanitizeUsuariosModalidadePgd();
        $this->sanitizeColumn('planos_trabalhos', 'modalidade_pgd');
        $this->sanitizeColumn('entidades', 'modalidade_pgd_padrao');
    }

    public function down(): void
    {
    }

    private function sanitizeUsuariosModalidadePgd(): void
    {
        if (!Schema::hasTable('usuarios') || !Schema::hasColumn('usuarios', 'modalidade_pgd')) {
            return;
        }

        if (
            Schema::hasTable('integracao_servidores')
            && Schema::hasColumn('integracao_servidores', 'modalidade_pgd')
            && Schema::hasColumn('integracao_servidores', 'matriculasiape')
        ) {
            DB::statement(<<<SQL
                UPDATE usuarios u
                INNER JOIN (
                    SELECT matriculasiape, MAX(modalidade_pgd) AS modalidade_pgd
                    FROM integracao_servidores
                    WHERE matriculasiape IS NOT NULL
                      AND TRIM(matriculasiape) != ''
                      AND modalidade_pgd IS NOT NULL
                      AND TRIM(modalidade_pgd) != ''
                    GROUP BY matriculasiape
                ) isr ON isr.matriculasiape = u.matricula
                SET u.modalidade_pgd = {$this->normalizedExpression('isr.modalidade_pgd')}
                WHERE u.modalidade_pgd IS NOT NULL
                  AND TRIM(u.modalidade_pgd) != ''
                  AND {$this->normalizedExpression('u.modalidade_pgd')} IS NULL
            SQL);
        }

        $this->sanitizeColumn('usuarios', 'modalidade_pgd');
    }

    private function sanitizeColumn(string $table, string $column): void
    {
        if (!Schema::hasTable($table) || !Schema::hasColumn($table, $column)) {
            return;
        }

        DB::statement(<<<SQL
            UPDATE {$table}
            SET {$column} = {$this->normalizedExpression($column)}
        SQL);
    }

    private function normalizedExpression(string $column): string
    {
        return "CASE " .
            "WHEN {$column} IS NULL OR TRIM({$column}) = '' THEN NULL " .
            "WHEN LOWER(TRIM({$column})) LIKE '%presencial%' THEN 'presencial' " .
            "WHEN LOWER(TRIM({$column})) LIKE '%parcial%' THEN 'parcial' " .
            "WHEN LOWER(TRIM({$column})) LIKE '%integral%' THEN 'integral' " .
            "WHEN LOWER(TRIM({$column})) LIKE '%substitu%' OR LOWER(TRIM({$column})) LIKE '%viii%' THEN 'no exterior substituicao' " .
            "WHEN LOWER(TRIM({$column})) LIKE '%exterior%' THEN 'no exterior' " .
            "ELSE NULL END";
    }
};
