<?php

namespace Tests\Unit\Jobs;

use App\Jobs\Envio\ExportarItemJob;
use App\Repository\Interfaces\EnvioRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Queue\TimeoutExceededException;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Log;
use Mockery;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

class ExportarItemJobFake extends ExportarItemJob
{
    public function __construct(
        string $tenantId = 'tenant-1',
        string $id = 'item-1',
        string $origem = '',
    ) {
        $this->timestamp = Carbon::now();
        $this->queue = 'pgd_queue';
        $this->connection = 'rabbitmq';

        $reflection = new \ReflectionClass(ExportarItemJob::class);
        foreach ([
            'tenantId' => $tenantId,
            'id' => $id,
            'origem' => $origem,
        ] as $property => $value) {
            $reflectionProperty = $reflection->getProperty($property);
            $reflectionProperty->setValue($this, $value);
        }
    }

    public function getRepository(): EnvioRepositoryInterface
    {
        return app(EnvioRepositoryInterface::class);
    }

    public function getResource($model): JsonResource
    {
        return Mockery::mock(JsonResource::class);
    }

    public function tag(): string
    {
        return 'Item fake';
    }

    public function enviar(JsonResource $resource): bool
    {
        return true;
    }

    protected function initializeTenantContext(): void
    {
    }
}

describe('ExportarItemJob', function () {
    it('registra insucesso e não reagenda quando o job expira por timeout', function () {
        Bus::fake();
        Log::shouldReceive('error')->withAnyArgs();

        $model = Mockery::mock(Model::class);
        $model->shouldReceive('getAttribute')
            ->with('data_envio_api_pgd')
            ->andReturn(null);

        $repository = Mockery::mock(EnvioRepositoryInterface::class);
        $repository->shouldReceive('findById')
            ->twice()
            ->with('item-1')
            ->andReturn($model);
        $repository->shouldReceive('registrarInsucesso')
            ->once()
            ->with($model, Mockery::type('string'));

        app()->instance(EnvioRepositoryInterface::class, $repository);

        $job = new ExportarItemJobFake();
        $job->failed(new TimeoutExceededException('App\Jobs\Envio\ExportarItemJobFake has timed out.'));

        Bus::assertNothingDispatched();
    });

    it('não sobrescreve o log quando o timeout chega após sucesso desta tentativa', function () {
        Bus::fake();
        Log::shouldReceive('info')->never();
        Log::shouldReceive('error')->never();

        $model = Mockery::mock(Model::class);
        $model->shouldReceive('getAttribute')
            ->with('data_envio_api_pgd')
            ->andReturn(Carbon::now()->addSeconds(31));

        $repository = Mockery::mock(EnvioRepositoryInterface::class);
        $repository->shouldReceive('findById')
            ->once()
            ->with('item-1')
            ->andReturn($model);
        $repository->shouldReceive('registrarInsucesso')->never();

        app()->instance(EnvioRepositoryInterface::class, $repository);

        $job = new ExportarItemJobFake();
        $job->failed(new TimeoutExceededException('App\Jobs\Envio\ExportarItemJobFake has timed out.'));

        Bus::assertNothingDispatched();
    });

    it('registra insucesso de timeout quando o envio da API é de tentativa anterior', function () {
        Bus::fake();
        Log::shouldReceive('error')->withAnyArgs();

        $model = Mockery::mock(Model::class);
        $model->shouldReceive('getAttribute')
            ->with('data_envio_api_pgd')
            ->andReturn(Carbon::now()->subMinutes(5));

        $repository = Mockery::mock(EnvioRepositoryInterface::class);
        $repository->shouldReceive('findById')
            ->twice()
            ->with('item-1')
            ->andReturn($model);
        $repository->shouldReceive('registrarInsucesso')
            ->once()
            ->with($model, Mockery::type('string'));

        app()->instance(EnvioRepositoryInterface::class, $repository);

        $job = new ExportarItemJobFake();
        $job->failed(new TimeoutExceededException('App\Jobs\Envio\ExportarItemJobFake has timed out.'));

        Bus::assertNothingDispatched();
    });
});
