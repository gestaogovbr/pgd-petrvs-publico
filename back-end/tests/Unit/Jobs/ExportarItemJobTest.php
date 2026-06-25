<?php

namespace Tests\Unit\Jobs;

use App\Jobs\Envio\ExportarItemJob;
use App\Models\Usuario;
use App\Repository\Interfaces\EnvioRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Queue\TimeoutExceededException;
use Illuminate\Support\Facades\Bus;
use Mockery;
use Tests\TenantTestCase;

uses(TenantTestCase::class);

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

    public function getResource(): JsonResource
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
}

describe('ExportarItemJob', function () {
    it('registra insucesso e não reagenda quando o job expira por timeout', function () {
        Bus::fake();

        $model = new Usuario();
        $model->id = 'item-1';

        $repository = Mockery::mock(EnvioRepositoryInterface::class);
        $repository->shouldReceive('findOneParaEnvio')
            ->once()
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
