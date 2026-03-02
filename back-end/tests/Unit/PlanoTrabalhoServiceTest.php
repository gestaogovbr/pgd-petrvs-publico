<?php

use App\Services\PlanoTrabalhoService;
use App\Repository\UsuarioRepository;
use App\Models\PlanoTrabalho;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    // Mock do repositório para evitar BindingResolutionException
    $this->usuarioRepository = Mockery::mock(UsuarioRepository::class);
    $this->app->instance(UsuarioRepository::class, $this->usuarioRepository);
    
    $this->service = $this->app->make(PlanoTrabalhoService::class);
    $this->limiteSuperiorVencimento = 30;
});

afterEach(function () {
    Mockery::close();
});

test('deve retornar true quando existem planos pendentes com data fim vencida', function () {
    $usuarioId = 'user-123';
    $planoTrabalhoId = 'plano-atual';
    $dataAssinatura = Carbon::now();
    
    // Mock do Model PlanoTrabalho
    $mockPlano = Mockery::mock('alias:' . PlanoTrabalho::class);
    
    $mockPlano->shouldReceive('where')
        ->with('usuario_id', $usuarioId)
        ->andReturnSelf();
        
    $mockPlano->shouldReceive('whereIn')
        ->with('status', ['INCLUIDO', 'AGUARDANDO_ASSINATURA', 'ATIVO'])
        ->andReturnSelf();
        
    $mockPlano->shouldReceive('where')
        ->with('id', '!=', $planoTrabalhoId)
        ->andReturnSelf();
        
    $mockPlano->shouldReceive('where')
        ->with('data_fim', '<', Mockery::type('string'))
        ->andReturnSelf();
        
    // Retorna uma coleção com items para simular pendências
    $mockPlano->shouldReceive('get')
        ->andReturn(new Collection([(object)['id' => 'plano-pendente']]));

    $resultado = $this->service->hasUsuarioPendencias(
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

    // Mock do Model PlanoTrabalho
    $mockPlano = Mockery::mock('alias:' . PlanoTrabalho::class);
    
    $mockPlano->shouldReceive('where')
        ->with('usuario_id', $usuarioId)
        ->andReturnSelf();
        
    $mockPlano->shouldReceive('whereIn')
        ->with('status', ['INCLUIDO', 'AGUARDANDO_ASSINATURA', 'ATIVO'])
        ->andReturnSelf();
        
    $mockPlano->shouldReceive('where')
        ->with('id', '!=', $planoTrabalhoId)
        ->andReturnSelf();
        
    $mockPlano->shouldReceive('where')
        ->with('data_fim', '<', Mockery::type('string'))
        ->andReturnSelf();
        
    // Retorna coleção vazia
    $mockPlano->shouldReceive('get')
        ->andReturn(new Collection([]));

    $resultado = $this->service->hasUsuarioPendencias(
        $usuarioId, 
        $planoTrabalhoId, 
        $dataAssinatura
    );

    expect($resultado)->toBeFalse();
});
