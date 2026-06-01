<?php

declare(strict_types=1);

use App\Models\Tenant;
use App\Repository\TenantRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;

test('findById retorna o tenant após criação', function () {
    $id = 'tenant_repo_' . uniqid();
    $repository = app(TenantRepository::class);

    $tenant = Tenant::withoutEvents(fn () => $repository->create(['id' => $id]));

    expect($tenant)->toBeInstanceOf(Tenant::class)
        ->and($tenant->id)->toBe($id);

    $found = $repository->findById($id);
    expect($found)->not->toBeNull()
        ->and($found->id)->toBe($id);

    $repository->delete($id);
});

test('findOrFail lança quando o id não existe', function () {
    $repository = app(TenantRepository::class);

    $repository->findOrFail('tenant_inexistente_' . uniqid());
})->throws(ModelNotFoundException::class);

test('findAll inclui tenants criados', function () {
    $id = 'tenant_repo_all_' . uniqid();
    $repository = app(TenantRepository::class);

    Tenant::withoutEvents(fn () => $repository->create(['id' => $id]));

    $ids = $repository->findAll()->pluck('id')->all();
    expect($ids)->toContain($id);

    $repository->delete($id);
});

test('update persiste atributos', function () {
    $id = 'tenant_repo_upd_' . uniqid();
    $repository = app(TenantRepository::class);

    Tenant::withoutEvents(fn () => $repository->create(['id' => $id]));

    $updated = $repository->update($id, ['smtp_from_name' => 'Repo Integration']);
    expect($updated)->not->toBeNull()
        ->and($updated->smtp_from_name)->toBe('Repo Integration');

    $repository->delete($id);
});
