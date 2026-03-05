<?php

namespace Tests\IntegrationTenant\Observers;

use App\Models\Usuario;
use App\Services\API_PGD\UsuarioEnvioService;
use Illuminate\Support\Facades\Log;
use Mockery;

afterAll(function () {
    Mockery::close();
});

describe('UsuarioObserver', function () {

    it('Usuário Observer é chamado ao atualizar usuário', function () {

        $serviceMock = Mockery::mock('alias:' . UsuarioEnvioService::class);
        $serviceMock->shouldReceive('processar')
            ->once()
            ->with('_test', Mockery::type(Usuario::class), 'Usuario');

        $usuario = Usuario::factory()->create([
            'nome' => 'Usuario Teste'
        ]);

        $usuario->update([
            'nome' => 'Usuario Alterado'
        ]);

    });

});
