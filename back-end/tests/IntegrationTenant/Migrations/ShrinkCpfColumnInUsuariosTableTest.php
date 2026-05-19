<?php

use Illuminate\Support\Facades\DB;

test('reduz tamanho máximo do cpf para 11 na tabela usuarios', function () {
    DB::connection('tenant')->statement('ALTER TABLE usuarios MODIFY cpf VARCHAR(14) NOT NULL');

    $normalizeMigration = require database_path('migrations/tenant/2026_03_12_180933_normalize_cpfs_in_usuarios_table.php');
    $normalizeMigration->up();

    DB::connection('tenant')
        ->table('usuarios')
        ->whereNotNull('cpf')
        ->where(function ($query): void {
            $query
                ->whereRaw("cpf REGEXP '[^0-9]'")
                ->orWhereRaw('CHAR_LENGTH(cpf) <> 11');
        })
        ->delete();

    $colunaAntes = DB::connection('tenant')->selectOne("
        SELECT CHARACTER_MAXIMUM_LENGTH AS tamanho
        FROM information_schema.columns
        WHERE table_schema = DATABASE()
          AND table_name = 'usuarios'
          AND column_name = 'cpf'
        LIMIT 1
    ");

    expect((int) $colunaAntes->tamanho)->toBe(14);

    $migration = require database_path('migrations/tenant/2026_03_12_182713_shrink_cpf_column_in_usuarios_table.php');
    $migration->up();

    $colunaDepois = DB::connection('tenant')->selectOne("
        SELECT CHARACTER_MAXIMUM_LENGTH AS tamanho
        FROM information_schema.columns
        WHERE table_schema = DATABASE()
          AND table_name = 'usuarios'
          AND column_name = 'cpf'
        LIMIT 1
    ");

    expect((int) $colunaDepois->tamanho)->toBe(11);
});
