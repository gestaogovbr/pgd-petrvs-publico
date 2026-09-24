<?php

use App\Models\IntegracaoServidor;
use App\Repository\IntegracaoServidor\Eloquent\EloquentIntegracaoServidorReadRepository;
use App\Repository\IntegracaoServidor\Eloquent\EloquentIntegracaoServidorWriteRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

test('getServidor retorna registro mais recente por cpf e matricula', function () {
    $cpf = '12345678901';
    $matricula = '999999';

    DB::table('integracao_servidores')->insert([
        'id' => Str::uuid()->toString(),
        'cpf' => $cpf,
        'matriculasiape' => $matricula,
        'nome' => 'Servidor Antigo',
        'created_at' => now()->subDay(),
        'updated_at' => now()->subDay(),
    ]);

    DB::table('integracao_servidores')->insert([
        'id' => Str::uuid()->toString(),
        'cpf' => $cpf,
        'matriculasiape' => $matricula,
        'nome' => 'Servidor Novo',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $repo = new EloquentIntegracaoServidorReadRepository(new IntegracaoServidor());

    $result = $repo->getServidor($cpf, $matricula, '20000');

    expect($result)->not->toBeNull()
        ->and($result->cpf)->toBe($cpf)
        ->and($result->matriculasiape)->toBe($matricula)
        ->and($result->nome)->toBe('Servidor Novo');
});

test('save persiste entidade e retorna true', function () {
    $modelo = new IntegracaoServidor([
        'id' => Str::uuid()->toString(),
        'cpf' => '22222222222',
        'matriculasiape' => '888888',
        'nome' => 'Servidor Save',
    ]);

    $repo = new EloquentIntegracaoServidorWriteRepository(new IntegracaoServidor());

    $saved = $repo->save($modelo);

    expect($saved)->toBeTrue()
        ->and($this->assertDatabaseHas('integracao_servidores', [
            'id' => $modelo->id,
            'cpf' => '22222222222',
            'matriculasiape' => '888888',
        ]));
});

test('update atualiza registro existente por cpf e matricula', function () {
    $cpf = '33333333333';
    $matricula = '777777';

    $id = Str::uuid()->toString();

    IntegracaoServidor::query()->create([
        'id' => $id,
        'cpf' => $cpf,
        'matriculasiape' => $matricula,
        'nome' => 'Nome Antigo',
        'created_at' => now()->subHour(),
        'updated_at' => now()->subHour(),
    ]);

    $repo = new EloquentIntegracaoServidorWriteRepository(new IntegracaoServidor());

    $updated = $repo->updateByCpfAndMatricula($cpf, $matricula, [
        'nome' => 'Nome Atualizado',
    ], '20000');

    expect($updated)->toBeTrue();

    $this->assertDatabaseHas('integracao_servidores', [
        'cpf' => $cpf,
        'matriculasiape' => $matricula,
        'nome' => 'Nome Atualizado',
    ]);
});

test('getUsuariosAusentes respeita escopo da carga individual por cpf e matriculas', function () {
    inserirIntegracaoServidorEscopo('11122233344', '2326001', 'Servidor Consultado');
    inserirIntegracaoServidorEscopo('55566677788', '2326002', 'Servidor Fora Escopo');

    $repo = new EloquentIntegracaoServidorReadRepository(new IntegracaoServidor());

    $result = $repo->getUsuariosAusentes('20000', [
        'origem' => 'carga_individual_servidor',
        'cpf' => '11122233344',
        'matriculas' => ['2326001'],
    ]);

    expect($result)->toHaveCount(1)
        ->and($result[0]->cpf)->toBe('11122233344')
        ->and($result[0]->matricula)->toBe('2326001');
});

test('buscarAtualizacoesDados respeita escopo da carga individual e nao atualiza outro cpf', function () {
    inserirUsuarioEscopo('11122233344', '2326011', 'Nome Antigo A', 'antigo-a@teste.gov.br');
    inserirUsuarioEscopo('55566677788', '2326012', 'Nome Antigo B', 'antigo-b@teste.gov.br');
    inserirIntegracaoServidorEscopo('11122233344', '2326011', 'Nome Novo A', 'novo-a@teste.gov.br');
    inserirIntegracaoServidorEscopo('55566677788', '2326012', 'Nome Novo B', 'novo-b@teste.gov.br');

    $repo = new EloquentIntegracaoServidorReadRepository(new IntegracaoServidor());

    $result = $repo->buscarAtualizacoesDados('20000', [
        'origem' => 'carga_individual_servidor',
        'cpf' => '11122233344',
        'matriculas' => ['2326011'],
    ]);

    expect($result)->toHaveCount(1)
        ->and($result[0]->cpf_servidor)->toBe('11122233344')
        ->and($result[0]->matriculasiape)->toBe('2326011');
});

test('getUsuariosAusentes em escopo compara cpf quando existe matricula igual em outro usuario', function () {
    inserirUsuarioEscopo('55566677788', '2326021', 'Usuario Outro CPF', 'outro-cpf@teste.gov.br');
    inserirIntegracaoServidorEscopo('11122233344', '2326021', 'Servidor Mesmo Numero Matricula', 'consultado@teste.gov.br');

    $repo = new EloquentIntegracaoServidorReadRepository(new IntegracaoServidor());

    $result = $repo->getUsuariosAusentes('20000', [
        'origem' => 'carga_individual_servidor',
        'cpf' => '11122233344',
        'matriculas' => ['2326021'],
    ]);

    expect($result)->toHaveCount(1)
        ->and($result[0]->cpf)->toBe('11122233344')
        ->and($result[0]->matricula)->toBe('2326021');
});

function inserirUsuarioEscopo(string $cpf, string $matricula, string $nome, string $email): void
{
    DB::table('usuarios')->insert([
        'id' => Str::uuid()->toString(),
        'cpf' => $cpf,
        'matricula' => $matricula,
        'nome' => $nome,
        'email' => $email,
        'apelido' => $nome,
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'modalidade_pgd' => 'presencial',
        'created_at' => now(),
        'updated_at' => now(),
    ]);
}

function inserirIntegracaoServidorEscopo(string $cpf, string $matricula, string $nome, ?string $email = null): void
{
    DB::table('integracao_servidores')->insert([
        'id' => Str::uuid()->toString(),
        'cpf_ativo' => true,
        'data_modificacao' => now(),
        'cpf' => $cpf,
        'nome' => $nome,
        'emailfuncional' => $email ?? mb_strtolower(str_replace(' ', '.', $nome)) . '@teste.gov.br',
        'sexo' => 'MASCULINO',
        'municipio' => 'Brasilia',
        'uf' => 'DF',
        'data_nascimento' => '1990-01-01 00:00:00',
        'telefone' => null,
        'vinculo_ativo' => true,
        'matriculasiape' => $matricula,
        'codigo_cargo' => null,
        'coduorgexercicio' => null,
        'coduorglotacao' => null,
        'codigo_servo_exercicio' => '2326',
        'nomeguerra' => $nome,
        'codigo_situacao_funcional' => '1',
        'situacao_funcional' => 'ATIVO_PERMANENTE',
        'codupag' => null,
        'dataexercicionoorgao' => null,
        'funcoes' => null,
        'cpf_chefia_imediata' => null,
        'email_chefia_imediata' => null,
        'ident_unica' => null,
        'nome_jornada' => '40 HORAS SEMANAIS',
        'cod_jornada' => '40',
        'modalidade_pgd' => 'parcial',
        'participa_pgd' => 'sim',
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null,
    ]);
}
