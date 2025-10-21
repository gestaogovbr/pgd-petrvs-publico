<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private function getUniqueIndexName(string $table, string $column): ?string
    {
        $database = DB::getDatabaseName();

        $rows = DB::select("
            SELECT INDEX_NAME
            FROM INFORMATION_SCHEMA.STATISTICS
            WHERE TABLE_SCHEMA = ?
              AND TABLE_NAME   = ?
              AND COLUMN_NAME  = ?
              AND NON_UNIQUE   = 0
        ", [$database, $table, $column]);

        return $rows[0]->INDEX_NAME ?? null;
    }

    private function hasUniqueIndex(string $table, string $column): bool
    {
        return (bool) $this->getUniqueIndexName($table, $column);
    }

    public function up(): void
    {
        $table = 'usuarios';

        $duplicatedMatriculas = DB::select("
            SELECT matricula, COUNT(*) as count
            FROM usuarios
            WHERE matricula IS NOT NULL
            GROUP BY matricula
            HAVING COUNT(*) > 1
        ");

        foreach ($duplicatedMatriculas as $duplicate) {
            $duplicatedUsers = DB::select("
                SELECT id, matricula
                FROM usuarios
                WHERE matricula = ?
                ORDER BY id ASC
            ", [$duplicate->matricula]);

            for ($i = 1; $i < count($duplicatedUsers); $i++) {
                $user = $duplicatedUsers[$i];
                $newMatricula = $user->matricula . '9';
                
                while (DB::selectOne("SELECT id FROM usuarios WHERE matricula = ?", [$newMatricula])) {
                    $newMatricula .= '9';
                }
                
                DB::update("UPDATE usuarios SET matricula = ? WHERE id = ?", [$newMatricula, $user->id]);
            }
        }

        if ($index = $this->getUniqueIndexName($table, 'cpf')) {
            DB::statement("ALTER TABLE `{$table}` DROP INDEX `{$index}`");
        }

        if (! $this->hasUniqueIndex($table, 'matricula')) {
            Schema::table($table, function (Blueprint $table) {
                $table->unique('matricula');
            });
        }
    }

    public function down(): void
    {
        $table = 'usuarios';

        if ($index = $this->getUniqueIndexName($table, 'matricula')) {
            DB::statement("ALTER TABLE `{$table}` DROP INDEX `{$index}`");
        }

        if (! $this->hasUniqueIndex($table, 'cpf')) {
            Schema::table($table, function (Blueprint $table) {
                $table->unique('cpf');
            });
        }
    }
};
