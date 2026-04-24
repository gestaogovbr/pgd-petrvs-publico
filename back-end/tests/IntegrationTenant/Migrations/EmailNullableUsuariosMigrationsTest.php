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

    $emailPetrvs1 = 'u1-' . \Illuminate\Support\Str::uuid()->toString() . '@petrvs.gov.br';
    $emailPetrvs2 = 'u2-' . \Illuminate\Support\Str::uuid()->toString() . '@petrvs.gov.br';
    $emailValido = 'valido-' . \Illuminate\Support\Str::uuid()->toString() . '@exemplo.com';

    $usuarioPetrvs1 = Usuario::factory()->create([
        'email' => $emailPetrvs1,
        'tipo_modalidade_id' => $tipoModalidadeId,
        'perfil_id' => $perfilId,
    ]);

    $usuarioPetrvs2 = Usuario::factory()->create([
        'email' => $emailPetrvs2,
        'tipo_modalidade_id' => $tipoModalidadeId,
        'perfil_id' => $perfilId,
    ]);

    $usuarioValido = Usuario::factory()->create([
        'email' => $emailValido,
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
    expect($usuarioValido->email)->toBe($emailValido);
});

test('migração saneia emails @petrvs definindo integracao_servidores.emailfuncional como null', function () {
    $sanitizePath = database_path('migrations/tenant/2026_03_30_000001_sanitize_emailfuncional_integracao_servidores.php');

    expect(file_exists($sanitizePath))->toBeTrue();

    DB::table('integracao_servidores')->insert([
        'id' => \Illuminate\Support\Str::uuid()->toString(),
        'cpf' => '11111111111',
        'matriculasiape' => '1',
        'nome' => 'Servidor 1',
        'emailfuncional' => 'u1@petrvs.gov.br ',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    DB::table('integracao_servidores')->insert([
        'id' => \Illuminate\Support\Str::uuid()->toString(),
        'cpf' => '22222222222',
        'matriculasiape' => '2',
        'nome' => 'Servidor 2',
        'emailfuncional' => 'valido@exemplo.com',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $migration = require $sanitizePath;
    $migration->up();

    $registroPetrvs = DB::table('integracao_servidores')->where('matriculasiape', '1')->first();
    $registroValido = DB::table('integracao_servidores')->where('matriculasiape', '2')->first();

    expect($registroPetrvs->emailfuncional)->toBeNull();
    expect($registroValido->emailfuncional)->toBe('valido@exemplo.com');
});
