<?php

namespace Tests\Unit\Services;

use App\Models\Usuario;
use App\Repository\SiapeBlackListServidorRepository;
use App\Repository\UsuarioRepository;
use App\Repository\UnidadeRepository;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\PerfilRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\PlanoEntregaRepository;
use App\Services\IntegracaoService;
use App\Services\UsuarioService;
use Illuminate\Support\Facades\Log;
use Mockery;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->usuarioRepository = Mockery::mock(UsuarioRepository::class);
    $this->blacklistRepository = Mockery::mock(SiapeBlackListServidorRepository::class);
    $this->integracaoServidorRepository = Mockery::mock(IntegracaoServidorRepository::class);
    $this->integracaoServidorRepository
        ->shouldReceive('getServidor')
        ->andReturnNull()
        ->byDefault();

    $this->app->instance(UsuarioRepository::class, $this->usuarioRepository);
    $this->app->instance(UnidadeRepository::class, Mockery::mock(UnidadeRepository::class));
    $this->app->instance(IntegracaoServidorRepository::class, $this->integracaoServidorRepository);
    $this->app->instance(PerfilRepository::class, Mockery::mock(PerfilRepository::class));
    $this->app->instance(PlanoTrabalhoConsolidacaoRepository::class, Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class));
    $this->app->instance(PlanoTrabalhoRepository::class, Mockery::mock(PlanoTrabalhoRepository::class));
    $this->app->instance(PlanoEntregaRepository::class, Mockery::mock(PlanoEntregaRepository::class));
    $this->app->instance(SiapeBlackListServidorRepository::class, $this->blacklistRepository);
    $this->app->instance(IntegracaoService::class, Mockery::mock(IntegracaoService::class));

    $loggerMock = Mockery::mock(\Psr\Log\LoggerInterface::class);
    $loggerMock->shouldReceive('info', 'warning', 'error')->zeroOrMoreTimes();
    Log::shouldReceive('channel')->with('siape')->andReturn($loggerMock)->byDefault();

    $this->service = new UsuarioService();
});

afterEach(function () {
    Mockery::close();
});

describe('verificaSeUsuarioSoMudouMatricula', function () {

    test('usuario sem matricula: preenche normalmente e retorna false', function () {
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-id-1';
        $usuario->matricula = null;

        $this->usuarioRepository->shouldReceive('findByCpfAndLotacao')
            ->once()
            ->andReturn($usuario);

        $this->usuarioRepository->shouldReceive('update')
            ->once()
            ->with('user-id-1', ['matricula' => '9999999']);

        $result = $this->service->verificaSeUsuarioSoMudouMatricula(
            '12345678901', 'unidade-id-1', '9999999', 'COD001'
        );

        expect($result)->toBeFalse();
    });

    test('matricula igual: retorna false sem atualizar', function () {
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-id-1';
        $usuario->matricula = '1234567';

        $this->usuarioRepository->shouldReceive('findByCpfAndLotacao')
            ->once()
            ->andReturn($usuario);

        $this->usuarioRepository->shouldNotReceive('update');

        $result = $this->service->verificaSeUsuarioSoMudouMatricula(
            '12345678901', 'unidade-id-1', '1234567', 'COD001'
        );

        expect($result)->toBeFalse();
    });

    test('matricula diferente na primeira chamada do batch: atualiza e retorna false', function () {
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-id-1';
        $usuario->matricula = '1111111';

        $this->usuarioRepository->shouldReceive('findByCpfAndLotacao')
            ->once()
            ->andReturn($usuario);

        $this->usuarioRepository->shouldReceive('update')
            ->once()
            ->with('user-id-1', ['matricula' => '2222222']);

        $batch = [];
        $result = $this->service->verificaSeUsuarioSoMudouMatricula(
            '12345678901', 'unidade-id-1', '2222222', 'COD001', $batch
        );

        expect($result)->toBeFalse();
        expect($batch)->toHaveKey('12345678901|unidade-id-1');
    });

    test('matricula diferente na segunda chamada do batch: retorna true para criar novo usuario', function () {
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-id-1';
        $usuario->matricula = '2222222';

        $this->usuarioRepository->shouldReceive('findByCpfAndLotacao')
            ->once()
            ->andReturn($usuario);

        $this->usuarioRepository->shouldNotReceive('update');

        $batch = ['12345678901|unidade-id-1' => true];
        $result = $this->service->verificaSeUsuarioSoMudouMatricula(
            '12345678901', 'unidade-id-1', '3333333', 'COD001', $batch
        );

        expect($result)->toBeTrue();
    });

    test('cpf+unidade diferente no batch nao interfere: atualiza normalmente', function () {
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-id-2';
        $usuario->matricula = '4444444';

        $this->usuarioRepository->shouldReceive('findByCpfAndLotacao')
            ->once()
            ->andReturn($usuario);

        $this->usuarioRepository->shouldReceive('update')
            ->once()
            ->with('user-id-2', ['matricula' => '5555555']);

        $batch = ['12345678901|unidade-id-1' => true];
        $result = $this->service->verificaSeUsuarioSoMudouMatricula(
            '99999999999', 'unidade-id-2', '5555555', 'COD002', $batch
        );

        expect($result)->toBeFalse();
    });

    test('usuario nao encontrado na unidade: retorna true', function () {
        $this->usuarioRepository->shouldReceive('findByCpfAndLotacao')
            ->once()
            ->andReturnNull();

        $this->usuarioRepository->shouldNotReceive('update');

        $result = $this->service->verificaSeUsuarioSoMudouMatricula(
            '12345678901', 'unidade-id-1', '2222222', 'COD001'
        );

        expect($result)->toBeTrue();
    });

    test('cpf vazio: retorna true sem consultar repositorio', function () {
        $this->usuarioRepository->shouldNotReceive('findByCpfAndLotacao');
        $this->usuarioRepository->shouldNotReceive('update');

        $result = $this->service->verificaSeUsuarioSoMudouMatricula(
            '', 'unidade-id-1', '2222222', 'COD001'
        );

        expect($result)->toBeTrue();
    });

    test('unidade vazia: retorna true sem consultar repositorio', function () {
        $this->usuarioRepository->shouldNotReceive('findByCpfAndLotacao');
        $this->usuarioRepository->shouldNotReceive('update');

        $result = $this->service->verificaSeUsuarioSoMudouMatricula(
            '12345678901', '', '2222222', 'COD001'
        );

        expect($result)->toBeTrue();
    });

    test('sem parametro batch: primeira chamada atualiza normalmente', function () {
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-id-1';
        $usuario->matricula = '1111111';

        $this->usuarioRepository->shouldReceive('findByCpfAndLotacao')
            ->once()
            ->andReturn($usuario);

        $this->usuarioRepository->shouldReceive('update')
            ->once()
            ->with('user-id-1', ['matricula' => '2222222']);

        $result = $this->service->verificaSeUsuarioSoMudouMatricula(
            '12345678901', 'unidade-id-1', '2222222', 'COD001'
        );

        expect($result)->toBeFalse();
    });
});
