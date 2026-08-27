<?php

use App\V2\Home\DataProviders\MeusPlanosVigentes;
use App\V2\Home\DTOs\HomeRequestDTO;
use App\V2\Home\HomeService;
use App\V2\Home\Validators\HomeAuthorizationValidator;
use App\V2\Home\DataProviders\AniversariantesDoDia;
use App\V2\Home\DataProviders\ContribuicoesParticipantes;
use App\V2\Home\DataProviders\EmFeriasHoje;
use App\V2\Home\DataProviders\PendenciasUsuario;
use App\V2\Home\DataProviders\PlanosVigentes;
use App\V2\Home\DataProviders\ResumoEquipe;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

describe('HomeService::getMeusPlanosVigentes', function () {

    test('retorna dados do DataProvider com PE e PT vigentes', function () {
        Auth::shouldReceive('id')->andReturn('user-1');

        $authzValidator = Mockery::mock(HomeAuthorizationValidator::class);
        $authzValidator->shouldReceive('validar')->once();

        $meusPlanosVigentes = Mockery::mock(MeusPlanosVigentes::class);
        $meusPlanosVigentes->shouldReceive('getData')
            ->once()
            ->with(Mockery::on(fn (HomeRequestDTO $dto) =>
                $dto->unidadeId === 'unidade-1' && $dto->usuarioId === 'user-1'
            ))
            ->andReturn([
                'plano_entregas_id' => 'pe-uuid-123',
                'plano_trabalho_id' => 'pt-uuid-456',
            ]);

        $service = new HomeService(
            $authzValidator,
            Mockery::mock(PendenciasUsuario::class),
            Mockery::mock(PlanosVigentes::class),
            Mockery::mock(ResumoEquipe::class),
            Mockery::mock(ContribuicoesParticipantes::class),
            Mockery::mock(AniversariantesDoDia::class),
            Mockery::mock(EmFeriasHoje::class),
            $meusPlanosVigentes,
        );

        $result = $service->getMeusPlanosVigentes(['unidade_id' => 'unidade-1', 'subordinadas' => false]);

        expect($result)->toBe([
            'plano_entregas_id' => 'pe-uuid-123',
            'plano_trabalho_id' => 'pt-uuid-456',
        ]);
    });

    test('retorna null para ambos quando DataProvider não encontra planos', function () {
        Auth::shouldReceive('id')->andReturn('user-2');

        $authzValidator = Mockery::mock(HomeAuthorizationValidator::class);
        $authzValidator->shouldReceive('validar')->once();

        $meusPlanosVigentes = Mockery::mock(MeusPlanosVigentes::class);
        $meusPlanosVigentes->shouldReceive('getData')
            ->once()
            ->andReturn([
                'plano_entregas_id' => null,
                'plano_trabalho_id' => null,
            ]);

        $service = new HomeService(
            $authzValidator,
            Mockery::mock(PendenciasUsuario::class),
            Mockery::mock(PlanosVigentes::class),
            Mockery::mock(ResumoEquipe::class),
            Mockery::mock(ContribuicoesParticipantes::class),
            Mockery::mock(AniversariantesDoDia::class),
            Mockery::mock(EmFeriasHoje::class),
            $meusPlanosVigentes,
        );

        $result = $service->getMeusPlanosVigentes(['unidade_id' => 'unidade-2', 'subordinadas' => false]);

        expect($result['plano_entregas_id'])->toBeNull();
        expect($result['plano_trabalho_id'])->toBeNull();
    });

    test('valida autorização antes de buscar dados', function () {
        Auth::shouldReceive('id')->andReturn('user-1');

        $authzValidator = Mockery::mock(HomeAuthorizationValidator::class);
        $authzValidator->shouldReceive('validar')
            ->once()
            ->with(Mockery::on(fn (HomeRequestDTO $dto) =>
                $dto->unidadeId === 'unidade-1' && $dto->subordinadas === true
            ));

        $meusPlanosVigentes = Mockery::mock(MeusPlanosVigentes::class);
        $meusPlanosVigentes->shouldReceive('getData')->andReturn([
            'plano_entregas_id' => null,
            'plano_trabalho_id' => null,
        ]);

        $service = new HomeService(
            $authzValidator,
            Mockery::mock(PendenciasUsuario::class),
            Mockery::mock(PlanosVigentes::class),
            Mockery::mock(ResumoEquipe::class),
            Mockery::mock(ContribuicoesParticipantes::class),
            Mockery::mock(AniversariantesDoDia::class),
            Mockery::mock(EmFeriasHoje::class),
            $meusPlanosVigentes,
        );

        $service->getMeusPlanosVigentes(['unidade_id' => 'unidade-1', 'subordinadas' => true]);
    });

    test('retorna apenas PE quando PT não existe', function () {
        Auth::shouldReceive('id')->andReturn('user-1');

        $authzValidator = Mockery::mock(HomeAuthorizationValidator::class);
        $authzValidator->shouldReceive('validar');

        $meusPlanosVigentes = Mockery::mock(MeusPlanosVigentes::class);
        $meusPlanosVigentes->shouldReceive('getData')->andReturn([
            'plano_entregas_id' => 'pe-uuid-999',
            'plano_trabalho_id' => null,
        ]);

        $service = new HomeService(
            $authzValidator,
            Mockery::mock(PendenciasUsuario::class),
            Mockery::mock(PlanosVigentes::class),
            Mockery::mock(ResumoEquipe::class),
            Mockery::mock(ContribuicoesParticipantes::class),
            Mockery::mock(AniversariantesDoDia::class),
            Mockery::mock(EmFeriasHoje::class),
            $meusPlanosVigentes,
        );

        $result = $service->getMeusPlanosVigentes(['unidade_id' => 'unidade-1']);

        expect($result['plano_entregas_id'])->toBe('pe-uuid-999');
        expect($result['plano_trabalho_id'])->toBeNull();
    });

    test('retorna apenas PT quando PE não existe', function () {
        Auth::shouldReceive('id')->andReturn('user-1');

        $authzValidator = Mockery::mock(HomeAuthorizationValidator::class);
        $authzValidator->shouldReceive('validar');

        $meusPlanosVigentes = Mockery::mock(MeusPlanosVigentes::class);
        $meusPlanosVigentes->shouldReceive('getData')->andReturn([
            'plano_entregas_id' => null,
            'plano_trabalho_id' => 'pt-uuid-888',
        ]);

        $service = new HomeService(
            $authzValidator,
            Mockery::mock(PendenciasUsuario::class),
            Mockery::mock(PlanosVigentes::class),
            Mockery::mock(ResumoEquipe::class),
            Mockery::mock(ContribuicoesParticipantes::class),
            Mockery::mock(AniversariantesDoDia::class),
            Mockery::mock(EmFeriasHoje::class),
            $meusPlanosVigentes,
        );

        $result = $service->getMeusPlanosVigentes(['unidade_id' => 'unidade-1']);

        expect($result['plano_entregas_id'])->toBeNull();
        expect($result['plano_trabalho_id'])->toBe('pt-uuid-888');
    });
});
