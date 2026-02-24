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

    $result = $repo->getServidor($cpf, $matricula);

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
    ]);

    expect($updated)->toBeTrue();

    $this->assertDatabaseHas('integracao_servidores', [
        'cpf' => $cpf,
        'matriculasiape' => $matricula,
        'nome' => 'Nome Atualizado',
    ]);
});
