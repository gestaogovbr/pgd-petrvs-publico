<?php

use App\Enums\PerfilEnum;
use App\Exceptions\ForbiddenException;
use App\Models\Perfil;
use App\Models\Usuario;
use App\Models\UnidadeIntegrante;
use App\Repository\PerfilRepository;
use App\Repository\UnidadeRepository;
use App\V2\Usuario\Validators\UsuarioUpdateAuthorizationValidator;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

function authMockUsuario(string $id, int $nivel, bool $temPermissaoEditar = true): Usuario
{
    $perfil = Mockery::mock(Perfil::class)->makePartial();
    $perfil->nivel = $nivel;

    $usuario = Mockery::mock(Usuario::class)->makePartial();
    $usuario->id = $id;
    $usuario->shouldReceive('loadMissing')->andReturnSelf();
    $usuario->shouldReceive('hasPermissionTo')
        ->with('MOD_USER_EDT')
        ->andReturn($temPermissaoEditar);
    $usuario->setRelation('perfil', $perfil);

    return $usuario;
}

function authMockAlvoComLotacao(string $id, int $nivel, string $unidadeId): Usuario
{
    $usuario = authMockUsuario($id, $nivel);

    $lotacao = Mockery::mock(UnidadeIntegrante::class)->makePartial();
    $lotacao->unidade_id = $unidadeId;
    $usuario->setRelation('lotacoes', new Collection([$lotacao]));

    return $usuario;
}

function authMockUnidades(array $ids): Collection
{
    return new Collection(array_map(function ($id) {
        $u = new \stdClass();
        $u->id = $id;
        return $u;
    }, $ids));
}

beforeEach(function () {
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->perfilRepo = Mockery::mock(PerfilRepository::class);

    $this->validator = new UsuarioUpdateAuthorizationValidator(
        $this->unidadeRepo,
        $this->perfilRepo,
    );
});

afterEach(fn () => Mockery::close());

describe('validarEscopo', function () {

    test('auto-edição sempre permitida', function () {
        $user = authMockUsuario('u1', PerfilEnum::PARTICIPANTE->value, false);

        $this->validator->validarEscopo($user, $user);

        expect(true)->toBeTrue();
    });

    test('sem capacidade MOD_USER_EDT não pode editar outro', function () {
        $editor = authMockUsuario('editor', PerfilEnum::PARTICIPANTE->value, false);
        $alvo = authMockAlvoComLotacao('alvo', PerfilEnum::PARTICIPANTE->value, 'u1');

        $this->validator->validarEscopo($editor, $alvo);
    })->throws(ForbiddenException::class, 'Seu perfil não permite editar outros usuários.');

    test('adm master com capacidade pode editar qualquer um sem verificar escopo', function () {
        $editor = authMockUsuario('editor', PerfilEnum::ADMINISTRADOR_MASTER->value);
        $alvo = authMockAlvoComLotacao('alvo', PerfilEnum::PARTICIPANTE->value, 'qualquer');

        $this->unidadeRepo->shouldNotReceive('getUnidadesGerenciadas');

        $this->validator->validarEscopo($editor, $alvo);

        expect(true)->toBeTrue();
    });

    test('chefia com capacidade pode editar subordinado', function () {
        $editor = authMockUsuario('editor', PerfilEnum::UNIDADE->value);
        $alvo = authMockAlvoComLotacao('alvo', PerfilEnum::PARTICIPANTE->value, 'filha');

        $this->unidadeRepo->shouldReceive('getUnidadesGerenciadas')
            ->with('editor')->andReturn(authMockUnidades(['pai']));
        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivas')
            ->with(['pai'])->andReturn(authMockUnidades(['filha', 'neta']));

        $this->validator->validarEscopo($editor, $alvo);

        expect(true)->toBeTrue();
    });

    test('chefia com capacidade não pode editar fora do escopo', function () {
        $editor = authMockUsuario('editor', PerfilEnum::UNIDADE->value);
        $alvo = authMockAlvoComLotacao('alvo', PerfilEnum::PARTICIPANTE->value, 'outra');

        $this->unidadeRepo->shouldReceive('getUnidadesGerenciadas')
            ->with('editor')->andReturn(authMockUnidades(['pai']));
        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivas')
            ->with(['pai'])->andReturn(authMockUnidades(['filha']));

        $this->validator->validarEscopo($editor, $alvo);
    })->throws(ForbiddenException::class, 'O usuário não está no seu escopo de atuação.');

    test('chefia sem vinculação de chefia não pode editar', function () {
        $editor = authMockUsuario('editor', PerfilEnum::UNIDADE->value);
        $alvo = authMockAlvoComLotacao('alvo', PerfilEnum::PARTICIPANTE->value, 'u1');

        $this->unidadeRepo->shouldReceive('getUnidadesGerenciadas')
            ->with('editor')->andReturn(authMockUnidades([]));

        $this->validator->validarEscopo($editor, $alvo);
    })->throws(ForbiddenException::class, 'Você não possui vinculação de chefia em nenhuma unidade.');

    test('adm negocial com capacidade pode editar em unidade gerenciada', function () {
        $editor = authMockUsuario('editor', PerfilEnum::ADMINISTRADOR_NEGOCIAL->value);
        $alvo = authMockAlvoComLotacao('alvo', PerfilEnum::PARTICIPANTE->value, 'gerenciada');

        $this->unidadeRepo->shouldReceive('getUnidadesGerenciadas')
            ->with('editor')->andReturn(authMockUnidades(['gerenciada']));
        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivas')
            ->with(['gerenciada'])->andReturn(authMockUnidades(['sub']));

        $this->validator->validarEscopo($editor, $alvo);

        expect(true)->toBeTrue();
    });
});

describe('validarAlteracaoPerfil', function () {

    test('não pode alterar o próprio perfil', function () {
        $editor = authMockUsuario('user-1', PerfilEnum::ADMINISTRADOR_MASTER->value);
        $alvo = $editor;

        $this->validator->validarAlteracaoPerfil($editor, $alvo, 'qualquer-perfil');
    })->throws(ForbiddenException::class, 'Não é permitido alterar o próprio perfil.');

    test('não pode mexer em quem tem nível superior', function () {
        $editor = authMockUsuario('editor', PerfilEnum::UNIDADE->value);
        $alvo = authMockUsuario('alvo', PerfilEnum::ADMINISTRADOR_NEGOCIAL->value);

        $this->validator->validarAlteracaoPerfil($editor, $alvo, 'qualquer');
    })->throws(ForbiddenException::class, 'Você não pode alterar o perfil deste usuário.');

    test('não pode atribuir nível superior ao seu', function () {
        $editor = authMockUsuario('editor', PerfilEnum::UNIDADE->value);
        $alvo = authMockUsuario('alvo', PerfilEnum::PARTICIPANTE->value);

        $perfilAdm = Mockery::mock(Perfil::class)->makePartial();
        $perfilAdm->nivel = PerfilEnum::ADMINISTRADOR_NEGOCIAL->value;

        $this->perfilRepo->shouldReceive('find')->with('perfil-adm')->andReturn($perfilAdm);

        $this->validator->validarAlteracaoPerfil($editor, $alvo, 'perfil-adm');
    })->throws(ForbiddenException::class, 'Não é possível atribuir perfil superior ao seu.');

    test('pode atribuir nível igual ao seu', function () {
        $editor = authMockUsuario('editor', PerfilEnum::UNIDADE->value);
        $alvo = authMockUsuario('alvo', PerfilEnum::PARTICIPANTE->value);

        $perfilUnidade = Mockery::mock(Perfil::class)->makePartial();
        $perfilUnidade->nivel = PerfilEnum::UNIDADE->value;

        $this->perfilRepo->shouldReceive('find')->with('perfil-unidade')->andReturn($perfilUnidade);

        $this->validator->validarAlteracaoPerfil($editor, $alvo, 'perfil-unidade');

        expect(true)->toBeTrue();
    });

    test('pode atribuir nível inferior ao seu', function () {
        $editor = authMockUsuario('editor', PerfilEnum::UNIDADE->value);
        $alvo = authMockUsuario('alvo', PerfilEnum::PARTICIPANTE->value);

        $perfilPart = Mockery::mock(Perfil::class)->makePartial();
        $perfilPart->nivel = PerfilEnum::PARTICIPANTE->value;

        $this->perfilRepo->shouldReceive('find')->with('perfil-part')->andReturn($perfilPart);

        $this->validator->validarAlteracaoPerfil($editor, $alvo, 'perfil-part');

        expect(true)->toBeTrue();
    });

    test('adm master não pode alterar perfil de dev', function () {
        $editor = authMockUsuario('editor', PerfilEnum::ADMINISTRADOR_MASTER->value);
        $alvo = authMockUsuario('alvo', PerfilEnum::DESENVOLVEDOR->value);

        $this->validator->validarAlteracaoPerfil($editor, $alvo, 'qualquer');
    })->throws(ForbiddenException::class, 'Você não pode alterar o perfil deste usuário.');

    test('dev pode alterar perfil de outro dev', function () {
        $editor = authMockUsuario('editor', PerfilEnum::DESENVOLVEDOR->value);
        $alvo = authMockUsuario('alvo', PerfilEnum::DESENVOLVEDOR->value);

        $perfilPart = Mockery::mock(Perfil::class)->makePartial();
        $perfilPart->nivel = PerfilEnum::PARTICIPANTE->value;

        $this->perfilRepo->shouldReceive('find')->with('perfil-part')->andReturn($perfilPart);

        $this->validator->validarAlteracaoPerfil($editor, $alvo, 'perfil-part');

        expect(true)->toBeTrue();
    });
});
