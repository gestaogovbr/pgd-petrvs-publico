<?php

use App\Jobs\BuscarDadosSiapeJob;
use App\Jobs\SincronizarSiapeJob;
use App\Exceptions\NotFoundException;
use App\Services\TenantService;
use Illuminate\Support\Facades\Bus;

test('forçar SIAPE solicita sincronização somente depois do job de busca', function () {
    Bus::fake();

    app(TenantService::class)->forcarSiape($this->tenant->id);

    Bus::assertChained([
        BuscarDadosSiapeJob::class,
        SincronizarSiapeJob::class,
    ]);
    Bus::assertNotDispatched(SincronizarSiapeJob::class);
});

test('busca encadeada interrompe a carga quando falta a chave do ConectaGOV', function () {
    $this->tenant->dominio_url = 'tenant-issue-2695.example.test';
    $this->tenant->tenancy_db_name = config('database.connections.tenant.database');
    $this->tenant->log_database = 'tenant_issue_2695_log';
    $this->tenant->integracao_siape_conectagov_chave = null;
    $this->tenant->save();

    $busca = new BuscarDadosSiapeJob($this->tenant->id);
    $busca->chain([new SincronizarSiapeJob($this->tenant->id)]);

    expect(fn () => $busca->handle())
        ->toThrow(RuntimeException::class, 'chave do ConectaGOV não informada');
});

test('forçar SIAPE rejeita tenant inexistente sem agendar jobs', function () {
    Bus::fake();

    expect(fn () => app(TenantService::class)->forcarSiape('tenant-inexistente'))
        ->toThrow(NotFoundException::class);

    Bus::assertNothingDispatched();
});
