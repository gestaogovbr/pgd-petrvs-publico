<?php

use Illuminate\Support\Facades\DB;

function planejarCodigosDuplicados(): array
{
    $migration = require database_path('migrations/tenant/2026_08_12_000000_add_codigo_orgao_e_unidade_antiga.php');
    $method = new ReflectionMethod($migration, 'planejarCorrecoes');

    return $method->invoke($migration, 'unidades_migracao_teste', 'tenant_teste');
}

beforeEach(function (): void {
    DB::statement('CREATE TEMPORARY TABLE unidades_migracao_teste (
        id VARCHAR(36) PRIMARY KEY,
        codigo VARCHAR(12) NULL,
        data_inativacao DATETIME NULL,
        created_at DATETIME NOT NULL
    )');
});

afterEach(function (): void {
    DB::statement('DROP TEMPORARY TABLE IF EXISTS unidades_migracao_teste');
});

test('prioriza a inativa e depois a ativa mais antiga, preservando o código da ativa recente', function () {
    DB::table('unidades_migracao_teste')->insert([
        ['id' => 'inativa', 'codigo' => '123456', 'data_inativacao' => '2025-01-01 00:00:00', 'created_at' => '2024-01-01 00:00:00'],
        ['id' => 'ativa_antiga', 'codigo' => '123456', 'data_inativacao' => null, 'created_at' => '2023-01-01 00:00:00'],
        ['id' => 'ativa_recente', 'codigo' => '123456', 'data_inativacao' => null, 'created_at' => '2026-01-01 00:00:00'],
    ]);

    expect(planejarCodigosDuplicados())->toBe([
        ['id' => 'inativa', 'codigo_antigo' => '123456', 'codigo_novo' => '123456A'],
        ['id' => 'ativa_antiga', 'codigo_antigo' => '123456', 'codigo_novo' => '123456B'],
    ]);
});

test('não usa sufixo já ocupado por outra unidade', function () {
    DB::table('unidades_migracao_teste')->insert([
        ['id' => 'inativa', 'codigo' => '123456', 'data_inativacao' => '2025-01-01 00:00:00', 'created_at' => '2024-01-01 00:00:00'],
        ['id' => 'ativa', 'codigo' => '123456', 'data_inativacao' => null, 'created_at' => '2026-01-01 00:00:00'],
        ['id' => 'sufixo_ocupado', 'codigo' => '123456A', 'data_inativacao' => null, 'created_at' => '2026-01-01 00:00:00'],
    ]);

    expect(planejarCodigosDuplicados())->toBe([
        ['id' => 'inativa', 'codigo_antigo' => '123456', 'codigo_novo' => '123456B'],
    ]);
});

test('recusa código duplicado que já ocupa os doze caracteres da coluna', function () {
    DB::table('unidades_migracao_teste')->insert([
        ['id' => 'inativa', 'codigo' => '123456789012', 'data_inativacao' => '2025-01-01 00:00:00', 'created_at' => '2024-01-01 00:00:00'],
        ['id' => 'ativa', 'codigo' => '123456789012', 'data_inativacao' => null, 'created_at' => '2026-01-01 00:00:00'],
    ]);

    expect(fn () => planejarCodigosDuplicados())
        ->toThrow(RuntimeException::class, 'nenhuma correção foi aplicada');
});

test('recusa duplicidade quando todos os sufixos de um caractere já estão ocupados', function () {
    $ocupados = [];

    foreach (range('A', 'Z') as $sufixo) {
        $ocupados[] = [
            'id' => "ocupado_{$sufixo}",
            'codigo' => "123456{$sufixo}",
            'data_inativacao' => null,
            'created_at' => '2026-01-01 00:00:00',
        ];
    }

    DB::table('unidades_migracao_teste')->insert(array_merge($ocupados, [
        ['id' => 'inativa', 'codigo' => '123456', 'data_inativacao' => '2025-01-01 00:00:00', 'created_at' => '2024-01-01 00:00:00'],
        ['id' => 'ativa', 'codigo' => '123456', 'data_inativacao' => null, 'created_at' => '2026-01-01 00:00:00'],
    ]));

    expect(fn () => planejarCodigosDuplicados())
        ->toThrow(RuntimeException::class, 'não há sufixo de um caractere livre');
});
