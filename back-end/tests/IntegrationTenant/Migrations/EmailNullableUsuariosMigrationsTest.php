<?php

use App\Models\Perfil;
use App\Models\TipoModalidade;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;

test('migração torna usuarios.email nullable mantendo UNIQUE', function () {
    $migrationPath = database_path('migrations/tenant/2026_03_29_000001_make_usuarios_email_nullable.php');

    expect(file_exists($migrationPath))->toBeTrue();

    $migration = require $migrationPath;
    $migration->up();

    $colunaDepois = DB::connection('tenant')->selectOne("
        SELECT IS_NULLABLE AS is_nullable
        FROM information_schema.columns
        WHERE table_schema = DATABASE()
          AND table_name = 'usuarios'
          AND column_name = 'email'
        LIMIT 1
    ");

    expect((string) $colunaDepois->is_nullable)->toBe('YES');

    $uniqueCount = DB::connection('tenant')->selectOne("
        SELECT COUNT(*) AS qtd
        FROM information_schema.statistics
        WHERE table_schema = DATABASE()
          AND table_name = 'usuarios'
          AND column_name = 'email'
          AND non_unique = 0
    ");

    expect((int) $uniqueCount->qtd)->toBeGreaterThan(0);
});

test('migração saneia emails @petrvs definindo usuarios.email como null', function () {
    $makeNullablePath = database_path('migrations/tenant/2026_03_29_000001_make_usuarios_email_nullable.php');
    $sanitizePath = database_path('migrations/tenant/2026_03_29_000002_sanitize_petrvs_emails_in_usuarios_table.php');

    expect(file_exists($makeNullablePath))->toBeTrue();
    expect(file_exists($sanitizePath))->toBeTrue();

    $makeNullable = require $makeNullablePath;
    $makeNullable->up();

    $tipoModalidadeId = TipoModalidade::factory()->create(['nome' => 'Presencial'])->id;
    $perfilId = Perfil::factory()->create(['nome' => 'Padrão'])->id;

    $usuarioPetrvs1 = Usuario::factory()->create([
        'email' => 'u1@petrvs.gov.br',
        'tipo_modalidade_id' => $tipoModalidadeId,
        'perfil_id' => $perfilId,
    ]);

    $usuarioPetrvs2 = Usuario::factory()->create([
        'email' => 'u2@petrvs.gov.br',
        'tipo_modalidade_id' => $tipoModalidadeId,
        'perfil_id' => $perfilId,
    ]);

    $usuarioValido = Usuario::factory()->create([
        'email' => 'valido@exemplo.com',
        'tipo_modalidade_id' => $tipoModalidadeId,
        'perfil_id' => $perfilId,
    ]);

    $migration = require $sanitizePath;
    $migration->up();

    $usuarioPetrvs1->refresh();
    $usuarioPetrvs2->refresh();
    $usuarioValido->refresh();

    expect($usuarioPetrvs1->email)->toBeNull();
    expect($usuarioPetrvs2->email)->toBeNull();
    expect($usuarioValido->email)->toBe('valido@exemplo.com');
});
