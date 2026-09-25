<?php

declare(strict_types=1);

use App\Models\Tenant;
use App\Services\TenantConfigurationsService;
use Stancl\Tenancy\Database\Models\Domain;

function createTenantForConfigurationTest(string $id, string $domain, string $key, string $agencyCode): Tenant
{
    return Tenant::withoutEvents(fn () => Tenant::create([
        'id' => $id,
        'dominio_url' => $domain,
        'tenancy_db_name' => 'tenant_' . strtolower($id),
        'log_database' => 'log_' . strtolower($id),
        'integracao_siape_conectagov_chave' => $key,
        'integracao_siape_codorgao' => $agencyCode,
    ]));
}

test('carrega configurações pelo tenant sem depender de domínio e preserva os domínios existentes', function () {
    $suffix = uniqid();
    $anpdId = 'ANPD_' . $suffix;
    $mgiId = 'MGI_' . $suffix;
    $anpdDomainName = 'anpd-' . $suffix . '.example.test';

    createTenantForConfigurationTest($anpdId, $anpdDomainName, 'chave-anpd-teste', 'anpd-teste');
    createTenantForConfigurationTest($mgiId, 'mgi-sem-dominio.example.test', 'chave-mgi-teste', 'mgi-teste');

    Domain::query()->create([
        'domain' => $anpdDomainName,
        'tenant_id' => $anpdId,
    ]);

    $domainsBefore = Domain::query()
        ->orderBy('id')
        ->get(['domain', 'tenant_id'])
        ->toArray();

    $tenant = app(TenantConfigurationsService::class)->handleTenant($mgiId);

    expect($tenant)->toBeInstanceOf(Tenant::class)
        ->and($tenant->id)->toBe($mgiId)
        ->and(config('integracao.siape.conectagov_chave'))->toBe('chave-mgi-teste')
        ->and(config('integracao.siape.codOrgao'))->toBe('mgi-teste')
        ->and(Domain::query()->where('tenant_id', $mgiId)->exists())->toBeFalse()
        ->and(Domain::query()->orderBy('id')->get(['domain', 'tenant_id'])->toArray())
        ->toBe($domainsBefore);
});

test('mantém a resolução web por domínio', function () {
    $suffix = uniqid();
    $anpdId = 'ANPD_' . $suffix;
    $anpdDomainName = 'anpd-' . $suffix . '.example.test';

    createTenantForConfigurationTest($anpdId, $anpdDomainName, 'chave-anpd-teste', 'anpd-teste');
    Domain::query()->create([
        'domain' => $anpdDomainName,
        'tenant_id' => $anpdId,
    ]);

    $domain = app(TenantConfigurationsService::class)->handle(domain: $anpdDomainName);

    expect($domain)->toBeInstanceOf(Domain::class)
        ->and($domain->tenant_id)->toBe($anpdId)
        ->and(config('integracao.siape.conectagov_chave'))->toBe('chave-anpd-teste')
        ->and(config('integracao.siape.codOrgao'))->toBe('anpd-teste');
});
