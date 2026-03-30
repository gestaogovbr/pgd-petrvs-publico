<?php

use App\Models\Usuario;
use App\Repository\UsuarioRepository;
use App\Services\IntegracaoService;
use App\Services\UsuarioService;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

uses(TestCase::class);

afterAll(function () {
    \Mockery::close();
});

describe('UsuarioService::gerarUsuario - email nullable', function () {
    beforeEach(function () {
        $this->usuarioRepository = \Mockery::mock(UsuarioRepository::class);
        $this->integracaoService = \Mockery::mock(IntegracaoService::class);

        $this->app->instance(UsuarioRepository::class, $this->usuarioRepository);
        $this->app->instance(IntegracaoService::class, $this->integracaoService);

        DB::shouldReceive('beginTransaction')->byDefault();
        DB::shouldReceive('commit')->byDefault();
        DB::shouldReceive('rollback')->byDefault();

        $this->service = \Mockery::mock(UsuarioService::class)->makePartial();
        $this->service->shouldAllowMockingProtectedMethods();

        $reflection = new ReflectionClass(UsuarioService::class);
        $usuarioRepoProp = $reflection->getProperty('usuarioRepository');
        $usuarioRepoProp->setAccessible(true);
        $usuarioRepoProp->setValue($this->service, $this->usuarioRepository);
    });

    test('aceita email nulo quando origem for SIAPE', function () {
        $dados = [
            'modalidade_pgd' => 'mod-1',
            'matricula' => '12345',
            'emailfuncional' => null,
            'nome' => 'Nome',
            'cpf' => '123',
            'apelido' => 'Apelido',
            'sexo' => 'M',
            'exercicio' => 'cod-exercicio',
            'data_modificacao' => '2023-01-01',
            'ident_unica' => 'id-unica',
            'telefone' => '123456789',
            'data_nascimento' => '1990-01-01',
            'situacao_funcional' => 'ATIVO',
            'uf' => 'DF',
        ];
        $modalidade = 'mod-default';
        $perfil = 'perfil-id';

        $this->integracaoService->shouldReceive('validarModalidadePgd')->with('mod-1')->andReturn('mod-1-id');

        $novoUsuarioMock = \Mockery::mock(Usuario::class);
        $capturedEmail = null;

        $this->usuarioRepository->shouldReceive('newUsuario')
            ->once()
            ->with(\Mockery::on(function ($payload) use ($perfil, &$capturedEmail) {
                $payloadArray = is_array($payload) ? $payload : (method_exists($payload, 'toArray') ? $payload->toArray() : []);
                $capturedEmail = array_key_exists('email', $payloadArray) ? $payloadArray['email'] : '__missing__';
                return ($payloadArray['perfil_id'] ?? null) === $perfil;
            }))
            ->andReturn($novoUsuarioMock);

        $result = $this->service->gerarUsuario($dados, $modalidade, $perfil);

        expect($result)->toBe($novoUsuarioMock);
        expect($capturedEmail)->toBeNull();
    });

    test('normaliza email inválido para nulo', function () {
        $dados = [
            'modalidade_pgd' => 'mod-1',
            'matricula' => '12345',
            'emailfuncional' => 'email-invalido',
            'nome' => 'Nome',
            'cpf' => '123',
            'apelido' => 'Apelido',
            'sexo' => 'M',
            'exercicio' => 'cod-exercicio',
            'data_modificacao' => '2023-01-01',
            'ident_unica' => 'id-unica',
            'telefone' => '123456789',
            'data_nascimento' => '1990-01-01',
            'situacao_funcional' => 'ATIVO',
            'uf' => 'DF',
        ];
        $modalidade = 'mod-default';
        $perfil = 'perfil-id';

        $this->integracaoService->shouldReceive('validarModalidadePgd')->with('mod-1')->andReturn('mod-1-id');

        $novoUsuarioMock = \Mockery::mock(Usuario::class);
        $capturedEmail = null;

        $this->usuarioRepository->shouldReceive('newUsuario')
            ->once()
            ->with(\Mockery::on(function ($payload) use ($perfil, &$capturedEmail) {
                $payloadArray = is_array($payload) ? $payload : (method_exists($payload, 'toArray') ? $payload->toArray() : []);
                $capturedEmail = array_key_exists('email', $payloadArray) ? $payloadArray['email'] : '__missing__';
                return ($payloadArray['perfil_id'] ?? null) === $perfil;
            }))
            ->andReturn($novoUsuarioMock);

        $result = $this->service->gerarUsuario($dados, $modalidade, $perfil);

        expect($result)->toBe($novoUsuarioMock);
        expect($capturedEmail)->toBeNull();
    });
});
