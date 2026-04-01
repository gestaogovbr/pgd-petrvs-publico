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
use Illuminate\Database\Eloquent\Model;
use InvalidArgumentException;

describe('UsuarioRepository — envio PGD', function () {
    beforeEach(function () {
        $this->repository = app(UsuarioRepository::class);
        $this->tipoModalidadeId = TipoModalidade::factory()->create(['nome' => 'Presencial Pest'])->id;
        $this->perfilId = Perfil::factory()->create(['nome' => 'Padrão Pest'])->id;
    });

    it('registrarSucesso persiste data_envio_api_pgd e zera log_envio', function () {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
            'log_envio' => 'erro anterior',
            'data_envio_api_pgd' => null,
        ]);

        $this->repository->registrarSucesso($usuario);

        $fresh = $usuario->fresh();
        expect($fresh->data_envio_api_pgd)->not->toBeNull();
        expect($fresh->log_envio)->toBeNull();
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

    it('registrarSucesso com modelo inválido lança InvalidArgumentException', function () {
        $outro = Mockery::mock(Model::class);

        $this->repository->registrarSucesso($outro);
    })->throws(InvalidArgumentException::class);

    it('agendarEnvio persiste data_agendamento_envio com saveQuietly', function () {
        $usuario = Usuario::factory()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'perfil_id' => $this->perfilId,
            'data_agendamento_envio' => null,
        ]);

        $quando = Carbon::parse('2026-03-30 14:00:00');

        $this->repository->agendarEnvio($usuario, $quando);

        $fresh = $usuario->fresh();
        expect($fresh->data_agendamento_envio->equalTo($quando))->toBeTrue();
    });

    it('agendarEnvio com modelo inválido lança InvalidArgumentException', function () {
        $outro = Mockery::mock(Model::class);

        $this->repository->agendarEnvio($outro, Carbon::now());
    })->throws(InvalidArgumentException::class);
});

describe('PlanoEntregaRepository — envio PGD', function () {
    beforeEach(function () {
        $this->repository = app(PlanoEntregaRepository::class);
    });

    it('registrarSucesso persiste data_envio_api_pgd e zera log_envio', function () {
        $plano = PlanoEntrega::factory()->create([
            'log_envio' => 'pendente',
            'data_envio_api_pgd' => null,
        ]);

        $this->repository->registrarSucesso($plano);

        $fresh = $plano->fresh();
        expect($fresh->data_envio_api_pgd)->not->toBeNull();
        expect($fresh->log_envio)->toBeNull();
    });

    it('registrarInsucesso persiste data_tentativa_envio e log_envio', function () {
        $plano = PlanoEntrega::factory()->create();

        $this->repository->registrarInsucesso($plano, 'API indisponível');

        $fresh = $plano->fresh();
        expect($fresh->data_tentativa_envio)->not->toBeNull();
        expect($fresh->log_envio)->toBe('API indisponível');
    });

    it('registrarInsucesso com modelo inválido lança InvalidArgumentException', function () {
        $outro = Mockery::mock(Model::class);

        $this->repository->registrarInsucesso($outro, 'x');
    })->throws(InvalidArgumentException::class);

    it('agendarEnvio persiste data_agendamento_envio com saveQuietly', function () {
        $plano = PlanoEntrega::factory()->create([
            'data_agendamento_envio' => null,
        ]);

        $quando = Carbon::parse('2026-03-30 15:30:00');

        $this->repository->agendarEnvio($plano, $quando);

        $fresh = $plano->fresh();
        expect($fresh->data_agendamento_envio->equalTo($quando))->toBeTrue();
    });

    it('agendarEnvio com modelo inválido lança InvalidArgumentException', function () {
        $outro = Mockery::mock(Model::class);

        $this->repository->agendarEnvio($outro, Carbon::now());
    })->throws(InvalidArgumentException::class);
});

describe('PlanoTrabalhoRepository — envio PGD', function () {
    beforeEach(function () {
        $this->repository = app(PlanoTrabalhoRepository::class);
        $this->tipoModalidadeId = TipoModalidade::factory()->create(['nome' => 'Presencial PT Pest'])->id;
        $this->perfilId = Perfil::factory()->create(['nome' => 'Padrão PT Pest'])->id;
    });

    it('registrarSucesso persiste data_envio_api_pgd e zera log_envio', function () {
        $plano = PlanoTrabalho::factory()->ativo()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'log_envio' => 'algo',
            'data_envio_api_pgd' => null,
        ]);

        $this->repository->registrarSucesso($plano);

        $fresh = $plano->fresh();
        expect($fresh->data_envio_api_pgd)->not->toBeNull();
        expect($fresh->log_envio)->toBeNull();
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

    it('registrarSucesso com modelo inválido lança InvalidArgumentException', function () {
        $outro = Mockery::mock(Model::class);

        $this->repository->registrarSucesso($outro);
    })->throws(InvalidArgumentException::class);

    it('agendarEnvio persiste data_agendamento_envio com saveQuietly', function () {
        $plano = PlanoTrabalho::factory()->ativo()->create([
            'tipo_modalidade_id' => $this->tipoModalidadeId,
            'data_agendamento_envio' => null,
        ]);

        $quando = Carbon::parse('2026-03-30 16:45:00');

        $this->repository->agendarEnvio($plano, $quando);

        $fresh = $plano->fresh();
        expect($fresh->data_agendamento_envio->equalTo($quando))->toBeTrue();
    });

    it('agendarEnvio com modelo inválido lança InvalidArgumentException', function () {
        $outro = Mockery::mock(Model::class);

        $this->repository->agendarEnvio($outro, Carbon::now());
    })->throws(InvalidArgumentException::class);
});

afterEach(function () {
    Mockery::close();
});
