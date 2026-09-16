<?php

declare(strict_types=1);

use App\Contracts\RelatorioExcelGeradorContract;
use App\Enums\RelatorioGeracaoStatus;
use App\Enums\RelatorioGeracaoTipo;
use App\Exceptions\NotFoundException;
use App\Exceptions\ServerException;
use App\Exports\RelatorioExcelPaginadoWriter;
use App\Jobs\ExcluirRelatorioGeracaoJob;
use App\Jobs\ExpirarRelatorioGeracaoJob;
use App\Jobs\GerarRelatorioExcelJob;
use App\Models\RelatorioGeracao;
use App\Models\Usuario;
use App\Repository\RelatorioGeracaoRepository;
use App\Services\RelatorioGeracao\RelatorioExcelGeradorFactory;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoIndexDTO;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoRowDTO;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoStatusQueryDTO;
use App\V2\RelatorioGeracao\DTOs\RelatorioGeracaoStoreDTO;
use App\V2\RelatorioGeracao\RelatorioGeracaoService;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Storage;
use Stancl\Tenancy\Contracts\Tenant as TenantContract;
use Tests\TestCase;

uses(TestCase::class);

afterAll(function () {
    Mockery::close();
});

function makeRelatorioGeracaoUsuario(): Usuario
{
    $usuario = new Usuario();
    $usuario->id = 'usuario-1';

    return $usuario;
}

function makeRelatorioGeracao(array $overrides = []): RelatorioGeracao
{
    $geracao = new RelatorioGeracao();
    $geracao->id = $overrides['id'] ?? 'geracao-1';
    $geracao->tipo = $overrides['tipo'] ?? RelatorioGeracaoTipo::PLANO_TRABALHO->value;
    $geracao->nome = $overrides['nome'] ?? 'Relatório de Planos de Trabalho';
    $geracao->status = $overrides['status'] ?? RelatorioGeracaoStatus::PROCESSANDO;
    $geracao->arquivo_path = $overrides['arquivo_path'] ?? null;
    $geracao->arquivo_nome = $overrides['arquivo_nome'] ?? 'relatorio-planos-trabalho.xlsx';
    $geracao->iniciado_em = $overrides['iniciado_em'] ?? now();
    $geracao->finalizado_em = $overrides['finalizado_em'] ?? null;
    $geracao->erro_mensagem = $overrides['erro_mensagem'] ?? null;
    $geracao->parametros = $overrides['parametros'] ?? [];

    return $geracao;
}

function makeRelatorioGeracaoService(
    RelatorioGeracaoRepository $repository,
    ?RelatorioExcelGeradorFactory $factory = null,
    ?RelatorioExcelPaginadoWriter $writer = null,
): RelatorioGeracaoService {
    return new RelatorioGeracaoService(
        $repository,
        $factory ?? Mockery::mock(RelatorioExcelGeradorFactory::class),
        $writer ?? Mockery::mock(RelatorioExcelPaginadoWriter::class),
    );
}

test('index mapeia gerações do repositório para DTO sem expor o caminho do arquivo', function () {
    $usuario = makeRelatorioGeracaoUsuario();
    $geracao = makeRelatorioGeracao([
        'arquivo_path' => 'relatorios/geracao-1.xlsx',
    ]);

    $dto = new RelatorioGeracaoIndexDTO(1, 'iniciado_em', 'desc');
    $paginator = new LengthAwarePaginator([$geracao], 1, RelatorioGeracaoIndexDTO::PAGE_SIZE, 1);

    $repository = Mockery::mock(RelatorioGeracaoRepository::class);
    $repository->shouldReceive('paginateForUsuario')
        ->once()
        ->with('usuario-1', $dto)
        ->andReturn($paginator);

    $service = makeRelatorioGeracaoService($repository);

    $result = $service->index($dto, $usuario, Request::create('/api/v2/relatorio-exportacao', 'GET'));
    $row = $result->items()[0];

    expect($row)->toBeInstanceOf(RelatorioGeracaoRowDTO::class)
        ->and($row->id)->toBe('geracao-1')
        ->and($row->tipo)->toBe(RelatorioGeracaoTipo::PLANO_TRABALHO->value)
        ->and($row->nome)->toBe('Planos de Trabalho')
        ->and($row->status)->toBe(RelatorioGeracaoStatus::PROCESSANDO->value)
        ->and($row->status_label)->toBe('Em processamento')
        ->and($row->jsonSerialize())->not->toHaveKey('arquivo_path');
});

test('store recusa geração sem tenant identificado', function () {
    $service = makeRelatorioGeracaoService(Mockery::mock(RelatorioGeracaoRepository::class));

    $service->store(
        new RelatorioGeracaoStoreDTO(RelatorioGeracaoTipo::PLANO_TRABALHO, [], []),
        makeRelatorioGeracaoUsuario(),
    );
})->throws(ServerException::class, 'Tenant não identificado para a geração do relatório.');

test('store cria a geração e despacha o job quando há tenant', function () {
    Bus::fake();

    $geracao = makeRelatorioGeracao(['id' => 'geracao-2']);
    $usuario = makeRelatorioGeracaoUsuario();
    $storeDto = new RelatorioGeracaoStoreDTO(
        RelatorioGeracaoTipo::PLANO_TRABALHO,
        [['unidade_id', '==', 'u-1']],
        [],
    );

    $repository = Mockery::mock(RelatorioGeracaoRepository::class);
    $repository->shouldReceive('create')
        ->once()
        ->with(Mockery::on(function (array $attributes) use ($usuario): bool {
            return $attributes['tipo'] === RelatorioGeracaoTipo::PLANO_TRABALHO->value
                && $attributes['status'] === RelatorioGeracaoStatus::PROCESSANDO
                && $attributes['usuario_id'] === $usuario->id
                && $attributes['parametros'] === [
                    'where' => [['unidade_id', '==', 'u-1']],
                    'orderBy' => [],
                ];
        }))
        ->andReturn($geracao);

    $tenant = Mockery::mock(TenantContract::class);
    $tenant->shouldReceive('getAttribute')->with('id')->andReturn('tenant-1');
    app()->instance(TenantContract::class, $tenant);

    $service = makeRelatorioGeracaoService($repository);

    $row = $service->store($storeDto, $usuario);

    expect($row->id)->toBe('geracao-2')
        ->and($row->tipo)->toBe(RelatorioGeracaoTipo::PLANO_TRABALHO->value);

    Bus::assertDispatched(GerarRelatorioExcelJob::class, function (GerarRelatorioExcelJob $job): bool {
        return $job->geracaoId === 'geracao-2'
            && $job->tenantId === 'tenant-1'
            && $job->queue === GerarRelatorioExcelJob::QUEUE
            && $job->connection === GerarRelatorioExcelJob::CONNECTION;
    });
});

test('download lança not found quando a geração não pertence ao usuário', function () {
    $repository = Mockery::mock(RelatorioGeracaoRepository::class);
    $repository->shouldReceive('findForUsuario')->once()->with('geracao-1', 'usuario-1')->andReturn(null);

    $service = makeRelatorioGeracaoService($repository);

    $service->download('geracao-1', makeRelatorioGeracaoUsuario());
})->throws(NotFoundException::class, 'Geração de relatório não encontrada.');

test('download lança erro quando a geração ainda não está concluída', function () {
    $repository = Mockery::mock(RelatorioGeracaoRepository::class);
    $repository->shouldReceive('findForUsuario')
        ->once()
        ->andReturn(makeRelatorioGeracao(['status' => RelatorioGeracaoStatus::PROCESSANDO]));

    $service = makeRelatorioGeracaoService($repository);

    $service->download('geracao-1', makeRelatorioGeracaoUsuario());
})->throws(ServerException::class, 'O relatório ainda não está disponível para download.');

test('download devolve o arquivo quando a geração está concluída', function () {
    Storage::fake('local');
    Storage::disk('local')->put('relatorios/geracao-1.xlsx', 'conteudo');

    $repository = Mockery::mock(RelatorioGeracaoRepository::class);
    $repository->shouldReceive('findForUsuario')
        ->once()
        ->andReturn(makeRelatorioGeracao([
            'status' => RelatorioGeracaoStatus::CONCLUIDA,
            'arquivo_path' => 'relatorios/geracao-1.xlsx',
        ]));

    $service = makeRelatorioGeracaoService($repository);

    $response = $service->download('geracao-1', makeRelatorioGeracaoUsuario());

    expect($response->getStatusCode())->toBe(200);
});

test('processar não atualiza quando a geração não existe', function () {
    $repository = Mockery::mock(RelatorioGeracaoRepository::class);
    $repository->shouldReceive('find')->once()->with('geracao-inexistente')->andReturn(null);
    $repository->shouldNotReceive('update');

    $service = makeRelatorioGeracaoService($repository);

    $service->processar('geracao-inexistente');
});

test('processar grava o excel e marca a geração como concluída', function () {
    Storage::fake('local');

    $geracao = makeRelatorioGeracao();
    $gerador = Mockery::mock(RelatorioExcelGeradorContract::class);
    $gerador->shouldReceive('criarExport')->once()->andReturn(new stdClass());
    $gerador->shouldReceive('pageSize')->once()->andReturn(500);
    $gerador->shouldReceive('arquivoNome')->once()->andReturn('relatorio-planos-trabalho.xlsx');

    $factory = Mockery::mock(RelatorioExcelGeradorFactory::class);
    $factory->shouldReceive('make')->once()->with(RelatorioGeracaoTipo::PLANO_TRABALHO)->andReturn($gerador);

    $writer = Mockery::mock(RelatorioExcelPaginadoWriter::class);
    $writer->shouldReceive('store')->once();

    $repository = Mockery::mock(RelatorioGeracaoRepository::class);
    $repository->shouldReceive('find')->once()->with('geracao-1')->andReturn($geracao);
    $repository->shouldReceive('update')
        ->once()
        ->with('geracao-1', Mockery::on(function (array $attributes): bool {
            return $attributes['status'] === RelatorioGeracaoStatus::CONCLUIDA
                && $attributes['arquivo_path'] === 'relatorios/geracao-1.xlsx'
                && $attributes['arquivo_nome'] === 'relatorio-planos-trabalho.xlsx';
        }))
        ->andReturn($geracao);

    $service = makeRelatorioGeracaoService($repository, $factory, $writer);
    $service->processar('geracao-1');
});

test('marcarErro delega ao repositório', function () {
    $repository = Mockery::mock(RelatorioGeracaoRepository::class);
    $repository->shouldReceive('marcarErroSeProcessando')
        ->once()
        ->with('geracao-1', 'timeout')
        ->andReturn(true);

    $service = makeRelatorioGeracaoService($repository);

    $service->marcarErro('geracao-1', 'timeout');
});

test('statusPorIds devolve o estado atual das gerações pedidas', function () {
    $geracao = makeRelatorioGeracao([
        'status' => RelatorioGeracaoStatus::CONCLUIDA,
        'finalizado_em' => now(),
    ]);

    $repository = Mockery::mock(RelatorioGeracaoRepository::class);
    $repository->shouldReceive('findByIdsForUsuario')
        ->once()
        ->with(['geracao-1'], 'usuario-1')
        ->andReturn(collect([$geracao]));

    $service = makeRelatorioGeracaoService($repository);

    $rows = $service->statusPorIds(
        new RelatorioGeracaoStatusQueryDTO(['geracao-1']),
        makeRelatorioGeracaoUsuario(),
    );

    expect($rows)->toHaveCount(1)
        ->and($rows[0]->id)->toBe('geracao-1')
        ->and($rows[0]->status)->toBe(RelatorioGeracaoStatus::CONCLUIDA->value)
        ->and($rows[0]->status_label)->toBe('Concluída');
});

test('expirarGeracoesTravadas marca processamentos acima de 30 minutos como Tempo Expirado', function () {
    $repository = Mockery::mock(RelatorioGeracaoRepository::class);
    $repository->shouldReceive('marcarExpiradas')
        ->once()
        ->with(ExpirarRelatorioGeracaoJob::LIMITE_MINUTOS, ExpirarRelatorioGeracaoJob::MENSAGEM_ERRO)
        ->andReturn(2);

    $service = makeRelatorioGeracaoService($repository);

    expect($service->expirarGeracoesTravadas())->toBe(2);
});

test('excluirGeracoesAntigas apaga o arquivo e o registro com mais de 24 horas', function () {
    Storage::fake('local');
    Storage::disk('local')->put('relatorios/geracao-1.xlsx', 'xlsx');

    $geracao = makeRelatorioGeracao([
        'id' => 'geracao-1',
        'status' => RelatorioGeracaoStatus::CONCLUIDA,
        'arquivo_path' => 'relatorios/geracao-1.xlsx',
    ]);

    $repository = Mockery::mock(RelatorioGeracaoRepository::class);
    $repository->shouldReceive('findAntigas')
        ->once()
        ->with(ExcluirRelatorioGeracaoJob::RETENCAO_HORAS)
        ->andReturn(collect([$geracao]));
    $repository->shouldReceive('forceDelete')
        ->once()
        ->with('geracao-1')
        ->andReturn(true);

    $service = makeRelatorioGeracaoService($repository);

    expect($service->excluirGeracoesAntigas())->toBe(1);
    Storage::disk('local')->assertMissing('relatorios/geracao-1.xlsx');
});

test('kernel agenda exclusão de exportação todos os dias à 1h', function () {
    $schedule = new Illuminate\Console\Scheduling\Schedule();
    $kernel = app(App\Console\Kernel::class);
    $method = new ReflectionMethod($kernel, 'schedule');
    $method->setAccessible(true);

    try {
        $method->invoke($kernel, $schedule);
    } catch (Throwable) {
        // A suíte pode não ter as tabelas centrais consultadas pelo Kernel.
    }

    $event = collect($schedule->events())
        ->first(fn ($event): bool => ($event->description ?? null) === 'Excluir Exportação de Relatórios');

    expect($event)->not->toBeNull()
        ->and($event->expression)->toBe('0 1 * * *');
});

test('kernel agenda expiração de exportação a cada 15 minutos', function () {
    $schedule = new Illuminate\Console\Scheduling\Schedule();
    $kernel = app(App\Console\Kernel::class);
    $method = new ReflectionMethod($kernel, 'schedule');
    $method->setAccessible(true);

    try {
        $method->invoke($kernel, $schedule);
    } catch (Throwable) {
        // A suíte pode não ter as tabelas centrais consultadas pelo Kernel.
    }

    $event = collect($schedule->events())
        ->first(fn ($event): bool => ($event->description ?? null) === 'Expirar Exportação de Relatórios');

    expect($event)->not->toBeNull()
        ->and($event->expression)->toBe('*/15 * * * *');
});

test('conexão relatorio_exportacao tem timeout de 30 minutos e retry_after maior que o timeout', function () {
    $queue = config('queue.connections.'.GerarRelatorioExcelJob::CONNECTION);

    expect($queue['driver'])->toBe('redis')
        ->and($queue['queue'])->toBe(GerarRelatorioExcelJob::QUEUE)
        ->and($queue['timeout'])->toBe(1800)
        ->and($queue['retry_after'])->toBeGreaterThan($queue['timeout']);
});
