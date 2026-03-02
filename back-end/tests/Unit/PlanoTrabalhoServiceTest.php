<?php

use App\Services\PlanoTrabalhoService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

beforeEach(function () {
    $this->service = app(PlanoTrabalhoService::class);
    $this->limiteSuperiorVencimento = 30;
    
    Schema::create('planos_trabalhos', function (Blueprint $table) {
        $table->string('id')->primary();
        $table->string('usuario_id');
        $table->string('status');
        $table->date('data_fim');
        $table->timestamps();
        $table->softDeletes();
    });
});

afterEach(function () {
    \Mockery::close();
});

test('deve retornar true quando existem planos pendentes com data fim vencida', function () {
    $usuarioId = 'user-123';
    $planoTrabalhoId = 'plano-atual';
    $dataAssinatura = Carbon::now();

    DB::table('planos_trabalhos')->insert([
        'id' => 'plano-pendente',
        'usuario_id' => $usuarioId,
        'status' => 'ATIVO',
        'data_fim' => $dataAssinatura->copy()->subDays($this->limiteSuperiorVencimento+1)->format('Y-m-d'),
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null
    ]);

    $resultado = $this->service->planosUsuarioComPendenciasExecucaoAvaliacao(
        $usuarioId, 
        $planoTrabalhoId, 
        $dataAssinatura
    );

    expect($resultado)->toBeTrue();
});

test('deve retornar true quando plano incluido tem data fim vencida', function () {
    $usuarioId = 'user-456';
    $planoTrabalhoId = 'plano-atual';
    $dataAssinatura = Carbon::now();

    DB::table('planos_trabalhos')->insert([
        'id' => 'plano-incluido',
        'usuario_id' => $usuarioId,
        'status' => 'INCLUIDO',
        'data_fim' => $dataAssinatura->copy()->subDays($this->limiteSuperiorVencimento+1)->format('Y-m-d'),
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null
    ]);

    $resultado = $this->service->planosUsuarioComPendenciasExecucaoAvaliacao(
        $usuarioId, 
        $planoTrabalhoId, 
        $dataAssinatura
    );

    expect($resultado)->toBeTrue();
});

test('deve retornar true quando plano aguardando assinatura tem data fim vencida', function () {
    $usuarioId = 'user-789';
    $planoTrabalhoId = 'plano-atual';
    $dataAssinatura = Carbon::now();

    DB::table('planos_trabalhos')->insert([
        'id' => 'plano-aguardando',
        'usuario_id' => $usuarioId,
        'status' => 'AGUARDANDO_ASSINATURA',
        'data_fim' => $dataAssinatura->copy()->subDays($this->limiteSuperiorVencimento+1)->format('Y-m-d'),
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null
    ]);

    $resultado = $this->service->planosUsuarioComPendenciasExecucaoAvaliacao(
        $usuarioId, 
        $planoTrabalhoId, 
        $dataAssinatura
    );

    expect($resultado)->toBeTrue();
});

test('deve retornar false quando nao existem planos pendentes', function () {
    $usuarioId = 'user-sem-planos';
    $planoTrabalhoId = 'plano-atual';
    $dataAssinatura = Carbon::now();

    // Não inserir nenhum plano - tabela vazia

    $resultado = $this->service->planosUsuarioComPendenciasExecucaoAvaliacao(
        $usuarioId, 
        $planoTrabalhoId, 
        $dataAssinatura
    );

    expect($resultado)->toBeFalse();
});

test('deve retornar false quando planos pendentes nao tem data fim vencida', function () {
    $usuarioId = 'user-planos-validos';
    $planoTrabalhoId = 'plano-atual';
    $dataAssinatura = Carbon::now();

    DB::table('planos_trabalhos')->insert([
        'id' => 'plano-valido',
        'usuario_id' => $usuarioId,
        'status' => 'ATIVO',
        'data_fim' => $dataAssinatura->copy()->addDays($this->limiteSuperiorVencimento)->format('Y-m-d'), // Data futura
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null
    ]);

    $resultado = $this->service->planosUsuarioComPendenciasExecucaoAvaliacao(
        $usuarioId, 
        $planoTrabalhoId, 
        $dataAssinatura
    );

    expect($resultado)->toBeFalse();
});

test('deve retornar false quando planos tem status nao pendente', function () {
    $usuarioId = 'user-planos-concluidos';
    $planoTrabalhoId = 'plano-atual';
    $dataAssinatura = Carbon::now();

    DB::table('planos_trabalhos')->insert([
        'id' => 'plano-concluido',
        'usuario_id' => $usuarioId,
        'status' => 'CONCLUIDO', // Status não pendente
        'data_fim' => $dataAssinatura->copy()->subDays($this->limiteSuperiorVencimento+1)->format('Y-m-d'),
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null
    ]);

    $resultado = $this->service->planosUsuarioComPendenciasExecucaoAvaliacao(
        $usuarioId, 
        $planoTrabalhoId, 
        $dataAssinatura
    );

    expect($resultado)->toBeFalse();
});

test('deve ignorar plano trabalho atual na verificacao', function () {
    $usuarioId = 'user-plano-atual';
    $planoTrabalhoId = 'plano-atual-id';
    $dataAssinatura = Carbon::now();

    // Inserir plano com mesmo ID que será ignorado
    DB::table('planos_trabalhos')->insert([
        'id' => $planoTrabalhoId, // Mesmo ID do plano atual
        'usuario_id' => $usuarioId,
        'status' => 'ATIVO',
        'data_fim' => $dataAssinatura->copy()->subDays($this->limiteSuperiorVencimento+1)->format('Y-m-d'),
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null
    ]);

    $resultado = $this->service->planosUsuarioComPendenciasExecucaoAvaliacao(
        $usuarioId, 
        $planoTrabalhoId, 
        $dataAssinatura
    );

    expect($resultado)->toBeFalse();
});

test('deve retornar false quando data fim exatamente 30 dias', function () {
    $usuarioId = 'user-limite';
    $planoTrabalhoId = 'plano-atual';
    $dataAssinatura = Carbon::now();

    DB::table('planos_trabalhos')->insert([
        'id' => 'plano-limite',
        'usuario_id' => $usuarioId,
        'status' => 'ATIVO',
        'data_fim' => $dataAssinatura->copy()->subDays($this->limiteSuperiorVencimento)->format('Y-m-d'), // 30 dias - ainda não venceu
        'created_at' => now(),
        'updated_at' => now(),
        'deleted_at' => null
    ]);

    $resultado = $this->service->planosUsuarioComPendenciasExecucaoAvaliacao(
        $usuarioId, 
        $planoTrabalhoId, 
        $dataAssinatura
    );

    expect($resultado)->toBeFalse();
});