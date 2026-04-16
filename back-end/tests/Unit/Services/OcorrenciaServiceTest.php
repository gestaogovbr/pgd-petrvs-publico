<?php

use App\Exceptions\ServerException;
use App\Models\PlanoTrabalho;
use App\Repository\Afastamento\AfastamentoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Services\OcorrenciaService;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->ocorrenciaRepository = Mockery::mock(AfastamentoRepository::class);
    $this->planoTrabalhoRepository = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->app->instance(AfastamentoRepository::class, $this->ocorrenciaRepository);
    $this->app->instance(PlanoTrabalhoRepository::class, $this->planoTrabalhoRepository);
    $this->service = new OcorrenciaService();
    Auth::shouldReceive('user')->andReturn(null);
});

afterEach(function () {
    Mockery::close();
});

describe('OcorrenciaService::validateStore', function () {
    test('lança quando plano de trabalho informado não existe', function () {
        $this->planoTrabalhoRepository
            ->shouldReceive('findById')
            ->once()
            ->with('plano-inexistente')
            ->andReturn(null);

        expect(fn () => $this->service->validateStore([
            'plano_trabalho_id' => 'plano-inexistente',
            'usuario_id' => 'user-1',
            'data_inicio' => '2024-01-01T00:00:00',
            'data_fim' => '2024-01-31T23:59:59',
        ], null, ServiceBase::ACTION_INSERT))->toThrow(ServerException::class);
    });

    test('lança RN_OCOR_1 quando usuário do plano difere do usuário da ocorrência', function () {
        $plano = new PlanoTrabalho([
            'usuario_id' => 'usuario-plano',
            'data_inicio' => '2024-01-01 00:00:00',
            'data_fim' => '2024-12-31 23:59:59',
        ]);
        $plano->syncOriginal();

        $this->planoTrabalhoRepository
            ->shouldReceive('findById')
            ->once()
            ->with('plano-1')
            ->andReturn($plano);

        expect(fn () => $this->service->validateStore([
            'plano_trabalho_id' => 'plano-1',
            'usuario_id' => 'outro-usuario',
            'data_inicio' => '2024-01-01T00:00:00',
            'data_fim' => '2024-01-31T23:59:59',
        ], null, ServiceBase::ACTION_INSERT))->toThrow(ServerException::class);
    });

    test('lança RN_OCOR_2 quando períodos não coincidem', function () {
        $plano = new PlanoTrabalho([
            'usuario_id' => 'user-1',
            'data_inicio' => '2024-01-01 00:00:00',
            'data_fim' => '2024-01-31 23:59:59',
        ]);
        $plano->syncOriginal();

        $this->planoTrabalhoRepository
            ->shouldReceive('findById')
            ->once()
            ->with('plano-1')
            ->andReturn($plano);

        expect(fn () => $this->service->validateStore([
            'plano_trabalho_id' => 'plano-1',
            'usuario_id' => 'user-1',
            'data_inicio' => '2024-06-01T00:00:00',
            'data_fim' => '2024-06-30T23:59:59',
        ], null, ServiceBase::ACTION_INSERT))->toThrow(ServerException::class);
    });

    test('não consulta plano quando plano_trabalho_id está vazio', function () {
        $this->planoTrabalhoRepository->shouldNotReceive('findById');

        $this->service->validateStore([
            'usuario_id' => 'user-1',
            'data_inicio' => '2024-01-01T00:00:00',
            'data_fim' => '2024-01-31T23:59:59',
        ], null, ServiceBase::ACTION_INSERT);
    });
});
