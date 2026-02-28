<?php

use App\Models\Usuario;
use App\Services\IntegracaoService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

beforeEach(function () {
    $this->service = new IntegracaoService();
    
    // Create a dummy TipoModalidade to satisfy foreign key constraint or not-null requirement
    $this->tipoModalidadeId = Str::uuid()->toString();
    DB::table('tipos_modalidades')->insert([
        'id' => $this->tipoModalidadeId,
        'nome' => 'Modalidade Teste',
        'created_at' => now(),
        'updated_at' => now()
    ]);
});

test('deve alterar email de usuario existente ativo para liberar email', function () {
    $email = 'conflito@teste.gov.br';
    $id = Str::uuid()->toString();
    
    DB::table('usuarios')->insert([
        'id' => $id,
        'email' => $email,
        'matricula' => '11111',
        'nome' => 'Antigo',
        'cpf' => '11111111111',
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'created_at' => now(),
        'updated_at' => now()
    ]);

    $this->assertDatabaseHas('usuarios', ['email' => $email]);

    Usuario::flushEventListeners();

    $this->service->verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake($email, '22222');

    $usuarioAntigo = DB::table('usuarios')->where('id', $id)->first();
    
    expect($usuarioAntigo->email)->not->toBe($email)
        ->and($usuarioAntigo->email)->toContain('@petrvs.gov.br');
});

test('deve alterar email de usuario existente soft deleted para liberar email', function () {
    $email = 'conflito_deleted@teste.gov.br';
    $id = Str::uuid()->toString();
    
    DB::table('usuarios')->insert([
        'id' => $id,
        'email' => $email,
        'matricula' => '33333',
        'nome' => 'Deletado',
        'cpf' => '33333333333',
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => now()
    ]);
    
    $this->assertDatabaseHas('usuarios', ['id' => $id, 'email' => $email]);

    Usuario::flushEventListeners();

    $this->service->verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake($email, '44444');

    $usuarioAntigo = DB::table('usuarios')->where('id', $id)->first();
    
    expect($usuarioAntigo->email)->not->toBe($email)
        ->and($usuarioAntigo->email)->toContain('@petrvs.gov.br');
});

test('nao deve alterar email se for o proprio usuario ignorado', function () {
    $email = 'proprio@teste.gov.br';
    $id = Str::uuid()->toString();
    
    DB::table('usuarios')->insert([
        'id' => $id,
        'email' => $email,
        'matricula' => '55555',
        'nome' => 'Proprio',
        'cpf' => '55555555555',
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'created_at' => now(),
        'updated_at' => now()
    ]);
    
    Usuario::flushEventListeners();

    $this->service->verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake($email, '55555', $id);

    $usuario = DB::table('usuarios')->where('id', $id)->first();
    
    expect($usuario->email)->toBe($email);
});
