<?php

namespace Tests\Unit\Services;

use App\Services\UsuarioService;
use App\Exceptions\DBException;
use App\Models\Usuario;
use App\Repository\UsuarioRepository;
use App\Repository\UnidadeRepository;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\PerfilRepository;
use App\Repository\TipoModalidadeRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\PlanoEntregaRepository;
use App\Services\IntegracaoService;
use App\Exceptions\NotFoundException;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Mockery;
use stdClass;

uses(TestCase::class);

beforeEach(function () {
    $this->usuarioRepository = Mockery::mock(UsuarioRepository::class);
    $this->integracaoService = Mockery::mock(IntegracaoService::class);
    
    // Mock other dependencies used in constructor via app()
    $this->app->instance(UsuarioRepository::class, $this->usuarioRepository);
    $this->app->instance(UnidadeRepository::class, Mockery::mock(UnidadeRepository::class));
    $this->app->instance(IntegracaoServidorRepository::class, Mockery::mock(IntegracaoServidorRepository::class));
    $this->app->instance(PerfilRepository::class, Mockery::mock(PerfilRepository::class));
    $this->app->instance(TipoModalidadeRepository::class, Mockery::mock(TipoModalidadeRepository::class));
    $this->app->instance(PlanoTrabalhoConsolidacaoRepository::class, Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class));
    $this->app->instance(PlanoTrabalhoRepository::class, Mockery::mock(PlanoTrabalhoRepository::class));
    $this->app->instance(PlanoEntregaRepository::class, Mockery::mock(PlanoEntregaRepository::class));
    $this->app->instance(IntegracaoService::class, $this->integracaoService);

    // Create partial mock of the service to allow protected method mocking if needed
    // passing [] to constructor arguments to ensure constructor is called
    $this->usuarioService = Mockery::mock(UsuarioService::class, [])->makePartial();
    $this->usuarioService->shouldAllowMockingProtectedMethods();
});

afterEach(function () {
    Mockery::close();
});

describe('UsuarioService - Null ID Checks', function () {
    it('logs error and returns when id is null in atualizarServidor', function () {
        // Create a stdClass object as returned by DB::select
        $usuario = new stdClass();
        $usuario->id = null;
        $usuario->matriculasiape = '1234567';

        // Mock Log facade which is used by SiapeLog
        $loggerMock = Mockery::mock(\Psr\Log\LoggerInterface::class);
        $loggerMock->shouldReceive('error')
            ->once()
            ->with("ID do usuário não encontrado para atualização", ['usuario' => ['id' => null, 'matriculasiape' => '1234567']]);
            
        Log::shouldReceive('channel')
            ->with('siape')
            ->andReturn($loggerMock);

        // Ensure update is NOT called
        $this->usuarioRepository->shouldNotReceive('update');

        $this->usuarioService->atualizarServidor($usuario);
    });

    it('throws exception when id is null in update', function () {
        $data = [
            'id' => null,
            'nome' => 'Test',
            'email' => 'test@test.com'
        ];
        $unidade = null;

        // Ensure Log is not called unexpectedly (optional but good practice)
        // Log::shouldReceive('channel')->never(); 
        // Commented out because update might use log in other paths, but here it throws exception early.

        expect(fn() => $this->usuarioService->update($data, $unidade))
            ->toThrow(NotFoundException::class, "ID do usuário não encontrado para atualização");
    });

    it('throws exception when repository update returns null in restored store', function () {
        $data = [
            'id' => '',
            'nome' => 'teste da silva',
            'email' => 'teste@teste.com.br',
            'cpf' => '015.039.220-65',
            'telefone' => '(64) 9 9606-4649',
            'pedagio' => 0,
            'integrantes' => [
                ['unidade_id' => 'unidade-1']
            ],
        ];

        $restored = Mockery::mock(Usuario::class)->makePartial();
        $restored->id = 'restored-id';
        $restored->shouldReceive('restore')->once()->andReturnTrue();

        $this->usuarioService->shouldReceive('validateStore')->once()->andReturn($restored);
        $this->usuarioService->shouldReceive('extraStore')->never();
        $this->usuarioRepository->shouldReceive('update')
            ->once()
            ->with('restored-id', Mockery::on(function (array $payload): bool {
                if (array_key_exists('pedagio', $payload)) {
                    return false;
                }
                if (($payload['cpf'] ?? null) !== '01503922065') {
                    return false;
                }
                if (($payload['telefone'] ?? null) !== '64996064649') {
                    return false;
                }
                return true;
            }))
            ->andReturnNull();

        expect(fn () => $this->usuarioService->store($data, null, false))
            ->toThrow(DBException::class, 'Falha ao reativar o usuário');
    });
});
