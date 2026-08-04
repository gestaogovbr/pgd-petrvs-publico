<?php

use App\Repository\Afastamento\AfastamentoRepository;
use App\Repository\Feriado\FeriadoRepository;
use App\Repository\PlanoTrabalhoEntregaRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\Services\CalendarioService;
use App\V2\Indicadores\DTOs\IndicadoresHorasFilterDTO;
use App\V2\Indicadores\IndicadoresHorasService;
use Illuminate\Support\Collection;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->planoTrabalhoRepo = Mockery::mock(PlanoTrabalhoRepository::class);
    $this->entregaRepo = Mockery::mock(PlanoTrabalhoEntregaRepository::class);
    $this->afastamentoRepo = Mockery::mock(AfastamentoRepository::class);
    $this->feriadoRepo = Mockery::mock(FeriadoRepository::class);
    $this->unidadeRepo = Mockery::mock(UnidadeRepository::class);
    $this->calendarioService = Mockery::mock(CalendarioService::class);

    $this->service = new IndicadoresHorasService(
        $this->planoTrabalhoRepo,
        $this->entregaRepo,
        $this->afastamentoRepo,
        $this->feriadoRepo,
        $this->unidadeRepo,
        $this->calendarioService,
    );
});

afterEach(function () {
    Mockery::close();
});

describe('IndicadoresHorasService::horas', function () {

    test('retorna resultado vazio quando não há planos', function () {
        $filtro = IndicadoresHorasFilterDTO::fromArray([
            'unidade_id' => 'unidade-1',
            'incluir_subordinadas' => false,
        ]);

        $this->planoTrabalhoRepo->shouldReceive('buscarPlanosParaIndicadores')
            ->once()
            ->with(['unidade-1'], ['data_inicial' => null, 'data_final' => null, 'somente_vigentes' => false])
            ->andReturn(collect([]));

        $result = $this->service->horas($filtro);

        expect($result)->toHaveCount(3);
        expect($result[0]->horas)->toBe(0.0);
        expect($result[1]->horas)->toBe(0.0);
        expect($result[2]->horas)->toBe(0.0);
    });

    test('resolve subordinadas quando incluir_subordinadas é true', function () {
        $filtro = IndicadoresHorasFilterDTO::fromArray([
            'unidade_id' => 'unidade-1',
            'incluir_subordinadas' => true,
        ]);

        $this->unidadeRepo->shouldReceive('getSubordinadasRecursivas')
            ->once()
            ->with(['unidade-1'])
            ->andReturn(new \Illuminate\Database\Eloquent\Collection([
                (object) ['id' => 'unidade-2'],
                (object) ['id' => 'unidade-3'],
            ]));

        $this->planoTrabalhoRepo->shouldReceive('buscarPlanosParaIndicadores')
            ->once()
            ->with(
                Mockery::on(fn($ids) => count($ids) === 3
                    && in_array('unidade-1', $ids)
                    && in_array('unidade-2', $ids)
                    && in_array('unidade-3', $ids)
                ),
                Mockery::any()
            )
            ->andReturn(collect([]));

        $result = $this->service->horas($filtro);

        expect($result)->toHaveCount(3);
    });

    test('não resolve subordinadas quando incluir_subordinadas é false', function () {
        $filtro = IndicadoresHorasFilterDTO::fromArray([
            'unidade_id' => 'unidade-1',
            'incluir_subordinadas' => false,
        ]);

        $this->unidadeRepo->shouldNotReceive('getSubordinadasRecursivas');

        $this->planoTrabalhoRepo->shouldReceive('buscarPlanosParaIndicadores')
            ->once()
            ->with(['unidade-1'], Mockery::any())
            ->andReturn(collect([]));

        $this->service->horas($filtro);
    });

    test('passa filtros de data corretamente ao repository', function () {
        $filtro = IndicadoresHorasFilterDTO::fromArray([
            'unidade_id' => 'unidade-1',
            'data_inicial' => '2024-01-01',
            'data_final' => '2024-12-31',
            'somente_vigentes' => true,
        ]);

        $this->planoTrabalhoRepo->shouldReceive('buscarPlanosParaIndicadores')
            ->once()
            ->with(
                ['unidade-1'],
                ['data_inicial' => '2024-01-01', 'data_final' => '2024-12-31', 'somente_vigentes' => true]
            )
            ->andReturn(collect([]));

        $this->service->horas($filtro);
    });

    test('resultado contém as três categorias ordenadas desc', function () {
        $filtro = IndicadoresHorasFilterDTO::fromArray(['unidade_id' => 'unidade-1']);

        $this->planoTrabalhoRepo->shouldReceive('buscarPlanosParaIndicadores')
            ->andReturn(collect([]));

        $result = $this->service->horas($filtro);

        expect($result[0]->categoria)->toBe('Própria Unidade');
        expect($result[1]->categoria)->toBe('Outras Unidades');
        expect($result[2]->categoria)->toBe('Não vinculadas a entregas');
    });
});

describe('IndicadoresHorasFilterDTO', function () {

    test('fromArray preenche valores padrão corretamente', function () {
        $dto = IndicadoresHorasFilterDTO::fromArray(['unidade_id' => 'abc-123']);

        expect($dto->unidadeId)->toBe('abc-123');
        expect($dto->incluirSubordinadas)->toBeFalse();
        expect($dto->dataInicial)->toBeNull();
        expect($dto->dataFinal)->toBeNull();
        expect($dto->somenteVigentes)->toBeFalse();
    });

    test('fromArray preenche todos os campos', function () {
        $dto = IndicadoresHorasFilterDTO::fromArray([
            'unidade_id' => 'abc-123',
            'incluir_subordinadas' => true,
            'data_inicial' => '2024-01-01',
            'data_final' => '2024-12-31',
            'somente_vigentes' => true,
        ]);

        expect($dto->unidadeId)->toBe('abc-123');
        expect($dto->incluirSubordinadas)->toBeTrue();
        expect($dto->dataInicial)->toBe('2024-01-01');
        expect($dto->dataFinal)->toBe('2024-12-31');
        expect($dto->somenteVigentes)->toBeTrue();
    });
});
