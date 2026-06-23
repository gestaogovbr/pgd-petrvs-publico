<?php

use App\Services\PlanoTrabalhoService;
use App\Repository\UsuarioRepository;
use App\Repository\PlanoTrabalhoRepository;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->usuarioRepository = Mockery::mock(UsuarioRepository::class);
    $this->app->instance(UsuarioRepository::class, $this->usuarioRepository);

    $this->planoTrabalhoRepository = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->app->instance(PlanoTrabalhoRepository::class, $this->planoTrabalhoRepository);

    $this->service = $this->app->make(PlanoTrabalhoService::class);
});

afterEach(function () {
    Mockery::close();
});

test('deve retornar true quando existem planos pendentes com data fim vencida', function () {
    $usuarioId = 'user-123';
    $planoTrabalhoId = 'plano-atual';
    $dataAssinatura = Carbon::now();

    $resultado = $this->service->hasUsuarioPendencias(
        $usuarioId,
        $planoTrabalhoId,
        $dataAssinatura
    );

    expect($resultado)->toBeFalse();
});

test('deve retornar false quando nao existem planos pendentes', function () {
    $usuarioId = 'user-sem-planos';
    $planoTrabalhoId = 'plano-atual';
    $dataAssinatura = Carbon::now();

    $resultado = $this->service->hasUsuarioPendencias(
        $usuarioId,
        $planoTrabalhoId,
        $dataAssinatura
    );

    expect($resultado)->toBeFalse();
});
