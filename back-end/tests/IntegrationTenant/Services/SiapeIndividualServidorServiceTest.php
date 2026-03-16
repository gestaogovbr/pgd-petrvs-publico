<?php

namespace Tests\IntegrationTenant\Services;

use App\Models\Usuario;
use App\Models\SiapeBlackListServidor;
use App\Services\SiapeIndividualService;
use App\Services\SiapeIndividualServidorService;
use App\Models\TipoModalidade;
use Illuminate\Support\Str;
use Mockery;

// Uses DatabaseTenantTestCase implicitly via folder configuration in Pest.php

beforeEach(function () {
    // No manual schema creation needed!
    // DatabaseTenantTestCase handles tenant creation and schema loading.
    
    $this->service = app(SiapeIndividualServidorService::class);
    
    // Create TipoModalidade required for Usuario
    $this->tipoModalidade = TipoModalidade::create([
        'nome' => 'Presencial',
        'exige_pedagio' => 0,
        'plano_trabalho_calcula_horas' => 0,
        'atividade_tempo_despendido' => 0,
        'atividade_esforco' => 0
    ]);

    // Mock external service
    $this->mockSiapeService = Mockery::mock(SiapeIndividualService::class);
    $this->mockSiapeService->config = [
        'codOrgao' => '12345',
        'siglaSistema' => 'TESTE',
        'nomeSistema' => 'SISTEMA TESTE',
        'senha' => 'senha',
        'parmExistPag' => 'S',
        'parmTipoVinculo' => '1'
    ];
});

afterEach(function () {
    Mockery::close();
});

test('deve identificar usuario novo no resumo', function () {
    $cpf = str_pad((string) random_int(1, 99999999999), 11, '0', STR_PAD_LEFT);
    
    // Ensure user does not exist
    $this->assertDatabaseMissing('usuarios', ['cpf' => $cpf], 'tenant');

    $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
    $method = $reflection->getMethod('gerarResumo');
    $method->setAccessible(true);

    $usuariosAntes = []; 

    // Create user manually to simulate insertion
    $usuario = Usuario::create([
        'nome' => 'Novo Usuario',
        'email' => 'novo@teste.com',
        'cpf' => $cpf,
        'apelido' => 'Novo',
        'matricula' => '11111',
        'tipo_modalidade_id' => $this->tipoModalidade->id
    ]);
    
    $resumo = $method->invokeArgs($this->service, [$usuariosAntes, $cpf, 'sucesso']);

    expect($resumo)->toHaveCount(1);
    expect($resumo[0]['nome'])->toBe('Novo Usuario');
    expect($resumo[0]['usuario_existia'])->toBeFalse();
    expect($resumo[0]['usuario_inserido'])->toBeTrue();
});

test('deve identificar usuario existente no resumo', function () {
    $cpf = '98765432109';
    
    $usuario = Usuario::create([
        'nome' => 'Usuario Existente',
        'email' => 'existente@teste.com',
        'cpf' => $cpf,
        'apelido' => 'Existente',
        'matricula' => '22222',
        'situacao_siape' => 'ATIVO',
        'tipo_modalidade_id' => $this->tipoModalidade->id
    ]);

    $usuariosAntes = [[
        'id' => $usuario->id,
        'matricula' => $usuario->matricula,
        'nome' => $usuario->nome,
        'email' => $usuario->email,
        'situacao_siape' => $usuario->situacao_siape,
        'lotacao_id' => null
    ]];

    $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
    $method = $reflection->getMethod('gerarResumo');
    $method->setAccessible(true);

    $resumo = $method->invokeArgs($this->service, [$usuariosAntes, $cpf, 'sucesso']);

    expect($resumo)->toHaveCount(1);
    expect($resumo[0]['nome'])->toBe('Usuario Existente');
    expect($resumo[0]['usuario_existia'])->toBeTrue();
    expect($resumo[0]['usuario_inserido'])->toBeFalse();
});

test('deve identificar alteracoes no usuario', function () {
     $cpf = '11122233344';
    
     $usuario = Usuario::create([
        'nome' => 'Nome Novo',
        'email' => 'mudanca@teste.com',
        'cpf' => $cpf,
        'apelido' => 'Mudanca',
        'matricula' => '33333',
        'situacao_siape' => 'ATIVO',
        'tipo_modalidade_id' => $this->tipoModalidade->id
    ]);

     $usuariosAntes = [[
         'id' => $usuario->id,
         'matricula' => $usuario->matricula,
         'nome' => 'Nome Antigo',
         'email' => $usuario->email,
         'situacao_siape' => $usuario->situacao_siape,
         'lotacao_id' => null
     ]];
 
     $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
     $method = $reflection->getMethod('gerarResumo');
     $method->setAccessible(true);
 
     $resumo = $method->invokeArgs($this->service, [$usuariosAntes, $cpf, 'sucesso']);
 
     expect($resumo[0]['usuario_existia'])->toBeTrue();
     expect($resumo[0]['alteracoes'])->toContain('nome');
});

test('deve retornar parcial se lotacao falhar para usuario existente', function () {
    $cpf = '55566677788';
    
    $usuario = Usuario::create([
        'nome' => 'Usuario Sem Lotacao',
        'email' => 'semlotacao@teste.com',
        'cpf' => $cpf,
        'apelido' => 'SemLotacao',
        'matricula' => '44444',
        'situacao_siape' => 'ATIVO',
        'tipo_modalidade_id' => $this->tipoModalidade->id
    ]);

    $usuariosAntes = [[
        'id' => $usuario->id,
        'matricula' => $usuario->matricula,
        'nome' => $usuario->nome,
        'email' => $usuario->email,
        'situacao_siape' => $usuario->situacao_siape,
        'lotacao_id' => null
    ]];

    $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
    $method = $reflection->getMethod('gerarResumo');
    $method->setAccessible(true);

    $resumo = $method->invokeArgs($this->service, [$usuariosAntes, $cpf, 'sucesso']);

    expect($resumo[0]['usuario_existia'])->toBeTrue();
    expect($resumo[0]['lotacao_associada'])->toBeFalse();
    expect($resumo[0]['status'])->toBe('parcial');
    expect($resumo[0]['mensagem'])->toContain('Lotação não associada');
});

test('deve gerenciar blacklist corretamente para multiplas matriculas', function () {
    $cpf = '11122233344';
    
    $userA = Usuario::create([
        'nome' => 'User A',
        'email' => 'a@test.com',
        'cpf' => $cpf,
        'matricula' => '11111',
        'situacao_siape' => 'ATIVO',
        'tipo_modalidade_id' => $this->tipoModalidade->id
    ]);
    
    $userB = Usuario::create([
        'nome' => 'User B',
        'email' => 'b@test.com',
        'cpf' => $cpf,
        'matricula' => '22222',
        'situacao_siape' => 'ATIVO',
        'tipo_modalidade_id' => $this->tipoModalidade->id
    ]);

    SiapeBlackListServidor::create([
        'cpf' => $cpf,
        'matricula' => '11111',
        'response' => 'test'
    ]);

    $dadosFuncionais = [
        ['matriculaSiape' => '11111', 'codUorgExercicio' => '123'],
        ['matriculaSiape' => '33333', 'codUorgExercicio' => '123']
    ];

    $reflection = new \ReflectionClass(SiapeIndividualServidorService::class);
    $method = $reflection->getMethod('removeVinculoParaforcarSerLotadoNovamente');
    $method->setAccessible(true);
    
    $method->invokeArgs($this->service, [$cpf, $dadosFuncionais]);

    $this->assertDatabaseMissing('siape_blacklist_servidores', [
        'cpf' => $cpf,
        'matricula' => '11111'
    ]);

    $this->assertDatabaseHas('siape_blacklist_servidores', [
        'cpf' => $cpf,
        'matricula' => '22222'
    ]);
});
