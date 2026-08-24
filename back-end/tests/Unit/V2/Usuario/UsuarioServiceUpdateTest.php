<?php

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\Perfil;
use App\Models\Usuario;
use App\Repository\UsuarioRepository;
use App\Services\UnidadeIntegranteService;
use App\V2\Usuario\DTOs\UsuarioAtribuicoesDTO;
use App\V2\Usuario\DTOs\UsuarioDadosPessoaisDTO;
use App\V2\Usuario\UsuarioService;
use App\V2\Usuario\Validators\UsuarioShowAuthorizationValidator;
use App\V2\Usuario\Validators\UsuarioUpdateAuthorizationValidator;
use App\V2\Usuario\Validators\UsuarioUpdateValidator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->usuarioRepo = Mockery::mock(UsuarioRepository::class);
    $this->authValidator = Mockery::mock(UsuarioUpdateAuthorizationValidator::class);
    $this->showAuthValidator = Mockery::mock(UsuarioShowAuthorizationValidator::class);
    $this->updateValidator = Mockery::mock(UsuarioUpdateValidator::class);
    $this->storeValidator = Mockery::mock(\App\V2\Usuario\Validators\UsuarioStoreValidator::class);
    $this->integranteService = Mockery::mock(UnidadeIntegranteService::class);
    $this->integracaoService = Mockery::mock(\App\Services\IntegracaoService::class);

    $this->service = new UsuarioService(
        $this->usuarioRepo,
        $this->authValidator,
        $this->showAuthValidator,
        $this->updateValidator,
        $this->storeValidator,
        $this->integranteService,
        $this->integracaoService,
    );
});

afterEach(fn () => Mockery::close());

function mockEditorComPerfil(string $id, int $nivel = 3): Usuario
{
    $perfil = Mockery::mock(Perfil::class)->makePartial();
    $perfil->nivel = $nivel;

    $editor = Mockery::mock(Usuario::class)->makePartial();
    $editor->id = $id;
    $editor->shouldReceive('loadMissing')->andReturnSelf();
    $editor->setRelation('perfil', $perfil);

    return $editor;
}

function mockAlvoService(string $id): Usuario
{
    $alvo = Mockery::mock(Usuario::class)->makePartial();
    $alvo->id = $id;
    return $alvo;
}

describe('UsuarioService::updateDadosPessoais', function () {

    test('atualiza dados pessoais com sucesso', function () {
        $alvo = mockAlvoService('alvo-1');
        $editor = mockEditorComPerfil('editor-1');
        $atualizado = mockAlvoService('alvo-1');
        $atualizado->usuario_externo = false;
        $alvo->usuario_externo = false;

        Auth::shouldReceive('id')->andReturn('editor-1');
        $this->usuarioRepo->shouldReceive('findById')->with('alvo-1')->andReturn($alvo, $atualizado);
        $this->usuarioRepo->shouldReceive('findByIdComAreasTrabalho')->with('editor-1')->andReturn($editor);
        $this->usuarioRepo->shouldReceive('update')->with('alvo-1', ['telefone' => '61999990000'])->once();
        $this->authValidator->shouldReceive('validarEscopo')->once()->andReturn($alvo);

        $dto = UsuarioDadosPessoaisDTO::fromArray(['telefone' => '61999990000']);
        $result = $this->service->updateDadosPessoais('alvo-1', $dto);

        expect($result->id)->toBe('alvo-1');
    });

    test('usuário inexistente lança NotFoundException', function () {
        $this->usuarioRepo->shouldReceive('findById')->with('x')->andReturn(null);
        $dto = UsuarioDadosPessoaisDTO::fromArray(['telefone' => '123']);
        $this->service->updateDadosPessoais('x', $dto);
    })->throws(NotFoundException::class);

    test('sem permissão lança ForbiddenException', function () {
        $alvo = mockAlvoService('alvo-1');
        $alvo->usuario_externo = false;
        $editor = mockEditorComPerfil('editor-1', 5);

        Auth::shouldReceive('id')->andReturn('editor-1');
        $this->usuarioRepo->shouldReceive('findById')->with('alvo-1')->andReturn($alvo);
        $this->usuarioRepo->shouldReceive('findByIdComAreasTrabalho')->with('editor-1')->andReturn($editor);
        $this->authValidator->shouldReceive('validarEscopo')->andThrow(new ForbiddenException('Sem permissão'));
        $this->usuarioRepo->shouldNotReceive('update');

        $dto = UsuarioDadosPessoaisDTO::fromArray(['telefone' => '123']);
        $this->service->updateDadosPessoais('alvo-1', $dto);
    })->throws(ForbiddenException::class);
});

describe('UsuarioService::updatePerfil', function () {

    test('atualiza perfil com sucesso', function () {
        $alvo = mockAlvoService('alvo-1');
        $editor = mockEditorComPerfil('editor-1');
        $atualizado = mockAlvoService('alvo-1');

        Auth::shouldReceive('id')->andReturn('editor-1');
        $this->usuarioRepo->shouldReceive('findById')->with('alvo-1')->andReturn($alvo, $atualizado);
        $this->usuarioRepo->shouldReceive('findByIdComAreasTrabalho')->with('editor-1')->andReturn($editor);
        $this->usuarioRepo->shouldReceive('update')->with('alvo-1', ['perfil_id' => 'p1'])->once();
        $this->authValidator->shouldReceive('validarEscopo')->once()->andReturn($alvo);
        $this->authValidator->shouldReceive('validarAlteracaoPerfil')->once();
        $this->updateValidator->shouldReceive('validarPerfil')->once();

        $result = $this->service->updatePerfil('alvo-1', 'p1');

        expect($result->id)->toBe('alvo-1');
    });
});

describe('UsuarioService::updateAtribuicoes', function () {

    test('atualiza atribuicoes com sucesso', function () {
        $alvo = mockAlvoService('alvo-1');
        $editor = mockEditorComPerfil('editor-1');
        $atualizado = mockAlvoService('alvo-1');
        $dto = UsuarioAtribuicoesDTO::fromArray(['atribuicoes' => [['unidade_id' => 'u1', 'atribuicoes' => ['LOTADO']]]], 'alvo-1');
        $vinculosEsperados = [['unidade_id' => 'u1', 'atribuicoes' => ['LOTADO'], 'usuario_id' => 'alvo-1']];

        Auth::shouldReceive('id')->andReturn('editor-1');
        $this->usuarioRepo->shouldReceive('findById')->with('alvo-1')->andReturn($alvo, $atualizado);
        $this->usuarioRepo->shouldReceive('findByIdComAreasTrabalho')->with('editor-1')->andReturn($editor);
        $this->authValidator->shouldReceive('validarEscopo')->once()->andReturn($alvo);
        $this->updateValidator->shouldReceive('validarAtribuicoes')->once();
        $this->integranteService->shouldReceive('salvarIntegrantes')->with($vinculosEsperados, false)->once()->andReturn([]);

        DB::shouldReceive('transaction')->andReturnUsing(fn ($cb) => $cb());

        $result = $this->service->updateAtribuicoes($dto);

        expect($result->id)->toBe('alvo-1');
    });
});
