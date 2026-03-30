<?php

use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use App\Repository\UsuarioRepository;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeRepository;
use App\Models\Usuario;
use App\Models\Perfil;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Enums\PerfilEnum;
use App\Exceptions\ServerException;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoIndexValidator;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->usuarioRepo = Mockery::mock(UsuarioRepository::class);
    $this->integranteRepo = Mockery::mock(UnidadeIntegranteRepository::class);
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->validacao = new PlanoTrabalhoIndexValidator($this->usuarioRepo, $this->integranteRepo, $this->unidadeRepo);
});

afterEach(function () {
    Mockery::close();
});

describe('PlanoTrabalhoIndexValidacao', function () {

    test('participante não pode filtrar por usuario_id diferente do logado', function () {
        /** @var Usuario $usuario */
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-participante';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = PerfilEnum::PARTICIPANTE->value;
        $usuario->setRelation('perfil', $perfil);

        $this->usuarioRepo->shouldReceive('findById')->with('user-participante')->andReturn($usuario);

        $filtro = PlanoTrabalhoIndexDTO::fromArray(['usuario_id' => 'outro-user', 'vigentes' => true, 'usuarioLogadoId' => 'user-participante']);
        $this->validacao->validar($filtro);
    })->throws(ServerException::class, 'Usuário de perfil participante só pode consultar seus próprios planos de trabalho.');

    test('participante pode filtrar por seu próprio usuario_id', function () {
        /** @var Usuario $usuario */
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-participante';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = PerfilEnum::PARTICIPANTE->value;
        $usuario->setRelation('perfil', $perfil);

        $this->usuarioRepo->shouldReceive('findById')->with('user-participante')->andReturn($usuario);

        $filtro = PlanoTrabalhoIndexDTO::fromArray(['usuario_id' => 'user-participante', 'vigentes' => true, 'usuarioLogadoId' => 'user-participante']);
        $this->validacao->validar($filtro);

        expect(true)->toBeTrue();
    });

    test('participante pode consultar sem informar usuario_id', function () {
        /** @var Usuario $usuario */
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-participante';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = PerfilEnum::PARTICIPANTE->value;
        $usuario->setRelation('perfil', $perfil);

        $this->usuarioRepo->shouldReceive('findById')->with('user-participante')->andReturn($usuario);

        $filtro = PlanoTrabalhoIndexDTO::fromArray(['vigentes' => true, 'usuarioLogadoId' => 'user-participante']);
        $this->validacao->validar($filtro);

        expect(true)->toBeTrue();
    });

    test('perfil unidade pode consultar unidade onde é integrante', function () {
        /** @var Usuario $usuario */
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-unidade';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = PerfilEnum::UNIDADE->value;
        $usuario->setRelation('perfil', $perfil);

        $integrante = Mockery::mock(UnidadeIntegrante::class)->makePartial();
        $integrante->unidade_id = 'unidade-1';

        $this->usuarioRepo->shouldReceive('findById')->with('user-unidade')->andReturn($usuario);
        $this->integranteRepo->shouldReceive('findByUsuario')->with('user-unidade')->andReturn(new Collection([$integrante]));
        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivas')->with(['unidade-1'])->andReturn(new Collection());

        $filtro = PlanoTrabalhoIndexDTO::fromArray(['unidade_id' => ['unidade-1'], 'vigentes' => true, 'usuarioLogadoId' => 'user-unidade']);
        $resultado = $this->validacao->validar($filtro);

        expect($resultado->unidadesId)->toBe(['unidade-1']);
    });

    test('perfil unidade não pode consultar unidade onde não é integrante nem subordinada', function () {
        /** @var Usuario $usuario */
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-unidade';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = PerfilEnum::UNIDADE->value;
        $usuario->setRelation('perfil', $perfil);

        $integrante = Mockery::mock(UnidadeIntegrante::class)->makePartial();
        $integrante->unidade_id = 'unidade-1';

        $this->usuarioRepo->shouldReceive('findById')->with('user-unidade')->andReturn($usuario);
        $this->integranteRepo->shouldReceive('findByUsuario')->with('user-unidade')->andReturn(new Collection([$integrante]));
        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivas')->with(['unidade-1'])->andReturn(new Collection());

        $filtro = PlanoTrabalhoIndexDTO::fromArray(['unidade_id' => ['unidade-sem-vinculo'], 'vigentes' => true, 'usuarioLogadoId' => 'user-unidade']);
        $this->validacao->validar($filtro);
    })->throws(ServerException::class, 'Usuário de perfil unidade só pode consultar planos de unidades onde possui atribuição.');

    test('perfil unidade sem unidades informadas restringe às unidades do integrante e subordinadas', function () {
        /** @var Usuario $usuario */
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-unidade';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = PerfilEnum::UNIDADE->value;
        $usuario->setRelation('perfil', $perfil);

        $integrante1 = Mockery::mock(UnidadeIntegrante::class)->makePartial();
        $integrante1->unidade_id = 'unidade-1';
        $integrante2 = Mockery::mock(UnidadeIntegrante::class)->makePartial();
        $integrante2->unidade_id = 'unidade-2';

        $subordinada = Mockery::mock(Unidade::class)->makePartial();
        $subordinada->id = 'unidade-sub-1';

        $this->usuarioRepo->shouldReceive('findById')->with('user-unidade')->andReturn($usuario);
        $this->integranteRepo->shouldReceive('findByUsuario')->with('user-unidade')->andReturn(new Collection([$integrante1, $integrante2]));
        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivas')->with(['unidade-1', 'unidade-2'])->andReturn(new Collection([$subordinada]));

        $filtro = PlanoTrabalhoIndexDTO::fromArray(['vigentes' => true, 'usuarioLogadoId' => 'user-unidade']);
        $resultado = $this->validacao->validar($filtro);

        expect($resultado->unidadesId)->toEqualCanonicalizing(['unidade-1', 'unidade-2', 'unidade-sub-1']);
    });

    test('perfil unidade pode consultar subordinada de unidade onde é integrante', function () {
        /** @var Usuario $usuario */
        $usuario = Mockery::mock(Usuario::class)->makePartial();
        $usuario->id = 'user-unidade';
        $perfil = Mockery::mock(Perfil::class)->makePartial();
        $perfil->nivel = PerfilEnum::UNIDADE->value;
        $usuario->setRelation('perfil', $perfil);

        $integrante = Mockery::mock(UnidadeIntegrante::class)->makePartial();
        $integrante->unidade_id = 'unidade-1';

        $subordinada = Mockery::mock(Unidade::class)->makePartial();
        $subordinada->id = 'unidade-sub-1';

        $this->usuarioRepo->shouldReceive('findById')->with('user-unidade')->andReturn($usuario);
        $this->integranteRepo->shouldReceive('findByUsuario')->with('user-unidade')->andReturn(new Collection([$integrante]));
        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivas')->with(['unidade-1'])->andReturn(new Collection([$subordinada]));

        $filtro = PlanoTrabalhoIndexDTO::fromArray(['unidade_id' => ['unidade-sub-1'], 'vigentes' => true, 'usuarioLogadoId' => 'user-unidade']);
        $resultado = $this->validacao->validar($filtro);

        expect($resultado->unidadesId)->toBe(['unidade-sub-1']);
    });
});
