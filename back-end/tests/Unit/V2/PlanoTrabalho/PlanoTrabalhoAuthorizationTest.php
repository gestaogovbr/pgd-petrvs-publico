<?php

use App\Enums\PerfilEnum;
use App\Enums\StatusEnum;
use App\Models\Perfil;
use App\Models\PlanoTrabalho;
use App\Models\Unidade;
use App\Models\UnidadeIntegrante;
use App\Models\Usuario;
use App\Repository\UnidadeRepository;
use App\V2\PlanoTrabalho\Authorization\PlanoTrabalhoAuthorization;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->unidadeRepository = Mockery::mock(UnidadeRepository::class);
    $this->authorization = new PlanoTrabalhoAuthorization($this->unidadeRepository);
});

afterEach(function () {
    Mockery::close();
});

function makePlano(string $status = 'INCLUIDO'): PlanoTrabalho
{
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->status = $status;
    $plano->usuario_id = 'agente-1';
    $plano->criacao_usuario_id = 'criador-1';
    $plano->unidade_id = 'unidade-plano';

    return $plano;
}

function makeUsuario(int $nivelPerfil): Usuario
{
    $usuario = Mockery::mock(Usuario::class)->makePartial();
    $usuario->id = 'user-1';
    $perfil = Mockery::mock(Perfil::class)->makePartial();
    $perfil->nivel = $nivelPerfil;
    $usuario->setRelation('perfil', $perfil);
    $usuario->setRelation('areasTrabalho', new Collection());

    return $usuario;
}

test('podeEditar retorna false quando status não é editável', function () {
    $plano = makePlano(StatusEnum::ATIVO->value);
    $usuario = makeUsuario(PerfilEnum::ADMINISTRADOR_MASTER->value);

    expect($this->authorization->podeEditar($plano, $usuario))->toBeFalse();
});

test('podeEditar retorna true para dono do plano', function () {
    $plano = makePlano();
    $usuario = makeUsuario(PerfilEnum::PARTICIPANTE->value);
    $usuario->id = 'agente-1';

    $this->unidadeRepository->shouldNotReceive('isUsuarioGestorRecursivo');

    expect($this->authorization->podeEditar($plano, $usuario))->toBeTrue();
});

test('podeEditar retorna true para usuário que cadastrou o plano', function () {
    $plano = makePlano();
    $usuario = makeUsuario(PerfilEnum::UNIDADE->value);
    $usuario->id = 'criador-1';

    expect($this->authorization->podeEditar($plano, $usuario))->toBeTrue();
});

test('podeEditar retorna true para chefia recursiva da unidade do plano', function () {
    $plano = makePlano();
    $usuario = makeUsuario(PerfilEnum::UNIDADE->value);
    $usuario->id = 'chefia-1';

    $this->unidadeRepository
        ->shouldReceive('isUsuarioGestorRecursivo')
        ->once()
        ->with('unidade-plano', 'chefia-1')
        ->andReturn(true);

    expect($this->authorization->podeEditar($plano, $usuario))->toBeTrue();
});

test('podeEditar retorna true para administrador master', function () {
    $plano = makePlano();
    $usuario = makeUsuario(PerfilEnum::ADMINISTRADOR_MASTER->value);
    $usuario->id = 'adm-master';

    expect($this->authorization->podeEditar($plano, $usuario))->toBeTrue();
});

test('podeEditar retorna true para adm negocial com instituidora na linha ascendente do plano', function () {
    $plano = makePlano();
    $usuario = makeUsuario(PerfilEnum::ADMINISTRADOR_NEGOCIAL->value);
    $usuario->id = 'adm-neg';

    $unidadeInstituidora = Mockery::mock(Unidade::class)->makePartial();
    $unidadeInstituidora->id = 'inst-1';
    $unidadeInstituidora->instituidora = 1;

    $area = Mockery::mock(UnidadeIntegrante::class)->makePartial();
    $area->setRelation('unidade', $unidadeInstituidora);
    $usuario->setRelation('areasTrabalho', new Collection([$area]));

    $this->unidadeRepository
        ->shouldReceive('isUsuarioGestorRecursivo')
        ->once()
        ->with('unidade-plano', 'adm-neg')
        ->andReturn(false);

    $this->unidadeRepository
        ->shouldReceive('linhaAscendente')
        ->once()
        ->with('unidade-plano')
        ->andReturn(['inst-1', 'unidade-plano']);

    expect($this->authorization->podeEditar($plano, $usuario))->toBeTrue();
});

test('podeEditar retorna false para adm negocial fora do escopo instituidor', function () {
    $plano = makePlano();
    $usuario = makeUsuario(PerfilEnum::ADMINISTRADOR_NEGOCIAL->value);
    $usuario->id = 'adm-neg';

    $unidadeInstituidora = Mockery::mock(Unidade::class)->makePartial();
    $unidadeInstituidora->id = 'inst-outra';
    $unidadeInstituidora->instituidora = 1;

    $area = Mockery::mock(UnidadeIntegrante::class)->makePartial();
    $area->setRelation('unidade', $unidadeInstituidora);
    $usuario->setRelation('areasTrabalho', new Collection([$area]));

    $this->unidadeRepository
        ->shouldReceive('linhaAscendente')
        ->once()
        ->with('unidade-plano')
        ->andReturn(['inst-1', 'unidade-plano']);

    $this->unidadeRepository
        ->shouldReceive('isUsuarioGestorRecursivo')
        ->once()
        ->with('unidade-plano', 'adm-neg')
        ->andReturn(false);

    expect($this->authorization->podeEditar($plano, $usuario))->toBeFalse();
});

test('acoes expõe editar conforme podeEditar', function () {
    $plano = makePlano(StatusEnum::ATIVO->value);
    $usuario = makeUsuario(PerfilEnum::ADMINISTRADOR_MASTER->value);

    expect($this->authorization->acoes($plano, $usuario)->toArray())->toBe(['editar' => false]);
});
