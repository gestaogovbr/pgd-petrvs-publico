<?php

use App\Services\Siape\ProcessaDadosSiapeBD;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

it('processa diferentes cenarios de processaMultiplasMatriculasInativas', function () {
    if (!Schema::hasTable('usuarios')) {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cpf', 50);
            $table->string('matricula')->nullable();
            $table->string('situacao_siape')->nullable();
            $table->timestamp('data_ativacao_temporaria')->nullable();
            $table->text('justicativa_ativacao_temporaria')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    if (!Schema::hasTable('siape_blacklist_servidores')) {
        Schema::create('siape_blacklist_servidores', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('cpf', 50);
            $table->string('matricula')->nullable();
            $table->longText('response');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    DB::table('usuarios')->delete();
    DB::table('siape_blacklist_servidores')->delete();

    $cpf = '11122233344';
    DB::table('usuarios')->insert([
        ['id' => Str::uuid(), 'cpf' => $cpf, 'matricula' => '123', 'created_at' => now(), 'updated_at' => now()],
        ['id' => Str::uuid(), 'cpf' => $cpf, 'matricula' => '456', 'created_at' => now(), 'updated_at' => now()],
        ['id' => Str::uuid(), 'cpf' => $cpf, 'matricula' => null,   'created_at' => now(), 'updated_at' => now()],
    ]);

    $service = new ProcessaDadosSiapeBD();
    $method = new ReflectionMethod(ProcessaDadosSiapeBD::class, 'processaMultiplasMatriculasInativas');
    $method->setAccessible(true);

    $dadosFuncionaisArray = [ ['matriculaSiape' => '123'], ['matriculaSiape' => null] ];
    $method->invoke($service, $cpf, $dadosFuncionaisArray, 'xml');

    $ativo = DB::table('usuarios')->where('cpf', $cpf)->where('matricula', '123')->first();
    expect($ativo->situacao_siape)->toBe('ATIVO');

    $bl = DB::table('siape_blacklist_servidores')->where('cpf', $cpf)->where('matricula', '456')->count();
    expect($bl)->toBe(1);
});

afterEach(function () {
    // nada
});