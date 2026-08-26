<?php

use App\Enums\PerfilEnum;
use App\Exceptions\ForbiddenException;
use App\Models\Perfil;
use App\Models\Usuario;
use App\Models\UnidadeIntegrante;
use App\Repository\UnidadeRepository;
use App\V2\Usuario\Validators\UsuarioShowAuthorizationValidator;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

function showMockUsuario(string $id, int $nivel, bool $temPermissaoVis = true, bool $temPermissaoTudo = false, string $cpf = '00000000000'): Usuario
{
    $perfil = Mockery::mock(Perfil::class)->makePartial();
    $perfil->nivel = $nivel;

    $usuario = Mockery::mock(Usuario::class)->makePartial();
    $usuario->id = $id;
    $usuario->cpf = $cpf;
    $usuario->shouldReceive('loadMissing')->andReturnSelf();
    $usuario->shouldReceive('hasPermissionTo')
        ->with('MOD_USER_VIS')
        ->andReturn($temPermissaoVis);
    $usuario->shouldReceive('hasPermissionTo')
        ->with('MOD_USER_TUDO')
        ->andReturn($temPermissaoTudo);
    $usuario->setRelation('perfil', $perfil);

    return $usuario;
}

function showMockAlvoComLotacao(string $id, int $nivel, string $unidadeId, string $cpf = '99999999999'): Usuario
{
    $perfil = Mockery::mock(Perfil::class)->makePartial();
    $perfil->nivel = $nivel;

    $usuario = Mockery::mock(Usuario::class)->makePartial();
    $usuario->id = $id;
    $usuario->cpf = $cpf;
    $usuario->shouldReceive('loadMissing')->andReturnSelf();
    $usuario->setRelation('perfil', $perfil);

    $lotacao = Mockery::mock(UnidadeIntegrante::class)->makePartial();
    $lotacao->unidade_id = $unidadeId;
    $usuario->setRelation('lotacoes', new Collection([$lotacao]));

    return $usuario;
}

function showMockUnidades(array $ids): Collection
{
    return new Collection(array_map(function ($id) {
        $u = new \stdClass();
        $u->id = $id;
        return $u;
    }, $ids));
}

beforeEach(function () {
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);

    $this->validator = new UsuarioShowAuthorizationValidator(
        $this->unidadeRepo,
    );
});

afterEach(fn () => Mockery::close());

describe('validarEscopo', function () {

    test('auto-consulta sempre permitida independente de capacidades', function () {
        $user = showMockUsuario('u1', PerfilEnum::PARTICIPANTE->value, false, false, '12345678901');

        $result = $this->validator->validarEscopo($user, $user);

        expect($result->id)->toBe('u1');
    });

    test('auto-consulta por CPF permitida mesmo com IDs diferentes (múltiplas matrículas)', function () {
        $solicitante = showMockUsuario('matricula-ativa', PerfilEnum::PARTICIPANTE->value, false, false, '12345678901');
        $alvo = showMockAlvoComLotacao('matricula-inativa', PerfilEnum::PARTICIPANTE->value, 'u1', '12345678901');

        $result = $this->validator->validarEscopo($solicitante, $alvo);

        expect($result->id)->toBe('matricula-inativa');
    });

    test('participante sem MOD_USER_VIS não pode visualizar outro usuário', function () {
        $solicitante = showMockUsuario('solicitante', PerfilEnum::PARTICIPANTE->value, false, false, '11111111111');
        $alvo = showMockAlvoComLotacao('alvo', PerfilEnum::PARTICIPANTE->value, 'u1', '22222222222');

        $this->validator->validarEscopo($solicitante, $alvo);
    })->throws(ForbiddenException::class, 'Seu perfil não permite visualizar outros usuários.');

    test('usuário com MOD_USER_TUDO pode visualizar qualquer um sem verificar escopo', function () {
        $solicitante = showMockUsuario('solicitante', PerfilEnum::ADMINISTRADOR_MASTER->value, true, true, '11111111111');
        $alvo = showMockAlvoComLotacao('alvo', PerfilEnum::PARTICIPANTE->value, 'qualquer', '22222222222');

        $this->unidadeRepo->shouldNotReceive('getUnidadesGerenciadas');

        $result = $this->validator->validarEscopo($solicitante, $alvo);

        expect($result->id)->toBe('alvo');
    });

    test('chefia com MOD_USER_VIS pode visualizar subordinado', function () {
        $solicitante = showMockUsuario('solicitante', PerfilEnum::UNIDADE->value, true, false, '11111111111');
        $alvo = showMockAlvoComLotacao('alvo', PerfilEnum::PARTICIPANTE->value, 'filha', '22222222222');

        $this->unidadeRepo->shouldReceive('getUnidadesGerenciadas')
            ->with('solicitante')->andReturn(showMockUnidades(['pai']));
        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivas')
            ->with(['pai'])->andReturn(showMockUnidades(['filha', 'neta']));

        $result = $this->validator->validarEscopo($solicitante, $alvo);

        expect($result->id)->toBe('alvo');
    });

    test('chefia com MOD_USER_VIS não pode visualizar fora do escopo', function () {
        $solicitante = showMockUsuario('solicitante', PerfilEnum::UNIDADE->value, true, false, '11111111111');
        $alvo = showMockAlvoComLotacao('alvo', PerfilEnum::PARTICIPANTE->value, 'outra', '22222222222');

        $this->unidadeRepo->shouldReceive('getUnidadesGerenciadas')
            ->with('solicitante')->andReturn(showMockUnidades(['pai']));
        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivas')
            ->with(['pai'])->andReturn(showMockUnidades(['filha']));

        $this->validator->validarEscopo($solicitante, $alvo);
    })->throws(ForbiddenException::class, 'O usuário não está no seu escopo de atuação.');

    test('chefia sem vinculação de chefia não pode visualizar outros', function () {
        $solicitante = showMockUsuario('solicitante', PerfilEnum::UNIDADE->value, true, false, '11111111111');
        $alvo = showMockAlvoComLotacao('alvo', PerfilEnum::PARTICIPANTE->value, 'u1', '22222222222');

        $this->unidadeRepo->shouldReceive('getUnidadesGerenciadas')
            ->with('solicitante')->andReturn(showMockUnidades([]));

        $this->validator->validarEscopo($solicitante, $alvo);
    })->throws(ForbiddenException::class, 'Você não possui vinculação de chefia em nenhuma unidade.');

    test('adm negocial com MOD_USER_VIS pode visualizar em unidade gerenciada', function () {
        $solicitante = showMockUsuario('solicitante', PerfilEnum::ADMINISTRADOR_NEGOCIAL->value, true, false, '11111111111');
        $alvo = showMockAlvoComLotacao('alvo', PerfilEnum::PARTICIPANTE->value, 'gerenciada', '22222222222');

        $this->unidadeRepo->shouldReceive('getUnidadesGerenciadas')
            ->with('solicitante')->andReturn(showMockUnidades(['gerenciada']));
        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivas')
            ->with(['gerenciada'])->andReturn(showMockUnidades(['sub']));

        $result = $this->validator->validarEscopo($solicitante, $alvo);

        expect($result->id)->toBe('alvo');
    });

    test('adm negocial com MOD_USER_VIS pode visualizar em subordinada da unidade gerenciada', function () {
        $solicitante = showMockUsuario('solicitante', PerfilEnum::ADMINISTRADOR_NEGOCIAL->value, true, false, '11111111111');
        $alvo = showMockAlvoComLotacao('alvo', PerfilEnum::PARTICIPANTE->value, 'sub', '22222222222');

        $this->unidadeRepo->shouldReceive('getUnidadesGerenciadas')
            ->with('solicitante')->andReturn(showMockUnidades(['gerenciada']));
        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivas')
            ->with(['gerenciada'])->andReturn(showMockUnidades(['sub', 'sub2']));

        $result = $this->validator->validarEscopo($solicitante, $alvo);

        expect($result->id)->toBe('alvo');
    });

    test('sem MOD_USER_VIS não chama repository para verificar escopo', function () {
        $solicitante = showMockUsuario('solicitante', PerfilEnum::PARTICIPANTE->value, false, false, '11111111111');
        $alvo = showMockAlvoComLotacao('alvo', PerfilEnum::PARTICIPANTE->value, 'u1', '22222222222');

        $this->unidadeRepo->shouldNotReceive('getUnidadesGerenciadas');

        expect(fn () => $this->validator->validarEscopo($solicitante, $alvo))
            ->toThrow(ForbiddenException::class);
    });
});
