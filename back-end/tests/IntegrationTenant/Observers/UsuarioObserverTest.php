<?php

namespace Tests\IntegrationTenant\Observers;

use App\Models\Usuario;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\UsuarioRepository;
use App\Services\API_PGD\UsuarioEnvioService;
use App\Services\IntegracaoService;
use App\Services\UsuarioService;
use Illuminate\Support\Facades\Log;
use Mockery;


afterAll(function () {
    Mockery::close();
});

describe('UsuarioObserver', function () {

    test('Usuário Observer é chamado ao atualizar usuário', function () {

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

    test('Executa observer ao executar atualizarServidor', function () {
        $serviceMock = Mockery::mock('alias:' . UsuarioEnvioService::class);

        $serviceMock->shouldReceive('processar')
            ->once()
            ->with(Mockery::any(), Mockery::type(Usuario::class), 'Usuario');

        $usuario = Usuario::factory()->create([
            'nome' => 'Usuario Teste'
        ]);

        $usuarioService = new UsuarioService();

        $dto = (object) [
            'id' => $usuario->id,
            'matriculasiape' => '123',
            'nome_servidor' => 'Servidor Teste',
            'nome_guerra' => 'Teste',
            'emailfuncional' => 'teste@email.com',
            'cod_jornada' => 40,
            'nome_jornada' => 'Integral',
            'modalidade_pgd' => 1,
            'participa_pgd' => true,
            'ident_unica' => 'ABC',
            'data_modificacao' => now(),
            'data_nascimento' => '1990-01-01'
        ];

        $usuarioService->atualizarServidor($dto, $usuario->unidade_id);
    });

    test('Executa observer ao atualizar pelo UsuarioRepository', function () {
        $serviceMock = Mockery::mock('alias:' . UsuarioEnvioService::class);
        $serviceMock->shouldReceive('processar')
            ->once()
            ->with(Mockery::any(), Mockery::type(Usuario::class), 'Usuario');

        $usuario = Usuario::factory()->create([
            'nome' => 'Usuario Teste'
        ]);

        $matriculaSiape = fake()->numerify('########');

        $usuarioRepository = app(UsuarioRepository::class);
        $usuarioRepository->update($usuario->id, ['matricula' => $matriculaSiape]);
    });

});
