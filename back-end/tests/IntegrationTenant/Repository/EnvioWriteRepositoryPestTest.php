<?php

declare(strict_types=1);

use App\Models\Perfil;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use App\Models\TipoModalidade;
use App\Models\Usuario;
use App\Repository\PlanoEntregaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UsuarioRepository;
use Carbon\Carbon;

/** Texto persistido em log_envio por EnvioTrait::registrarSucesso */
const LOG_ENVIO_SUCESSO_PGD = 'Envio realizado com sucesso.';

describe('UsuarioRepository — escrita de envio PGD', function () {
    beforeEach(function () {
        $this->repository = app(UsuarioRepository::class);
        $this->tipoModalidadeId = TipoModalidade::factory()->create(['nome' => 'Presencial Pest'])->id;
        $this->perfilId = Perfil::factory()->create(['nome' => 'Padrão Pest'])->id;
    });

    it('registrarSucesso persiste data_envio_api_pgd, data_conclusao_envio e log de sucesso', function () {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
            'log_envio' => 'erro anterior',
            'data_envio_api_pgd' => null,
            'data_conclusao_envio' => null,
        ]);

        $this->repository->registrarSucesso($usuario);

        $fresh = $usuario->fresh();
        expect($fresh->data_envio_api_pgd)->not->toBeNull();
        expect($fresh->data_conclusao_envio)->not->toBeNull();
        expect($fresh->log_envio)->toBe(LOG_ENVIO_SUCESSO_PGD);
    });

    it('registrarInsucesso persiste data_tentativa_envio e log_envio', function () {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
        ]);

        $this->repository->registrarInsucesso($usuario, 'mensagem de falha');

        $fresh = $usuario->fresh();
        expect($fresh->data_tentativa_envio)->not->toBeNull();
        expect($fresh->log_envio)->toBe('mensagem de falha');
    });

    it('registrarTentativa persiste apenas data_tentativa_envio', function () {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
            'data_tentativa_envio' => null,
            'log_envio' => null,
        ]);

        $this->repository->registrarTentativa($usuario);

        $fresh = $usuario->fresh();
        expect($fresh->data_tentativa_envio)->not->toBeNull();
        expect($fresh->log_envio)->toBeNull();
    });

    it('registrarConclusao persiste data_conclusao_envio e log_envio', function () {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
            'data_conclusao_envio' => null,
        ]);

        $this->repository->registrarConclusao($usuario, 'concluído manualmente');

        $fresh = $usuario->fresh();
        expect($fresh->data_conclusao_envio)->not->toBeNull();
        expect($fresh->log_envio)->toBe('concluído manualmente');
    });

    it('registrarLog persiste apenas log_envio', function () {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
            'log_envio' => null,
        ]);

        $this->repository->registrarLog($usuario, 'apenas log');

        expect($usuario->fresh()->log_envio)->toBe('apenas log');
    });

    it('agendarEnvio persiste data_agendamento_envio', function () {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
            'data_agendamento_envio' => null,
        ]);

        $quando = Carbon::parse('2026-03-30 14:00:00');

        $this->repository->agendarEnvio($usuario, $quando);

        expect($usuario->fresh()->data_agendamento_envio->equalTo($quando))->toBeTrue();
    });
});

describe('PlanoEntregaRepository — escrita de envio PGD', function () {
    beforeEach(function () {
        $this->repository = app(PlanoEntregaRepository::class);
    });

    it('registrarSucesso persiste data_envio_api_pgd, data_conclusao_envio e log de sucesso', function () {
        $plano = PlanoEntrega::factory()->create([
            'log_envio' => 'pendente',
            'data_envio_api_pgd' => null,
            'data_conclusao_envio' => null,
        ]);

        $this->repository->registrarSucesso($plano);

        $fresh = $plano->fresh();
        expect($fresh->data_envio_api_pgd)->not->toBeNull();
        expect($fresh->data_conclusao_envio)->not->toBeNull();
        expect($fresh->log_envio)->toBe(LOG_ENVIO_SUCESSO_PGD);
    });

    it('registrarInsucesso persiste data_tentativa_envio e log_envio', function () {
        $plano = PlanoEntrega::factory()->create();

        $this->repository->registrarInsucesso($plano, 'API indisponível');

        $fresh = $plano->fresh();
        expect($fresh->data_tentativa_envio)->not->toBeNull();
        expect($fresh->log_envio)->toBe('API indisponível');
    });

    it('registrarTentativa persiste apenas data_tentativa_envio', function () {
        $plano = PlanoEntrega::factory()->create([
            'data_tentativa_envio' => null,
            'log_envio' => null,
        ]);

        $this->repository->registrarTentativa($plano);

        $fresh = $plano->fresh();
        expect($fresh->data_tentativa_envio)->not->toBeNull();
        expect($fresh->log_envio)->toBeNull();
    });

    it('registrarConclusao persiste data_conclusao_envio e log_envio', function () {
        $plano = PlanoEntrega::factory()->create(['data_conclusao_envio' => null]);

        $this->repository->registrarConclusao($plano, 'homologação ok');

        $fresh = $plano->fresh();
        expect($fresh->data_conclusao_envio)->not->toBeNull();
        expect($fresh->log_envio)->toBe('homologação ok');
    });

    it('agendarEnvio persiste data_agendamento_envio', function () {
        $plano = PlanoEntrega::factory()->create([
            'data_agendamento_envio' => null,
        ]);

        $quando = Carbon::parse('2026-03-30 15:30:00');

        $this->repository->agendarEnvio($plano, $quando);

        expect($plano->fresh()->data_agendamento_envio->equalTo($quando))->toBeTrue();
    });
});

describe('PlanoTrabalhoRepository — escrita de envio PGD', function () {
    beforeEach(function () {
        $this->repository = app(PlanoTrabalhoRepository::class);
        $this->tipoModalidadeId = TipoModalidade::factory()->create(['nome' => 'Presencial PT Pest'])->id;
        $this->perfilId = Perfil::factory()->create(['nome' => 'Padrão PT Pest'])->id;
    });

    it('registrarSucesso persiste data_envio_api_pgd, data_conclusao_envio e log de sucesso', function () {
        $plano = PlanoTrabalho::factory()->ativo()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'log_envio' => 'algo',
            'data_envio_api_pgd' => null,
            'data_conclusao_envio' => null,
        ]);

        $this->repository->registrarSucesso($plano);

        $fresh = $plano->fresh();
        expect($fresh->data_envio_api_pgd)->not->toBeNull();
        expect($fresh->data_conclusao_envio)->not->toBeNull();
        expect($fresh->log_envio)->toBe(LOG_ENVIO_SUCESSO_PGD);
    });

    it('registrarInsucesso persiste data_tentativa_envio e log_envio', function () {
        $plano = PlanoTrabalho::factory()->ativo()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
        ]);

        $this->repository->registrarInsucesso($plano, 'timeout');

        $fresh = $plano->fresh();
        expect($fresh->data_tentativa_envio)->not->toBeNull();
        expect($fresh->log_envio)->toBe('timeout');
    });

    it('registrarTentativa persiste apenas data_tentativa_envio', function () {
        $plano = PlanoTrabalho::factory()->ativo()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_tentativa_envio' => null,
            'log_envio' => null,
        ]);

        $this->repository->registrarTentativa($plano);

        $fresh = $plano->fresh();
        expect($fresh->data_tentativa_envio)->not->toBeNull();
        expect($fresh->log_envio)->toBeNull();
    });

    it('registrarConclusao persiste data_conclusao_envio e log_envio', function () {
        $plano = PlanoTrabalho::factory()->ativo()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_conclusao_envio' => null,
        ]);

        $this->repository->registrarConclusao($plano, 'fim do fluxo');

        $fresh = $plano->fresh();
        expect($fresh->data_conclusao_envio)->not->toBeNull();
        expect($fresh->log_envio)->toBe('fim do fluxo');
    });

    it('registrarLog persiste apenas log_envio', function () {
        $plano = PlanoTrabalho::factory()->ativo()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'log_envio' => null,
        ]);

        $this->repository->registrarLog($plano, 'só auditoria');

        expect($plano->fresh()->log_envio)->toBe('só auditoria');
    });

    it('agendarEnvio persiste data_agendamento_envio', function () {
        $plano = PlanoTrabalho::factory()->ativo()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_agendamento_envio' => null,
        ]);

        $quando = Carbon::parse('2026-03-30 16:45:00');

        $this->repository->agendarEnvio($plano, $quando);

        expect($plano->fresh()->data_agendamento_envio->equalTo($quando))->toBeTrue();
    });
});
