<?php

use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoCancelarValidator;
use App\V2\PlanoTrabalho\Authorization\PlanoTrabalhoAuthorization;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\UsuarioRepository;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Models\Perfil;
use App\Enums\PerfilEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->consolidacaoRepo = Mockery::mock(PlanoTrabalhoConsolidacaoRepository::class);
    $this->usuarioRepo = Mockery::mock(UsuarioRepository::class);
    $this->authorization = Mockery::mock(PlanoTrabalhoAuthorization::class);
    $this->validator = new PlanoTrabalhoCancelarValidator(
        $this->planoRepo,
        $this->consolidacaoRepo,
        $this->usuarioRepo,
        $this->authorization,
    );
});

afterEach(fn () => Mockery::close());

function cancelarFakePlano(string $status, string $usuarioId = 'user-1', string $unidadeId = 'unidade-1'): PlanoTrabalho
{
    $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
    $plano->id = 'plano-1';
    $plano->status = $status;
    $plano->usuario_id = $usuarioId;
    $plano->unidade_id = $unidadeId;

    return $plano;
}

function cancelarFakeUsuario(string $id, int $nivel, array $permissions = []): Usuario
{
    $usuario = Mockery::mock(Usuario::class)->makePartial();
    $usuario->id = $id;
    $perfil = Mockery::mock(Perfil::class)->makePartial();
    $perfil->nivel = $nivel;
    $usuario->setRelation('perfil', $perfil);
    $usuario->shouldReceive('hasPermissionTo')->andReturnUsing(function (string $cap) use ($permissions) {
        return in_array($cap, $permissions, true);
    });

    return $usuario;
}

describe('PlanoTrabalhoCancelarValidator - pré-condições', function () {

    test('lanca excecao quando plano nao encontrado', function () {
        $this->planoRepo->shouldReceive('findById')->andReturn(null);

        $this->validator->validar('plano-x', 'user-1');
    })->throws(NotFoundException::class, 'Plano de Trabalho não encontrado.');

    test('lanca excecao quando usuario nao tem capacidade MOD_PTR_CNC', function () {
        $plano = cancelarFakePlano('ATIVO', 'user-1');
        $usuario = cancelarFakeUsuario('user-1', PerfilEnum::PARTICIPANTE->value, []);

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('user-1')->andReturn($usuario);

        $this->validator->validar('plano-1', 'user-1');
    })->throws(ForbiddenException::class, 'Usuário não tem permissão para cancelar planos de trabalho.');

    test('lanca excecao quando plano INCLUIDO e usuario sem capacidade expandida', function () {
        $plano = cancelarFakePlano('INCLUIDO');
        $usuario = cancelarFakeUsuario('user-1', PerfilEnum::PARTICIPANTE->value, ['MOD_PTR_CNC']);

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('user-1')->andReturn($usuario);

        $this->validator->validar('plano-1', 'user-1');
    })->throws(ValidateException::class, 'O plano não pode ser cancelado neste status.');
});

describe('PlanoTrabalhoCancelarValidator - validação de consolidação', function () {

    test('lanca excecao quando possui consolidacao finalizada e PT ativo sem capacidade forcada', function () {
        $plano = cancelarFakePlano('ATIVO', 'user-1');
        $usuario = cancelarFakeUsuario('user-1', PerfilEnum::PARTICIPANTE->value, ['MOD_PTR_CNC']);

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('user-1')->andReturn($usuario);
        $this->consolidacaoRepo->shouldReceive('possuiConsolidacaoFinalizadaPorPlano')->with('plano-1')->andReturn(true);

        $this->validator->validar('plano-1', 'user-1');
    })->throws(ValidateException::class, 'O plano não pode ser cancelado pois possui período avaliativo com registro finalizado.');

    test('nao valida consolidacao finalizada para PT suspenso', function () {
        $plano = cancelarFakePlano('SUSPENSO', 'user-1');
        $usuario = cancelarFakeUsuario('user-1', PerfilEnum::PARTICIPANTE->value, ['MOD_PTR_CNC']);

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('user-1')->andReturn($usuario);
        $this->consolidacaoRepo->shouldNotReceive('possuiConsolidacaoFinalizadaPorPlano');
        $this->authorization->shouldReceive('podeCancelar')->with($plano, $usuario)->andReturn(true);

        expect($this->validator->validar('plano-1', 'user-1'))->toBe($plano);
    });

    test('nao valida consolidacao finalizada para PT concluido', function () {
        $plano = cancelarFakePlano('CONCLUIDO', 'outro-user');
        $usuario = cancelarFakeUsuario('adm-master', PerfilEnum::ADMINISTRADOR_MASTER->value, ['MOD_PTR_CNC', 'MOD_PTR_CNC_FORC']);

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('adm-master')->andReturn($usuario);
        $this->consolidacaoRepo->shouldNotReceive('possuiConsolidacaoFinalizadaPorPlano');
        $this->authorization->shouldReceive('podeCancelar')->with($plano, $usuario)->andReturn(true);

        expect($this->validator->validar('plano-1', 'adm-master'))->toBe($plano);
    });

    test('nao valida consolidacao finalizada quando usuario tem capacidade forcada em PT ativo', function () {
        $plano = cancelarFakePlano('ATIVO', 'outro-user');
        $usuario = cancelarFakeUsuario('adm-1', PerfilEnum::ADMINISTRADOR_MASTER->value, ['MOD_PTR_CNC', 'MOD_PTR_CNC_FORC']);

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('adm-1')->andReturn($usuario);
        $this->consolidacaoRepo->shouldNotReceive('possuiConsolidacaoFinalizadaPorPlano');
        $this->authorization->shouldReceive('podeCancelar')->with($plano, $usuario)->andReturn(true);

        expect($this->validator->validar('plano-1', 'adm-1'))->toBe($plano);
    });
});

describe('PlanoTrabalhoCancelarValidator - delegação de autorização', function () {

    test('retorna plano quando authorization permite cancelamento', function () {
        $plano = cancelarFakePlano('ATIVO', 'user-1');
        $usuario = cancelarFakeUsuario('user-1', PerfilEnum::PARTICIPANTE->value, ['MOD_PTR_CNC']);

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('user-1')->andReturn($usuario);
        $this->consolidacaoRepo->shouldReceive('possuiConsolidacaoFinalizadaPorPlano')->andReturn(false);
        $this->authorization->shouldReceive('podeCancelar')->with($plano, $usuario)->andReturn(true);

        expect($this->validator->validar('plano-1', 'user-1'))->toBe($plano);
    });

    test('lanca excecao quando authorization nega cancelamento', function () {
        $plano = cancelarFakePlano('ATIVO', 'outro-user');
        $usuario = cancelarFakeUsuario('sem-perm', PerfilEnum::PARTICIPANTE->value, ['MOD_PTR_CNC']);

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('sem-perm')->andReturn($usuario);
        $this->consolidacaoRepo->shouldReceive('possuiConsolidacaoFinalizadaPorPlano')->andReturn(false);
        $this->authorization->shouldReceive('podeCancelar')->with($plano, $usuario)->andReturn(false);

        $this->validator->validar('plano-1', 'sem-perm');
    })->throws(ForbiddenException::class, 'Usuário não tem permissão para cancelar este Plano de Trabalho.');

    test('retorna plano quando authorization permite cancelamento de PT concluido', function () {
        $plano = cancelarFakePlano('CONCLUIDO', 'outro-user');
        $usuario = cancelarFakeUsuario('adm-master', PerfilEnum::ADMINISTRADOR_MASTER->value, ['MOD_PTR_CNC', 'MOD_PTR_CNC_FORC']);

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('adm-master')->andReturn($usuario);
        $this->consolidacaoRepo->shouldNotReceive('possuiConsolidacaoFinalizadaPorPlano');
        $this->authorization->shouldReceive('podeCancelar')->with($plano, $usuario)->andReturn(true);

        expect($this->validator->validar('plano-1', 'adm-master'))->toBe($plano);
    });

    test('lanca excecao quando authorization nega cancelamento de PT concluido', function () {
        $plano = cancelarFakePlano('CONCLUIDO', 'outro-user');
        $usuario = cancelarFakeUsuario('adm-neg', PerfilEnum::ADMINISTRADOR_NEGOCIAL->value, ['MOD_PTR_CNC', 'MOD_PTR_CNC_FORC']);

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('adm-neg')->andReturn($usuario);
        $this->consolidacaoRepo->shouldNotReceive('possuiConsolidacaoFinalizadaPorPlano');
        $this->authorization->shouldReceive('podeCancelar')->with($plano, $usuario)->andReturn(false);

        $this->validator->validar('plano-1', 'adm-neg');
    })->throws(ForbiddenException::class, 'Usuário não tem permissão para cancelar este Plano de Trabalho.');

    test('retorna plano quando authorization permite cancelamento de PT suspenso', function () {
        $plano = cancelarFakePlano('SUSPENSO', 'user-1');
        $usuario = cancelarFakeUsuario('user-1', PerfilEnum::PARTICIPANTE->value, ['MOD_PTR_CNC']);

        $this->planoRepo->shouldReceive('findById')->andReturn($plano);
        $this->usuarioRepo->shouldReceive('findById')->with('user-1')->andReturn($usuario);
        $this->consolidacaoRepo->shouldNotReceive('possuiConsolidacaoFinalizadaPorPlano');
        $this->authorization->shouldReceive('podeCancelar')->with($plano, $usuario)->andReturn(true);

        expect($this->validator->validar('plano-1', 'user-1'))->toBe($plano);
    });
});
