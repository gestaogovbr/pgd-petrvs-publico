<?php

namespace Tests\IntegrationTenant\Services\PlanoTrabalhoService;

use App\Services\PlanoTrabalhoService;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use Carbon\Carbon;

beforeEach(function () {
    /** @var PlanoTrabalhoService $service */
    $this->service = app(PlanoTrabalhoService::class);
});

describe('PlanoTrabalhoService::hasUsuarioPendencias', function () {
    test('retorna true quando existem planos pendentes com data fim vencida', function () {
        $usuario = Usuario::factory()->create();
        $planoAtual = PlanoTrabalho::factory()->create(['usuario_id' => $usuario->id]);
        $dataAssinatura = Carbon::now();

        // Criar plano pendente com data fim vencida (mais de 30 dias)
        PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'status' => 'ATIVO',
            'data_fim' => $dataAssinatura->copy()->subDays(31)
        ]);

        $resultado = $this->service->hasUsuarioPendencias(
            $usuario->id,
            $planoAtual->id,
            $dataAssinatura
        );

        expect($resultado)->toBeTrue();
    });

    test('retorna true quando plano incluído tem data fim vencida', function () {
        $usuario = Usuario::factory()->create();
        $planoAtual = PlanoTrabalho::factory()->create(['usuario_id' => $usuario->id]);
        $dataAssinatura = Carbon::now();

        PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'status' => 'INCLUIDO',
            'data_fim' => $dataAssinatura->copy()->subDays(31)
        ]);

        $resultado = $this->service->hasUsuarioPendencias(
            $usuario->id,
            $planoAtual->id,
            $dataAssinatura
        );

        expect($resultado)->toBeTrue();
    });

    test('retorna true quando plano aguardando assinatura tem data fim vencida', function () {
        $usuario = Usuario::factory()->create();
        $planoAtual = PlanoTrabalho::factory()->create(['usuario_id' => $usuario->id]);
        $dataAssinatura = Carbon::now();

        PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'status' => 'AGUARDANDO_ASSINATURA',
            'data_fim' => $dataAssinatura->copy()->subDays(31)
        ]);

        $resultado = $this->service->hasUsuarioPendencias(
            $usuario->id,
            $planoAtual->id,
            $dataAssinatura
        );

        expect($resultado)->toBeTrue();
    });

    test('retorna false quando não existem planos pendentes', function () {
        $usuario = Usuario::factory()->create();
        $planoAtual = PlanoTrabalho::factory()->create(['usuario_id' => $usuario->id]);
        $dataAssinatura = Carbon::now();

        $resultado = $this->service->hasUsuarioPendencias(
            $usuario->id,
            $planoAtual->id,
            $dataAssinatura
        );

        expect($resultado)->toBeFalse();
    });

    test('retorna false quando planos pendentes não têm data fim vencida', function () {
        $usuario = Usuario::factory()->create();
        $planoAtual = PlanoTrabalho::factory()->create(['usuario_id' => $usuario->id]);
        $dataAssinatura = Carbon::now();

        PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'status' => 'ATIVO',
            'data_fim' => $dataAssinatura->copy()->addDays(30) // Data futura
        ]);

        $resultado = $this->service->hasUsuarioPendencias(
            $usuario->id,
            $planoAtual->id,
            $dataAssinatura
        );

        expect($resultado)->toBeFalse();
    });

    test('retorna false quando planos têm status não pendente', function () {
        $usuario = Usuario::factory()->create();
        $planoAtual = PlanoTrabalho::factory()->create(['usuario_id' => $usuario->id]);
        $dataAssinatura = Carbon::now();

        PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'status' => 'CONCLUIDO', // Status não pendente
            'data_fim' => $dataAssinatura->copy()->subDays(31)
        ]);

        $resultado = $this->service->hasUsuarioPendencias(
            $usuario->id,
            $planoAtual->id,
            $dataAssinatura
        );

        expect($resultado)->toBeFalse();
    });

    test('ignora plano trabalho atual na verificação', function () {
        $usuario = Usuario::factory()->create();
        $dataAssinatura = Carbon::now();

        // Criar plano que seria considerado pendente, mas é o plano atual
        $planoAtual = PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'status' => 'ATIVO',
            'data_fim' => $dataAssinatura->copy()->subDays(31)
        ]);

        $resultado = $this->service->hasUsuarioPendencias(
            $usuario->id,
            $planoAtual->id, // Mesmo ID será ignorado
            $dataAssinatura
        );

        expect($resultado)->toBeFalse();
    });

    test('retorna false quando data fim é exatamente 30 dias', function () {
        $usuario = Usuario::factory()->create();
        $planoAtual = PlanoTrabalho::factory()->create(['usuario_id' => $usuario->id]);
        $dataAssinatura = Carbon::now();

        PlanoTrabalho::factory()->create([
            'usuario_id' => $usuario->id,
            'status' => 'ATIVO',
            'data_fim' => $dataAssinatura->copy()->subDays(30) // Exatamente 30 dias - ainda não venceu
        ]);

        $resultado = $this->service->hasUsuarioPendencias(
            $usuario->id,
            $planoAtual->id,
            $dataAssinatura
        );

        expect($resultado)->toBeFalse();
    });
})->skip('dependente do ticket #1757');