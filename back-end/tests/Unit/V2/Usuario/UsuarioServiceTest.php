<?php

use App\V2\Usuario\UsuarioService;
use App\Repository\UsuarioRepository;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->usuarioRepository = Mockery::mock(UsuarioRepository::class);
    $this->authValidator = Mockery::mock(\App\V2\Usuario\Validators\UsuarioUpdateAuthorizationValidator::class);
    $this->updateValidator = Mockery::mock(\App\V2\Usuario\Validators\UsuarioUpdateValidator::class);
    $this->storeValidator = Mockery::mock(\App\V2\Usuario\Validators\UsuarioStoreValidator::class);
    $this->integranteService = Mockery::mock(\App\Services\UnidadeIntegranteService::class);
    $this->integracaoService = Mockery::mock(\App\Services\IntegracaoService::class);

    $this->service = new UsuarioService(
        $this->usuarioRepository,
        $this->authValidator,
        $this->updateValidator,
        $this->storeValidator,
        $this->integranteService,
        $this->integracaoService,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('UsuarioService::searchByNomeMatricula', function () {

    test('delega ao repository de escopo do cadastrante', function () {
        $collection = new Collection([
            (object) ['id' => 'u-1', 'nome' => 'Financeiro', 'matricula' => '001', 'sigla' => 'FIN'],
        ]);

        $this->usuarioRepository
            ->shouldReceive('findAgentesPublicosNoEscopoCadastrante')
            ->once()
            ->with('Financ', 'cadastrante-1')
            ->andReturn($collection);

        $result = $this->service->searchByNomeMatricula('Financ', 'cadastrante-1');

        expect($result)->toBe($collection)->and($result)->toHaveCount(1);
    });
});

describe('UsuarioService::updateNomeSocial', function () {

    test('delega ao repository com nome social preenchido', function () {
        $this->usuarioRepository
            ->shouldReceive('update')
            ->once()
            ->with('user-123', ['nome_social' => 'Maria Silva'])
            ->andReturn(null);

        $this->service->updateNomeSocial('user-123', 'Maria Silva');
    });

    test('delega ao repository com nome social nulo para limpar', function () {
        $this->usuarioRepository
            ->shouldReceive('update')
            ->once()
            ->with('user-123', ['nome_social' => null])
            ->andReturn(null);

        $this->service->updateNomeSocial('user-123', null);
    });
});
