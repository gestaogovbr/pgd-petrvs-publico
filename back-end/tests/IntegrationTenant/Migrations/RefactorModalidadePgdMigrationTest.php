<?php

use App\Models\Entidade;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

test('schema tenant final usa modalidade_pgd textual e remove tabelas auxiliares', function () {
    expect(Schema::connection('tenant')->hasColumn('usuarios', 'modalidade_pgd'))->toBeTrue()
        ->and(Schema::connection('tenant')->hasColumn('planos_trabalhos', 'modalidade_pgd'))->toBeTrue()
        ->and(Schema::connection('tenant')->hasColumn('entidades', 'modalidade_pgd_padrao'))->toBeTrue()
        ->and(Schema::connection('tenant')->hasColumn('usuarios', 'tipo_modalidade_id'))->toBeFalse()
        ->and(Schema::connection('tenant')->hasColumn('planos_trabalhos', 'tipo_modalidade_id'))->toBeFalse()
        ->and(Schema::connection('tenant')->hasColumn('entidades', 'tipo_modalidade_id'))->toBeFalse()
        ->and(Schema::connection('tenant')->hasTable('tipos_modalidades'))->toBeFalse()
        ->and(Schema::connection('tenant')->hasTable('tipos_modalidades_siape'))->toBeFalse();
});

test('issue 2217 - migracao corretiva zera uuid legado sem modalidade na integracao', function () {
    issue2217ResetLegacyModalidadeSchema();
    issue2217CreateLegacyModalidadeSchema();

    $tipoModalidadeId = '7c204f28-1c30-4222-91d5-b85071ca6a3e';
    $tipoModalidadeSiapeId = 'dea921db-501f-4f39-9abb-c37e06737579';

    DB::table('tipos_modalidades')->insert([
        'id' => $tipoModalidadeId,
        'nome' => 'Parcial',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    DB::table('tipos_modalidades_siape')->insert([
        'id' => $tipoModalidadeSiapeId,
        'tipo_modalidade_id' => $tipoModalidadeId,
        'nome' => 'Parcial',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $usuario = Usuario::factory()->create([
        'cpf' => '22170000001',
        'matricula' => '2217001',
        'modalidade_pgd' => $tipoModalidadeId,
    ]);

    DB::table('usuarios')
        ->where('id', $usuario->id)
        ->update(['tipo_modalidade_id' => $tipoModalidadeId]);

    try {
        issue2217RefactorModalidadeMigration()->up();

        expect(DB::table('usuarios')->where('id', $usuario->id)->value('modalidade_pgd'))
            ->toBe($tipoModalidadeId);

        issue2217SanitizeModalidadeMigration()->up();

        expect(DB::table('usuarios')->where('id', $usuario->id)->value('modalidade_pgd'))
            ->toBeNull();
    } finally {
        issue2217ResetLegacyModalidadeSchema();
    }
});

test('issue 2217 - migracao corretiva recupera uuid legado pela modalidade da integracao servidores', function () {
    issue2217ResetLegacyModalidadeSchema();
    issue2217CreateLegacyModalidadeSchema();

    $tipoModalidadeId = '7c204f28-1c30-4222-91d5-b85071ca6a3e';
    $tipoModalidadeSiapeId = 'dea921db-501f-4f39-9abb-c37e06737579';

    DB::table('tipos_modalidades')->insert([
        'id' => $tipoModalidadeId,
        'nome' => 'Integral',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    DB::table('tipos_modalidades_siape')->insert([
        'id' => $tipoModalidadeSiapeId,
        'tipo_modalidade_id' => $tipoModalidadeId,
        'nome' => 'Integral',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $usuario = Usuario::factory()->create([
        'cpf' => '22170000002',
        'matricula' => '2217002',
        'modalidade_pgd' => $tipoModalidadeId,
    ]);

    DB::table('usuarios')
        ->where('id', $usuario->id)
        ->update(['tipo_modalidade_id' => $tipoModalidadeId]);

    DB::table('integracao_servidores')->insert([
        'id' => 'c0e6fbf6-7e60-47b5-b2ef-3f54e83b2217',
        'cpf' => '22170000002',
        'matriculasiape' => '2217002',
        'nome' => 'Servidor Issue 2217',
        'modalidade_pgd' => 'Teletrabalho (Integral)',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    try {
        issue2217RefactorModalidadeMigration()->up();

        expect(DB::table('usuarios')->where('id', $usuario->id)->value('modalidade_pgd'))
            ->toBe($tipoModalidadeId);

        issue2217SanitizeModalidadeMigration()->up();

        expect(DB::table('usuarios')->where('id', $usuario->id)->value('modalidade_pgd'))
            ->toBe('integral');
    } finally {
        issue2217ResetLegacyModalidadeSchema();
    }
});

test('issue 2217 - migracao corretiva normaliza textos legados de modalidade', function () {
    $presencial = Usuario::factory()->create([
        'cpf' => '22170000003',
        'matricula' => '2217003',
        'modalidade_pgd' => 'Presencial',
    ]);
    $parcial = Usuario::factory()->create([
        'cpf' => '22170000004',
        'matricula' => '2217004',
        'modalidade_pgd' => 'Teletrabalho (Parcial)',
    ]);
    $exterior = Usuario::factory()->create([
        'cpf' => '22170000005',
        'matricula' => '2217005',
        'modalidade_pgd' => 'No Exterior',
    ]);

    issue2217SanitizeModalidadeMigration()->up();

    expect(DB::table('usuarios')->where('id', $presencial->id)->value('modalidade_pgd'))
        ->toBe('presencial')
        ->and(DB::table('usuarios')->where('id', $parcial->id)->value('modalidade_pgd'))
        ->toBe('parcial')
        ->and(DB::table('usuarios')->where('id', $exterior->id)->value('modalidade_pgd'))
        ->toBe('no exterior');
});

test('issue 2217 - migracao corretiva saneia plano de trabalho e entidade', function () {
    $plano = PlanoTrabalho::factory()->create([
        'modalidade_pgd' => 'Teletrabalho (Integral)',
    ]);
    $entidade = Entidade::factory()->create([
        'modalidade_pgd_padrao' => 'dea921db-501f-4f39-9abb-c37e06737579',
    ]);

    issue2217SanitizeModalidadeMigration()->up();

    expect(DB::table('planos_trabalhos')->where('id', $plano->id)->value('modalidade_pgd'))
        ->toBe('integral')
        ->and(DB::table('entidades')->where('id', $entidade->id)->value('modalidade_pgd_padrao'))
        ->toBeNull();
});

function issue2217RefactorModalidadeMigration(): object
{
    return require database_path('migrations/tenant/2026_04_23_000000_refactor_modalidade_pgd_to_string.php');
}

function issue2217SanitizeModalidadeMigration(): object
{
    return require database_path('migrations/tenant/2026_06_23_120000_sanitize_modalidade_pgd_values.php');
}

function issue2217CreateLegacyModalidadeSchema(): void
{
    if (!Schema::hasColumn('usuarios', 'tipo_modalidade_id')) {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->uuid('tipo_modalidade_id')->nullable()->after('modalidade_pgd');
        });
    }

    if (!Schema::hasTable('tipos_modalidades')) {
        Schema::create('tipos_modalidades', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nome', 255);
            $table->boolean('exige_assinatura')->default(false);
            $table->boolean('exige_assinatura_gestor_unidade')->default(false);
            $table->boolean('exige_assinatura_gestor_entidade')->default(false);
            $table->boolean('exige_pedagio')->default(false);
            $table->boolean('atividade_esforco')->default(false);
            $table->boolean('atividade_tempo_despendido')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    if (!Schema::hasTable('tipos_modalidades_siape')) {
        Schema::create('tipos_modalidades_siape', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('tipo_modalidade_id')->nullable();
            $table->string('nome', 255);
            $table->timestamps();
            $table->softDeletes();
            $table->index(['nome']);
        });
    }
}

function issue2217ResetLegacyModalidadeSchema(): void
{
    DB::statement('SET FOREIGN_KEY_CHECKS=0');

    if (Schema::hasTable('tipos_modalidades_siape')) {
        Schema::drop('tipos_modalidades_siape');
    }

    if (Schema::hasTable('tipos_modalidades')) {
        Schema::drop('tipos_modalidades');
    }

    if (Schema::hasColumn('usuarios', 'tipo_modalidade_id')) {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropColumn('tipo_modalidade_id');
        });
    }

    DB::statement('SET FOREIGN_KEY_CHECKS=1');
}
