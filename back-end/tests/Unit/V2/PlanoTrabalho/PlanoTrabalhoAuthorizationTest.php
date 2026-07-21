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
    $this->authorization = new PlanoTrabalhoAuthorization(
        $this->unidadeRepository,
    );
});

afterEach(function () {
    Mockery::close();
});

function makePlano(string $status = 'INCLUIDO'): PlanoTrabalho
{
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = 'plano-1';
    $plano->status = $status;
    $plano->usuario_id = 'agente-1';
    $plano->criacao_usuario_id = 'criador-1';
    $plano->unidade_id = 'unidade-plano';
    $plano->data_arquivamento = null;
    $plano->encerrado_at = null;

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
})->skip('Aguardando alinhamento sobre operador >= vs <= (commit 5c1b0ac97)');

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
})->skip('Aguardando alinhamento sobre operador >= vs <= (commit 5c1b0ac97)');

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
})->skip('Aguardando alinhamento sobre operador >= vs <= (commit 5c1b0ac97)');

test('acoes retorna todas as permissões calculadas', function () {
    $plano = makePlano(StatusEnum::ATIVO->value);
    $usuario = makeUsuario(PerfilEnum::ADMINISTRADOR_MASTER->value);

    $acoes = $this->authorization->acoes($plano, $usuario, false)->toArray();

    expect($acoes)->toBe(['editar' => false, 'arquivar' => false, 'encerrar' => false]);
});

// --- podeArquivar ---

test('podeArquivar retorna false quando plano já está arquivado', function () {
    $plano = makePlano(StatusEnum::CONCLUIDO->value);
    $plano->data_arquivamento = now();
    $usuario = makeUsuario(PerfilEnum::PARTICIPANTE->value);
    $usuario->id = 'agente-1';

    expect($this->authorization->podeArquivar($plano, $usuario, true))->toBeFalse();
});

test('podeArquivar retorna false quando não é elegível para arquivamento', function () {
    $plano = makePlano(StatusEnum::ATIVO->value);
    $plano->data_arquivamento = null;
    $usuario = makeUsuario(PerfilEnum::PARTICIPANTE->value);
    $usuario->id = 'agente-1';

    expect($this->authorization->podeArquivar($plano, $usuario, false))->toBeFalse();
});

test('podeArquivar retorna true para plano elegível sendo dono', function () {
    $plano = makePlano(StatusEnum::CANCELADO->value);
    $plano->data_arquivamento = null;
    $usuario = makeUsuario(PerfilEnum::PARTICIPANTE->value);
    $usuario->id = 'agente-1';

    expect($this->authorization->podeArquivar($plano, $usuario, true))->toBeTrue();
});

test('podeArquivar retorna false para usuário sem autorização mesmo com elegibilidade', function () {
    $plano = makePlano(StatusEnum::CANCELADO->value);
    $plano->data_arquivamento = null;
    $usuario = makeUsuario(PerfilEnum::PARTICIPANTE->value);
    $usuario->id = 'outro-user';

    $this->unidadeRepository->shouldReceive('isUsuarioGestorRecursivo')
        ->with('unidade-plano', 'outro-user')
        ->andReturn(false);

    expect($this->authorization->podeArquivar($plano, $usuario, true))->toBeFalse();
});

test('podeArquivar retorna true para chefia da unidade com elegibilidade', function () {
    $plano = makePlano(StatusEnum::CANCELADO->value);
    $plano->data_arquivamento = null;
    $usuario = makeUsuario(PerfilEnum::UNIDADE->value);
    $usuario->id = 'chefia-1';

    $this->unidadeRepository->shouldReceive('isUsuarioGestorRecursivo')
        ->with('unidade-plano', 'chefia-1')
        ->andReturn(true);

    expect($this->authorization->podeArquivar($plano, $usuario, true))->toBeTrue();
});

test('podeArquivar retorna true para colaborador com lotação na unidade com elegibilidade', function () {
    $plano = makePlano(StatusEnum::CANCELADO->value);
    $plano->data_arquivamento = null;
    $usuario = makeUsuario(PerfilEnum::COLABORADOR->value);
    $usuario->id = 'colab-1';

    $this->unidadeRepository->shouldReceive('isUsuarioGestorRecursivo')
        ->with('unidade-plano', 'colab-1')
        ->andReturn(false);

    $this->unidadeRepository->shouldReceive('hasUsuarioLotacao')
        ->with('unidade-plano', 'colab-1', true)
        ->andReturn(true);

    expect($this->authorization->podeArquivar($plano, $usuario, true))->toBeTrue();
});

// --- podeEncerrar ---

test('podeEncerrar retorna false quando status não é ATIVO', function () {
    $plano = makePlano(StatusEnum::CONCLUIDO->value);
    $usuario = makeUsuario(PerfilEnum::PARTICIPANTE->value);
    $usuario->id = 'agente-1';

    expect($this->authorization->podeEncerrar($plano, $usuario))->toBeFalse();
});

test('podeEncerrar retorna false quando vigência ainda não iniciou', function () {
    $plano = makePlano(StatusEnum::ATIVO->value);
    $plano->data_inicio = now()->addDays(5)->format('Y-m-d');
    $plano->data_fim = now()->addDays(30)->format('Y-m-d');
    $usuario = makeUsuario(PerfilEnum::PARTICIPANTE->value);
    $usuario->id = 'agente-1';

    expect($this->authorization->podeEncerrar($plano, $usuario))->toBeFalse();
});

test('podeEncerrar retorna false quando vigência já expirou', function () {
    $plano = makePlano(StatusEnum::ATIVO->value);
    $plano->data_inicio = now()->subDays(30)->format('Y-m-d');
    $plano->data_fim = now()->subDays(1)->format('Y-m-d');
    $usuario = makeUsuario(PerfilEnum::PARTICIPANTE->value);
    $usuario->id = 'agente-1';

    expect($this->authorization->podeEncerrar($plano, $usuario))->toBeFalse();
});

test('podeEncerrar retorna true para dono do plano dentro da vigência', function () {
    $plano = makePlano(StatusEnum::ATIVO->value);
    $plano->data_inicio = now()->subDays(10)->format('Y-m-d');
    $plano->data_fim = now()->addDays(10)->format('Y-m-d');
    $usuario = makeUsuario(PerfilEnum::PARTICIPANTE->value);
    $usuario->id = 'agente-1';

    expect($this->authorization->podeEncerrar($plano, $usuario))->toBeTrue();
});

test('podeEncerrar retorna true para chefia da unidade', function () {
    $plano = makePlano(StatusEnum::ATIVO->value);
    $plano->data_inicio = now()->subDays(10)->format('Y-m-d');
    $plano->data_fim = now()->addDays(10)->format('Y-m-d');
    $usuario = makeUsuario(PerfilEnum::UNIDADE->value);
    $usuario->id = 'chefia-1';

    $this->unidadeRepository->shouldReceive('isUsuarioGestorRecursivo')
        ->with('unidade-plano', 'chefia-1')
        ->andReturn(true);

    expect($this->authorization->podeEncerrar($plano, $usuario))->toBeTrue();
});

test('podeEncerrar retorna true para adm negocial', function () {
    $plano = makePlano(StatusEnum::ATIVO->value);
    $plano->data_inicio = now()->subDays(10)->format('Y-m-d');
    $plano->data_fim = now()->addDays(10)->format('Y-m-d');
    $usuario = makeUsuario(PerfilEnum::ADMINISTRADOR_NEGOCIAL->value);
    $usuario->id = 'adm-neg';

    $this->unidadeRepository->shouldReceive('isUsuarioGestorRecursivo')
        ->with('unidade-plano', 'adm-neg')
        ->andReturn(false);

    expect($this->authorization->podeEncerrar($plano, $usuario))->toBeTrue();
});

test('podeEncerrar retorna false para usuário sem autorização', function () {
    $plano = makePlano(StatusEnum::ATIVO->value);
    $plano->data_inicio = now()->subDays(10)->format('Y-m-d');
    $plano->data_fim = now()->addDays(10)->format('Y-m-d');
    $usuario = makeUsuario(PerfilEnum::PARTICIPANTE->value);
    $usuario->id = 'outro-user';

    $this->unidadeRepository->shouldReceive('isUsuarioGestorRecursivo')
        ->with('unidade-plano', 'outro-user')
        ->andReturn(false);

    expect($this->authorization->podeEncerrar($plano, $usuario))->toBeFalse();
});
