<?php

namespace Tests\IntegrationTenant\Observers;

use App\Jobs\Envio\ExportarParticipanteJob;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Repository\UsuarioRepository;
use App\Services\UsuarioService;

use Illuminate\Support\Facades\Bus;
use Mockery;


beforeEach(function () {
    Bus::fake();
});

afterAll(function () {
    Mockery::close();
});

describe('UsuarioObserver', function () {

    test('Chamado ao atualizar usuário', function () {
        $usuario = Usuario::factory()->create([
            'nome' => 'Usuario Teste'
        ]);

        $usuario->update([
            'nome' => 'Usuario Alterado'
        ]);

        Bus::assertDispatched(ExportarParticipanteJob::class);
    });

    test('Ao executar pelo Update do UsuarioService', function () {
        $usuario = Usuario::factory()->create();
        $this->actingAs($usuario);

        $unidade = Unidade::factory()->create();

        $usuarioService = app(UsuarioService::class);

        $dto = [
            'id' => $usuario->id,
            'nome' => 'Servidor Teste',
            'data_nascimento' => '1990-01-01',
            'tipo_modalidade_id' => $usuario->tipo_modalidade_id,
            'integrantes' => [
                [
                    'usuario_id' => $usuario->id,
                    'unidade_id' => $unidade->id,
                    'atribuicoes' => ['LOTADO']
                ]
            ]
        ];

        $usuarioService->update($dto, $usuario->unidade_id);

        Bus::assertDispatched(ExportarParticipanteJob::class);
    });


    test('Ao executar atualizarServidor', function () {
        $usuario = Usuario::factory()->create([
            'nome' => 'Usuario Teste'
        ]);

        $usuarioService = app(UsuarioService::class);

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

        Bus::assertDispatched(ExportarParticipanteJob::class);
    });

    test('Ao atualizar pelo UsuarioRepository', function () {

        $usuario = Usuario::factory()->create([
            'nome' => 'Usuario Teste'
        ]);

        $matriculaSiape = fake()->numerify('########');

        $usuarioRepository = app(UsuarioRepository::class);
        $usuarioRepository->update($usuario->id, ['matricula' => $matriculaSiape]);

        Bus::assertDispatched(ExportarParticipanteJob::class);
    });

});
