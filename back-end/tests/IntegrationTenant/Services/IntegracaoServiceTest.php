<?php

use App\Models\Usuario;
use App\Services\IntegracaoService;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


beforeEach(function () {
    Bus::fake();
    $this->service = new IntegracaoService();

    $this->tipoModalidadeId = Str::uuid()->toString();
    DB::table('tipos_modalidades')->insert([
        'id' => $this->tipoModalidadeId,
        'nome' => 'Modalidade Teste',
        'created_at' => now(),
        'updated_at' => now()
    ]);

    $this->perfilParticipanteId = Str::uuid()->toString();
    DB::table('perfis')->insert([
        'id' => $this->perfilParticipanteId,
        'nivel' => 5,
        'nome' => 'Participante',
        'descricao' => 'Participante',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $this->service->integracao_config['perfilComum'] = 'usuario_comum';
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

    $this->service->liberarEmailDuplicadoDefinindoComoNulo($email, '22222');

    $usuarioAntigo = DB::table('usuarios')->where('id', $id)->first();

    expect($usuarioAntigo->email)->toBeNull();
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

    $this->service->liberarEmailDuplicadoDefinindoComoNulo($email, '44444');

    $usuarioAntigo = DB::table('usuarios')->where('id', $id)->first();

    expect($usuarioAntigo->email)->toBeNull();
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

    $this->service->liberarEmailDuplicadoDefinindoComoNulo($email, '55555', $id);

    $usuario = DB::table('usuarios')->where('id', $id)->first();

    expect($usuario->email)->toBe($email);
});

test('deve transferir email para usuario mais recente e manter consistencia ao executar fluxo de servidores', function () {
    $cpf = '43853690033';
    $email = 'teste@teste.com.br';
    $dataUsuario1 = '2026-01-01 00:00:00';
    $dataUsuario2 = '2026-01-02 00:00:00';

    DB::table('integracao_servidores')->insert([
        'id' => Str::uuid()->toString(),
        'cpf_ativo' => $cpf,
        'data_modificacao' => $dataUsuario1,
        'cpf' => $cpf,
        'nome' => 'usuario1',
        'emailfuncional' => $email,
        'sexo' => 'MASCULINO',
        'municipio' => 'Brasilia',
        'uf' => 'DF',
        'data_nascimento' => '1990-01-01',
        'telefone' => null,
        'vinculo_ativo' => 'SIM',
        'matriculasiape' => '1',
        'codigo_cargo' => null,
        'coduorgexercicio' => null,
        'coduorglotacao' => null,
        'codigo_servo_exercicio' => null,
        'nomeguerra' => 'usuario1',
        'codigo_situacao_funcional' => '1',
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'codupag' => null,
        'dataexercicionoorgao' => null,
        'funcoes' => null,
        'cpf_chefia_imediata' => null,
        'email_chefia_imediata' => null,
        'nome_jornada' => null,
        'cod_jornada' => null,
        'modalidade_pgd' => null,
        'participa_pgd' => 'não',
        'ident_unica' => null,
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null,
    ]);

    DB::table('usuarios')->insert([
        'id' => Str::uuid()->toString(),
        'email' => $email,
        'nome' => 'usuario1',
        'cpf' => $cpf,
        'matricula' => '1',
        'apelido' => 'usuario1',
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'data_modificacao' => $dataUsuario1,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $servidores = [
        [
            'pessoal' => [
                'cpf_ativo' => $cpf,
                'data_modificacao' => $dataUsuario2,
                'cpf' => $cpf,
                'nome' => 'usuario2',
                'sexo' => 'MASCULINO',
                'municipio' => 'Brasilia',
                'uf' => 'DF',
                'data_nascimento' => '1990-01-01',
                'telefone' => null,
            ],
            'funcionais' => [
                [
                    'emailfuncional' => $email,
                    'matriculas' => [
                        'dados' => [
                            'vinculo_ativo' => 'SIM',
                            'matriculasiape' => '2',
                            'codsitfuncional' => 1,
                            'nomeguerra' => 'usuario2',
                            'codigo_servo_exercicio' => '1',
                        ],
                    ],
                ],
            ],
        ],
    ];

    $this->service->processarServidoresTransaction($servidores);

    $usuario1 = DB::table('usuarios')->where('matricula', '1')->first();
    $usuario2 = DB::table('usuarios')->where('matricula', '2')->first();

    expect($usuario1)->not->toBeNull();
    expect($usuario1->cpf)->toBe($cpf);
    expect($usuario1->email)->toBeNull();

    expect($usuario2)->not->toBeNull();
    expect($usuario2->cpf)->toBe($cpf);
    expect($usuario2->email)->toBe($email);
});

test('deve ser idempotente ao executar fluxo de servidores com dados já consistentes no banco', function () {
    $cpf = '43853690033';
    $email = 'teste@teste.com.br';
    $dataUsuario1 = '2026-01-01 00:00:00';
    $dataUsuario2 = '2026-01-02 00:00:00';

    DB::table('integracao_servidores')->insert([
        'id' => Str::uuid()->toString(),
        'cpf_ativo' => $cpf,
        'data_modificacao' => $dataUsuario1,
        'cpf' => $cpf,
        'nome' => 'usuario1',
        'emailfuncional' => null,
        'sexo' => 'MASCULINO',
        'municipio' => 'Brasilia',
        'uf' => 'DF',
        'data_nascimento' => '1990-01-01',
        'telefone' => null,
        'vinculo_ativo' => 'SIM',
        'matriculasiape' => '1',
        'codigo_cargo' => null,
        'coduorgexercicio' => null,
        'coduorglotacao' => null,
        'codigo_servo_exercicio' => null,
        'nomeguerra' => 'usuario1',
        'codigo_situacao_funcional' => '1',
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'codupag' => null,
        'dataexercicionoorgao' => null,
        'funcoes' => null,
        'cpf_chefia_imediata' => null,
        'email_chefia_imediata' => null,
        'nome_jornada' => null,
        'cod_jornada' => null,
        'modalidade_pgd' => null,
        'participa_pgd' => 'não',
        'ident_unica' => null,
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null,
    ]);

    DB::table('integracao_servidores')->insert([
        'id' => Str::uuid()->toString(),
        'cpf_ativo' => $cpf,
        'data_modificacao' => $dataUsuario2,
        'cpf' => $cpf,
        'nome' => 'usuario2',
        'emailfuncional' => $email,
        'sexo' => 'MASCULINO',
        'municipio' => 'Brasilia',
        'uf' => 'DF',
        'data_nascimento' => '1990-01-01',
        'telefone' => null,
        'vinculo_ativo' => 'SIM',
        'matriculasiape' => '2',
        'codigo_cargo' => null,
        'coduorgexercicio' => null,
        'coduorglotacao' => null,
        'codigo_servo_exercicio' => null,
        'nomeguerra' => 'usuario2',
        'codigo_situacao_funcional' => '1',
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'codupag' => null,
        'dataexercicionoorgao' => null,
        'funcoes' => null,
        'cpf_chefia_imediata' => null,
        'email_chefia_imediata' => null,
        'nome_jornada' => null,
        'cod_jornada' => null,
        'modalidade_pgd' => null,
        'participa_pgd' => 'não',
        'ident_unica' => null,
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null,
    ]);

    DB::table('usuarios')->insert([
        'id' => Str::uuid()->toString(),
        'email' => null,
        'nome' => 'usuario1',
        'cpf' => $cpf,
        'matricula' => '1',
        'apelido' => 'usuario1',
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'data_modificacao' => $dataUsuario1,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    DB::table('usuarios')->insert([
        'id' => Str::uuid()->toString(),
        'email' => $email,
        'nome' => 'usuario2',
        'cpf' => $cpf,
        'matricula' => '2',
        'apelido' => 'usuario2',
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'tipo_modalidade_id' => $this->tipoModalidadeId,
        'data_modificacao' => $dataUsuario2,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $servidores = [
        [
            'pessoal' => [
                'cpf_ativo' => $cpf,
                'data_modificacao' => $dataUsuario2,
                'cpf' => $cpf,
                'nome' => 'usuario2',
                'sexo' => 'MASCULINO',
                'municipio' => 'Brasilia',
                'uf' => 'DF',
                'data_nascimento' => '1990-01-01',
                'telefone' => null,
            ],
            'funcionais' => [
                [
                    'emailfuncional' => $email,
                    'matriculas' => [
                        'dados' => [
                            'vinculo_ativo' => 'SIM',
                            'matriculasiape' => '2',
                            'codsitfuncional' => 1,
                            'nomeguerra' => 'usuario2',
                        ],
                    ],
                ],
            ],
        ],
    ];

    Usuario::withoutEvents(function () use ($servidores) {
        $this->service->processarServidoresTransaction($servidores);
    });

    $usuario1 = DB::table('usuarios')->where('matricula', '1')->first();
    $usuario2 = DB::table('usuarios')->where('matricula', '2')->first();

    expect($usuario1)->not->toBeNull();
    expect($usuario1->cpf)->toBe($cpf);
    expect($usuario1->email)->toBeNull();

    expect($usuario2)->not->toBeNull();
    expect($usuario2->cpf)->toBe($cpf);
    expect($usuario2->email)->toBe($email);
});
