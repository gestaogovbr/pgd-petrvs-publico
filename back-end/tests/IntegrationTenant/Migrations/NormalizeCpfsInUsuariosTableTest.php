<?php

use App\Models\Perfil;
use App\Models\TipoModalidade;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;

test('normaliza cpf removendo máscara na tabela usuarios', function () {
    DB::connection('tenant')->statement('ALTER TABLE usuarios MODIFY cpf VARCHAR(14) NOT NULL');

    $tipoModalidadeId = TipoModalidade::factory()->create(['nome' => 'Presencial'])->id;
    $perfilId = Perfil::factory()->create(['nome' => 'Padrão'])->id;

    $usuarioMascarado = Usuario::factory()->create([
        'cpf' => '015.750.810-24',
        'tipo_modalidade_id' => $tipoModalidadeId,
        'perfil_id' => $perfilId,
    ]);

    $usuarioSemMascara = Usuario::factory()->create([
        'cpf' => '12345678901',
        'tipo_modalidade_id' => $tipoModalidadeId,
        'perfil_id' => $perfilId,
    ]);

    $usuarioFormatoInvalido = Usuario::factory()->create([
        'cpf' => '123.456',
        'tipo_modalidade_id' => $tipoModalidadeId,
        'perfil_id' => $perfilId,
    ]);

    $migration = require database_path('migrations/tenant/2026_03_12_180933_normalize_cpfs_in_usuarios_table.php');
    $migration->up();

    $usuarioMascarado->refresh();
    $usuarioSemMascara->refresh();
    $usuarioFormatoInvalido->refresh();

    expect($usuarioMascarado->cpf)->toBe('01575081024');
    expect($usuarioSemMascara->cpf)->toBe('12345678901');
    expect($usuarioFormatoInvalido->cpf)->toBe('123.456');
});
