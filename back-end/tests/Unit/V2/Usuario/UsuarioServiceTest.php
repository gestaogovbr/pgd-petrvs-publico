<?php

use App\Models\Perfil;
use App\Models\Usuario;
use App\V2\Usuario\UsuarioService;
use App\Repository\UsuarioRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->usuarioRepository = Mockery::mock(UsuarioRepository::class);
    $this->authValidator = Mockery::mock(\App\V2\Usuario\Validators\UsuarioUpdateAuthorizationValidator::class);
    $this->showAuthValidator = Mockery::mock(\App\V2\Usuario\Validators\UsuarioShowAuthorizationValidator::class);
    $this->updateValidator = Mockery::mock(\App\V2\Usuario\Validators\UsuarioUpdateValidator::class);
    $this->storeValidator = Mockery::mock(\App\V2\Usuario\Validators\UsuarioStoreValidator::class);
    $this->integranteService = Mockery::mock(\App\Services\UnidadeIntegranteService::class);
    $this->integracaoService = Mockery::mock(\App\Services\IntegracaoService::class);

    $this->service = new UsuarioService(
        $this->usuarioRepository,
        $this->authValidator,
        $this->showAuthValidator,
        $this->updateValidator,
        $this->storeValidator,
        $this->integranteService,
        $this->integracaoService,
    );
});

afterEach(function () {
    Mockery::close();
});

function serviceMockSolicitanteComVis(): Usuario
{
    $perfil = Mockery::mock(Perfil::class)->makePartial();
    $perfil->nivel = 3;

    $usuario = Mockery::mock(Usuario::class)->makePartial();
    $usuario->id = 'cadastrante-1';
    $usuario->shouldReceive('loadMissing')->andReturnSelf();
    $usuario->shouldReceive('hasPermissionTo')
        ->with('MOD_USER_VIS')
        ->andReturn(true);
    $usuario->setRelation('perfil', $perfil);

    return $usuario;
}

function serviceMockSolicitanteSemVis(): Usuario
{
    $perfil = Mockery::mock(Perfil::class)->makePartial();
    $perfil->nivel = 5;

    $usuario = Mockery::mock(Usuario::class)->makePartial();
    $usuario->id = 'participante-1';
    $usuario->shouldReceive('loadMissing')->andReturnSelf();
    $usuario->shouldReceive('hasPermissionTo')
        ->with('MOD_USER_VIS')
        ->andReturn(false);
    $usuario->setRelation('perfil', $perfil);

    return $usuario;
}

describe('UsuarioService::searchByNomeMatricula', function () {

    test('delega ao repository de escopo do cadastrante quando tem MOD_USER_VIS', function () {
        $solicitante = serviceMockSolicitanteComVis();
        Auth::shouldReceive('id')->andReturn('cadastrante-1');
        $this->usuarioRepository
            ->shouldReceive('findByIdComAreasTrabalho')
            ->with('cadastrante-1')
            ->andReturn($solicitante);

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

    test('retorna collection vazia quando não tem MOD_USER_VIS', function () {
        $solicitante = serviceMockSolicitanteSemVis();
        Auth::shouldReceive('id')->andReturn('participante-1');
        $this->usuarioRepository
            ->shouldReceive('findByIdComAreasTrabalho')
            ->with('participante-1')
            ->andReturn($solicitante);

        $this->usuarioRepository->shouldNotReceive('findAgentesPublicosNoEscopoCadastrante');

        $result = $this->service->searchByNomeMatricula('Financ', 'participante-1');

        expect($result)->toBeInstanceOf(Collection::class)->and($result)->toBeEmpty();
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
